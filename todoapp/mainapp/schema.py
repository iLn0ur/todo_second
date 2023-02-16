import graphene
from graphene_django import DjangoObjectType
from mainapp.models import ProjectToDo, UserApp


class ProjectType(DjangoObjectType):

    class Meta:
        model = ProjectToDo
        fields = '__all__'


class UserType(DjangoObjectType):

    class Meta:
        model = UserApp
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)

    def resolve_all_projects(root, info):
        return ProjectToDo.objects.all()

    def resolve_all_users(root, info):
        return UserApp.objects.all()


schema = graphene.Schema(query=Query)
