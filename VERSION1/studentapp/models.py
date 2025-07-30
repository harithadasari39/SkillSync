from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone
import random


# Create your models here.

class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)
    is_verified = models.BooleanField(default=False)
    qualification = models.CharField(max_length=100)
    graduation_year = models.IntegerField()
    preferred_mode = models.CharField(max_length=50)  # Online/Offline/Hybrid
    skill = models.CharField(max_length=100)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.full_name
    
class OTP(models.Model):
    phone_or_email = models.CharField(max_length=100)  # For mobile/email
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.phone_or_email} - {self.otp_code}"