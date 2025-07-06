from rest_framework import serializers
from .models import SikhaiWhiteboard

class SikhaiBoardSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = SikhaiWhiteboard
        fields = ['id', 'name', 'elements', 'app_state', 'user', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at'] # 'user' is set by the view, not client
