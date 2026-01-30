from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `author` attribute.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request (authenticated or not),
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # However, the view itself might require authentication (IsAuthenticatedOrReadOnly),
        # so we can rely on that first.
        
        # If the view already requires authentication, we assume standard read-only methods are safe
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the author of the post.
        return obj.author == request.user
