from rest_framework import viewsets, generics
from rest_framework.permissions import IsAdminUser
from Authentication.models import CustomUser
from .serializers import CustomUserSerializer, TutorApplicationApprovalSerializer
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
    queryset = TutorApplication.objects.filter(is_approved=False)
    serializer_class = TutorApplicationSerializer
    permission_classes = [IsAdminUser]

class TutorApplicationDetailView(generics.RetrieveAPIView):
    queryset = TutorApplication.objects.all() 
    serializer_class = TutorApplicationSerializer
    permission_classes = [IsAdminUser]


class TutorApplicationApproveView(generics.UpdateAPIView):
    queryset = TutorApplication.objects.all()
    serializer_class = TutorApplicationApprovalSerializer
    permission_classes = [IsAdminUser]
    # http_method_names = ['patch']

    def perform_update(self, serializer):
        tutor_application = serializer.save(is_approved=True)
        user = tutor_application.user
        if not user.is_tutor: 
            user.is_tutor = True
            user.save()

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class AdminTutorApplicationDeleteView(generics.DestroyAPIView):
    queryset = TutorApplication.objects.all()
    serializer_class = TutorApplicationSerializer
    permission_classes = [IsAdminUser]
