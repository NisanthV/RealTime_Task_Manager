from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):

    def create_user(self, email, password = None, **extra_fields):

        if not email:
            raise ValueError('Email is required')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password = None, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if not extra_fields.get('is_staff'):
            raise ValueError('staff is must be true')

        if not extra_fields.get('is_superuser'):
            raise  ValueError('superuser is must be true')

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):

    username = None
    name = models.CharField(max_length= 30, null= False)
    email = models.EmailField(unique= True, null= False)
    password = models.CharField(max_length= 108, null= False)
    organization = models.ForeignKey('Organization', null= True, on_delete= models.SET_NULL, related_name="parent_org")
    sub_org = models.ForeignKey('SubOrganization', null= True, on_delete= models.SET_NULL, related_name="child_org")
    role = models.ForeignKey('Role', null= True, on_delete= models.SET_NULL,related_name= 'org_role')
    department = models.ForeignKey('Department', null = True, on_delete= models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add= True)
    objects = UserManager()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name


class Organization(models.Model):

    name = models.CharField(max_length= 100, null= False)
    owner = models.ForeignKey(User, null= False, on_delete= models.CASCADE, related_name="parent_org_owner")
    created_at = models.DateTimeField(auto_now_add= True)

    def __str__(self):
        return self.name

class SubOrganization(models.Model):

    name = models.CharField(max_length= 100, null= False)
    organization = models.ForeignKey('Organization', null= False, on_delete= models.CASCADE)
    created_at = models.DateTimeField(auto_now_add= True)

    def __str__(self):
        return self.name

class Department(models.Model):

    name = models.CharField(max_length= 50, null= False)
    sub_org = models.ForeignKey('SubOrganization', null= False, on_delete= models.CASCADE)
    created_at = models.DateTimeField(auto_now_add= True)

    def __str__(self):
        return self.name

class Role(models.Model):

    name = models.CharField(max_length= 20, null= False)
    organization = models.ForeignKey('Organization', null= False, on_delete= models.CASCADE)
    created_at = models.DateTimeField(auto_now_add= True)

    def __str__(self):
        return self.name
    

class Categories(models.Model):

    name = models.CharField(max_length= 20, null= False)
    organization = models.ForeignKey('Organization', null= False, on_delete= models.CASCADE)
    created_at = models.DateTimeField(auto_now_add= True)

    def __str__(self):
        return self.name
    

class Task(models.Model):

    name = models.CharField(max_length= 20, null= False)
    category = models.ForeignKey('Categories', null= True, on_delete= models.SET_NULL)
    department = models.ForeignKey('Department', null= True, on_delete= models.SET_NULL)
    sub_org = models.ForeignKey('SubOrganization', null= True, on_delete= models.SET_NULL)
    organization = models.ForeignKey('Organization', null= True, on_delete= models.CASCADE)
    created_by = models.ForeignKey('User', null= True, on_delete= models.SET_NULL, related_name= "created")
    to = models.ForeignKey('User', null= True, on_delete= models.SET_NULL, related_name= "assigned")
    created_at = models.DateTimeField(auto_now_add= True)
    updated_at = models.DateTimeField(null= True, default= None)

    def __str__(self):
        return self.name