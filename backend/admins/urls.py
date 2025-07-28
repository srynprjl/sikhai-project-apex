# applications/urls.py
from django.urls import path
from .views import TutorApplicationListView 

urlpatterns = [

    # New endpoint for admin to list all applications
    path('all-applications/', TutorApplicationListView.as_view(), name='all-application-list'),
]
