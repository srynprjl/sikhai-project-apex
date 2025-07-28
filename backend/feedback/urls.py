from django.urls import path
from .views import FeedbackListCreateView, FeedbackDetailView
from .views import ReportCreateView, ReviewCreateView, TutorApplicationRetrieveCreateUpdateView

urlpatterns = [
    path('feedback/', FeedbackListCreateView.as_view(), name='feedback-list-create'),
    path('feedback/<int:pk>/', FeedbackDetailView.as_view(), name='feedback-list-create'),
    path('report/', ReportCreateView.as_view(), name='create-report'),
    path('review/', ReviewCreateView.as_view(), name='create-review'),
    path('tutor-application/', TutorApplicationRetrieveCreateUpdateView.as_view(), name='tutor-application'),
]
