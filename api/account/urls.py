from django.urls import path
from account.views import *

urlpatterns = [
    path('users/', UserCreateView.as_view(), name='user-create'),
    path('users/<str:clerk_id>/', UserDetailView.as_view(), name='user-detail'),
]