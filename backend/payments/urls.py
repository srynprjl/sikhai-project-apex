from django.urls import path
from .views import KhaltiPaymentInitiateView, KhaltiPaymentVerificationView, PurchasedNotesView, FreeNotePurchaseView

urlpatterns = [
    path('khalti-initiate-payment/', KhaltiPaymentInitiateView.as_view(), name='khalti-initiate-payment'),
    path('khalti-verify-payment/', KhaltiPaymentVerificationView.as_view(), name='khalti-verify-payment'),
    path('get-purchased-notes/',PurchasedNotesView.as_view(), name='paid-notes'), 
    path('buy-free-notes/', FreeNotePurchaseView.as_view(), name='free-notes')
]