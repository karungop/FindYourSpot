from django.shortcuts import render
from rest_framework import status

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Spot
from .serializers import SpotSerializer

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello from Django!"})


@api_view(['GET', 'POST'])  #  Allow both GET & POST
def add_spot(request):
    if request.method == "POST":
        serializer = SpotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # ✅ Saves data to the database
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    spots = Spot.objects.all()
    serializer = SpotSerializer(spots, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def create_spot(request):
    print("Request data:", request.data)  # Debugging: Print the data being sent
    serializer = SpotSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Validation errors:", serializer.errors)  # Print validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        