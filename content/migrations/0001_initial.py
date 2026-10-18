from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Company",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=255, unique=True)),
                ("logo", models.URLField(blank=True)),
                ("banner", models.URLField(blank=True)),
                ("short_description", models.CharField(max_length=500)),
                ("description", models.TextField()),
                ("industry", models.CharField(max_length=150)),
                ("location", models.CharField(max_length=255)),
                ("website", models.URLField(blank=True)),
                ("team_size", models.CharField(blank=True, max_length=100)),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["name"]},
        ),
        migrations.CreateModel(
            name="Scholarship",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("organization", models.CharField(max_length=255)),
                ("deadline", models.DateField(blank=True, null=True)),
                ("location", models.CharField(blank=True, max_length=255)),
                ("requirements", models.JSONField(blank=True, default=list)),
                ("description", models.TextField()),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["deadline", "-created_at"]},
        ),
        migrations.CreateModel(
            name="TeamMember",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=255)),
                ("role", models.CharField(max_length=255)),
                ("image", models.URLField(blank=True)),
                ("position", models.CharField(blank=True, help_text="CSS object-position class, e.g. object-[center_15%]", max_length=100)),
                ("sort_order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={"ordering": ["sort_order", "id"]},
        ),
    ]
