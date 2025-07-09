from rest_framework import serializers
from .models import Todo, Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'completed', 'date']

class TodoSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, required=False)

    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'date', 'tasks']

    def create(self, validated_data):
        tasks_data = validated_data.pop('tasks', [])
        todo = Todo.objects.create(**validated_data)
        for task_data in tasks_data:
            Task.objects.create(todo=todo, **task_data)
        return todo