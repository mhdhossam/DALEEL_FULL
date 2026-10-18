from apps.schema.registry import registry
from apps.schema.base import AdminSchema
from .models import Category, Course, CourseDetail, Enrollment
from .serializers import AdminCourseSerializer, AdminEnrollmentSerializer



@registry.register
class CategorySchema(AdminSchema):
    label = "التصنيفات"
    model = Category
    endpoint = "/api/categories/"
    list_display = ["id", "name"]
    search_fields = ["name"]
    ordering = ["name"]

@registry.register
class CourseSchema(AdminSchema):
    label = "الكورسات"
    model = Course
    endpoint = "/data/courses/"           # AdminCourseViewSet is here
    read_serializer_class = AdminCourseSerializer
    list_display = [
        "id", "title", "category", "level",
        "price", "instructor", "students", "created_at",
    ]
    search_fields  = ["title", "instructor", "category__name"]
    ordering       = ["-created_at"]
    use_explicit_viewset = True           # viewset already in courses.urls



@registry.register
class CourseDetailSchema(AdminSchema):
    label = "تفاصيل الكورسات"
    model = CourseDetail
    endpoint = "/data/course-details/"
    list_display = ["id", "course", "description"]
    search_fields = ["course__title", "description"]
    ordering = ["-id"]
    use_explicit_viewset = True

@registry.register
class EnrollmentSchema(AdminSchema):
    label = "التسجيلات"
    model = Enrollment
    endpoint = "/data/enrollments/"       # AdminEnrollmentViewSet is here
    read_serializer_class = AdminEnrollmentSerializer
    list_display = [
        "id", "user", "course", "is_paid", "created_at",
    ]
    search_fields  = ["user__username", "course__title"]
    ordering       = ["-created_at"]
    use_explicit_viewset = True
