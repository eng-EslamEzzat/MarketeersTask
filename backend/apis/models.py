#for user
from django.contrib.auth.models import AbstractUser
from django.db import models

#for token
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    pass

class Number(models.Model):
    num = models.FloatField()

    def __str__(self):
        return self.num

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def TokenCreate(sender, instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)