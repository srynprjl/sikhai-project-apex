from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClassroomViewSet, SessionViewSet, FileUploadViewSet, AssignmentViewSet, AssignmentSubmissionViewSet, BookingViewSet

router = DefaultRouter()
router.register(r'classrooms', ClassroomViewSet, basename='classroom')
router.register(r'sessions', SessionViewSet, basename='session')
router.register(r'files', FileUploadViewSet, basename='fileupload')
router.register(r'assignments', AssignmentViewSet, basename='assignment')
router.register(r'submissions', AssignmentSubmissionViewSet, basename='assignmentsubmission')
router.register(r'bookings', BookingViewSet, basename='booking')

urlpatterns = [
    path('api/', include(router.urls)),
]
