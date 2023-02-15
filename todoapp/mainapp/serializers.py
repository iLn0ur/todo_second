from rest_framework.serializers import HyperlinkedModelSerializer
from .models import UserApp, ProjectToDo, ToDo


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = UserApp
        fields = '__all__'
        ordering = ['id']


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ProjectToDo
        fields = '__all__'
        ordering = ['id']


class ToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'
        ordering = ['id']
