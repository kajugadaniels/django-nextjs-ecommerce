# Generated by Django 5.0.7 on 2024-08-07 13:19

import django.db.models.deletion
import home.models
import imagekit.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_remove_profile_telephone_product_slug_profile_image_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', imagekit.models.fields.ProcessedImageField(blank=True, null=True, upload_to=home.models.Product_add_on_image_path)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('space', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='home.product')),
            ],
        ),
    ]
