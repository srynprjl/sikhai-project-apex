from rest_framework import serializers
from Authentication.models import CustomUser
from .models import Feedback
from .models import Report, Review, TutorApplication

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class UserDetailSerializer(serializers.ModelSerializer):
    """
    Serializer to include basic user details within the application.
    """
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email'] # Assuming these fields exist

class TutorApplicationSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), 
        source='user', 
        write_only=True, 
        required=False
    )

    class Meta:
        model = TutorApplication
        fields = [
            'id', 'user', 'user_id', 'phone_number', 'about_you',
            'qualifications', 'why_this_role', 'submitted_at', 'is_approved'
        ]
        read_only_fields = ['id', 'submitted_at', 'is_approved'] 

    def create(self, validated_data):
        user = self.context['request'].user
        if TutorApplication.objects.filter(user=user).exists():
            raise serializers.ValidationError("You have already submitted a tutor application.")
        return TutorApplication.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('user', None)
        validated_data.pop('user_id', None)
        return super().update(instance, validated_data)
