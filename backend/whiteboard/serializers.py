from rest_framework import serializers
from .models import Whiteboard

class WhiteboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Whiteboard
        fields = ['id', 'user', 'data', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at'] 
