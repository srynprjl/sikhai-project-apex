from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Feedback
from .serializers import FeedbackSerializer
from .models import Report, Review

from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import ReportSerializer, ReviewSerializer

class FeedbackListCreateView(generics.ListCreateAPIView):
    queryset = Feedback.objects.all().order_by('-id')
    serializer_class = FeedbackSerializer

class FeedbackDetailView(generics.RetrieveAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer


class ReportCreateView(generics.CreateAPIView):
    serializer_class = ReportSerializer
    permission_class = [IsAuthenticated]

class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_class = [IsAuthenticated]
