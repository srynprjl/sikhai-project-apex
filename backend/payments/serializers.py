from rest_framework import serializers
from notes.models import Note
from tutor.models import Classroom
from .models import Order, OrderNoteItem, OrderClassroomItem, Payment


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'price']  # Add more as needed


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ['id', 'name', 'price']  # Adjust fields as needed


class OrderNoteItemSerializer(serializers.ModelSerializer):
    note = NoteSerializer()
    seller_earning = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = OrderNoteItem
        fields = ['id', 'note', 'price_at_purchase', 'seller_earning']


class OrderClassroomItemSerializer(serializers.ModelSerializer):
    classroom = ClassroomSerializer()
    seller_earning = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = OrderClassroomItem
        fields = ['id', 'classroom', 'price_at_purchase', 'seller_earning']


class OrderSerializer(serializers.ModelSerializer):
    note_items = OrderNoteItemSerializer(many=True, read_only=True)
    classroom_items = OrderClassroomItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'order_date', 'total_amount', 'is_completed', 'note_items', 'classroom_items', 'khalti_idx', 'khalti_txn_status']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class TotalPaymentsSerializer(serializers.Serializer):
    total_amount_paid = serializers.DecimalField(max_digits=15, decimal_places=2)


class DailyPaymentSerializer(serializers.Serializer):
    date = serializers.DateField()
    total_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
