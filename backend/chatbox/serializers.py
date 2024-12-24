from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'sender', 'receiver', 'message', 'is_read', 'timestamp']  # Include the fields you want to serialize

    def create(self, validated_data):
        """
        Create and return a new ChatMessage instance, given the validated data.
        """
        return ChatMessage.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing ChatMessage instance, given the validated data.
        """
        instance.message = validated_data.get('message', instance.message)
        instance.is_read = validated_data.get('is_read', instance.is_read)
        instance.save()
        return instance
