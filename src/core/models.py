from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()

class Post(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
   

    def __str__(self):
        return self.title
