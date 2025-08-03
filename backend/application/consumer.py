from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from .utils import get_group_name, get_user
import json

class NotificationConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):

        user = await get_user(self.scope['query_string'].decode())
        print(user,"1234567890plkjbvcxsw3456879ioklkbvcdxedrt8y9uipklnb vcxsedrt78yu9ikp")
        if isinstance(user, AnonymousUser):

            await self.close()
            return

        self.group_name = get_group_name(user.id)

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()
    
    async def disconnect(self, close_code):

        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)
    
    async def task_push(self, event):

        message = event['message']

        await self.send(text_data = json.dumps({"message" : message}))