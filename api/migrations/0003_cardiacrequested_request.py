# Generated by Django 3.1.7 on 2021-03-14 09:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_cardiacrequested'),
    ]

    operations = [
        migrations.AddField(
            model_name='cardiacrequested',
            name='request',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='api.requests'),
        ),
    ]