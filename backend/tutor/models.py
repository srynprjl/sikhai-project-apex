from django.db import models

# Create your models here.

class tutor(models.Model):

   name = models.CharField(max_length=100, blank=True, default="")
   type = models.CharField(max_length=100, choices=Private_Or_General)
   price = models.IntegerField(default=000)
   desc= 