# classroom/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from .models import Classroom, Enrollment, Session, SessionFile, Assignment, AssignmentSubmission
from .serializers import (
    ClassroomSerializer, EnrollmentSerializer, SessionSerializer,
    SessionFileSerializer, AssignmentSerializer, AssignmentSubmissionSerializer
)
from Authentications.models import CustomUser

from django.shortcuts import get_object_or_404


# Permission to check tutor
class IsTutor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_tutor


# Classroom Viewset: Tutor can create, update, delete classrooms; Users can list and retrieve
class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAuthenticated, IsTutor]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(tutor=self.request.user)

    def get_queryset(self):
        # Tutors see their classrooms for modification; Others see all classrooms
        if self.request.user.is_authenticated and self.request.user.is_tutor and self.action in ['update', 'partial_update', 'destroy']:
            return Classroom.objects.filter(tutor=self.request.user)
        return Classroom.objects.all()


# Enrollment Viewset: Users enroll (pay then enroll)
class EnrollmentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        # Users can only see their enrollments
        return Enrollment.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        classroom_id = request.data.get('classroom')
        paid = request.data.get('paid', False)

        if not classroom_id:
            return Response({"error": "Classroom ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        classroom = get_object_or_404(Classroom, id=classroom_id)

        # Check if already enrolled
        if Enrollment.objects.filter(user=request.user, classroom=classroom).exists():
            return Response({"detail": "Already enrolled"}, status=status.HTTP_400_BAD_REQUEST)

        # Here you would verify payment with Khalti (implement webhook or API call)
        # For now, trust the 'paid' boolean sent (To be replaced with real payment verification)
        if not paid:
            return Response({"detail": "Payment required to enroll"}, status=status.HTTP_400_BAD_REQUEST)

        enrollment = Enrollment.objects.create(user=request.user, classroom=classroom, paid=True)
        serializer = self.get_serializer(enrollment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# Session Viewset: Tutor can create/update/delete sessions inside their classrooms
class SessionViewSet(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        classroom_id = self.kwargs.get('classroom_pk')
        classroom = get_object_or_404(Classroom, id=classroom_id)
        # Check permission
        if self.request.user == classroom.tutor:
            return classroom.sessions.all()
        else:
            # Allow enrolled users to view sessions
            is_enrolled = Enrollment.objects.filter(user=self.request.user, classroom=classroom, paid=True).exists()
            if is_enrolled:
                return classroom.sessions.all()
            else:
                return Session.objects.none()

    def perform_create(self, serializer):
        classroom_id = self.kwargs.get('classroom_pk')
        classroom = get_object_or_404(Classroom, id=classroom_id)
        if self.request.user != classroom.tutor:
            raise PermissionDenied("Only tutor can create sessions")
        serializer.save(classroom=classroom)


# SessionFile View: Upload files to a session (Tutor only)
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import PermissionDenied

class SessionFileViewSet(viewsets.ModelViewSet):
    serializer_class = SessionFileSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        session_id = self.kwargs.get('session_pk')
        session = get_object_or_404(Session, id=session_id)
        # Only tutor of the classroom can upload
        if self.request.user != session.classroom.tutor:
            raise PermissionDenied("Only tutor can view or upload files")
        return session.files.all()

    def perform_create(self, serializer):
        session_id = self.kwargs.get('session_pk')
        session = get_object_or_404(Session, id=session_id)
        if self.request.user != session.classroom.tutor:
            raise PermissionDenied("Only tutor can upload files")
        serializer.save(session=session)


# Assignment ViewSet: Tutors create assignments for classrooms they own; users can view assignments in enrolled classrooms

class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        classroom_id = self.kwargs.get('classroom_pk')
        classroom = get_object_or_404(Classroom, id=classroom_id)

        if self.request.user == classroom.tutor:
            return classroom.assignments.all()
        else:
            # Only enrolled users can view assignments
            is_enrolled = Enrollment.objects.filter(user=self.request.user, classroom=classroom, paid=True).exists()
            if is_enrolled:
                return classroom.assignments.all()
            else:
                return Assignment.objects.none()

    def perform_create(self, serializer):
        classroom_id = self.kwargs.get('classroom_pk')
        classroom = get_object_or_404(Classroom, id=classroom_id)

        if self.request.user != classroom.tutor:
            raise PermissionDenied("Only tutor can create assignments")

        serializer.save(classroom=classroom)


# Assignment Submission: Students submit files for an assignment

class AssignmentSubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        # Users see their submission
        return AssignmentSubmission.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        assignment_id = self.request.data.get('assignment')
        assignment = get_object_or_404(Assignment, id=assignment_id)

        # User must be enrolled in the classroom of the assignment
        is_enrolled = Enrollment.objects.filter(user=self.request.user, classroom=assignment.classroom, paid=True).exists()
        if not is_enrolled:
            raise PermissionDenied("You must be enrolled to submit assignments")

        # Check if due date passed
        from django.utils import timezone
        if assignment.due_date < timezone.now():
            raise PermissionDenied("Assignment due date has passed")

        # Check if already submitted
        if AssignmentSubmission.objects.filter(assignment=assignment, user=self.request.user).exists():
            raise PermissionDenied("You have already submitted this assignment")

        serializer.save(user=self.request.user)
