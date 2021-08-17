from django.db.models import fields
from rest_framework import serializers
from .models import User, Number

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']

        extra_kwargs = {'password': {
            'write_only': True,
            'required': True
        }}

    # for hashing password
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # another way to creat token automaticly
        # Token.objects.create(user=user)
        return user

class NumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Number
        fields = ['id', 'num']


    
