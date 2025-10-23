# newsfeeds/views.py

from rest_framework import viewsets, filters
from .models import NewsArticle
from .serializers import NewsArticleSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response

class NewsArticleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Provides GET endpoints for NewsArticle
    """
    queryset = NewsArticle.objects.all().order_by('-published')
    serializer_class = NewsArticleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['title', 'category', 'summary', 'source']
    filterset_fields = ['category', 'source']


@api_view(['GET'])
def categories_list(request):
    """
    Returns a list of unique categories from NewsArticle
    """
    categories = NewsArticle.objects.values_list('category', flat=True).distinct()
    return Response(list(categories))
