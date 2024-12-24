from django.urls import path
from .consumers import ChatConsumer
from .middleware import TokenAuthMiddleware  # Make sure this is imported correctly

websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/', TokenAuthMiddleware(ChatConsumer.as_asgi())),  # Wrap the consumer with TokenAuthMiddleware
]
