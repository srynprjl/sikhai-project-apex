from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Whiteboard
from .serializers import WhiteboardSerializer

class UserWhiteboardDetailView(generics.RetrieveUpdateAPIView):
    queryset = Whiteboard.objects.all()
    serializer_class = WhiteboardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        whiteboard, created = Whiteboard.objects.get_or_create(user=self.request.user)
        return whiteboard

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
