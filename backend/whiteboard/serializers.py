from rest_framework import serializers
from .models import SikhaiWhiteboard

class SikhaiSerializer(serializers.ModelSerializer):
    class Meta:
        model = SikhaiWhiteboard
        fields = ['id', 'user', 'title', 'elements', 'app_state', 'created_at']
        read_only_fields = ['user', 'created_at']