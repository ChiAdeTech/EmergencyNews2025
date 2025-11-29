# newsfeeds/source_country_map.py

# Mapping of countries to their news sources
SOURCE_COUNTRY_MAP = {
    'Nigeria': ['Vanguard', 'Premium Times', 'The Guardian'],
    'Ghana': ['Modern Ghana','MyJoyOnline','GH Headlines'],
    'Kenya': ['Daily Nation', 'The Standard'],
    'South Africa': ['TimesLIVE', 'Mail & Guardian'],
    # Add more countries and sources here
}

def get_country_by_source(source_name):
    """
    Returns a Country object based on the news source.
    If no match is found, returns None.
    """
    # Import inside the function to avoid circular import
    from .models import Country

    for country_name, sources in SOURCE_COUNTRY_MAP.items():
        if source_name in sources:
            return Country.objects.filter(name__iexact=country_name).first()
    return None
