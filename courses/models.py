from django.db import models
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Course(models.Model):
    LEVEL_CHOICES = [
        ("مبتدئ", "مبتدئ"),
        ("متوسط", "متوسط"),
        ("متقدم", "متقدم"),
    ]

    title = models.CharField(max_length=255)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="courses",
    )
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    duration = models.CharField(max_length=50)

    # Private cloud file/video URL
    cloud_url = models.URLField(null=True, blank=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)

    students = models.PositiveIntegerField(default=0)
    instructor = models.CharField(max_length=255)
    image = models.ImageField(upload_to="courses/", null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Enrollment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="enrollments"
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="enrollments"
    )

    is_paid = models.BooleanField(default=False)

    paymob_order_id = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )

    transaction_id = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "course")

    def __str__(self):
        return f"{self.user} - {self.course}"

class CourseDetail(models.Model):
    course = models.OneToOneField(
        Course,
        on_delete=models.CASCADE,
        related_name="details",
    )
    description = models.TextField(blank=True)
    content = models.JSONField(default=list, blank=True)
    requirements = models.JSONField(default=list, blank=True)
    audience = models.JSONField(default=list, blank=True)
    reviews = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"Details - {self.course.title}"
