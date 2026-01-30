from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CreateUserView

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/register/', CreateUserView.as_view(), name='register'),
]
