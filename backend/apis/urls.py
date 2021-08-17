from django.contrib import admin
from django.urls import path, include
from .views import index
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework.authtoken.views import ObtainAuthToken, obtain_auth_token
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })


router = DefaultRouter()
router.register('users', views.UserViewSet)
router.register('numbers', views.NumberViewSet)


urlpatterns = [
    path('',include(router.urls)),
    path('api-auth', include('rest_framework.urls')),
    path('api-token-auth', CustomAuthToken.as_view()),
]