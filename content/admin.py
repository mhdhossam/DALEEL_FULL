from django.contrib import admin
from .models import Scholarship, Company, TeamMember

admin.site.register([Scholarship, Company, TeamMember])
