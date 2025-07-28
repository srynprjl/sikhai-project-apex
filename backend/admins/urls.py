# applications/urls.py
from django.urls import path
from .views import TutorApplicationListView , AdminNoteDelete, TutorApplicationApproveView, AdminTutorApplicationDeleteView, TutorApplicationDetailView

urlpatterns = [
    path('all-applications/', TutorApplicationListView.as_view(), name='all-application-list'),
    path('admin/notes/<int:pk>/', AdminNoteDelete.as_view(), name="admin-note-delete"),
    path('admin/tutor-applications/<int:pk>/', TutorApplicationDetailView.as_view(), name='admin-tutor-application-detail'),
    path('admin/tutor-applications/<int:pk>/approve/', TutorApplicationApproveView.as_view(), name='admin-tutor-application-approve'),
    path('admin/tutor-applications/<int:pk>/delete/', AdminTutorApplicationDeleteView.as_view(), name='admin-tutor-application-delete'),

]
