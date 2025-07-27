from rest_framework import permissions

class IsTutor(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        return hasattr(request.user, 'is_tutor') and request.user.is_tutor
