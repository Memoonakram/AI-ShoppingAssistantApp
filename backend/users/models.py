from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=10, blank=True)
    country = models.CharField(max_length=50, blank=True)
    plan_type = models.CharField(max_length=50, default='Free')
    dob = models.DateField(blank=True, null=True)
    last_modified = models.DateTimeField(auto_now=True)
    profile_pic = models.CharField(max_length=100, default='B')
    
    @property
    def age(self):
        if self.dob:
            return int((datetime.date.today() - self.dob).days / 365.25)
        return 0
    
    @property
    def first_name(self):
        return self.user.first_name
    
    @property
    def last_name(self):
        return self.user.last_name
    
    @property
    def email(self):
        return self.user.email
    
    @property
    def username(self):
        return self.user.username
    
    def __str__(self):
        return self.user.username
    
class Measurement(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Upper Body
    chest = models.FloatField(default=0)
    shoulder = models.FloatField(default=0)
    sleeve = models.FloatField(default=0)
    wrist = models.FloatField(default=0)
    # Lower Body
    waist = models.FloatField(default=0)
    hip = models.FloatField(default=0)
    inseam = models.FloatField(default=0)
    thigh = models.FloatField(default=0)
    knee = models.FloatField(default=0)
    outseam = models.FloatField(default=0)
    # Foot
    foot = models.FloatField(default=0)
    # Date
    last_modified = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.user.username
    
class FavouriteNStockWatch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.CharField(max_length=1000)
    added = models.DateTimeField(auto_now_add=True)
    
    is_favourite = models.BooleanField(default=False)
    is_stockwatch = models.BooleanField(default=False)
    stockwatch_notify = models.BooleanField(default=False)
    reply = models.TextField(blank=True, null=True)
    replied_at = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return self.user.username
    
    @property
    def email(self):
        return self.user.email
    
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    message = models.CharField(max_length=100)
    read = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.user.username
    
class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.user.username
    
class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    priority = models.IntegerField(default=1)

    def __str__(self):
        return self.question
    
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    reply = models.TextField(blank=True, null=True)
    replied_at = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=100, default='Unanswered')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Contact from {self.email}'
