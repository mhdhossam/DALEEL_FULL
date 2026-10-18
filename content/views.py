from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Scholarship, Company, TeamMember
from .serializers import (
    PublicScholarshipSerializer,
    PublicCompanySerializer,
    PublicTeamMemberSerializer,
)


class PublicScholarshipViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Scholarship.objects.filter(is_active=True)
    serializer_class = PublicScholarshipSerializer
    permission_classes = [AllowAny]


class PublicCompanyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Company.objects.filter(is_active=True)
    serializer_class = PublicCompanySerializer
    permission_classes = [AllowAny]


class PublicTeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = PublicTeamMemberSerializer
    permission_classes = [AllowAny]
