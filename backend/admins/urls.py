# applications/urls.py
from django.urls import path
from .views import TutorApplicationListView , AdminNoteDelete

urlpatterns = [

    # New endpoint for admin to list all applications
    path('all-applications/', TutorApplicationListView.as_view(), name='all-application-list'),
    path('admin/notes/<int:pk>/', AdminNoteDelete.as_view(), name="admin-note-delete")
]
