from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import userSerializer, NotSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.object.filter(author = user)
    
    def perform_create(self, serializer):
        
        return super().perform_create(serializer)

class CreateUserView (generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer
    permission_classes = [AllowAny]