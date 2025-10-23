# newsfeeds/management/commands/fetch_bbc_news.py

import feedparser
from datetime import datetime
from django.core.management.base import BaseCommand
from newsfeeds.models import NewsArticle

BBC_FEEDS = {
    "top_stories": "https://feeds.bbci.co.uk/news/rss.xml",
    "world": "https://feeds.bbci.co.uk/news/world/rss.xml",
    "africa": "https://feeds.bbci.co.uk/news/world/africa/rss.xml",
    "business": "https://feeds.bbci.co.uk/news/business/rss.xml",
    "technology": "https://feeds.bbci.co.uk/news/technology/rss.xml",
}

class Command(BaseCommand):
    help = "Fetch BBC News RSS feeds and store in the database"

    def handle(self, *args, **kwargs):
        for category, url in BBC_FEEDS.items():
            self.stdout.write(f"Fetching {category}...")
            feed = feedparser.parse(url)

            for entry in feed.entries:
                title = entry.title
                link = entry.link
                summary = entry.get("summary", "")
                published = entry.get("published_parsed")

                if published:
                    published_date = datetime(*published[:6])
                else:
                    published_date = datetime.now()

                _, created = NewsArticle.objects.get_or_create(
                    link=link,
                    defaults={
                        "category": category,
                        "title": title,
                        "summary": summary,
                        "published": published_date,
                    }
                )

                if created:
                    self.stdout.write(f"🆕 Added: {title}")
                else:
                    self.stdout.write(f"⏭ Skipped duplicate: {title}")

        self.stdout.write(self.style.SUCCESS("✅ BBC news fetched successfully!"))
