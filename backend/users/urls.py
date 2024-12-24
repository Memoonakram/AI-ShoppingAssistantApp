from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet,ProfileViewSet, MeasurementViewSet, FavouriteNStockWatchViewSet, NotificationViewSet, FAQViewSet, ContactViewSet
from .views import RegisterView, LoginView, RequestPasswordResetEmail, PasswordTokenCheckAPI, SetNewPasswordAPIView, ChangePasswordView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register('user', UserViewSet)
router.register('profile', ProfileViewSet)
router.register('measurement', MeasurementViewSet)
router.register('favourite', FavouriteNStockWatchViewSet)
router.register('notification', NotificationViewSet)
router.register('faqs', FAQViewSet)
router.register('contact', ContactViewSet)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(), name='request-reset-email'),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('', include(router.urls)),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]