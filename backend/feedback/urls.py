from django.urls import path
from .views import FeedbackListCreateView
from .views import ReportCreateView, ReviewCreateView

urlpatterns = [
    path('feedback/', FeedbackListCreateView.as_view(), name='feedback-list-create'),
    path('report/', ReportCreateView.as_view(), name='create-report'),
    path('review/', ReviewCreateView.as_view(), name='create-review'),
]
