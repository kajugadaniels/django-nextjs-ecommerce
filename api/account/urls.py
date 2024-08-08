from django.urls import path
from account.views import *

urlpatterns = [
    path('users/', UserAPIView.as_view(), name='user-list'),
    path('users/<str:clerk_id>/', UserAPIView.as_view(), name='user-detail'),
]