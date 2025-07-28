from rest_framework import viewsets, generics
from rest_framework.permissions import IsAdminUser
from Authentication.models import CustomUser
from .serializers import CustomUserSerializer
from feedback.models import TutorApplication
from feedback.serializers import TutorApplicationSerializer
from notes.serializers import NoteSerializer
from notes.models import Note

class AdminNoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all() 
    permission_classes = [IsAdminUser]

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]

class TutorApplicationListView(generics.ListAPIView):
    queryset = TutorApplication.objects.all()
    serializer_class = TutorApplicationSerializer
    permission_classes = [IsAdminUser]
