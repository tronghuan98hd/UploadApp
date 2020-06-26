from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf.urls import url

router = DefaultRouter()
router.register(r'images', views.ImageViewSet)
router.register(r'forms', views.FormViewSet)
router.register(r'healthfacility', views.HealthFacilityViewSet)

urlpatterns = [
    path('', include(router.urls)),
    url(r'update_data/$', views.update_data, name='update_data'),
]