from rest_framework import serializers
from .models import Spot

class SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot
        fields = '__all__'
        read_only_fields = ("lastupdated",)
