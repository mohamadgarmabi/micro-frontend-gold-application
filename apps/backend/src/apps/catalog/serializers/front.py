from rest_framework import serializers

from apps.catalog.models import CategoryModel

class FrontCategorySerializer(serializers.ModelSerializer):
  class Meta: 
    model = CategoryModel
    fields =("id", "title", "description", "is_public")
