import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'emergency_news.settings')

# Use REDIS_URL from environment first (Docker), fallback to settings
REDIS_URL = os.getenv("REDIS_URL", getattr(settings, "REDIS_URL", "redis://localhost:6379/0"))

app = Celery('emergency_news', broker=REDIS_URL, backend=REDIS_URL)

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# Hourly news fetch schedule
app.conf.beat_schedule = {
    'fetch-bbc-every-hour': {
        'task': 'newsfeeds.tasks.fetch_bbc_news',
        'schedule': crontab(minute=0, hour='*'),
    },
    'fetch-cnn-every-hour': {
        'task': 'newsfeeds.tasks.fetch_cnn_news',
        'schedule': crontab(minute=0, hour='*'),
    },
    'fetch-vanguard-every-hour': {
        'task': 'newsfeeds.tasks.fetch_vanguard_news',
        'schedule': crontab(minute=0, hour='*'),
    },
    'fetch-aljazeera-every-hour': {
        'task': 'newsfeeds.tasks.fetch_aljazeera_news',
        'schedule': crontab(minute=0, hour='*'),
    },
    'fetch-guardian-every-hour': {
        'task': 'newsfeeds.tasks.fetch_guardian_news',
        'schedule': crontab(minute=0, hour='*'),
    },
    'fetch-channelstv-every-hour': {
        'task': 'newsfeeds.tasks.fetch_channelstv_news',
        'schedule': crontab(minute=0, hour='*'),
    },
    'fetch-premiumtimes-every-hour': {
        'task': 'newsfeeds.tasks.fetch_premiumtimes_news',
        'schedule': crontab(minute=0, hour='*'),
    },
}
