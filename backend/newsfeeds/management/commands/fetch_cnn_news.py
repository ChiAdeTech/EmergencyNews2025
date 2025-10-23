# newsfeeds/management/commands/fetch_cnn_news.py
import feedparser
from datetime import datetime
from django.core.management.base import BaseCommand
from newsfeeds.models import NewsArticle

CNN_FEEDS = {
    "top_stories": "http://rss.cnn.com/rss/cnn_topstories.rss",
    "world": "http://rss.cnn.com/rss/cnn_world.rss",
}

class Command(BaseCommand):
    help = "Fetch CNN News RSS feeds and store in the database"

    def handle(self, *args, **kwargs):
        for category, url in CNN_FEEDS.items():
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
                        "source": "CNN",
                    }
                )

                if created:
                    self.stdout.write(f"🆕 Added: {title}")
                else:
                    self.stdout.write(f"⏭ Skipped duplicate: {title}")

        self.stdout.write(self.style.SUCCESS("✅ CNN news fetched successfully!"))
