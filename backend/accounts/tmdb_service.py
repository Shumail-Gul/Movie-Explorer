import os
import requests

TMDB_BASE_URL = "https://api.themoviedb.org/3"

TMDB_ACCESS_TOKEN = os.getenv("TMDB_ACCESS_TOKEN")


def get_tmdb_data(endpoint, params=None):
    headers = {
        "Authorization": f"Bearer {TMDB_ACCESS_TOKEN}",
        "accept": "application/json",
    }

    response = requests.get(
        f"{TMDB_BASE_URL}{endpoint}",
        headers=headers,
        params=params,
        timeout=10,
    )

    response.raise_for_status()

    return response.json()