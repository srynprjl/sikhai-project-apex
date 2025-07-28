# classroom/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import PermissionDenied
from .models import Classroom, Enrollment, Session, ClassroomFiles, Assignment, AssignmentSubmission
from .serializers import (
    ClassroomSerializer, EnrollmentSerializer, SessionSerializer,
    ClassroomFileSerializer, AssignmentSerializer, AssignmentSubmissionSerializer
)
from Authentication.models import CustomUser
from Authentication.permissions import IsTutor
from django.shortcuts import get_object_or_404

class IsTutorOfClassroom(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_authenticated and request.user.is_tutor and (obj.assignment.classroom.tutor == request.user)


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
        if self.request.user.is_authenticated and self.request.user.is_tutor and self.action in ['update', 'partial_update', 'destroy']:
            return Classroom.objects.filter(tutor=self.request.user)
        return Classroom.objects.all()
    
    
    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated, IsTutor])
    def enrolled_students(self, request, pk=None):
        classroom = self.get_object()
        if request.user != classroom.tutor:
            return Response({"detail": "Not allowed"}, status=403)

        enrollments = Enrollment.objects.filter(classroom=classroom, paid=True).select_related('user')
        students = [ {
            'id': enrollment.user.id,
            'username': enrollment.user.username,
            'email': enrollment.user.email
        } for enrollment in enrollments]
        return Response(students)


class EnrollmentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
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

        if not paid:
            return Response({"detail": "Payment required to enroll"}, status=status.HTTP_400_BAD_REQUEST)

        enrollment = Enrollment.objects.create(user=request.user, classroom=classroom, paid=True)
        serializer = self.get_serializer(enrollment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


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


class ClassroomFileViewSet(viewsets.ModelViewSet):
    serializer_class = ClassroomFileSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsTutor]
        else:
            self.permission_classes = [IsTutor]
        return [permission() for permission in self.permission_classes]

    def get_queryset(self):
        classroom_id = self.kwargs.get('classroom_pk')
        classroom = get_object_or_404(Classroom, id=classroom_id)
        return ClassroomFiles.objects.filter(classroom=classroom)

    def perform_create(self, serializer):
        classroom_id = self.kwargs.get('classroom_pk')
        classroom = get_object_or_404(Classroom, id=classroom_id)
        if self.request.user != classroom.tutor:
            raise PermissionDenied("Only the tutor of this classroom can upload files.")
        serializer.save(classroom=classroom)

    def perform_update(self, serializer):
        classroom_id = self.kwargs.get('classroom_pk')
        classroom = get_object_or_404(Classroom, id=classroom_id)
        if self.request.user != classroom.tutor:
            raise PermissionDenied("Only the tutor of this classroom can update files.")
        serializer.save()

    def perform_destroy(self, instance):
        classroom_id = self.kwargs.get('classroom_pk')
        classroom = get_object_or_404(Classroom, id=classroom_id)
        if self.request.user != classroom.tutor:
            raise PermissionDenied("Only the tutor of this classroom can delete files.")
        instance.delete()


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        classroom_id = self.kwargs.get('classroom_pk')
        classroom = get_object_or_404(Classroom, id=classroom_id)

        if self.request.user == classroom.tutor:
            return classroom.assignments.all()
        else:
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

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def submissions(self, request, classroom_pk=None, pk=None):
        assignment = self.get_object()  # gets assignment by pk automatically

        # The assignment's classroom_id should match classroom_pk for consistency; optionally verify:
        if str(assignment.classroom.id) != classroom_pk:
            raise PermissionDenied("Assignment does not belong to given classroom")

        user = request.user
        classroom = assignment.classroom
        is_tutor = user == classroom.tutor
        is_enrolled = Enrollment.objects.filter(user=user, classroom=classroom, paid=True).exists()

        if not (is_tutor or is_enrolled):
            return Response({"detail": "Not allowed"}, status=403)

        submissions = assignment.submissions.all().select_related('user')
        data = [{
            "id": sub.id,
            "user_id": sub.user.id,
            "username": sub.user.username,
            "submitted_file": sub.submitted_file.url if sub.submitted_file else None,
            "submitted_at": sub.submitted_at,
            "grade": sub.grade,
            "feedback": sub.feedback,
        } for sub in submissions]

        return Response(data)

        assignment = self.get_object()

        user = request.user
        classroom = assignment.classroom
        is_tutor = user == classroom.tutor
        is_enrolled = Enrollment.objects.filter(user=user, classroom=classroom, paid=True).exists()

        if not (is_tutor or is_enrolled):
            return Response({"detail": "Not allowed"}, status=403)

        submissions = assignment.submissions.all().select_related('user')
        data = [{
            "id": sub.id,
            "user_id": sub.user.id,
            "username": sub.user.username,
            "submitted_file": sub.submitted_file.url if sub.submitted_file else None,
            "submitted_at": sub.submitted_at,
        } for sub in submissions]

        return Response(data)


# Assignment Submission: Students submit files for an assignment

class AssignmentSubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user
        if user.is_tutor:
            return AssignmentSubmission.objects.filter(
                assignment__classroom__tutor=user
            ).select_related('user', 'assignment')
        else:
            # Students see only their own submissions
            return AssignmentSubmission.objects.filter(user=user)

    def perform_create(self, serializer):
        assignment_id = self.request.data.get('assignment')
        assignment = get_object_or_404(Assignment, id=assignment_id)

        # User must be enrolled in the classroom of the assignment
        is_enrolled = Enrollment.objects.filter(user=self.request.user, classroom=assignment.classroom, paid=True).exists()
        if not is_enrolled:
            raise PermissionDenied("You must be enrolled to submit assignments")

        from django.utils import timezone
        if assignment.due_date < timezone.now():
            raise PermissionDenied("Assignment due date has passed")

        if AssignmentSubmission.objects.filter(assignment=assignment, user=self.request.user).exists():
            raise PermissionDenied("You have already submitted this assignment")

        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            # Only tutor of the classroom can update grade/feedback or delete
            permission_classes = [IsTutorOfClassroom]
        elif self.action in ['create', 'list', 'retrieve']:
            # Authenticated users - students or tutors
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

class CheckEnrollmentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, classroom_id):
        classroom = get_object_or_404(Classroom, id=classroom_id)
        # Check if the user is enrolled and has paid
        is_enrolled = Enrollment.objects.filter(
            user=request.user, 
            classroom=classroom, 
            paid=True
        ).exists()
        return Response({"enrolled": is_enrolled})
