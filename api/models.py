from django.db import models
from django.utils.timezone import now

# Create your models here.


class Spot(models.Model):
    BUILDING_CHOICES = [
        ('North', 'North'),
        ('South', 'South'),
        ('Central', 'Central'),
        ('N/A', 'N/A'),
    ]

    building_name = models.CharField(max_length=255)
    time_available_from = models.TimeField()
    time_available_till = models.TimeField()
    campus_side = models.CharField(max_length=10, choices=BUILDING_CHOICES)
    description = models.CharField(max_length= 255)
    last_updated = models.DateTimeField(default = now)

    def __str__(self):
        return f"{self.building_name} ({self.time_available_from} - {self.time_available_till})"
    
    def save(self, *args, **kwargs):
        self.lastupdated = now()  # Update the timestamp on every save
        super().save(*args, **kwargs)
