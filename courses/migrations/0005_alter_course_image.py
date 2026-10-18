from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("courses", "0004_coursedetail")]
    operations = [migrations.AlterField(
        model_name="course",
        name="image",
        field=models.ImageField(blank=True, null=True, upload_to="courses/"),
    )]
