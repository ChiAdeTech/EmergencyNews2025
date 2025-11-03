# newsfeeds/models.py
from django.db import models

class NewsArticle(models.Model):
    category = models.CharField(max_length=100)
    title = models.CharField(max_length=500)
    link = models.URLField(unique=True)
    published = models.DateTimeField()
    summary = models.TextField(blank=True)
    source = models.CharField(max_length=100, default="BBC")
    # image = models.URLField(blank=True, null=True)  # <-- new field
    image = models.CharField(max_length=1000, blank=True, null=True)


    def __str__(self):
        return f"{self.source} | {self.title[:50]}"
