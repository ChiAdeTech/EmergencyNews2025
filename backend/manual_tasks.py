# run_fetch_tasks.py

import os
import django

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emergency_news.settings")
django.setup()

from newsfeeds.tasks import NEWS_COMMANDS
def run_all_fetch_tasks():
    tasks = NEWS_COMMANDS

    for task in tasks:
        task.delay()
        print(f"Task {task.__name__} triggered successfully.")

if __name__ == "__main__":
    run_all_fetch_tasks()
