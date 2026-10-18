from rest_framework import serializers
from courses.models import Category, Course, CourseDetail, Enrollment
from client.models import Payment


class AdminCourseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseDetail
        fields = ["id", "course", "description", "content", "requirements", "audience", "reviews"]
        read_only_fields = ["id"]


class PublicCourseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseDetail
        fields = ["description", "content", "requirements", "audience", "reviews"]


class AdminCourseSerializer(serializers.ModelSerializer):
    student_count = serializers.SerializerMethodField()
    category_name = serializers.CharField(source="category.name", read_only=True)
    details = PublicCourseDetailSerializer(read_only=True)

    class Meta:
        model = Course
        fields = [
            "id", "title", "category", "category_name", "level", "duration",
            "cloud_url", "price", "students", "instructor", "image",
            "student_count", "details", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "student_count", "details", "created_at", "updated_at"]

    def get_student_count(self, obj):
        return obj.enrollments.filter(is_paid=True).count()


class PublicCourseSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="category.name", read_only=True)
    card_image = serializers.ImageField(source="image", read_only=True)
    details = PublicCourseDetailSerializer(read_only=True)

    class Meta:
        model = Course
        fields = [
            "id", "title", "category", "level", "duration", "price",
            "students", "instructor", "image", "card_image", "cloud_url", "details",
        ]


class AdminEnrollmentSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source="user.username", read_only=True)
    user_email = serializers.CharField(source="user.email", read_only=True)
    course_title = serializers.CharField(source="course.title", read_only=True)

    class Meta:
        model = Enrollment
        fields = [
            "id", "user", "user_username", "user_email",
            "course", "course_title", "is_paid",
            "paymob_order_id", "transaction_id", "created_at",
        ]
        read_only_fields = fields


class AdminPaymentSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source="user.username", read_only=True)
    user_email = serializers.CharField(source="user.email", read_only=True)
    course_title = serializers.CharField(source="course.title", read_only=True)

    class Meta:
        model = Payment
        fields = [
            "id", "user", "user_username", "user_email",
            "course", "course_title", "amount",
            "paymob_order_id", "transaction_id", "status", "created_at",
        ]
        read_only_fields = ["id", "paymob_order_id", "transaction_id", "status", "created_at"]
