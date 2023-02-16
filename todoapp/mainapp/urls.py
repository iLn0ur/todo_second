from django.urls import path
from .views import UserModelViewSet


app_name = 'mainapp'
urlpatterns = [path('', UserModelViewSet.as_view())]
