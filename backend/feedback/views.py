from django.shortcuts import render
from rest_framework import generics
from .models import Feedback
from .serializers import FeedbackSerializer
from .models import Report, Review
from .serializers import ReportSerializer, ReviewSerializer

class FeedbackListCreateView(generics.ListCreateAPIView):
    queryset = Feedback.objects.all().order_by('-submitted_at')
    serializer_class = FeedbackSerializer

class ReportCreateView(generics.CreateAPIView):
    serializer_class = ReportSerializer

class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewSerializer

