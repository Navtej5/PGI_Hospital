# Generated by Django 3.1.7 on 2021-05-01 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20210430_1225'),
    ]

    operations = [
        migrations.AddField(
            model_name='requests',
            name='notificationbit',
            field=models.BooleanField(default=False),
        ),
    ]