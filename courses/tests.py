from django.test import TestCase
from django.urls import reverse

from courses.models import Category, Course, CourseDetail


class PublicCourseApiTests(TestCase):
    def setUp(self):
        category = Category.objects.create(name="اختبار")
        self.course = Course.objects.create(
            title="دورة اختبار واجهة API",
            category=category,
            level="مبتدئ",
            duration="4 أسابيع",
            price="250.00",
            instructor="فريق دليل",
            students=3,
        )

    def test_public_course_list_is_accessible_without_authentication(self):
        response = self.client.get(reverse("public-course-list"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["results"][0]["title"], self.course.title)

    def test_public_course_detail_includes_optional_rich_details(self):
        CourseDetail.objects.create(
            course=self.course,
            description="شرح اختباري",
            content=["الموضوع الأول"],
            requirements=["متطلبات أساسية"],
            audience=["المتعلمون الجدد"],
            reviews=[],
        )

        response = self.client.get(
            reverse("public-course-detail", kwargs={"pk": self.course.pk})
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["details"]["description"], "شرح اختباري")
        self.assertEqual(response.data["details"]["content"], ["الموضوع الأول"])
