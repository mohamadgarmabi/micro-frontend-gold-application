from django.db import models
from treebeard.mp_tree import MP_Node

# Create your models here.
class CategoryModel(MP_Node):
    title = models.CharField(max_length=255, db_index=True)
    description = models.CharField(max_length=2048, null=True, blank=True)
    is_public = models.BooleanField(default=True)
    slug = models.SlugField(unique=True , allow_unicode=True)
    
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.title


#
class OptionGroupModel(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    class Meta:
        verbose_name = "Option Group"
        verbose_name_plural = "Option Groups"

    def __str__(self):
        return self.title


class OptionGroupValueModel(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    group = models.ForeignKey(OptionGroupModel, db_index=True, on_delete=models.CASCADE)
    class Meta:
        verbose_name = "Option Group Value"
        verbose_name_plural = "Option Group Values"

    def __str__(self):
        return self.title


class ProductsClassModel(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    description = models.CharField(max_length=2048, null=True, blank=True)
    slug = models.SlugField(unique=True , allow_unicode=True)
    track_stock= models.BooleanField(default=True)
    shipping_required= models.BooleanField(default=True)

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def has_attributes(self):
        return self.product_attributes.exists()

    def __str__(self):
        return self.title


class ProductsAttributeModel(models.Model):
    class AttributesTypeChoice(models.TextChoices):
        text="text"
        integer = "integer"
        float = "float"
        option ="option"
        multi_option ="multi_option"

    product_class = models.ForeignKey(
        ProductsClassModel,
        db_index=True,
        on_delete=models.CASCADE,
        null=False,
        related_name="product_attributes",
    )
    type = models.CharField(
        max_length=16,
        choices=AttributesTypeChoice.choices,
        default=AttributesTypeChoice.text)
    title=models.CharField(max_length=64)
    option_group = models.ForeignKey(OptionGroupModel, on_delete=models.PROTECT, null=True, blank=True)
    required = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Product Attribute"
        verbose_name_plural = "Product Attributes"

    def __str__(self):
        return self.title


class ProductsOptionModel(models.Model):
    class OptionTypeChoice(models.TextChoices):
        text = "text"
        integer = "integer"
        float = "float"
        option = "option"
        multi_option = "multi_option"

    product_class = models.ForeignKey(
        ProductsClassModel,
        on_delete=models.CASCADE,
        related_name="options",
    )
    type = models.CharField(
        max_length=16,
        choices=OptionTypeChoice.choices,
        default=OptionTypeChoice.text,
    )
    title = models.CharField(max_length=64)
    option_group = models.ForeignKey(
        OptionGroupModel,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="product_options",
    )
    required = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Product Option"
        verbose_name_plural = "Product Options"

    def __str__(self):
        return self.title
