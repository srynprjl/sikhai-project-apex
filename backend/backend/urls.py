
from django.contrib import admin
from django.urls import path , include
from Authentication.views import CreateUserView
from whiteboard.views import SikhaiBoardViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path('api/boards/', SikhaiBoardViewSet.as_view({'get': 'list', 'post': 'create'}), name='excalidrawboard-list'),
    path('api/boards/<int:pk>/', SikhaiBoardViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='excalidrawboard-detail'),

    path("api-auth/", include("rest_framework.urls"))
]

