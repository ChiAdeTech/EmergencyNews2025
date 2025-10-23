# newsfeeds/management/commands/fetch_vanguard_news.py

import feedparser
from datetime import datetime
from django.core.management.base import BaseCommand
from newsfeeds.models import NewsArticle

VANGUARD_FEEDS = {
    "latest": "https://www.vanguardngr.com/feed/",
    "business": "https://www.vanguardngr.com/category/business/feed/",
    "politics": "https://www.vanguardngr.com/category/politics/feed/",
    "sports": "https://www.vanguardngr.com/category/sports/feed/",
    "entertainment": "https://www.vanguardngr.com/category/entertainment/feed/",
}

class Command(BaseCommand):
    help = "Fetch Vanguard News RSS feeds and store in the database"

    def handle(self, *args, **kwargs):
        for category, url in VANGUARD_FEEDS.items():
            self.stdout.write(f"Fetching {category} news from Vanguard...")
            feed = feedparser.parse(url)

            for entry in feed.entries:
                title = entry.title
                link = entry.link
                summary = entry.get("summary", "")
                published = entry.get("published_parsed")

                published_date = datetime(*published[:6]) if published else datetime.now()

                # Optional: extract author if available
                # author = getattr(entry, "author", "Vanguard")

                # Avoid duplicates by link
                _, created = NewsArticle.objects.get_or_create(
                    link=link,
                    defaults={
                        "category": category,
                        "title": title,
                        "summary": summary,
                        "published": published_date,
                        "source": "Vanguard",
                        # "author": author,
                    }
                )

                if created:
                    self.stdout.write(f"🆕 Added: {title}")
                else:
                    self.stdout.write(f"⏭ Skipped duplicate: {title}")

        self.stdout.write(self.style.SUCCESS("✅ Vanguard news fetched successfully!"))
