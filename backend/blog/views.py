from rest_framework import viewsets, permissions, generics
from django.contrib.auth.models import User
from .models import Post
from .serializers import PostSerializer, RegisterSerializer, UserSerializer
from .permissions import IsAuthorOrReadOnly

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        # We enforce that a user must be authenticated to create a post.
        # The permission class ensures this, but we also explicitly safely assign the author.
        if self.request.user.is_authenticated:
            serializer.save(author=self.request.user)
        else:
            # Should technically be caught by permission classes, but as a fallback:
            raise permissions.PermissionDenied("You must be logged in to create a post.")
