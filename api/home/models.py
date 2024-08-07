import os
import random
from django.db import models
from django.utils.text import slugify
from imagekit.processors import ResizeToFill
from imagekit.models import ProcessedImageField

class Category(models.Model):
    name = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name

def product_image_path(instance, filename):
    base_filename, file_extension = os.path.splitext(filename)
    return f'products/product_{slugify(instance.name)}_{instance.price}{file_extension}'

class Product(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(unique=True, blank=True)
    image = ProcessedImageField(
        upload_to=product_image_path,
        processors=[ResizeToFill(1296, 1296)],
        format='JPEG',
        options={'quality': 90},
        null=True, blank=True
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    date = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name 

def Product_add_on_image_path(instance, filename):
    base_filename, file_extension = os.path.splitext(filename)
    random_number = random.randint(1000, 9999)
    return f'products/add_on/{random_number}_{instance.created_at}{file_extension}'

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = ProcessedImageField(
        upload_to=Product_add_on_image_path,
        processors=[ResizeToFill(1296, 1296)],
        format='JPEG',
        options={'quality': 90},
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"Image for {self.product.name} - {self.created_at}"

def profile_image_path(instance, filename):
    base_filename, file_extension = os.path.splitext(filename)
    return f'profiles/profile_{slugify(instance.name)}_{instance.price}{file_extension}'

class Profile(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    image = ProcessedImageField(
        upload_to=profile_image_path,
        processors=[ResizeToFill(1296, 1556)],
        format='JPEG',
        options={'quality': 90},
        null=True,
        blank=True
    )
    email = models.EmailField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Profile, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
class Order(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField(null=True, blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.profile} - {self.product}'
    
def Product_add_on_image_path(instance, filename):
    base_filename, file_extension = os.path.splitext(filename)
    random_number = random.randint(1000, 9999)
    return f'spaces/add_on/{random_number}_{instance.created_at}{file_extension}'

class ProductImage(models.Model):
    space = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = ProcessedImageField(
        upload_to=Product_add_on_image_path,
        processors=[ResizeToFill(1296, 1296)],
        format='JPEG',
        options={'quality': 90},
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"Image for {self.space.name} - {self.created_at}"


