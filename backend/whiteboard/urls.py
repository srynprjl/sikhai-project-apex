from django.urls import path
from .views import UserWhiteboardDetailView #, WhiteboardListView

urlpatterns = [
    path('whiteboard/', UserWhiteboardDetailView.as_view(), name='user-whiteboard-detail'),
]
