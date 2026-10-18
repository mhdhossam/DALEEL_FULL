from django.contrib.auth import get_user_model
from django.test import TestCase


class CustomUserManagerTests(TestCase):
    def test_create_user_normalizes_email_and_hashes_password(self):
        user_model = get_user_model()
        user = user_model.objects.create_user(
            email="LEARNER@EXAMPLE.COM",
            username="learner",
            password="sample-password-123",
        )

        self.assertEqual(user.email, "LEARNER@example.com")
        self.assertTrue(user.check_password("sample-password-123"))
        self.assertFalse(user.is_staff)
        self.assertTrue(user.is_active)

    def test_create_user_rejects_missing_email(self):
        with self.assertRaisesMessage(ValueError, "The Email field must be set"):
            get_user_model().objects.create_user(
                email="",
                username="learner",
                password="sample-password-123",
            )

    def test_create_user_rejects_missing_username(self):
        with self.assertRaisesMessage(ValueError, "The Username field must be set"):
            get_user_model().objects.create_user(
                email="learner@example.com",
                username="",
                password="sample-password-123",
            )
