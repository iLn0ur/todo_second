from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, generics
from rest_framework.pagination import LimitOffsetPagination
from .models import *
from .serializers import *
from .filters import TodoFilter


class UserModelViewSet(generics.ListAPIView):
    queryset = UserApp.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        print(self.request.version)
        if self.request.version == '2':
            return UserSerializerWithFullName
        return UserModelSerializer


class ProjectModelViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = ProjectToDo.objects.all()
    serializer_class = ProjectModelSerializer


class ToDoModelViewSet(ModelViewSet):

    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 3


class ProjectLimitOffsetPaginatorViewSet(ModelViewSet):
    queryset = ProjectToDo.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination


class TodoCustomDjangoFilterViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    filterset_class = TodoFilter
