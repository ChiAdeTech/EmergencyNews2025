# newsfeeds/tasks.py

from celery import shared_task
from django.core.management import call_command

@shared_task
def fetch_bbc_news():
    call_command('fetch_bbc_news')


@shared_task
def fetch_cnn_news():
    call_command('fetch_cnn_news')


@shared_task
def fetch_vanguard_news():
    call_command('fetch_vanguard_news')


@shared_task
def fetch_aljazeera_news():
    call_command('fetch_aljazeera_news')


@shared_task
def fetch_guardian_news():
    call_command('fetch_guardian_news')


@shared_task
def fetch_channelstv_news():
    call_command('fetch_channelstv_news')

@shared_task
def fetch_premiumtimes_news():
    call_command('fetch_premiumtimes_news')


@shared_task
def fetch_allafrica_news():
    call_command('fetch_allafrica_news')

@shared_task
def fetch_modernghana_news():
    call_command('fetch_modernghana_news')

@shared_task
def fetch_myjoyonline_news():
    call_command('fetch_myjoyonline_news')

@shared_task
def fetch_ghheadlines_news():
    call_command('fetch_ghheadlines_news')

