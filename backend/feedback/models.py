from django.db import models
from Authentication.models import CustomUser
from django.contrib.auth import get_user_model
from notes.models import Note  


class Feedback(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.message[:30]}"

User = get_user_model()

class Report(models.Model):
    REPORT_TARGETS = [
        ('user', 'User'),
        ('note', 'Note'),
    ]
    reporter = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='reports_made')
    target_type = models.CharField(max_length=10, choices=REPORT_TARGETS)
    reported_user = models.ForeignKey(CustomUser, null=True, blank=True, on_delete=models.CASCADE, related_name='user_reports')
    reported_note = models.ForeignKey(Note, null=True, blank=True, on_delete=models.CASCADE, related_name='note_reports')
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report by {self.reporter.username} on {self.target_type}"
    

class Review(models.Model):
    REVIEW_TARGETS = [
        ('note', 'Note'),
    ]

    reviewer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    target_type = models.CharField(max_length=10, choices=REVIEW_TARGETS)
    note = models.ForeignKey(Note, null=True, blank=True, on_delete=models.CASCADE)
    rating = models.IntegerField() 
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.reviewer.username} ({self.target_type})"
