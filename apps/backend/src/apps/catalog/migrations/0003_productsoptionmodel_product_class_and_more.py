# Generated manually

from django.db import migrations, models
import django.db.models.deletion


def migrate_options_m2m_to_fk(apps, schema_editor):
    ProductsClassModel = apps.get_model("catalog", "ProductsClassModel")
    ProductsOptionModel = apps.get_model("catalog", "ProductsOptionModel")
    ProductsAttributeModel = apps.get_model("catalog", "ProductsAttributeModel")

    for product_class in ProductsClassModel.objects.all():
        for option in product_class.options.all():
            option.product_class = product_class
            option.save(update_fields=["product_class"])

    ProductsOptionModel.objects.filter(product_class__isnull=True).delete()
    ProductsAttributeModel.objects.filter(product_class__isnull=True).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("catalog", "0002_categorymodel_optiongroupmodel_optiongroupvaluemodel_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="productsoptionmodel",
            name="product_class",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="options",
                to="catalog.productsclassmodel",
            ),
        ),
        migrations.RunPython(migrate_options_m2m_to_fk, migrations.RunPython.noop),
        migrations.RemoveField(
            model_name="productsclassmodel",
            name="options",
        ),
        migrations.AlterField(
            model_name="productsoptionmodel",
            name="product_class",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="options",
                to="catalog.productsclassmodel",
            ),
        ),
        migrations.AlterField(
            model_name="productsattributemodel",
            name="product_class",
            field=models.ForeignKey(
                db_index=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="product_attributes",
                to="catalog.productsclassmodel",
            ),
        ),
        migrations.AlterField(
            model_name="productsoptionmodel",
            name="option_group",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="product_options",
                to="catalog.optiongroupmodel",
            ),
        ),
    ]
