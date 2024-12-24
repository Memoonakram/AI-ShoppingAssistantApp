from django.contrib import admin
from .models import Profile, Measurement, FavouriteNStockWatch, Notification, FAQ

# Register your models here.
admin.site.register(Profile)
admin.site.register(Measurement)
admin.site.register(FavouriteNStockWatch)
admin.site.register(Notification)
admin.site.register(FAQ)
