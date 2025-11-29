# run_fetch_tasks.py

import os
import django

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emergency_news.settings")
django.setup()

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
    fetch_standard_news,
    fetch_thepoint_news,
    fetch_fatunetwork_news,
    fetch_nigerexpress_news,
    fetch_lesahel_news,
    fetch_airinfoagadez_news
)


def run_all_fetch_tasks():
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
        fetch_standard_news,
        fetch_thepoint_news,
        fetch_fatunetwork_news,
        fetch_nigerexpress_news,
        fetch_lesahel_news,
        fetch_airinfoagadez_news
    ]

    for task in tasks:
        task.delay()
        print(f"Task {task.__name__} triggered successfully.")

if __name__ == "__main__":
    run_all_fetch_tasks()
