import requests

from django.conf import settings
from django.db import transaction
from django.shortcuts import get_object_or_404

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from courses.models import Course, Enrollment
from .models import CustomUser,Payment
from .serializers import UserRegistrationSerializer, PasswordResetRequestSerializer, SetNewPasswordSerializer

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode , urlsafe_base64_decode
from django.utils.encoding import force_bytes


class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                "message": "User registered successfully.",
                "user": {
                    "username": serializer.data["username"],
                    "email": serializer.data["email"],
                },
            },
            status=status.HTTP_201_CREATED,
        )
    


class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]

        try:
            user = CustomUser.objects.get(email=email)

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            # Send email here
            print(uid, token)

        except CustomUser.DoesNotExist:
            pass

        return Response(
            {"message": "If the email exists, a reset link has been sent."},
            status=status.HTTP_200_OK,
        )
    


class SetNewPasswordView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def post(self, request, uidb64, token):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = CustomUser.objects.get(pk=uid)
        except Exception:
            return Response(
                {"error": "Invalid link."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not default_token_generator.check_token(user, token):
            return Response(
                {"error": "Invalid or expired token."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(serializer.validated_data["password"])
        user.save()

        return Response(
            {"message": "Password reset successful."},
            status=status.HTTP_200_OK,
        )
    


class CreatePayment(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        course = get_object_or_404(
            Course,
            id=request.data.get("course")
        )

        # Atomic check + create to prevent race condition double-purchase
        with transaction.atomic():
            already_paid = (
                Enrollment.objects
                .select_for_update()
                .filter(user=request.user, course=course, is_paid=True)
                .exists()
            )
            if already_paid:
                return Response(
                    {"error": "Course already purchased"},
                    status=400
                )

            # Reserve a pending Payment row inside the lock
            payment = Payment.objects.create(
                user=request.user,
                course=course,
                amount=course.price,
                status="pending",
            )

        amount = int(course.price * 100)
        timeout = 10  # seconds

        try:
            auth_resp = requests.post(
                "https://accept.paymob.com/api/auth/tokens",
                json={"api_key": settings.PAYMOB_API_KEY},
                timeout=timeout,
            )
            auth_resp.raise_for_status()
            token = auth_resp.json()["token"]

            order_resp = requests.post(
                "https://accept.paymob.com/api/ecommerce/orders",
                json={
                    "auth_token": token,
                    "delivery_needed": False,
                    "amount_cents": amount,
                    "currency": "EGP",
                    "items": [],
                },
                timeout=timeout,
            )
            order_resp.raise_for_status()
            order_id = order_resp.json()["id"]

            payment.paymob_order_id = str(order_id)
            payment.save(update_fields=["paymob_order_id"])

            key_resp = requests.post(
                "https://accept.paymob.com/api/acceptance/payment_keys",
                json={
                    "auth_token": token,
                    "amount_cents": amount,
                    "expiration": 3600,
                    "order_id": order_id,
                    "currency": "EGP",
                    "integration_id": settings.PAYMOB_INTEGRATION_ID,
                    "billing_data": {
                        "apartment": "NA",
                        "email": request.user.email,
                        "floor": "NA",
                        "first_name": request.user.username,
                        "street": "NA",
                        "building": "NA",
                        "phone_number": "01000000000",
                        "shipping_method": "NA",
                        "postal_code": "00000",
                        "city": "Cairo",
                        "country": "EG",
                        "last_name": ".",
                        "state": "Cairo",
                    },
                },
                timeout=timeout,
            )
            key_resp.raise_for_status()
            payment_token = key_resp.json()["token"]

        except (requests.Timeout, requests.ConnectionError):
            payment.status = "failed"
            payment.save(update_fields=["status"])
            return Response(
                {"error": "Payment gateway unreachable. Try again."},
                status=503,
            )
        except (requests.HTTPError, KeyError) as e:
            payment.status = "failed"
            payment.save(update_fields=["status"])
            return Response(
                {"error": f"Payment gateway error: {str(e)}"},
                status=502,
            )

        return Response({
            "payment_url": (
                f"https://accept.paymob.com/api/acceptance/iframes/"
                f"{settings.PAYMOB_IFRAME_ID}?payment_token={payment_token}"
            )
        })

# ── Auth: email-or-username login ─────────────────────────────────────────────

class _EmailOrUsernameSerializer(TokenObtainPairSerializer):
    """
    Accept the frontend's { login, password } payload where 'login' may be
    either the username or the email address.
    """
    def validate(self, attrs):
        from .models import CustomUser
        login = attrs.get(self.username_field, "")
        if "@" in str(login):
            try:
                user = CustomUser.objects.get(email=login)
                attrs[self.username_field] = user.username
            except CustomUser.DoesNotExist:
                pass
        return super().validate(attrs)


class DaleelTokenObtainPairView(TokenObtainPairView):
    serializer_class = _EmailOrUsernameSerializer


# ── Auth: current user profile ────────────────────────────────────────────────

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        u = request.user
        return Response({
            "id":          u.id,
            "username":    u.username,
            "email":       u.email,
            "name":        u.username,          # alias used by the frontend
            "role":        "admin" if u.is_staff else "user",
            "is_staff":    u.is_staff,
            "is_active":   u.is_active,
            "is_verified": u.is_verified,
        })
