from django.urls import path
from .views import hello_world
from .views import add_spot
from .views import create_spot

urlpatterns = [
    path('hello/', hello_world),
    path('spots/', add_spot),  # API endpoint: /api/spots/
    #change back to add_spot
]