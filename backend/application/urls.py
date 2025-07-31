from django.urls import path
from .views import *

urlpatterns = [
    path('create-user/', UserRegisterView.as_view()),
    path('create-user/<int:pk>/', RetriveUserView.as_view()),
    path('login/', LoginView.as_view()),
    path('', test),
]