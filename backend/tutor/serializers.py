# classroom/serializers.py
from rest_framework import serializers
from .models import Classroom, Enrollment, Session, ClassroomFiles, Assignment, AssignmentSubmission
from Authentication.models import CustomUser

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']
        
class ClassroomFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassroomFiles
        fields = ['id', 'file', 'uploaded_at']

class ClassroomSerializer(serializers.ModelSerializer):
    tutor = TutorSerializer(read_only=True)
    files = ClassroomFileSerializer(many=True, read_only=True)

    class Meta:
        model = Classroom
        fields = ['id', 'name', 'description','files' ,'price', 'tutor']

class EnrollmentSerializer(serializers.ModelSerializer):
    classroom = ClassroomSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'classroom', 'paid', 'enrolled_at']



class SessionSerializer(serializers.ModelSerializer):


    class Meta:
        model = Session
        fields = ['id', 'title', 'description', 'scheduled_at', 'google_meet_link']

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'title', 'description', 'due_date', 'assignment_file']

class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentSubmission
        fields = ['id', 'assignment', 'grade', 'feedback', 'submitted_file', 'submitted_at']
