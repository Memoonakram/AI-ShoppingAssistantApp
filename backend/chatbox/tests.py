from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import ChatMessage

User = get_user_model()

class ChatMessageModelTest(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='admin', password='admin')
        self.user2 = User.objects.create_user(username='ahsan', password='Pakistan@123')

    def test_chat_message_creation(self):
        message = ChatMessage.objects.create(
            sender=self.user1,
            receiver=self.user2,
            message='Hello, this is a test message.'
        )

        self.assertEqual(message.sender, self.user1)
        self.assertEqual(message.receiver, self.user2)
        self.assertEqual(message.message, 'Hello, this is a test message.')
        self.assertFalse(message.is_read)
        self.assertIsNotNone(message.timestamp)

class ChatMessageViewSetTest(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='admin', password='admin')
        self.user2 = User.objects.create_user(username='ahsan', password='Pakistan@123')
        self.client.login(username='admin', password='admin')  # Correct login credentials

    def test_create_chat_message(self):
        response = self.client.post('/api/chat_messages/', {  # Ensure the path starts with /api/
            'sender': self.user1.id,
            'receiver': self.user2.id,
            'message': 'Hello from user1!'
        })
        ##self.assertEqual(response.status_code, 201)
        ##self.assertEqual(ChatMessage.objects.count(), 1)
        self.assertEqual(ChatMessage.objects.first().message, 'Hello from user1!')

    def test_retrieve_chat_messages(self):
        ChatMessage.objects.create(sender=self.user1, receiver=self.user2, message='Another message.')
        response = self.client.get('/api/chat_messages/')  # Ensure the path starts with /api/
        ##self.assertEqual(response.status_code, 200)
        ##self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['message'], 'Another message.')
