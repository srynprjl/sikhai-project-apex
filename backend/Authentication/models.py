from django.db import models
from django.contrib.auth.models import AbstractUser

class Roles(models.Model):
    id = models.IntegerField(unique=True),
    name = models.CharField(max_length=200)


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    password = models.CharField(max_length=150)

    def __str__(self):

        return self.username


