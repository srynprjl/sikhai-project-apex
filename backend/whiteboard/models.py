from django.db import models
from Authentication.models import CustomUser

class Whiteboard(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='whiteboard')
    data = models.JSONField(default=dict) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Whiteboard for {self.user.username}"
