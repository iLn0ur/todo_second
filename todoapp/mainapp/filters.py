from django_filters import rest_framework as filters
from .models import ToDo


class TodoFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = ToDo
        fields = ['project']
