# newsfeeds/management/commands/fetch_allafrica_news.py

import feedparser
from datetime import datetime
from django.core.management.base import BaseCommand
from newsfeeds.models import NewsArticle, Region, Country
from newsfeeds.utils import fetch_og_image
from newsfeeds.management.commands.utils.all_africa_feeds import ALLAFRICA_FEEDS

class Command(BaseCommand):
    help = "Fetch AllAfrica RSS feeds (Regions, Countries, Categories) and store in the database"

    def handle(self, *args, **kwargs):
        total_added = 0
        total_skipped = 0

        # Helper to determine feed type
        def get_feed_type(key):
            regions = [
                "africa", "centralafrica", "eastafrica", "northafrica",
                "southernafrica", "westafrica"
            ]
            countries = [
                "algeria","angola","benin","botswana","burkinafaso","burundi",
                "cameroon","capeverde","centralafricanrepublic","chad","comoros",
                "congo_brazzaville","congo_kinshasa","cotedivoire","djibouti",
                "egypt","equatorialguinea","eritrea","eswatini","ethiopia","gabon",
                "gambia","ghana","guinea","guineabissau","kenya","lesotho","liberia",
                "libya","madagascar","malawi","mali","mauritania","mauritius","morocco",
                "mozambique","namibia","niger","nigeria","rwanda","senegal","seychelles",
                "sierraleone","somalia","southafrica","southsudan","sudan",
                "saotomeandprincipe","tanzania","togo","tunisia","uganda","westernsahara",
                "zambia","zimbabwe"
            ]
            if key in regions:
                return "region"
            elif key in countries:
                return "country"
            else:
                return "category"

        for key, url in ALLAFRICA_FEEDS.items():
            feed_type = get_feed_type(key)
            self.stdout.write(f"📡 Fetching {key} ({feed_type})...")
            feed = feedparser.parse(url)

            if not feed.entries:
                self.stdout.write(f"⚠️ No entries found for {key}. Skipping.")
                continue

            # Prepare related object for region/country
            related_region = None
            related_country = None
            if feed_type == "region":
                related_region, _ = Region.objects.get_or_create(name=key.title())
            elif feed_type == "country":
                related_country, _ = Country.objects.get_or_create(name=key.title())

            for entry in feed.entries:
                title = entry.get("title", "No title")
                link = entry.get("link")
                if not link:
                    continue

                # Try multiple sources for summary/content
                summary = entry.get("summary", "")
                if not summary and "content" in entry:
                    summary = entry.content[0].value

                # Parse published date
                published_parsed = entry.get("published_parsed") or entry.get("updated_parsed")
                published_date = datetime(*published_parsed[:6]) if published_parsed else datetime.now()

                # Create or skip duplicate
                obj, created = NewsArticle.objects.get_or_create(
                    link=link,
                    defaults={
                        "title": title,
                        "summary": summary,
                        "published": published_date,
                        "source": "AllAfrica",
                        "region": related_region,
                        "country": related_country,
                        "category": key if feed_type == "category" else None,
                    }
                )

                if created:
                    # 🖼 Fetch OG image only for new articles
                    image_url = fetch_og_image(link)
                    if image_url:
                        obj.image = image_url
                        obj.save(update_fields=["image"])
                    total_added += 1
                    self.stdout.write(f"🆕 Added: {title}")
                else:
                    total_skipped += 1

        self.stdout.write(self.style.SUCCESS(
            f"✅ Done! Added {total_added} new articles, skipped {total_skipped} existing ones."
        ))
