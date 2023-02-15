from django.db import models


class UserApp(models.Model):
    name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField(default=1990)

    def __str__(self):
        return self.name


class ProjectToDo(models.Model):
    name = models.CharField(max_length=64)
    user_access = models.ManyToManyField(UserApp)


class ToDo(models.Model):
    project = models.ForeignKey(ProjectToDo, on_delete=models.CASCADE)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    user_master = models.ForeignKey(UserApp, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
