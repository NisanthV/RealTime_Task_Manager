from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from channels.db import database_sync_to_async
from .models import User


def get_group_name(id: int) -> str:
    return f'user_{id}'

@database_sync_to_async
def get_user(url: str) -> User():

    if "token=" in url:
        token = url.split('token=')[1]

    if token:

        try:
            access_token = AccessToken(token)
            user_id = access_token['user_id']
            return User.objects.get(id = user_id)

        except User.DoesNotExist:

            return AnonymousUser()

