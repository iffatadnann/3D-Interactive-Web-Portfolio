"""
Embedding service using Gemini Embedding API via raw HTTP requests.
Avoids pydantic/google-genai SDK to prevent Windows SAC DLL issues.
"""
import requests
import logging
from django.conf import settings

logger = logging.getLogger(__name__)


def generate_embedding(text: str) -> list[float] | None:
    """
    Generate a text embedding using the Gemini Embedding API.

    Args:
        text: Input text to embed.

    Returns:
        List of floats (3072-dimensional vector) or None on failure.
    """
    api_key = settings.GEMINI_API_KEY
    model = settings.GEMINI_EMBEDDING_MODEL

    if not api_key:
        logger.error("GEMINI_API_KEY is not configured.")
        return None

    # Truncate very long texts to avoid API limits
    max_chars = 8000
    if len(text) > max_chars:
        text = text[:max_chars]

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:embedContent"
    payload = {
        "model": f"models/{model}",
        "content": {
            "parts": [{"text": text}]
        }
    }

    try:
        response = requests.post(
            url,
            params={"key": api_key},
            json=payload,
            timeout=30
        )

        if response.status_code == 200:
            data = response.json()
            values = data.get("embedding", {}).get("values", [])
            if values:
                return values
            logger.warning("Gemini embedding returned empty values: %s", data)
            return None

        elif response.status_code == 429:
            logger.warning("Embedding rate limit hit.")
            return None

        else:
            logger.error("Embedding API error %s: %s", response.status_code, response.text[:200])
            return None

    except requests.exceptions.Timeout:
        logger.error("Embedding request timed out.")
        return None

    except requests.exceptions.RequestException as e:
        logger.error("Embedding request failed: %s", str(e))
        return None
