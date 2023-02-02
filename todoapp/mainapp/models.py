from django.db import models


class User(models.Model):
    name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField(default=1990)


class ProjectToDo(models.Model):
    name = models.CharField(max_length=64)
    user_access = models.ManyToManyField(User)


class ToDo(models.Model):
    project = models.ForeignKey(ProjectToDo, on_delete=models.CASCADE)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    user_master = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
