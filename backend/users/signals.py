# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile, Measurement

@receiver(post_save, sender=User)
def create_users_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        Measurement.objects.create(user=instance)
        
@receiver(post_save, sender=User)
def save_users_profile(sender, instance, **kwargs):
    # Only save if changes have occurred
    if instance.profile:
        instance.profile.save()
    if instance.measurement:
        instance.measurement.save()
