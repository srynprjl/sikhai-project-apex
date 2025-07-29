import requests
import os
from decimal import Decimal
from django.conf import settings
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db import transaction
from rest_framework import generics, permissions, views, status
from tutor.models import Classroom, Enrollment
from rest_framework.response import Response
from notes.models import Note
from .models import Order, OrderNoteItem, OrderClassroomItem, Payment
from .serializers import NoteSerializer, OrderNoteItemSerializer,OrderClassroomItemSerializer, OrderSerializer
from django.db.models import Sum
from django.db.models.functions import TruncDate #
from .serializers import TotalPaymentsSerializer, DailyPaymentSerializer

class NoteListView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.AllowAny]

class PurchasedNotesView(generics.ListAPIView):
    serializer_class = OrderNoteItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return OrderNoteItem.objects.filter(
            order__user=self.request.user,
            order__is_completed=True
        ).select_related('note', 'order')

class PurchasedClassroomsView(generics.ListAPIView):
    serializer_class = OrderClassroomItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return OrderClassroomItem.objects.filter(
            order__user=self.request.user,
            order__is_completed=True
        ).select_related('classroom', 'order')

# --- Khalti ePayment Specific Views ---

class KhaltiPaymentInitiateView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        product_details_list = request.data.get('product_details')
        return_url = request.data.get('return_url')
        website_url = request.data.get('website_url')
        payload = request.data

        if not product_details_list or not isinstance(product_details_list, list) or len(product_details_list) == 0:
            return Response({"detail": "Missing product_details list."}, status=status.HTTP_400_BAD_REQUEST)
        if not return_url or not website_url:
            return Response({"detail": "Missing 'return_url' or 'website_url'."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                total_amount_npr = 0
                order = Order.objects.create(
                    user=request.user,
                    total_amount=0,
                    is_completed=False
                )
                

                for product in product_details_list:
                    product_type = product.get('type')  # Expect 'note' or 'classroom'
                    identity = product.get('identity')
                    amount_paisa = product.get('total_price')

                    if not product_type or not identity or not amount_paisa:
                        transaction.set_rollback(True)
                        return Response({"detail": "Missing product type, identity or amount in product details."}, status=status.HTTP_400_BAD_REQUEST)

                    amount_npr = amount_paisa / 100
                    total_amount_npr += amount_npr

                    if product_type == 'note':
                        note = get_object_or_404(Note, id=identity)
                        OrderNoteItem.objects.create(order=order, note=note, price_at_purchase=amount_npr)
                    elif product_type == 'classroom':
                        classroom = get_object_or_404(Classroom, id=identity)
                        OrderClassroomItem.objects.create(order=order, classroom=classroom, price_at_purchase=amount_npr)
                    else:
                        transaction.set_rollback(True)
                        return Response({"detail": f"Invalid product type: {product_type}"}, status=status.HTTP_400_BAD_REQUEST)

                # Update total amount in order
                order.total_amount = total_amount_npr
                order.save()

                khalti_api_url = "https://dev.khalti.com/api/v2/epayment/initiate/"
                headers = {
                    "Authorization": "Key 49f02c7f2bf84e6fa6aedb5328dc2e63",
                    "Content-Type": "application/json",
                }
                khalti_response = requests.post(khalti_api_url, json=payload, headers=headers)
                khalti_response.raise_for_status()
                khalti_data = khalti_response.json()

                pidx = khalti_data.get('pidx')
                payment_url = khalti_data.get('payment_url')

                if not pidx or not payment_url:
                    raise Exception("Khalti initiate API did not return pidx or payment_url.")

                Payment.objects.create(
                    order=order,
                    pidx=pidx,
                    amount=total_amount_npr,
                    product_identity=",".join([str(p.get("identity")) for p in product_details_list]),
                    product_name="Multiple Products" if len(product_details_list) > 1 else product_details_list[0].get('name', ''),
                    initiate_response=khalti_data,
                    status='INITIATED'
                )

                return Response({'payment_url': payment_url}, status=status.HTTP_200_OK)

        except (Note.DoesNotExist, Classroom.DoesNotExist):
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
        except requests.exceptions.RequestException as e:
            print(f"Khalti API initiate error: {e.response.text if e.response else e}")
            return Response(
                {'detail': f'Failed to communicate with Khalti API: {e.response.text if e.response else e}'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        except Exception as e:
            print(f"Error during payment initiation: {e}")
            return Response({'detail': f'An internal error occurred: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class KhaltiPaymentVerificationView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        pidx = request.data.get("pidx")
        if not pidx:
            return Response({"detail": "Missing pidx from Khalti callback."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            payment_object = get_object_or_404(Payment, pidx=pidx)
            order = payment_object.order
            if order.user != request.user:
                return Response({"detail": "Unauthorized: This payment does not belong to your account."}, status=status.HTTP_403_FORBIDDEN)
            if order.is_completed:
                return Response({"detail": "Order already completed."}, status=status.HTTP_200_OK)
            khalti_lookup_api_url = "https://dev.khalti.com/api/v2/epayment/lookup/" # 
            headers = {
                "Authorization": f"Key 49f02c7f2bf84e6fa6aedb5328dc2e63",
                "Content-Type": "application/json",
            }
            lookup_payload = {
                "pidx": pidx
            }
            khalti_response = requests.post(khalti_lookup_api_url, json=lookup_payload, headers=headers)
            khalti_response.raise_for_status()
            khalti_data = khalti_response.json()
            payment_object.lookup_response = khalti_data
            khalti_status = khalti_data.get('status')
            khalti_transaction_id = khalti_data.get('transaction_id')
            with transaction.atomic():
                payment_object.status = khalti_status
                payment_object.khalti_transaction_id = khalti_transaction_id
                
                if khalti_status == 'Completed':
                    if int(khalti_data.get('total_amount', 0)) != int(order.total_amount * 100):
                        payment_object.status = 'AMOUNT_MISMATCH'
                        payment_object.save()
                        return Response(
                            {"detail": "Amount mismatch detected. Payment not verified.", "status": "AMOUNT_MISMATCH"},
                            status=status.HTTP_400_BAD_REQUEST
                        )

                    order.is_completed = True
                    order.khalti_idx = pidx
                    order.khalti_txn_status= khalti_status
                    order.save()

                    if order.note_items.first():
                        item = order.note_items.first()
                        # print("Note: " + item)
                        if item.note.author: 
                            creator = item.note.author
                            # print("Note: " + creator)
                            earnings = float(item.price_at_purchase) * float(0.95)
                            # print("Note: " + earnings)
                            creator.earnings += earnings
                            # print("Note: " + creator.earnings)
                            creator.save()

                    if order.classroom_items.first():
                        item = order.classroom_items.first()
                        if item.classroom.tutor:
                            creator = item.classroom.tutor
                            # print("Class: " + creator)
                            earnings = float(item.price_at_purchase) * float(0.80)
                            # print("Class: " + earnings)
                            creator.earnings += earnings
                            # print("Class: " + creator.earnings)
                            creator.save()


                    classroom_items = order.classroom_items.all()
                    for classroom_item in classroom_items:
                        Enrollment.objects.get_or_create(
                            user=order.user,
                            classroom=classroom_item.classroom,
                            defaults={'paid': True}
                    )

                    payment_object.save()

                    return Response({"detail": "Payment successfully verified and order completed!", "status": khalti_status}, status=status.HTTP_200_OK)
                else:
                    payment_object.save()
                    return Response({"detail": f"Payment is {khalti_status}.", "status": khalti_status}, status=status.HTTP_200_OK)

        except Payment.DoesNotExist:
            return Response({"detail": "Payment record not found for this pidx."}, status=status.HTTP_404_NOT_FOUND)
        except requests.exceptions.RequestException as e:
            print(f"Khalti API lookup error: {e.response.text if e.response else e}")
            return Response(
                {'detail': f'Failed to communicate with Khalti API for verification: {e.response.text if e.response else e}'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        except Exception as e:
            print(f"An unexpected error occurred during payment verification: {e}")
            return Response({'detail': f'An internal error occurred: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FreeNotePurchaseView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        note_id = request.data.get('note_id')
        if not note_id:
            return Response({"detail": "Note ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            with transaction.atomic():
                note = get_object_or_404(Note, id=note_id)

                if note.price > 0:
                    return Response({"detail": "This note is not free."}, status=status.HTTP_400_BAD_REQUEST)

                if OrderNoteItem.objects.filter(order__user=request.user, order__is_completed=True, note=note).exists():
                    return Response({"detail": "You have already claimed this note."}, status=status.HTTP_200_OK)

                order = Order.objects.create(
                    user=request.user,
                    total_amount=0.00,
                    is_completed=True
                )
                OrderNoteItem.objects.create(
                    order=order,
                    note=note,
                    price_at_purchase=0.00
                )

                return Response({"detail": "Note successfully claimed!", "status": "claimed"}, status=status.HTTP_200_OK)

        except Note.DoesNotExist:
            return Response({"detail": "Note not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error claiming free note: {e}")
            return Response({"detail": f"An internal error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FreeClassroomPurchaseView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        classroom_id = request.data.get('classroom_id')
        if not classroom_id:
            return Response({"detail": "Classroom ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            with transaction.atomic():
                classroom = get_object_or_404(Classroom, id=classroom_id)

                if classroom.price > 0:
                    return Response({"detail": "This classroom is not free."}, status=status.HTTP_400_BAD_REQUEST)

                if OrderClassroomItem.objects.filter(order__user=request.user, order__is_completed=True, classroom=classroom).exists():
                    return Response({"detail": "You have already claimed this classroom."}, status=status.HTTP_200_OK)

                order = Order.objects.create(
                    user=request.user,
                    total_amount=0.00,
                    is_completed=True
                )

                OrderClassroomItem.objects.create(
                    order=order,
                    classroom=classroom,
                    price_at_purchase=0.00
                )

                classroom_items = order.classroom_items.all()
                for classroom_item in classroom_items:
                    Enrollment.objects.get_or_create(
                        user=order.user,
                        classroom=classroom_item.classroom,
                        defaults={'paid': True}
                    )

                return Response({"detail": "Classroom successfully claimed!", "status": "claimed"}, status=status.HTTP_200_OK)

        except Classroom.DoesNotExist:
            return Response({"detail": "Classroom not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error claiming free classroom: {e}")
            return Response({"detail": f"An internal error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TotalPaymentsView(views.APIView):
    def get(self, request, *args, **kwargs):
        total_payments = Payment.objects.filter(status="Completed").aggregate(total_amount=Sum('amount'))['total_amount']

        if total_payments is None:
            total_payments = 0.00

        serializer = TotalPaymentsSerializer({"total_amount_paid": total_payments})
        return Response(serializer.data)

class DailyPaymentsView(views.APIView):

    def get(self, request, *args, **kwargs):
        daily_payments = Payment.objects.filter(status="Completed").annotate(
            date=TruncDate('created_at') 
        ).values('date').annotate(
            total_amount=Sum('amount') 
        ).order_by('date') 

        serializer = DailyPaymentSerializer(daily_payments, many=True)
        return Response(serializer.data)
