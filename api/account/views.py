import logging
from account.models import User
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from account.serializers import UserSerializer

logger = logging.getLogger(__name__)

class UserCreateView(APIView):
    def post(self, request):
        logger.info(f"Received POST request: {request.data}")
        
        clerk_id = request.data.get('clerk_id')
        
        # Check if user already exists
        try:
            user = User.objects.get(clerk_id=clerk_id)
            serializer = UserSerializer(user, data=request.data, partial=True)
        except User.DoesNotExist:
            # Create new user
            serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            logger.info(f"User created/updated: {user}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        logger.error(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    def get(self, request, clerk_id):
        try:
            user = User.objects.get(clerk_id=clerk_id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)