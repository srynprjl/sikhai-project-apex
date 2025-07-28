from rest_framework import viewsets, generics
from rest_framework.permissions import IsAdminUser
from Authentication.models import CustomUser
from .serializers import CustomUserSerializer
from feedback.models import TutorApplication
from feedback.serializers import TutorApplicationSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]

class TutorApplicationListView(generics.ListAPIView):
    queryset = TutorApplication.objects.all()
    serializer_class = TutorApplicationSerializer
    permission_classes = [IsAdminUser]
