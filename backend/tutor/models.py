from django.db import models
from Authentication.models import CustomUser

class Classroom(models.Model):
    tutor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='classrooms')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    classrooms = models.ManyToManyField(Classroom, related_name='students')

class Session(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='sessions')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class FileUpload(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='files')
    upload = models.FileField(upload_to='classroom_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Assignment(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

class AssignmentSubmission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    submitted_file = models.FileField(upload_to='assignment_submissions/')
    submitted_at = models.DateTimeField(auto_now_add=True)
    graded = models.BooleanField(default=False)
    grade = models.FloatField(null=True, blank=True)

class Booking(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='bookings')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    booking_date = models.DateTimeField()
    khalti_payment_id = models.CharField(max_length=255, blank=True)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
