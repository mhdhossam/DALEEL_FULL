from rest_framework import serializers
from .models import CustomUser, Payment


class AdminCustomUserSerializer(serializers.ModelSerializer):
    """Admin-only user CRUD serializer; password is never returned."""

    password = serializers.CharField(write_only=True, required=False, min_length=8)

    class Meta:
        model = CustomUser
        fields = (
            "id", "username", "email", "password",
            "is_verified", "is_active", "is_staff",
        )
        read_only_fields = ("id",)

    def validate(self, attrs):
        if self.instance is None and not attrs.get("password"):
            raise serializers.ValidationError({"password": "A password is required when creating a user."})
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")
        return CustomUser.objects.create_user(password=password, **validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for field, value in validated_data.items():
            setattr(instance, field, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, min_length=8)


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"
        read_only_fields = ("status", "transaction_id", "paymob_order_id")
