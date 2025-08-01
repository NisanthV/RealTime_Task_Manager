from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.hashers import make_password,check_password
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import *
from .models import *
from django.shortcuts import render

#login
class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        data = request.data
        email = data.get('email', None)
        password = data.get('password', None)
        #check email and password are present
        if not email or not password:
            return Response({'message':'Email or Password not provided'}, status= status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email= email, password= password)
        #return if not valid
        if not user:
            return  Response({'message':'Invalid credentials'}, status= status.HTTP_401_UNAUTHORIZED)
        #login
        login(request, user)

        return Response({'message': 'Login success'}, status= status.HTTP_200_OK)


class UserRegisterView(CreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        instance = User.objects.create_user(**serializer.validated_data)
        return instance

class RetriveUserView(RetrieveAPIView):

    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


def test(request):
    return render(request, "index.html")