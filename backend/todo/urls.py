from django.urls import path
from .views import TodoListCreateView, TodoDetailView, TaskListCreateView, TaskDetailView, TaskCompleteToggleView

urlpatterns = [
    path('todos/', TodoListCreateView.as_view(), name='todo-list-create'),
    path('todos/<int:pk>/', TodoDetailView.as_view(), name='todo-detail'),
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('tasks/<int:pk>/toggle-complete/', TaskCompleteToggleView.as_view(), name='task-toggle-complete'),
]