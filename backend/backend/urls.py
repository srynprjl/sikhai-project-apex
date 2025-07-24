
from django.contrib import admin
from django.urls import path , include
from Authentication.views import CreateUserView,  SelfView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from whiteboard.views import board_view
from admins.views import CustomUserViewSet


urlpatterns = [
    path('admin/', admin.site.urls),

    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api/board/", board_view, name="board"),
    path('api/users/', CustomUserViewSet.as_view({'get': 'list', 'post': 'create'}), name='user-list'),
    path('api/users/<int:pk>/', CustomUserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='user-detail'),
    path("api/", include("notes.urls")),
    path("api/", include("todo.urls")),
    path('api/user/', SelfView.as_view(), name='self_user'),
    path("api-auth/", include("rest_framework.urls")),
    path('api/', include('feedback.urls')),
    # path('api/feedback/', include('Feedback.urls')),
]

