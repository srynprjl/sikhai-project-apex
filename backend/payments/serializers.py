from rest_framework import serializers
from .models import Note, Order, OrderItem

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'description', 'price', 'created_at']
        read_only_fields = ['created_at'] 

class OrderItemSerializer(serializers.ModelSerializer):
    note_title = serializers.CharField(source='note.title', read_only=True)
    note_description = serializers.CharField(source='note.description', read_only=True)
    note_price = serializers.DecimalField(source='note.price', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'note', 'note_title', 'note_description', 'note_price', 'price_at_purchase']
        read_only_fields = ['id', 'note', 'note_title', 'note_description', 'note_price', 'price_at_purchase']


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True, source='order_items')

    class Meta:
        model = Order
        fields = ['id', 'user', 'order_date', 'total_amount', 'is_completed','khalti_idx', 'khalti_txn_status', 'order_items']
        read_only_fields = ['id', 'user', 'order_date', 'total_amount', 'is_completed','khalti_idx', 'khalti_txn_status']