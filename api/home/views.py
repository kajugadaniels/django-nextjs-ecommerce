import random
import hashlib
import logging
import requests
from home.models import *
from home.serializers import *
from django.conf import settings
from django.db import transaction
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
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
        return Order.objects.all()

class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

logger = logging.getLogger(__name__)

class InTouchPaymentView(APIView):
    def post(self, request):
        phone = request.data.get('phone')
        amount = request.data.get('amount')

        if not phone or not amount:
            return Response({'error': 'Phone and amount are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            password = settings.PAYMENT_PASSWORD
            username = settings.PAYMENT_USERNAME
            timestamp = '20200131115242'  # You might want to generate this dynamically

            hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
            tran = random.randint(19000, 80000000000)

            data = {
                'username': username,
                'timestamp': timestamp,
                'amount': amount,
                'password': hashed_password,
                'mobilephone': phone,
                'requesttransactionid': str(tran),
                'callbackurl': 'https://your-django-backend.com/api/payment-webhook/'  # Update this URL
            }

            logger.info(f"Sending payment request to InTouch: {data}")
            response = requests.post('https://www.intouchpay.co.rw/api/requestpayment/', data=data)
            logger.info(f"Response from InTouch: {response.text}")
            
            res = response.json()
            return Response(res, status=status.HTTP_200_OK)
        except requests.RequestException as e:
            logger.error(f"Error communicating with InTouch API: {str(e)}")
            return Response({'error': 'Failed to communicate with payment provider'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception as e:
            logger.error(f"Unexpected error in payment process: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)