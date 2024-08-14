from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from account.serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.utils.decorators import method_decorator
import json
import logging

logger = logging.getLogger(__name__)
User = get_user_model()

class UserAPIView(APIView):
    def get(self, request, clerk_id):
        try:
            user = User.objects.get(clerk_id=clerk_id)
            return Response(UserSerializer(user).data)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, clerk_id):
        try:
            user = User.objects.get(clerk_id=clerk_id)
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

@method_decorator(csrf_exempt, name='dispatch')
class ClerkWebhookView(APIView):
    def post(self, request):
        try:
            payload = json.loads(request.body)
            logger.info(f"Received webhook payload: {json.dumps(payload, indent=2)}")
            
            event_type = payload.get('type')
            data = payload.get('data', {})
            
            if event_type == 'user.created':
                user, created = User.objects.get_or_create(
                    clerk_id=data['id'],
                    defaults={
                        'email': data['email_addresses'][0]['email_address'],
                        'username': data['username'] or data['email_addresses'][0]['email_address'],
                        'first_name': data.get('first_name', ''),
                        'last_name': data.get('last_name', '')
                    }
                )
                logger.info(f"User {'created' if created else 'updated'}: {user.email}")
            elif event_type == 'user.updated':
                try:
                    user = User.objects.get(clerk_id=data['id'])
                    user.email = data['email_addresses'][0]['email_address']
                    user.username = data['username'] or data['email_addresses'][0]['email_address']
                    user.first_name = data.get('first_name', '')
                    user.last_name = data.get('last_name', '')
                    user.save()
                    logger.info(f"User updated: {user.email}")
                except User.DoesNotExist:
                    logger.warning(f"User not found for update: {data['id']}")
            elif event_type == 'user.deleted':
                User.objects.filter(clerk_id=data['id']).delete()
                logger.info(f"User deleted: {data['id']}")
            else:
                logger.warning(f"Unhandled event type: {event_type}")
            
            return Response({"status": "success", "message": f"Processed {event_type} event"}, status=status.HTTP_200_OK)
        except json.JSONDecodeError:
            logger.error("Invalid JSON in webhook payload")
            return Response({"status": "error", "message": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.exception(f"Error processing webhook: {str(e)}")