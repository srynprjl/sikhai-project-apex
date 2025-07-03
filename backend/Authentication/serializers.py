from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
  # confirm password

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
