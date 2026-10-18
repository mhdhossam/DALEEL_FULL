from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [("courses", "0003_category_and_course_category_fk")]

    operations = [
        migrations.CreateModel(
            name="CourseDetail",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("description", models.TextField(blank=True)),
                ("content", models.JSONField(blank=True, default=list)),
                ("requirements", models.JSONField(blank=True, default=list)),
                ("audience", models.JSONField(blank=True, default=list)),
                ("reviews", models.JSONField(blank=True, default=list)),
                ("course", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="details", to="courses.course")),
            ],
        ),
    ]
