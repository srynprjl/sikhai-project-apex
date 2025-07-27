from django.db import models
from Authentication.models import CustomUser

class SikhaiWhiteboard(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)  # ✅ This must exist
    elements = models.JSONField()
    app_state = models.JSONField()
    files = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
