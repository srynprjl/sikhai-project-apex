# classroom/serializers.py
from rest_framework import serializers
from .models import Classroom, Enrollment, Session, SessionFile, Assignment, AssignmentSubmission
from Authentication.models import CustomUser

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']

class ClassroomSerializer(serializers.ModelSerializer):
    tutor = TutorSerializer(read_only=True)

    class Meta:
        model = Classroom
        fields = ['id', 'name', 'description', 'price', 'tutor']

class EnrollmentSerializer(serializers.ModelSerializer):
    classroom = ClassroomSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'classroom', 'paid', 'enrolled_at']

class SessionFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionFile
        fields = ['id', 'file', 'uploaded_at']

class SessionSerializer(serializers.ModelSerializer):
    files = SessionFileSerializer(many=True, read_only=True)

    class Meta:
        model = Session
        fields = ['id', 'title', 'description', 'scheduled_at', 'files']

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'title', 'description', 'due_date']

class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentSubmission
        fields = ['id', 'assignment', 'submitted_file', 'submitted_at']
