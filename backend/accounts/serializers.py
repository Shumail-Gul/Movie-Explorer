from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    confirmPassword = serializers.CharField(write_only=True)
    age = serializers.IntegerField(write_only=True)
    gender = serializers.CharField(write_only=True)
    
    class Meta :
        model = User
        fields = ["id", "username", "email", "password", "confirmPassword", "age", "gender"]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A User with this email already exists."
            )
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "This username is already taken."
            )
        return value

    def validate(self, data):
        if data["password"] != data["confirmPassword"]:
            raise serializers.ValidationError(
                {"confirmPassword": "Password do not match"}
            )
        return data
    def create(self, validated_data):
        username = validated_data.pop("username")
        age = validated_data.pop("age")
        gender = validated_data.pop("gender")
        email = validated_data["email"]


        user = User.objects.create_user(
            username= username,
            email=email,
            password=validated_data["password"]
        )

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            user = User.objects.get(email=email)
    
        except User.DoesNotExist:
            raise serializers.ValidationError(
                {"email": "No user found with this email"}
            )
    
    
        user = authenticate(
            username = user.username,
            password = password
        )
    
        if user is None:
            raise serializers.ValidationError(
                {"password": "Incorrect Password"}
            )
    
        refresh = RefreshToken.for_user(user)
    
        return {
            "user":  user,
            "refresh" : str(refresh),
            "access" : str(refresh.access_token)
        }