from rest_framework.routers import DefaultRouter
from courses.views import PublicCourseViewSet
from .views import PublicScholarshipViewSet, PublicCompanyViewSet, PublicTeamMemberViewSet

router = DefaultRouter()
router.register(r"courses", PublicCourseViewSet, basename="public-course")
router.register(r"scholarships", PublicScholarshipViewSet, basename="public-scholarship")
router.register(r"companies", PublicCompanyViewSet, basename="public-company")
router.register(r"team-members", PublicTeamMemberViewSet, basename="public-team-member")

urlpatterns = router.urls
