from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import ChatMessage
from .serializers import ChatMessageSerializer
from rest_framework.permissions import AllowAny

class ChatMessagesViewSet(viewsets.ViewSet):
    queryset = ChatMessage.objects.all()  # Keep the queryset here
    permission_classes = [AllowAny]

    def list(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            # Filter messages by sender and order them
            messages = self.queryset.filter(sender=user).order_by('-timestamp')[:50]
            serializer = ChatMessageSerializer(messages, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        message_data = request.data.get('message')
        sender_id = request.data.get('sender_id')
        receiver_id = request.data.get('receiver_id')

        if not all([message_data, sender_id, receiver_id]):
            return Response({'error': 'Incomplete data'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            sender = User.objects.get(id=sender_id)
            receiver = User.objects.get(id=receiver_id)
            chat_message = self.queryset.create(  # Use queryset to create the message
                sender=sender,
                receiver=receiver,
                message=message_data
            )
            return Response({'status': 'Message sent', 'message_id': chat_message.id}, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({'error': 'Sender or Receiver not found'}, status=status.HTTP_404_NOT_FOUND)
