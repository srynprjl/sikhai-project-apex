from rest_framework import serializers
from .models import Todo, Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'completed', 'created_at', 'todo', 'date']
        read_only_fields = ['created_at', 'todo']

class TodoSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'created_at', 'user', 'tasks']
        read_only_fields = ['created_at', 'user']