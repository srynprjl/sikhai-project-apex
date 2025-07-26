# classroom/models.py
from django.db import models
from Authentications.models import CustomUser

class Classroom(models.Model):
    tutor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='classrooms')
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price in NRs
    
    def __str__(self):
        return self.name

class Enrollment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='enrollments')
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='enrollments')
    paid = models.BooleanField(default=False)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'classroom')  # Prevent double enrollments

class Session(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='sessions')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    scheduled_at = models.DateTimeField()

    def __str__(self):
        return f"{self.classroom.name} session: {self.title}"

def upload_to_session_files(instance, filename):
    return f'session_files/classroom_{instance.session.classroom.id}/session_{instance.session.id}/{filename}'

class SessionFile(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to=upload_to_session_files)
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Assignment(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField()

class AssignmentSubmission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='submissions')
    submitted_file = models.FileField(upload_to='assignment_submissions/')
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('assignment', 'user')  # Single submission per assignment per user
