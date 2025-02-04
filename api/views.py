from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello from Django!"})


@api_view(['GET', 'POST'])  # ✅ Allow both GET & POST
def add_spot(request):
    if request.method == "POST":
        data = request.data
        return Response({"message": f"Spot at {data['buildingName']} added!"})
    
    return Response({"message": "Welcome to the Spot API!"})  # Handles GET requests


