from django.db import models


class Items(models.Model):
    name = models.TextField(max_length=100)