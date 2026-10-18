from rest_framework.routers import DefaultRouter
from .views import (
    PublicCourseViewSet,
    AdminCourseViewSet,
    AdminCourseDetailViewSet,
    AdminEnrollmentViewSet,
    AdminPaymentViewSet,
)

router = DefaultRouter()
router.register(r"public/courses", PublicCourseViewSet, basename="public-course")
router.register(r"courses", AdminCourseViewSet, basename="admin-course")
router.register(r"course-details", AdminCourseDetailViewSet, basename="admin-course-detail")
router.register(r"enrollments", AdminEnrollmentViewSet, basename="admin-enrollment")
router.register(r"payments", AdminPaymentViewSet, basename="admin-payment")

urlpatterns = router.urls
