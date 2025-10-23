# newsfeeds/management/commands/fetch_aljazeera_news.py

import feedparser
from datetime import datetime
from django.core.management.base import BaseCommand
from newsfeeds.models import NewsArticle

ALJAZEERA_FEEDS = {
    "top_stories": "https://www.aljazeera.com/xml/rss/all.xml",
    "middle_east": "https://www.aljazeera.com/xml/rss/middle-east.xml",
    "economy": "https://www.aljazeera.com/xml/rss/economy.xml",
    "technology": "https://www.aljazeera.com/xml/rss/technology.xml",
    "africa": "https://www.aljazeera.com/xml/rss/africa.xml",
    "asia": "https://www.aljazeera.com/xml/rss/asia-pacific.xml",
    "americas": "https://www.aljazeera.com/xml/rss/americas.xml",
}

class Command(BaseCommand):
    help = "Fetch Al Jazeera News RSS feeds and store in the database"

    def handle(self, *args, **kwargs):
        for category, url in ALJAZEERA_FEEDS.items():
            self.stdout.write(f"Fetching {category}...")
            feed = feedparser.parse(url)

            if not feed.entries:
                self.stdout.write(f"⚠️ No entries found for {category}. Skipping.")
                continue

            for entry in feed.entries:
                title = entry.get("title", "No title")
                link = entry.get("link")
                if not link:
                    continue  # skip entries without a link

                # Try multiple sources for summary/content
                summary = entry.get("summary", "")
                if not summary and "content" in entry:
                    summary = entry.content[0].value

                # Parse published date
                published_parsed = entry.get("published_parsed") or entry.get("updated_parsed")
                published_date = datetime(*published_parsed[:6]) if published_parsed else datetime.now()

                # Create or skip duplicate
                _, created = NewsArticle.objects.get_or_create(
                    link=link,
                    defaults={
                        "category": category,
                        "title": title,
                        "summary": summary,
                        "published": published_date,
                        "source": "Al Jazeera",
                    }
                )

                if created:
                    self.stdout.write(f"🆕 Added: {title}")
                else:
                    self.stdout.write(f"⏭ Skipped duplicate: {title}")

        self.stdout.write(self.style.SUCCESS("✅ Al Jazeera news fetched successfully!"))
