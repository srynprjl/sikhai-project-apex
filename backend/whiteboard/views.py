# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import SikhaiWhiteboard
from .serializers import SikhaiSerializer

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def board_view(request):
    user = request.user

    if request.method == "GET":
        try:
            board = SikhaiWhiteboard.objects.get(user=user)
            serializer = SikhaiSerializer(board)
            return Response(serializer.data)
        except SikhaiWhiteboard.DoesNotExist:
            return Response({"detail": "No board found"}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == "POST":
        try:
            board = SikhaiWhiteboard.objects.get(user=user)
            serializer = SikhaiSerializer(board, data=request.data)
        except SikhaiWhiteboard.DoesNotExist:
            serializer = SikhaiSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)