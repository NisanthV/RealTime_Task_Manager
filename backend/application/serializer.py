from .models import *
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):

    class Meta:

        model = User
        fields = ('name', 'password', 'email', 'role', 'organization', 'sub_org', 'department')

        extra_kwargs = {
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

    