from django.shortcuts import render
from rest_framework import generics, permissions, status

from rest_framework.response import Response
from .models import Feedback
from .serializers import FeedbackSerializer
from .models import Report, Review
from .models import TutorApplication
from .serializers import TutorApplicationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .serializers import ReportSerializer, ReviewSerializer

class FeedbackListCreateView(generics.ListCreateAPIView):
    queryset = Feedback.objects.all().order_by('-id')
    serializer_class = FeedbackSerializer

class FeedbackDetailView(generics.RetrieveAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

class FeedbackDeleteView(generics.DestroyAPIView):

    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAdminUser]

class ReportCreateView(generics.CreateAPIView):
    serializer_class = ReportSerializer
    permission_class = [IsAuthenticated]

class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_class = [IsAuthenticated]


class TutorApplicationRetrieveCreateUpdateView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TutorApplicationSerializer
    permission_classes = [IsAuthenticated] 
    def get_object(self):
        obj, created = TutorApplication.objects.get_or_create(user=self.request.user)
        self.check_object_permissions(self.request, obj)
        return obj

    def post(self, request, *args, **kwargs):
        instance = self.get_object()

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if instance.pk: 
            self.perform_update(serializer)
            return Response(serializer.data)
        else:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class MyTutorApplicationStatusView(generics.RetrieveAPIView):
    serializer_class = TutorApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(TutorApplication, user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except TutorApplication.DoesNotExist:
            return Response(
                {"detail": "Tutor application not found for this user."},
                status=status.HTTP_404_NOT_FOUND
            )
