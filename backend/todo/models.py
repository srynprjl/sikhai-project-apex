from django.db import models
from Authentication.models import CustomUser

class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='todos')

    def _str_(self):
        return self.title

class Task(models.Model):
    todo = models.ForeignKey(Todo, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    date=models.DateField(blank=True, null=True);
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.title