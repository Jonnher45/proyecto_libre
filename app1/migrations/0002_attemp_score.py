# Generated by Django 4.2.4 on 2023-08-11 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='attemp',
            name='score',
            field=models.IntegerField(default=0),
        ),
    ]
