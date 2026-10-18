from django.db import migrations, models
import django.db.models.deletion


def migrate_course_categories(apps, schema_editor):
    Category = apps.get_model("courses", "Category")
    Course = apps.get_model("courses", "Course")

    values = (
        Course.objects.exclude(category__isnull=True)
        .values_list("category", flat=True)
        .distinct()
    )
    for name in values:
        if name:
            Category.objects.get_or_create(name=name)


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("courses", "0002_course_cloud_url_alter_course_price_enrollment"),
    ]

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=100, unique=True)),
            ],
            options={
                "verbose_name": "Category",
                "verbose_name_plural": "Categories",
            },
        ),
        migrations.RunPython(migrate_course_categories, noop_reverse),
        migrations.AlterField(
            model_name="course",
            name="category",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="courses",
                to="courses.category",
            ),
        ),
    ]
