from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny, IsAdminUser
from courses.models import Course, CourseDetail, Enrollment
from client.models import Payment
from .serializers import (
    AdminCourseSerializer,
    AdminCourseDetailSerializer,
    AdminEnrollmentSerializer,
    AdminPaymentSerializer,
    PublicCourseSerializer,
)
from core.viewsets import AdminModelViewSet


class PublicCourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.select_related("category").prefetch_related("details", "enrollments")
    serializer_class = PublicCourseSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "instructor", "category__name"]
    ordering_fields = ["created_at", "price", "title", "students"]


class AdminCourseViewSet(AdminModelViewSet):
    """Admin course management - full CRUD."""
    queryset = Course.objects.select_related("category").prefetch_related("details")
    serializer_class = AdminCourseSerializer
    search_fields = ["title", "instructor", "category__name"]
    ordering_fields = ["created_at", "price", "title", "students"]


class AdminCourseDetailViewSet(AdminModelViewSet):
    """Admin editor for rich course details."""
    queryset = CourseDetail.objects.select_related("course")
    serializer_class = AdminCourseDetailSerializer
    search_fields = ["course__title", "description"]
    ordering_fields = ["id"]


class AdminEnrollmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Enrollment.objects.select_related("user", "course")
    serializer_class = AdminEnrollmentSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["user__username", "user__email", "course__title"]
    ordering_fields = ["created_at", "is_paid"]


class AdminPaymentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Payment.objects.select_related("user", "course")
    serializer_class = AdminPaymentSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["user__username", "user__email", "course__title", "paymob_order_id"]
    ordering_fields = ["status", "amount", "created_at"]
