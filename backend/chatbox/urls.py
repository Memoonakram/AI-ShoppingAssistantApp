from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatMessagesViewSet  # Import your ViewSet
from .consumers import ChatConsumer
from django.urls import re_path

# Create a router and register your viewset with it
router = DefaultRouter()
router.register(r'chat_messages', ChatMessagesViewSet)  # Register the ChatMessagesViewSet

# Define your URL patterns with a dynamic user_id
# urlpatterns = [
#     path('user-chat/<user_id>', include(router.urls)),  # Include user_id in the URL
# ]
urlpatterns = [
   re_path(r'^ws/chat/(?P<room_name>[^/]+)/$', ChatConsumer.as_asgi()),
]
