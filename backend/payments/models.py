from django.db import models
from notes.models import Note
from Authentication.models import CustomUser


class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    notes = models.ManyToManyField(Note, through='OrderItem')
    order_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_completed = models.BooleanField(default=False)
    khalti_idx = models.CharField(max_length=255, blank=True, null=True, unique=True)
    khalti_txn_status = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    note = models.ForeignKey(Note, on_delete=models.CASCADE)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('order', 'note')

    def __str__(self):
        return f"{self.note.title} in Order {self.order.id}"

class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment_details', null=True, blank=True)
    pidx = models.CharField(max_length=255, unique=True, null=True, blank=True)
    khalti_transaction_id = models.CharField(max_length=255, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2) # Amount in NPR
    product_identity = models.CharField(max_length=255, blank=True, null=True)
    product_name = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=50, default='INITIATED') 
    initiate_response = models.JSONField(blank=True, null=True)
    lookup_response = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment {self.pidx} for Order {self.order.id} - Status: {self.status}"