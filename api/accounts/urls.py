from django.urls import path
from accounts.views import ProductList, ProductDetail, CategoryList,CategoryDetail

urlpatterns = [
    path('api/products/', ProductList.as_view()),
    path('api/products/<int:pk>/', ProductDetail.as_view()),
    path('api/categories/', CategoryList.as_view()),
    path('api/categories/<int:pk>/', CategoryDetail.as_view()),
    
   
    #
]
