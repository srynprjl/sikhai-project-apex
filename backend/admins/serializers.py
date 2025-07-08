# your_app_name/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'is_tutor', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data.get('first_name', ''), # Use .get() for optional fields
            last_name=validated_data.get('last_name', ''),   # Use .get() for optional fields
            is_tutor=validated_data.get('is_tutor', False),
            password=validated_data['password']
        )
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, instance, value)

        instance.save()
        return instance

