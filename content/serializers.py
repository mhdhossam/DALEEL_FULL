from rest_framework import serializers
from .models import Scholarship, Company, TeamMember


class PublicScholarshipSerializer(serializers.ModelSerializer):
    org = serializers.CharField(source="organization")
    desc = serializers.CharField(source="description")

    class Meta:
        model = Scholarship
        fields = ["id", "title", "org", "deadline", "location", "requirements", "desc"]


class PublicCompanySerializer(serializers.ModelSerializer):
    shortDescription = serializers.CharField(source="short_description")
    teamSize = serializers.CharField(source="team_size")

    class Meta:
        model = Company
        fields = [
            "id", "name", "logo", "banner", "description", "shortDescription",
            "industry", "location", "website", "teamSize",
        ]


class PublicTeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ["id", "name", "role", "image", "position"]
