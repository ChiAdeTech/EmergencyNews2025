# ---------- Stage 1: Base Image ----------
FROM python:3.11-slim

# Prevent Python from writing .pyc files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Collect static files (optional for admin usage)
RUN python manage.py collectstatic --noinput || true

# Default environment variables
ENV DJANGO_SETTINGS_MODULE=emergency_news.settings
ENV PORT=8000

# Start Gunicorn server
CMD ["gunicorn", "emergency_news.wsgi:application", "--bind", "0.0.0.0:8000"]
