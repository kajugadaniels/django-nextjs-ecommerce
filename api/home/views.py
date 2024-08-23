import random
import hashlib
import logging
import requests
from home.models import *
from dotenv import load_dotenv
from home.serializers import *
from account.models import *
from django.db import transaction
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

class ProductList(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all().order_by('-created_at')
        category_slug = self.request.query_params.get('category_slug', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_object(self):
        slug = self.kwargs.get('slug')
        try:
            return Product.objects.get(slug=slug)
        except Product.DoesNotExist:
            raise NotFound('Product not found')

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductByCategory(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_slug = self.kwargs.get('category_slug')
        try:
            category = Category.objects.get(slug=category_slug)
        except Category.DoesNotExist:
            raise NotFound('Category not found')
        return Product.objects.filter(category=category)

class ProductCategoryList(generics.ListCreateAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer

class ProductCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer

class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class OrderCreateView(APIView):
    @transaction.atomic
    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()
            return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.all().order_by('-created_at')

class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

load_dotenv()
logger = logging.getLogger(__name__)

class MomoApi():
    def CollectMoney(phone,amount):
        password = os.environ.get('PAYMENT_PASSWORD')
        #password =username+accountno+partnerpassword+timestamp
        hashedPassword = hashlib.sha256(password.encode('utf-8')).hexdigest()
        tran = random.randint(19000, 80000000000)

        data = {
                'username': os.environ.get('PAYMENT_USERNAME'),
                'timestamp':20200131115242,
                'amount': amount,
                'password': hashedPassword,
                'mobilephone': phone,
                'requesttransactionid': tran,
                'callbackurl':'https://api.hellomed.rw/api/pay-webhook'
            }
        response = requests.post(
                'https://www.intouchpay.co.rw/api/requestpayment/', data=data)
        res = response.json()
        return res

User = get_user_model()
logger = logging.getLogger(__name__)

class PaymentView(APIView):
    def post(self, request):
        telephone = request.data.get('phone')
        phone = telephone.replace("+", "")
        amount = request.data.get('amount')
        order_data = request.data.get('order_data')
        
        # Validate the incoming request data
        if not phone or not amount or not order_data:
            return Response({'error': 'Phone, amount, and order data are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Get the user instance
            user_id = order_data.get('user_id')
            try:
                user = User.objects.get(clerk_id=user_id)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

            # Initiate payment using MomoApi
            payment_response = MomoApi.CollectMoney(phone, amount)
            logger.info(f"Payment response: {payment_response}")
            
            # Check payment status and handle accordingly
            if payment_response.get('status') in ['SUCCESS', 'Pending']:
                # Create the order whether the status is SUCCESS or Pending
                order = Order.objects.create(
                    user=user,  # Use the user instance here
                    total_amount=amount,
                    payment_status=payment_response.get('status'),
                    transaction_id=payment_response.get('transactionid'),
                    shipping_address=order_data.get('shipping_address'),
                    shipping_city=order_data.get('shipping_city'),
                    shipping_zip_code=order_data.get('shipping_zip_code'),
                    shipping_phone=phone
                )
                
                # Create order items
                for item in order_data.get('items', []):
                    product = Product.objects.get(pk=item['product_id'])
                    OrderItem.objects.create(
                        order=order,
                        product=product,
                        quantity=item['quantity']
                    )
                
                return Response({
                    'status': payment_response.get('status'),
                    'message': 'Payment successful and order created' if payment_response.get('status') == 'SUCCESS' else 'Payment pending and order created',
                    'transaction_id': payment_response.get('transactionid'),
                    'order_id': order.id
                }, status=status.HTTP_200_OK)
            else:
                # Handle payment failure
                return Response({
                    'status': 'FAILED',
                    'message': payment_response.get('msg', 'Payment failed'),
                    'error_code': payment_response.get('statuscode')
                }, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Unexpected error in payment process: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)