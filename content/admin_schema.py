from apps.schema.registry import registry
from apps.schema.base import AdminSchema
from .models import Scholarship, Company, TeamMember


@registry.register
class ScholarshipSchema(AdminSchema):
    label = "المنح الدراسية"
    model = Scholarship
    endpoint = "/api/scholarships/"
    list_display = ["id", "title", "organization", "deadline", "location", "is_active"]
    search_fields = ["title", "organization", "location"]
    ordering = ["deadline", "-created_at"]


@registry.register
class CompanySchema(AdminSchema):
    label = "الشركات والوظائف"
    model = Company
    endpoint = "/api/companies/"
    list_display = ["id", "name", "industry", "location", "is_active"]
    search_fields = ["name", "industry", "location"]
    ordering = ["name"]


@registry.register
class TeamMemberSchema(AdminSchema):
    label = "فريق العمل"
    model = TeamMember
    endpoint = "/api/team-members/"
    list_display = ["id", "name", "role", "sort_order", "is_active"]
    search_fields = ["name", "role"]
    ordering = ["sort_order", "id"]
