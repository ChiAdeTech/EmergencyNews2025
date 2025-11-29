from django.core.management.base import BaseCommand
from newsfeeds.tasks import (
    fetch_bbc_news,
    fetch_cnn_news,
    fetch_vanguard_news,
    fetch_aljazeera_news,
    fetch_guardian_news,
    fetch_channelstv_news,
    fetch_premiumtimes_news,
    fetch_allafrica_news,
    fetch_modernghana_news,
    fetch_myjoyonline_news,
    fetch_ghheadlines_news,
)

class Command(BaseCommand):
    help = "Trigger all news fetching Celery tasks"

    def handle(self, *args, **kwargs):
        tasks = [
            fetch_bbc_news,
            fetch_cnn_news,
            fetch_vanguard_news,
            fetch_aljazeera_news,
            fetch_guardian_news,
            fetch_channelstv_news,
            fetch_premiumtimes_news,
            fetch_allafrica_news,
            fetch_modernghana_news,
            fetch_myjoyonline_news,
            fetch_ghheadlines_news,
        ]

        for task in tasks:
            task.delay()
            self.stdout.write(self.style.SUCCESS(f'Triggered {task.__name__}'))

        self.stdout.write(self.style.SUCCESS("All news fetching tasks triggered!"))
