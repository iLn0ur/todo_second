import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
#from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectModelViewSet, UserModelViewSet
from .models import ProjectToDo, UserApp, ToDo


class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_admin(self):
        factory = APIRequestFactory()

        request = factory.post('/api/users/', {'name': 'user01', 'birthday_year': 1799}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        author = UserApp.objects.create(name='user11', birthday_year=1799)
        client = APIClient()
        response = client.get(f'/api/users/{author.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        user = UserApp.objects.create(name='user12', birthday_year=1799)
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {'name': 'user21', 'birthday_year': 1880})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):

        user = UserApp.objects.create(name='user99', birthday_year=1799)
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/users/{user.id}/', {'name': 'Грин', 'birthday_year': 1880})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        author = UserApp.objects.get(id=user.id)
        self.assertEqual(author.name, 'Грин')
        self.assertEqual(author.birthday_year, 1880)
        client.logout()


class TestMath(APISimpleTestCase):

    def test_sqrt(self):
        import math
        self.assertEqual(math.sqrt(4), 2)
