from rest_framework import serializers
from .models import *

class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'slug']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        category_data = validated_data.pop('category', None)
        product = super(ProductSerializer, self).create(validated_data)
        if category_data:
            category, created = Category.objects.get_or_create(**category_data)
            ProductCategory.objects.get_or_create(product=product, category=category)
        return product

    def update(self, instance, validated_data):
        category_data = validated_data.pop('category', None)
        instance = super(ProductSerializer, self).update(instance, validated_data)
        if category_data:
            category, created = Category.objects.get_or_create(**category_data)
            ProductCategory.objects.get_or_create(product=instance, category=category)
        return instance

class ProductCategorySerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = ProductCategory
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product_id', 'product_name', 'quantity', 'unit_price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_amount', 'payment_status', 'created_at', 'updated_at', 'items', 'shipping_address', 'shipping_city', 'shipping_zip_code', 'shipping_phone']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order