# books/views.py

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from .models import Book, Review, Cart
from .serializers import BookSerializer, ReviewSerializer, CartSerializer
from django.conf import settings
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import BasicAuthentication
import stripe
stripe.api_key = settings.STRIPE_SECRET_KEY
import os

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    
    @action(detail=False, methods=['post']) 
    def add_book(self, request): 
        serializer = BookSerializer(data=request.data) 
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @action(detail=True, methods=['post'])
    def add_to_cart(self, request, pk=None):
        book = self.get_object()
        cart_item, created = Cart.objects.get_or_create(user=request.user, book=book)
        if created:
            return Response({'status': 'book added to cart'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'book already in cart'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get', 'post'])
    def create_checkout_session(self, request, pk=None):
        book = get_object_or_404(Book, id=pk)

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'ISD',
                    'product_data': {'name': book.title},
                    'unit_amount': int(book.price * 100),
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f"{settings.YOUR_DOMAIN}/books/{book.id}/download/",
            cancel_url=f"{settings.YOUR_DOMAIN}/cancel/",
        )

        # Create an unpaid order
        Order.objects.create(book=book, is_paid=False)

        return Response({'sessionId': checkout_session.id})

    # Custom action for downloading the book
    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        order = get_object_or_404(Order, book_id=pk)

        # Check payment status
        if not order.is_paid:
            return Response({"detail": "Payment required to download."}, status=403)

        # Serve file if payment is successful
        file_path = order.book.file.path
        with open(file_path, 'rb') as file:
            response = HttpResponse(file.read(), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{order.book.title}.pdf"'
            return response


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

