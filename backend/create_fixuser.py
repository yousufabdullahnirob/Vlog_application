import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

User = get_user_model()
username = 'fixuser'
password = 'password123'

try:
    user = User.objects.get(username=username)
    user.set_password(password)
    user.save()
    print(f"Successfully reset password for existing user: {username}")
except User.DoesNotExist:
    User.objects.create_user(username=username, email='fixuser@example.com', password=password)
    print(f"Successfully created new user: {username}")
