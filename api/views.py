from django.shortcuts import render
from rest_framework import status

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Spot
from .serializers import SpotSerializer
from datetime import time

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
    

@api_view (['GET'])
def get_all_spots(request):
    spots = Spot.objects.all()
    serializer = SpotSerializer(spots, many=True)
    #print(spots)
    return Response(serializer.data)


@api_view(['GET'])
def search_spots(request):
    campus_side = request.query_params.get('campus_side')
    search_time = request.query_params.get('time')

    filters = {}

    if search_time:
        try:
            search_time_obj = time.fromisoformat(search_time)
            filters['time_available_from__lte'] = search_time_obj
            filters['time_available_till__gte'] = search_time_obj
        except ValueError:
            return Response({"error": "Invalid time format. Use HH:MM."}, status=400)

    if campus_side and campus_side != "N/A":
        filters['campus_side'] = campus_side

    spots = Spot.objects.filter(**filters)
    serializer = SpotSerializer(spots, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT'])
def spot_detail(request, id):
    try:
        spot = Spot.objects.get(id=id)
    except Spot.DoesNotExist:
        return Response({"error": "Spot not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SpotSerializer(spot)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SpotSerializer(spot, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)