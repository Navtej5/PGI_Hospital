# Generated by Django 3.1.7 on 2021-05-15 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_requests_notificationbit'),
    ]

    operations = [
        migrations.AddField(
            model_name='requests',
            name='dateofprocedure',
            field=models.DateField(auto_now_add=True, default='2000-01-01'),
            preserve_default=False,
        ),
    ]