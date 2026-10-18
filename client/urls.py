from django.urls import path
from client.webhooks import PaymobWebhook
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    UserRegistrationView,
    PasswordResetRequestView,
    SetNewPasswordView,
    CreatePayment,
    DaleelTokenObtainPairView,
    MeView,
)





urlpatterns = [

    # ── Frontend-facing auth routes (/api/auth/*)  ─────────────────────────
    path('api/auth/login/',    DaleelTokenObtainPairView.as_view(), name='auth_login'),
    path('api/auth/register/', UserRegistrationView.as_view(),      name='auth_register'),
    path('api/auth/me/',       MeView.as_view(),                    name='auth_me'),

    # ── Legacy / simplejwt ─────────────────────────────────────────────────
    path('api/register/',
         UserRegistrationView.as_view(),
           name='register'
    ),

    path('api/token/',
          TokenObtainPairView.as_view(),
          name='token_obtain_pair'
    ),

    path('api/token/refresh/',
          TokenRefreshView.as_view(),
            name='token_refresh'
    ),

    path(
        "password-reset/",
        PasswordResetRequestView.as_view(),
        name="password-reset",
    ),

    path(
        "password-reset-confirm/<uidb64>/<token>/",
        SetNewPasswordView.as_view(),
        name="password-reset-confirm",
    ),

    path(
        "payments/create/",
        CreatePayment.as_view(),
    ),
    path(
        "payments/webhook/",
        PaymobWebhook.as_view(),
    ),
]
