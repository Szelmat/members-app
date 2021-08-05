from datetime import datetime
from django.db import models

# Create your models here.
class Member(models.Model):
    name = models.CharField(max_length=50)
    birth = models.DateField(default=datetime.now)
    clubName = models.CharField(max_length=50)

    def __str__(self):
        return self.name

