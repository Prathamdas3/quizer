# Generated by Django 5.1.4 on 2024-12-14 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useranswer',
            name='correct_option',
            field=models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D')], default='', max_length=1),
        ),
    ]
