# classroom/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ClassroomViewSet, EnrollmentViewSet, SessionViewSet,
    SessionFileViewSet, AssignmentViewSet, AssignmentSubmissionViewSet
)

router = DefaultRouter()
router.register('classrooms', ClassroomViewSet, basename='classroom')
router.register('enrollments', EnrollmentViewSet, basename='enrollment')
router.register('assignment-submissions', AssignmentSubmissionViewSet, basename='assignment-submission')

# Nested Routers for sessions, session files, and assignments under classrooms
from rest_framework_nested import routers

classroom_router = routers.SimpleRouter()
classroom_router.register('classrooms', ClassroomViewSet, basename='classroom')

sessions_router = routers.NestedSimpleRouter(classroom_router, r'classrooms', lookup='classroom')
sessions_router.register(r'sessions', SessionViewSet, basename='classroom-sessions')

session_files_router = routers.NestedSimpleRouter(sessions_router, r'sessions', lookup='session')
session_files_router.register(r'files', SessionFileViewSet, basename='session-files')

assignments_router = routers.NestedSimpleRouter(classroom_router, r'classrooms', lookup='classroom')
assignments_router.register(r'assignments', AssignmentViewSet, basename='classroom-assignments')

urlpatterns = [
    path('', include(classroom_router.urls)),
    path('', include(sessions_router.urls)),
    path('', include(session_files_router.urls)),
    path('', include(assignments_router.urls)),
    path('', include(router.urls)),
]
