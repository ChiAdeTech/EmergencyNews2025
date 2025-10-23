# newsfeeds/management/commands/fetch_premiumtimes_news.py

import feedparser
from datetime import datetime
from django.core.management.base import BaseCommand
from newsfeeds.models import NewsArticle

PREMIUMTIMES_FEEDS = {
    "latest": "https://www.premiumtimesng.com/feed",
    "top-news": "https://www.premiumtimesng.com/news/top-news/feed",
    "more-news": "https://www.premiumtimesng.com/news/more-news/feed",
    "sports": "https://www.premiumtimesng.com/news/sports/feed",
    "business": "https://www.premiumtimesng.com/news/business/feed",
}

class Command(BaseCommand):
    help = "Fetch Premium Times Nigeria RSS feeds and store in the database"

    def handle(self, *args, **kwargs):
        for category, url in PREMIUMTIMES_FEEDS.items():
            self.stdout.write(f"Fetching {category} news from Premium Times...")
            feed = feedparser.parse(url)

            for entry in feed.entries:
                title = entry.title
                link = entry.link
                summary = entry.get("summary", "")
                published = entry.get("published_parsed")
                published_date = datetime(*published[:6]) if published else datetime.now()
                # author = getattr(entry, "author", "Premium Times")

                # Avoid duplicates
                _, created = NewsArticle.objects.get_or_create(
                    link=link,
                    defaults={
                        "category": category,
                        "title": title,
                        "summary": summary,
                        "published": published_date,
                        "source": "Premium Times",
                        # "author": author,
                    }
                )

                if created:
                    self.stdout.write(f"🆕 Added: {title}")
                else:
                    self.stdout.write(f"⏭ Skipped duplicate: {title}")

        self.stdout.write(self.style.SUCCESS("✅ Premium Times news fetched successfully!"))
