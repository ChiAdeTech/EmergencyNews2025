#!/bin/bash

# Activate virtual environment
source venv/bin/activate

# Run Django shell and execute Celery tasks
python manage.py shell <<'EOF'
from newsfeeds.tasks import (
    fetch_bbc_news,
    fetch_cnn_news,
    fetch_vanguard_news,
    fetch_aljazeera_news,
    fetch_guardian_news,
    fetch_channelstv_news,
    fetch_premiumtimes_news,
)

fetch_bbc_news.delay()
fetch_cnn_news.delay()
fetch_vanguard_news.delay()
fetch_aljazeera_news.delay()
fetch_guardian_news.delay()
fetch_channelstv_news.delay()
fetch_premiumtimes_news.delay()
EOF
