# Generated by Django 3.1.7 on 2021-04-01 07:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210401_1241'),
    ]

    operations = [
        migrations.AddField(
            model_name='cardiacrequested',
            name='request',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='api.requests'),
        ),
    ]
