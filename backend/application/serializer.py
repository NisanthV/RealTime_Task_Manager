from .models import *
from rest_framework.serializer import ModelSerializers


class UserSerializer(ModelSerializers):

    class Meta:

        model = User
        fields = ('name', 'password', 'email', 'role', 'organization', 'sub_org', 'department')

        kwargs = {
            'password' : {
                'write_only' : True
            },

            'role' : {
                'read_only' : True
            },

            'organization' : {
                'read_only' : True
            },

            'sub_org' : {
                'read_only' : True
            },
            
            'department' : {
                'read_only' : True
            }
        }

    