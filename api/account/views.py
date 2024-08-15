import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from account.serializers import *
from account.models import *

logger = logging.getLogger(__name__)

class UserCreateView(APIView):
    def post(self, request):
        logger.info(f"Received data in UserCreateView: {request.data}")
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            logger.info(f"Serializer is valid. Validated data: {serializer.validated_data}")
            try:
                user, created = User.objects.update_or_create(
                    clerk_id=serializer.validated_data['clerk_id'],
                    defaults=serializer.validated_data
                )
                logger.info(f"User {'created' if created else 'updated'}: {user}")
                return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
            except Exception as e:
                logger.error(f"Error creating/updating user: {str(e)}")
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        logger.error(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)