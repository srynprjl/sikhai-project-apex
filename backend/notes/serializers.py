from Authentication.models import CustomUser
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser 
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

        def create(self, validate_data):
            print(validate_data)
            user = CustomUser.Objects.create_user(**validate_data)
            return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author", "isPublic"]
        extra_kwargs = {"author": {"read_only": True}, "isPublic": {"read_only": True}}