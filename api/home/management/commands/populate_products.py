import os
from django.core.management.base import BaseCommand
from faker import Faker
from home.models import *
from django.utils.text import slugify
from PIL import Image, ImageDraw
import io
from django.core.files import File

class Command(BaseCommand):
    help = 'Populate the database with 30 fake products'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Ensure a default category exists
        category, created = Category.objects.get_or_create(name="Default Category")

        for _ in range(30):
            name = fake.word().capitalize()
            price = fake.random_number(digits=3) + fake.random_number(digits=2) / 100
            description = fake.text()
            slug = slugify(name)
            
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

    def create_fake_image(self, name, price):
        # Create a simple image with Pillow
        image = Image.new('RGB', (1296, 1556), color = 'blue')
        d = ImageDraw.Draw(image)
        d.text((10,10), f'{name}\n${price}', fill=(255,255,0))

        # Save the image to a bytes buffer
        buffer = io.BytesIO()
        image.save(buffer, format='JPEG')
        buffer.seek(0)

        # Create Django File object
        image_file = File(buffer, name=f'product_{slugify(name)}_{price}.jpg')

        return image_file
