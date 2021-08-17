from django.shortcuts import render, HttpResponse
from apis import serializers
from apis.serializers import UserSerializer, NumberSerializer
from rest_framework import status, viewsets
from .models import User, Number
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

# Create your views here.
def index(request):
    return HttpResponse("it is working")


# api with viewsets
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

class NumberViewSet(viewsets.ModelViewSet):
    queryset = Number.objects.all()
    serializer_class = NumberSerializer
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]