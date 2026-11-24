"""
Chatbot API views — POST /api/chatbot/ask/
"""
import time
import logging
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from chatbot.services import retrieval_service, gemini_service

logger = logging.getLogger(__name__)

# Simple in-memory rate limiting: (ip -> [timestamps])
_rate_limit_store: dict[str, list[float]] = {}
RATE_LIMIT_WINDOW = 60   # seconds
RATE_LIMIT_MAX = 20      # max requests per window per IP


def _is_rate_limited(ip: str) -> bool:
    """Return True if the IP has exceeded the rate limit."""
    now = time.time()
    timestamps = _rate_limit_store.get(ip, [])
    # Purge old timestamps
    timestamps = [t for t in timestamps if now - t < RATE_LIMIT_WINDOW]
    _rate_limit_store[ip] = timestamps

    if len(timestamps) >= RATE_LIMIT_MAX:
        return True

    timestamps.append(now)
    _rate_limit_store[ip] = timestamps
    return False


def _get_client_ip(request) -> str:
    """Extract client IP from request."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR', 'unknown')


class ChatbotAskView(APIView):
    """
    POST /api/chatbot/ask/

    Request body:
        { "question": "..." }

    Response:
        {
            "answer": "...",
            "sources": [{"name": "...", "relevance": "high"}],
        }

    Error response:
        { "error": "..." }
    """

    def post(self, request):
        # Check API key is configured
        if not getattr(settings, 'GEMINI_API_KEY', ''):
            logger.error("GEMINI_API_KEY not configured.")
            return Response(
                {"error": "The chatbot service is not configured. Please contact the site owner."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )

        # Rate limiting
        client_ip = _get_client_ip(request)
        if _is_rate_limited(client_ip):
            return Response(
                {"error": "Too many requests. Please wait a moment before asking again."},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        # Validate input
        question = request.data.get("question", "")
        if not isinstance(question, str):
            return Response({"error": "Invalid request format."}, status=status.HTTP_400_BAD_REQUEST)

        question = question.strip()
        if not question:
            return Response({"error": "Please enter a question."}, status=status.HTTP_400_BAD_REQUEST)

        max_length = getattr(settings, 'CHATBOT_MAX_INPUT_LENGTH', 500)
        if len(question) > max_length:
            return Response(
                {"error": f"Question is too long. Please keep it under {max_length} characters."},
                status=status.HTTP_400_BAD_REQUEST
            )

        logger.info("Chatbot question from %s: %s", client_ip, question[:100])

        # Retrieve relevant context from ChromaDB
        retrieval_limit = getattr(settings, 'CHATBOT_RETRIEVAL_LIMIT', 5)
        try:
            context_chunks = retrieval_service.retrieve_relevant_chunks(question, n_results=retrieval_limit)
        except Exception as e:
            logger.error("Retrieval failed: %s", str(e))
            context_chunks = []

        # Generate answer using Gemini
        try:
            answer = gemini_service.generate_answer(question, context_chunks)
        except Exception as e:
            logger.error("Answer generation failed: %s", str(e))
            return Response(
                {"error": "An error occurred while generating the answer. Please try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Build sources list (deduplicated by source name, sorted by distance)
        seen_sources = set()
        sources = []
        for chunk in context_chunks:
            source_name = chunk.get("source", "unknown")
            if source_name not in seen_sources:
                seen_sources.add(source_name)
                distance = chunk.get("distance", 1.0)
                # Map distance to relevance label
                if distance < 0.4:
                    relevance = "high"
                elif distance < 0.8:
                    relevance = "medium"
                else:
                    relevance = "low"
                # Make source name more readable
                readable = source_name.replace("_", " ").replace(".md", "").title()
                sources.append({"name": readable, "relevance": relevance})

        return Response({
            "answer": answer,
            "sources": sources
        }, status=status.HTTP_200_OK)
