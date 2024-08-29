import random
from django.core.management.base import BaseCommand
from faker import Faker
from django.utils.text import slugify
from home.models import Category, Product, ProductImage
from django.core.files.base import ContentFile
from PIL import Image
import io

class Command(BaseCommand):
    help = 'Create fake category, product, and product image entries'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # List of food-related words for category and product names
        food_words = [
            'Fruit', 'Vegetable', 'Grain', 'Dairy', 'Meat', 'Seafood', 'Spice', 'Herb',
            'Nut', 'Seed', 'Apple', 'Banana', 'Carrot', 'Potato', 'Tomato', 'Lettuce',
            'Spinach', 'Broccoli', 'Cauliflower', 'Pea', 'Corn', 'Rice', 'Wheat', 'Oat',
            'Milk', 'Cheese', 'Yogurt', 'Beef', 'Chicken', 'Pork', 'Salmon', 'Tuna',
            'Shrimp', 'Cinnamon', 'Pepper', 'Ginger', 'Garlic', 'Basil', 'Oregano',
            'Thyme', 'Almond', 'Walnut', 'Peanut', 'Sunflower', 'Pumpkin', 'Flax'
        ]

        # Create 10 fake categories
        for _ in range(10):
            name = fake.word(ext_word_list=food_words)
            slug = slugify(name)
            # Append a random number to the slug if it already exists
            while Category.objects.filter(slug=slug).exists():
                slug = f'{slug}-{random.randint(1, 9999)}'
            category = Category(name=name, slug=slug)
            category.save()

        # Create 50 fake products
        for _ in range(50):
            name = fake.sentence(nb_words=3, ext_word_list=food_words)
            category = Category.objects.order_by('?').first()
            unit_price = round(random.uniform(1, 100), 2)
            quantity = random.randint(1, 1000)
            measure = random.choice(['KG'])
            description = f"Delicious {name.lower()} perfect for your next meal!, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            slug = slugify(name)
            # Append a random number to the slug if it already exists
            while Product.objects.filter(slug=slug).exists():
                slug = f'{slug}-{random.randint(1, 9999)}'

            # Generate a fake image for the product
            img_byte_arr = io.BytesIO()
            image = Image.new('RGB', (1296, 1296), (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)))
            image.save(img_byte_arr, format='JPEG')
            img_byte_arr = img_byte_arr.getvalue()

            product = Product(
                name=name,
                slug=slug,
                category=category,
                unit_price=unit_price,
                quantity=quantity,
                measure=measure,
                description=description,
                image=ContentFile(img_byte_arr, name=f'product_{slug}_{unit_price}.jpeg')
            )
            product.save()

            # Create 3 fake product images for each product
            for _ in range(3):
                # Generate a fake image for the product
                img_byte_arr = io.BytesIO()
                image = Image.new('RGB', (1296, 1296), (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)))
                image.save(img_byte_arr, format='JPEG')
                img_byte_arr = img_byte_arr.getvalue()

                product_image = ProductImage(
                    product=product,
                    image=ContentFile(img_byte_arr, name=f'product_image_{slug}_{product.id}.jpeg')
                )
                product_image.save()

        self.stdout.write(self.style.SUCCESS('Successfully created fake categories, products, and product images'))