from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from account.serializers import UserSerializer
from account.models import User
import logging

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