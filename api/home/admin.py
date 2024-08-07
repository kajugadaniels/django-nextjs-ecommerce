from django.contrib import admin
from.models import *

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Profile)
admin.site.register(Order)
admin.site.register(ProductImage)

class SpaceImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1