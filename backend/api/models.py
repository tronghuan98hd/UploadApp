from django.db import models


# Create your models here.
def upload_location(instance, filename):
    filebase, extension = filename.split('.')
    name = "_".join(
        (instance.form.name, instance.healthfacility.code, instance.year,
         instance.quarter, instance.month, filebase))
    return '%s/%s/%s/Q%s/T%s/%s.%s' % (
        instance.form.name, instance.healthfacility.code, instance.year,
        instance.quarter, instance.month, name, extension)


class Form(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'form'


class HealthFacility(models.Model):
    code = models.CharField(max_length=50)

    class Meta:
        db_table = 'healthfacility'


class Image(models.Model):
    url = models.ImageField(upload_to=upload_location,
                            height_field=None,
                            width_field=None,
                            max_length=None)
    form = models.ForeignKey("Form",
                             related_name="form",
                             on_delete=models.CASCADE)
    healthfacility = models.ForeignKey("HealthFacility",
                                       related_name="healthfacility",
                                       on_delete=models.CASCADE)
    year = models.CharField(max_length=5, default="0")
    quarter = models.CharField(max_length=2, default="0")
    month = models.CharField(max_length=3, default="0")

    class Meta:
        db_table = 'image'

    @classmethod
    def create(cls, healthfacility, form, url, year, quarter, month):
        image = cls(healthfacility=healthfacility,
                    form=form,
                    url=url,
                    year=year,
                    quarter=quarter,
                    month=month)
        return image
