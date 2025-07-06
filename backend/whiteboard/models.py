from django.db import models
from Authentication.models import CustomUser

class SikhaiWhiteboard(models.Model):
    name = models.CharField(max_length=255, blank=True, default="Untitled Sikahi Board")
    elements = models.JSONField(default=list)
    app_state = models.JSONField(default=dict)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='excalidraw_boards')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.user

    class Meta:
        verbose_name = "Sikhai Board"
        verbose_name_plural = "Sikhai Boards"
        ordering = ['-updated_at']