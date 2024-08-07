import os
import uuid
from django.core.management.base import BaseCommand
from faker import Faker
from home.models import Category, Product
from django.utils.text import slugify
from PIL import Image, ImageDraw
import io
from django.core.files import File
import random

class Command(BaseCommand):
    help = 'Populate the database with 30 fake products'

    COLORS = ['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown']

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Ensure a default category exists
        category, created = Category.objects.get_or_create(name="Default Category")

        for _ in range(30):
            name = fake.word().capitalize()
            price = fake.random_number(digits=3) + fake.random_number(digits=2) / 100
            description = fake.text()
            slug = self.generate_unique_slug(name)
            
            # Create fake image
            image = self.create_fake_image(name, price)

            Product.objects.create(
                name=name,
                slug=slug,
                price=price,
                description=description,
                category=category,
                image=image
            )
            
            self.stdout.write(self.style.SUCCESS(f'Successfully created product {name}'))

    def generate_unique_slug(self, name):
        base_slug = slugify(name)
        unique_slug = base_slug
        while Product.objects.filter(slug=unique_slug).exists():
            unique_slug = f"{base_slug}-{uuid.uuid4().hex[:4]}"
        return unique_slug

    def create_fake_image(self, name, price):
        # Choose a random color for the image
        color = random.choice(self.COLORS)
        image = Image.new('RGB', (1296, 1556), color=color)
        d = ImageDraw.Draw(image)
        text = f'{name}\n${price:.2f}'
        d.text((10, 10), text, fill=(255, 255, 255))

        # Save the image to a bytes buffer
        buffer = io.BytesIO()
        image.save(buffer, format='JPEG')
        buffer.seek(0)

        # Create Django File object with unique name using UUID
        unique_image_name = f'product_{uuid.uuid4()}.jpg'
        image_file = File(buffer, name=unique_image_name)

        return image_file
