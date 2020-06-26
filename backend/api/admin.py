from django.contrib import admin
from .models import Image, Form, HealthFacility

# Register your models here.
admin.site.register(Image)
admin.site.register(Form)
admin.site.register(HealthFacility)