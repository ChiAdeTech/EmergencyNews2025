# newsfeeds/models.py

from django.db import models

class Region(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.name

class NewsArticle(models.Model):
    # Existing fields
    title = models.CharField(max_length=500)
    link = models.URLField(unique=True)
    published = models.DateTimeField()
    summary = models.TextField(blank=True)
    source = models.CharField(max_length=100, default="BBC")
    image = models.CharField(max_length=1000, blank=True, null=True)

    category = models.CharField(max_length=100, blank=True, null=True)

    # New relationships for AllAfrica
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, blank=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return f"{self.source} | {self.title[:50]}"
