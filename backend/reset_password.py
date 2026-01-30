import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

User = get_user_model()
username = 'admin'
password = 'password123'

try:
    user = User.objects.get(username=username)
    user.set_password(password)
    user.save()
    print(f"Successfully reset password for user: {username}")
except User.DoesNotExist:
    print(f"User {username} not found. Creating new superuser.")
    User.objects.create_superuser(username, 'admin@example.com', password)
