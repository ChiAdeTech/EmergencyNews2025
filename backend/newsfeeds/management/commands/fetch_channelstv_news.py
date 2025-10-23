# newsfeeds/management/commands/fetch_channelstv_news.py

import feedparser
from datetime import datetime
from django.core.management.base import BaseCommand
from newsfeeds.models import NewsArticle

CHANNELS_FEEDS = {
    "latest": "https://www.channelstv.com/feed/",
    "politics": "https://www.channelstv.com/category/politics/feed/",
    "business": "https://www.channelstv.com/category/business/feed/",
    "sports": "https://www.channelstv.com/category/sports/feed/",
    "entertainment": "https://www.channelstv.com/category/entertainment/feed/",
}

class Command(BaseCommand):
    help = "Fetch Channels TV News RSS feeds and store in the database"

    def handle(self, *args, **kwargs):
        for category, url in CHANNELS_FEEDS.items():
            self.stdout.write(f"Fetching {category} news from Channels TV...")
            feed = feedparser.parse(url)

            for entry in feed.entries:
                title = entry.title
                link = entry.link
                summary = entry.get("summary", "")
                published = entry.get("published_parsed")
                published_date = datetime(*published[:6]) if published else datetime.now()
                # author = getattr(entry, "author", "Channels TV")

                # Avoid duplicates
                _, created = NewsArticle.objects.get_or_create(
                    link=link,
                    defaults={
                        "category": category,
                        "title": title,
                        "summary": summary,
                        "published": published_date,
                        "source": "Channels TV",
                        # "author": author,
                    }
                )

                if created:
                    self.stdout.write(f"🆕 Added: {title}")
                else:
                    self.stdout.write(f"⏭ Skipped duplicate: {title}")

        self.stdout.write(self.style.SUCCESS("✅ Channels TV news fetched successfully!"))
