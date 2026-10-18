from django.contrib import admin

from .models import Category, Course, Enrollment


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = (
        "id", "title", "category", "level",
        "price", "students", "instructor", "created_at",
    )
    list_filter = ("category", "level")
    search_fields = ("title", "instructor", "category__name")


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "course", "is_paid", "created_at")
    list_filter = ("is_paid", "course")
    search_fields = ("user__username", "user__email", "course__title")
