# Generated by Django 3.1.7 on 2021-04-05 20:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20210406_0139'),
    ]

    operations = [
        migrations.AddField(
            model_name='requests',
            name='patientname',
            field=models.CharField(default='Patient', max_length=100),
        ),
    ]
