from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Profile, Todo

User = get_user_model()

class UserProfileTodoTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            username='testuser',
            password='securepassword123'
        )

    def test_user_creation(self):
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(self.user.email, 'testuser@example.com')
        self.assertTrue(self.user.check_password('securepassword123'))

    def test_profile_auto_created(self):
        profile = Profile.objects.get(user=self.user)
        self.assertIsInstance(profile, Profile)
        self.assertEqual(profile.user, self.user)
        self.assertFalse(profile.verified)
        self.assertEqual(profile.image.name, 'default.jpg')

    def test_profile_update(self):
        profile = Profile.objects.get(user=self.user)
        profile.full_name = "Test User"
        profile.bio = "This is a test bio."
        profile.verified = True
        profile.save()

        updated_profile = Profile.objects.get(user=self.user)
        self.assertEqual(updated_profile.full_name, "Test User")
        self.assertEqual(updated_profile.bio, "This is a test bio.")
        self.assertTrue(updated_profile.verified)

    def test_create_todo(self):
        todo = Todo.objects.create(
            user=self.user,
            title="Test To-Do Item"
        )
        self.assertEqual(Todo.objects.count(), 1)
        self.assertEqual(todo.user, self.user)
        self.assertEqual(todo.title, "Test To-Do Item")
        self.assertFalse(todo.completed)
        self.assertTrue(todo.date)

    def test_todo_str_method(self):
        long_title = "A" * 100  # Longer than 30 chars
        todo = Todo.objects.create(user=self.user, title=long_title)
        self.assertEqual(str(todo), long_title[:30])
