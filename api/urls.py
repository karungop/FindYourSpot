from django.urls import path
from .views import hello_world
from .views import add_spot
from .views import create_spot
from .views import get_all_spots
from .views import search_spots
from .views import spot_detail

urlpatterns = [
    path('hello/', hello_world),
    path('spots/', get_all_spots, name='get_all_spots'),  # This should have 'api/' as well
    path('spots/add/', add_spot, name='add_spot'),  # Add a dedicated route for adding spots
    path('spots/search/', search_spots, name='search_spots'),  # This is correct for searching spots
    path('spots/<int:id>/', spot_detail, name='spot-detail'),
]