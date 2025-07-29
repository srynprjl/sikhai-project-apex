from django.contrib import admin
from .models import Payment, Order, OrderNoteItem, OrderClassroomItem
# Register your models here.
admin.site.register(Payment)
admin.site.register(Order)
admin.site.register(OrderNoteItem)
admin.site.register(OrderClassroomItem)
