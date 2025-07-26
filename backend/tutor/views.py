from rest_framework import viewsets, permissions
from .models import Classroom, Student, Session, FileUpload, Assignment, AssignmentSubmission, Booking
from .serializers import ClassroomSerializer, StudentSerializer, SessionSerializer, FileUploadSerializer, AssignmentSerializer, AssignmentSubmissionSerializer, BookingSerializer

class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Classroom.objects.filter(tutor=user)

class SessionViewSet(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Session.objects.all()
        classroom_id = self.request.query_params.get('classroom')
        if classroom_id:
            queryset = queryset.filter(classroom_id=classroom_id)
        return queryset

class FileUploadViewSet(viewsets.ModelViewSet):
    serializer_class = FileUploadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = FileUpload.objects.all()
        classroom_id = self.request.query_params.get('classroom')
        if classroom_id:
            queryset = queryset.filter(classroom_id=classroom_id)
        return queryset

class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Assignment.objects.all()
        classroom_id = self.request.query_params.get('classroom')
        if classroom_id:
            queryset = queryset.filter(classroom_id=classroom_id)
        return queryset

class AssignmentSubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        student = Student.objects.filter(user=user).first()
        if student:
            return AssignmentSubmission.objects.filter(student=student)
        else:
            return AssignmentSubmission.objects.filter(assignment__classroom__tutor=user)

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        student = Student.objects.filter(user=user).first()
        if student:
            return Booking.objects.filter(student=student)
        else:=
            return Booking.objects.filter(classroom__tutor=user)

    def perform_create(self, serializer):
        serializer.save()
