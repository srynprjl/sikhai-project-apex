from django.shortcuts import render
from django.contrib.auth.models import User
from .models import CustomUser
from rest_framework import generics , viewsets
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

#Viewssssssssssss
class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
