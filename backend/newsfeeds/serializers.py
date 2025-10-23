# newsfeeds/serializers.py

from rest_framework import serializers
from .models import NewsArticle

class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'link', 'category', 'published', 'summary', 'source']
