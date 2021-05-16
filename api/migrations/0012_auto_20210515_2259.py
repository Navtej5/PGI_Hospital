# Generated by Django 3.1.7 on 2021-05-15 17:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_requests_notificationbit'),
    ]

    operations = [
        migrations.AddField(
            model_name='requests',
            name='dateofprocedure',
            field=models.DateField(default=datetime.date(2021, 5, 15)),
        ),
        migrations.AlterField(
            model_name='requests',
            name='consultantflag',
            field=models.CharField(default='F', max_length=1),
        ),
        migrations.AlterField(
            model_name='requests',
            name='doctorflag',
            field=models.CharField(default='F', max_length=1),
        ),
        migrations.AlterField(
            model_name='requests',
            name='nurseflag',
            field=models.CharField(default='F', max_length=1),
        ),
        migrations.AlterField(
            model_name='requests',
            name='perfusionistflag',
            field=models.CharField(default='T', max_length=1),
        ),
        migrations.AlterField(
            model_name='requests',
            name='technicianflag',
            field=models.CharField(default='T', max_length=1),
        ),
    ]
