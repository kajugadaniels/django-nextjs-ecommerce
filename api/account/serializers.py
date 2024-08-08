from rest_framework import serializers
from account.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['clerk_id', 'email', 'first_name', 'last_name', 'created_at', 'updated_at']