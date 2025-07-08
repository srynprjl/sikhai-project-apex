from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import CustomUserSerializer

CustomUser = get_user_model()

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all().order_by('id') 
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]

    pass 

