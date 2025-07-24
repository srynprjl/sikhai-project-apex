from django.db import models
from Authentication.models import CustomUser

class Note(models.Model):
    
    title = models.CharField(max_length = 100)
    content = models.JSONField()
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    author = models.ForeignKey(CustomUser, on_delete = models.CASCADE, related_name="notes")
    isPublic = models.BooleanField(default=False)
    price = models.FloatField(default=0.00)
    

    def _str_(self):
       return self.title
