# Generated by Django 5.0.4 on 2024-08-19 16:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0011_order_shipping_address_order_shipping_city_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='product_id',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='product_name',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='unit_price',
        ),
        migrations.AddField(
            model_name='orderitem',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='home.product'),
        ),
    ]