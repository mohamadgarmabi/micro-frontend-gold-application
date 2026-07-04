from django.contrib import admin
from treebeard.admin import TreeAdmin
from treebeard.forms import movenodeform_factory
from .models import (
    CategoryModel,
    ProductsClassModel,
    OptionGroupModel,
    ProductsAttributeModel,
    ProductsOptionModel,
)

# Register your models here.
class AdminCategory(TreeAdmin):
    form = movenodeform_factory(CategoryModel)

admin.site.register(CategoryModel, AdminCategory)
admin.site.register(OptionGroupModel)


class ProductOptionInline(admin.TabularInline):
    model = ProductsOptionModel
    extra = 1


class ProductAttributeInline(admin.TabularInline):
    model = ProductsAttributeModel
    extra = 1


@admin.register(ProductsClassModel)
class AdminProduct(admin.ModelAdmin):
    inlines = [ProductAttributeInline, ProductOptionInline]
    list_display = (
        "title",
        "slug",
        "description",
        "track_stock",
        "shipping_required",
    )
    list_filter = ("track_stock", "shipping_required", "title")
