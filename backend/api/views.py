from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.status import HTTP_201_CREATED
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ImageSerializer, FormSerializer, HealthFacilitySerializer
from .models import Image, Form, HealthFacility


# Create your views here.
class FormViewSet(ModelViewSet):
    serializer_class = FormSerializer
    queryset = Form.objects.all()


class HealthFacilityViewSet(ModelViewSet):
    serializer_class = HealthFacilitySerializer
    queryset = HealthFacility.objects.all()


class ImageViewSet(ModelViewSet):
    parser_classes = (
        MultiPartParser,
        FormParser,
    )
    serializer_class = ImageSerializer
    queryset = Image.objects.all()


@api_view([
    'POST',
])
def update_data(request):
    data = request.data
    form_id = data.get('form')
    health_id = data.get('health')
    year = data.get('year')
    month = data.get('month')
    quarter = data.get('quarter')
    form = Form.objects.get(id=form_id)
    health = HealthFacility.objects.get(id=form_id)
    files = request.FILES.getlist('images')
    for file in files:
        image = Image.create(health, form, file, year, quarter, month)
        image.save()
    result = {}
    return Response(data=result, status=HTTP_201_CREATED)