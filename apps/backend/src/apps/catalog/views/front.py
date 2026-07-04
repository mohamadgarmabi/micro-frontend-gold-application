from rest_framework import viewsets
from apps.catalog.models import CategoryModel
from apps.catalog.serializers.front import FrontCategorySerializer


class FrontCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
  A read-only viewset for listing and retrieving public Category instances for the frontend.
  """

    queryset = CategoryModel.objects.all()
    serializer_class = FrontCategorySerializer
