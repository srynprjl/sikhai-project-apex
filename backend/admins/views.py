from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from Authentication.models import CustomUser
from .serializers import CustomUserSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]
