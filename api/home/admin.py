from django.contrib import admin
from .models import *

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at', 'updated_at')
    search_fields = ('name', 'slug')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'category', 'quantity', 'measure', 'unit_price', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    list_filter = ('category', 'created_at', 'updated_at')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]

# @admin.register(ProductImage)
# class ProductImageAdmin(admin.ModelAdmin):
#     list_display = ('product', 'created_at')
#     search_fields = ('product__name',)

# @admin.register(ProductCategory)
# class ProductCategoryAdmin(admin.ModelAdmin):
#     list_display = ('product', 'category', 'created_at')
#     search_fields = ('product__name', 'category__name')

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone_number')
    search_fields = ('name', 'email', 'phone_number', 'address')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('profile', 'product', 'quantity', 'total_price', 'created_at')
    search_fields = ('profile__name', 'product__name')
    list_filter = ('created_at',)