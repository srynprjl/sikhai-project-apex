from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    is_tutor = models.BooleanField(default=False)
    earnings = models.FloatField(default=0.00)

    def __str__(self):

        return self.username
