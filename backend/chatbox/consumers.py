import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import ChatMessage
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async

User = get_user_model()
logger = logging.getLogger(__name__)

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.user = self.scope['user']
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        logger.debug(f"User connected: {self.user}")

        # Accept the WebSocket connection before any communication
        await self.accept()

        # Check if the user is authenticated
        if self.user.is_anonymous:
            logger.error("Anonymous user tried to connect")
            # Send error message after accepting the connection
            await self.send_error_message("You must be logged in to connect.")
            await self.close()
            return

        # Ensure channel_layer is not None
        if self.channel_layer is None:
            logger.error("Channel layer is not configured.")
            await self.send_error_message("Internal server error.")
            await self.close()
            return

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        logger.debug(f"Received data: {text_data}")
        try:
            data = json.loads(text_data)
            message = data['message']
            username = data['receiver_name']
            receiver = await self.get_user(username)

            if receiver is None:
                await self.send_error_message("Receiver not found")
                return

            sender = self.user

            chat_message = await self.save_message(sender, receiver, message)

            # Send the message to the room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'sender': sender.username,
                }
            )

        except json.JSONDecodeError as e:
            logger.error(f"JSON Decode Error: {e}")
            await self.send_error_message("Invalid JSON data")

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']

        sender_username = self.user.username
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender_name': sender_username,
        }))

    @database_sync_to_async
    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None

    @database_sync_to_async
    def save_message(self, sender, receiver, message):
        return ChatMessage.objects.create(sender=sender, receiver=receiver, message=message)

    @database_sync_to_async
    def get_last_messages(self, limit=50):
        return ChatMessage.objects.order_by('-timestamp')[:limit]

    async def send_error_message(self, error_message):
        await self.send(text_data=json.dumps({'error': error_message}))
