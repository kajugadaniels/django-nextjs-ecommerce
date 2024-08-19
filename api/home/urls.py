from django.urls import path
from home.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<slug:slug>/', ProductDetail.as_view(), name='product-detail'),
    path('products/category/<slug:category_slug>/', ProductByCategory.as_view(), name='product-by-category'),
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    path('product/categories/', ProductCategoryList.as_view(), name='productcategory-list'),
    path('product/categories/<int:pk>/', ProductCategoryDetail.as_view(), name='productcategory-detail'),
    path('profiles/', ProfileList.as_view(), name='profile-list'),
    path('profiles/<int:pk>/', ProfileDetail.as_view(), name='profile-detail'),
    path('users/get_user_pk/', get_user_pk, name='get_user_pk'),
    path('orders/', OrderCreateView.as_view(), name='order-create'),
    path('orders/list/', OrderListView.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)