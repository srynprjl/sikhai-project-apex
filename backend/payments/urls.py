from django.urls import path
from .views import KhaltiPaymentInitiateView, KhaltiPaymentVerificationView, PurchasedNotesView, FreeNotePurchaseView, TotalPaymentsView, DailyPaymentsView, PurchasedClassroomsView, FreeClassroomPurchaseView

urlpatterns = [
    path('khalti-initiate-payment/', KhaltiPaymentInitiateView.as_view(), name='khalti-initiate-payment'),
    path('khalti-verify-payment/', KhaltiPaymentVerificationView.as_view(), name='khalti-verify-payment'),
    path('get-purchased-notes/',PurchasedNotesView.as_view(), name='paid-notes'), 
    path('get-purchased-classes/',PurchasedClassroomsView.as_view(), name='paid-notes'), 
    path('buy-free-notes/', FreeNotePurchaseView.as_view(), name='free-notes'),
    path('buy-free-classrooms/', FreeClassroomPurchaseView.as_view(), name='free-notes'),
    path('payments/total/', TotalPaymentsView.as_view(), name='total-payments'),
    path('payments/daily/', DailyPaymentsView.as_view(), name='daily-payments'),
]
