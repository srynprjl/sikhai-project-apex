from django.db import models
from Authentication.models import CustomUser

class Todo(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=1000)
    completed = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title[:30]

class Task(models.Model):  
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)   
    todo = models.ForeignKey(Todo, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=1000)
    completed = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title[:30]

    