from django.db import models


class Scholarship(models.Model):
    title = models.CharField(max_length=255)
    organization = models.CharField(max_length=255)
    deadline = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True)
    requirements = models.JSONField(default=list, blank=True)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["deadline", "-created_at"]

    def __str__(self):
        return self.title


class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    logo = models.URLField(blank=True)
    banner = models.URLField(blank=True)
    short_description = models.CharField(max_length=500)
    description = models.TextField()
    industry = models.CharField(max_length=150)
    location = models.CharField(max_length=255)
    website = models.URLField(blank=True)
    team_size = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class TeamMember(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    image = models.URLField(blank=True)
    position = models.CharField(max_length=100, blank=True, help_text="CSS object-position class, e.g. object-[center_15%]")
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return f"{self.name} - {self.role}"
