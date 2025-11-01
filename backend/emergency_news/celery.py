# emergency_news/celery.py

import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'emergency_news.settings')

app = Celery('emergency_news', broker='redis://redis:6379/0')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


# Schedule the RSS fetch task every hour
app.conf.beat_schedule = {
    'fetch-bbc-every-hour': {
        'task': 'newsfeeds.tasks.fetch_bbc_news',
        'schedule': crontab(minute=0, hour='*'),
    },
}


app.conf.beat_schedule.update({
    'fetch-cnn-every-hour': {
        'task': 'newsfeeds.tasks.fetch_cnn_news',
        'schedule': crontab(minute=0, hour='*'),
    },
})


app.conf.beat_schedule.update({
    'fetch-vanguard-every-hour': {
        'task': 'newsfeeds.tasks.fetch_vanguard_news',
        'schedule': crontab(minute=0, hour='*'),
    },
})


app.conf.beat_schedule.update({
    'fetch-aljazeera-every-hour': {
        'task': 'newsfeeds.tasks.fetch_aljazeera_news',
        'schedule': crontab(minute=0, hour='*'),
    },
})


app.conf.beat_schedule.update({
    'fetch-guardian-every-hour': {
        'task': 'newsfeeds.tasks.fetch_guardian_news',
        'schedule': crontab(minute=0, hour='*'),
    },
})


app.conf.beat_schedule.update({
    'fetch-channelstv-every-hour': {
        'task': 'newsfeeds.tasks.fetch_channelstv_news',
        'schedule': crontab(minute=0, hour='*'),
    },
})


app.conf.beat_schedule.update({
    'fetch-premiumtimes-every-hour': {
        'task': 'newsfeeds.tasks.fetch_premiumtimes_news',
        'schedule': crontab(minute=0, hour='*'),
    },
})
