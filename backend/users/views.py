# views for react app
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile, Measurement, FavouriteNStockWatch, Notification, FAQ, Contact
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from .serializers import ProfileSerializer, MeasurementSerializer, FavouriteNStockWatchSerializer, ContactSerializer
from .serializers import NotificationSerializer, FAQSerializer, UserSerializer
from .serializers import RegisterSerializer, LoginSerializer, ResetPasswordEmailRequestSerializer,  SetNewPasswordSerializer, ChangePasswordSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.utils.encoding import smart_bytes, smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import timezone

# Create your views here.

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Admins can access all profiles
            return self.queryset
        # Regular users can only access their own profile
        return self.queryset.filter(user=user)
    
    # first_name = serializers.CharField(source='user.first_name', required=False)
    # last_name = serializers.CharField(source='user.last_name', required=False)
    # email = serializers.EmailField(source='user.email', required=False)
    # username = serializers.CharField(source='user.username', required=False)
    # save these fields to the user model while saving the profile model
    
    def perform_update(self, serializer):
        user = self.request.user
        if user.is_staff:
            user = User.objects.get(username=self.request.data.get('username'))
        user.first_name = self.request.data.get('first_name')
        user.last_name = self.request.data.get('last_name')
        user.email = self.request.data.get('email')
        user.username = self.request.data.get('username')
        user.save()
        serializer.save(user=user)
        # save the profile model with the user model
        

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        
        # Update last_login field
        user.last_login = timezone.now()
        user.save()
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
        
class RequestPasswordResetEmail(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data['email']
        user = User.objects.get(email=email)
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        absurl = f'{settings.FRONTEND_URL}/reset-password/{uidb64}/{token}'  # Update to point to frontend
        email_body = 'Hello, \n Use link below to reset your password  \n' + absurl
        data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Reset your password'}
        send_mail(data['email_subject'], data['email_body'], settings.EMAIL_HOST_USER, [data['to_email']])
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)

class PasswordTokenCheckAPI(generics.GenericAPIView):
    permission_classes = [AllowAny]
    
    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_401_UNAUTHORIZED)

            print(f"Checking token Check API: {PasswordResetTokenGenerator().check_token(user, token)}")
            return Response({'success': True, 'message': 'Credentials Valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_401_UNAUTHORIZED)

class SetNewPasswordAPIView(generics.UpdateAPIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes = [AllowAny]

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)
    
    
class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = [IsAuthenticated,]

    def get_object(self, queryset=None):
        return self.request.user

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.object.set_password(serializer.validated_data['new_password'])
            self.object.save()
            
            # Create a notification for the user
            Notification.objects.create(user=self.object, message="Your password has been updated", title="Password Updated")          
            
            
            return Response({'status': 'Password Updated'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().select_related('profile', 'measurement')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
            return User.objects.filter(username=self.request.user.username)
        
    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def all(self, request):
        users = User.objects.all().select_related('profile', 'measurement')
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)

    
    
class MeasurementViewSet(viewsets.ModelViewSet):
    queryset = Measurement.objects.all()
    serializer_class = MeasurementSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return self.queryset
        return self.queryset.filter(user=user)
    
class FavouriteNStockWatchViewSet(viewsets.ModelViewSet):
    queryset = FavouriteNStockWatch.objects.all()
    serializer_class = FavouriteNStockWatchSerializer
    permission_classes = [IsAuthenticated]
    
    # if admin return the queryset with property is_stockwatch=True else return the user's stockwatch
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return self.queryset.filter(is_stockwatch=True)
        return self.queryset.filter(user=user)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def reply(self, request, pk=None):
        """
        Admins can use this action to reply to a contact message.
        Sends an email via SMTP and updates the status to 'Replied'.
        """
        try:
            contact = self.get_object()
            reply_message = request.data.get("reply_message")
            
            if not reply_message:
                return Response({"error": "Reply message is required."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Send email using SMTP
            subject = request.data.get("subject")
            print(reply_message)            
            recipient_list = [contact.email]
            
            email = EmailMessage(
            subject=subject,
            body=reply_message,  # This will be treated as plain text
            from_email=settings.EMAIL_HOST_USER,
            to=recipient_list,
        )
            
            # Set the HTML version of the email
            email.content_subtype = 'html'  # This tells Django to treat the body as HTML

            # Send the email
            email.send(fail_silently=False)
            
            # Update contact record to show it has been replied
            contact.reply = reply_message
            contact.replied_at = timezone.now()
            contact.stockwatch_notify = True
            contact.save()

            return Response({"message": "Reply sent successfully and status updated."}, status=status.HTTP_200_OK)

        except Contact.DoesNotExist:
            return Response({"error": "Contact message not found."}, status=status.HTTP_404_NOT_FOUND)
                
        
    
class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by('-date')
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def mark_read(self, request):
        Notification.objects.filter(user=request.user, read=False).update(read=True)
        return Response({"message": "Notifications marked as read"}, status=status.HTTP_200_OK)   
    
class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def get_permissions(self):
        # Allow anyone to create a contact, only admins can view or reply
        if self.action in ['create']:
            return [AllowAny()]
        return [IsAdminUser()]

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def reply(self, request, pk=None):
        """
        Admins can use this action to reply to a contact message.
        Sends an email via SMTP and updates the status to 'Replied'.
        """
        try:
            contact = self.get_object()
            reply_message = request.data.get("reply_message")
            
            if not reply_message:
                return Response({"error": "Reply message is required."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Send email using SMTP
            subject = request.data.get("subject")
            print(reply_message)            
            recipient_list = [contact.email]
            
            email = EmailMessage(
            subject=subject,
            body=reply_message,  # This will be treated as plain text
            from_email=settings.EMAIL_HOST_USER,
            to=recipient_list,
        )
            
            # Set the HTML version of the email
            email.content_subtype = 'html'  # This tells Django to treat the body as HTML

            # Send the email
            email.send(fail_silently=False)
            
            # Update contact record to show it has been replied
            contact.reply = reply_message
            contact.replied_at = timezone.now()
            contact.status = "Replied"  # Ensure there is a 'status' field in your model
            contact.save()

            return Response({"message": "Reply sent successfully and status updated."}, status=status.HTTP_200_OK)

        except Contact.DoesNotExist:
            return Response({"error": "Contact message not found."}, status=status.HTTP_404_NOT_FOUND)

