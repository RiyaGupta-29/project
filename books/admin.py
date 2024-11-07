from django.contrib import admin
from .models import Book, Review, Cart

# Registering all models at once using a list
admin.site.register([Book, Review, Cart])
