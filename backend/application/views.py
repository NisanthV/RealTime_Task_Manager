from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.hashers import make_password,check_password
from rest_framework.generics import CreateAPIView, RetrieveAPIView

from .serializer import *
from .models import *

class UserRegisterView(CreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        pass