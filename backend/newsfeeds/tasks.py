from celery import shared_task
from django.core.management import call_command

# List of all news commands
NEWS_COMMANDS = [
    "fetch_bbc_news",
    "fetch_cnn_news",
    "fetch_vanguard_news",
    "fetch_aljazeera_news",
    "fetch_guardian_news",
    "fetch_channelstv_news",
    "fetch_premiumtimes_news",
    "fetch_allafrica_news",
    "fetch_modernghana_news",
    "fetch_myjoyonline_news",
    "fetch_ghheadlines_news",
    "fetch_standard_news",
    "fetch_thepoint_news",
    "fetch_fatunetwork_news",
    "fetch_nigerexpress_news",
    "fetch_lesahel_news",
    "fetch_airinfoagadez_news"
]

# Dynamically create @shared_task for each command
def make_task(cmd_name):
    @shared_task(name=cmd_name)
    def task():
        call_command(cmd_name)
    return task

for cmd in NEWS_COMMANDS:
    globals()[cmd] = make_task(cmd)
