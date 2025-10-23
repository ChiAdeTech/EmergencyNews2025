# newsfeeds/management/commands/fetch_aljazeera_news.py


import feedparser
from datetime import datetime
from django.core.management.base import BaseCommand
from newsfeeds.models import NewsArticle

GUARDIAN_FEEDS = {
    "world": "https://www.theguardian.com/world/rss",
    "politics": "https://www.theguardian.com/politics/rss",
    "business": "https://www.theguardian.com/uk/business/rss",
}


class Command(BaseCommand):
    help = "Fetch Reuters News RSS feeds and store in the database"

    def handle(self, *args, **kwargs):
        for category, url in GUARDIAN_FEEDS.items():
            self.stdout.write(f"Fetching {category}...")
            feed = feedparser.parse(url)

            for entry in feed.entries:
                title = entry.title
                link = entry.link
                summary = entry.get("summary", "")
                published = entry.get("published_parsed")

                published_date = datetime(*published[:6]) if published else datetime.now()

                _, created = NewsArticle.objects.get_or_create(
                    link=link,
                    defaults={
                        "category": category,
                        "title": title,
                        "summary": summary,
                        "published": published_date,
                        "source": "The Guardian",
                    }
                )

                if created:
                    self.stdout.write(f"🆕 Added: {title}")
                else:
                    self.stdout.write(f"⏭ Skipped duplicate: {title}")

        self.stdout.write(self.style.SUCCESS("✅ The Guardian news fetched successfully!"))
