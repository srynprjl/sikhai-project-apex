from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated # Import IsAuthenticated for authentication
from .models import SikhaiWhiteboard
from .serializers import SikhaiBoardSerializer

class SikhaiBoardViewSet(viewsets.ModelViewSet):
    serializer_class = SikhaiBoardSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return SikhaiWhiteboard.objects.filter(user=self.request.user)
        return SikhaiWhiteboard.objects.none() 

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save()