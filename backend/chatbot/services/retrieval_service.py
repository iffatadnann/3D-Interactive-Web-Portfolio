"""
Retrieval service: ChromaDB vector store for portfolio knowledge.
"""
import logging
import chromadb
from django.conf import settings
from chatbot.services.embedding_service import generate_embedding

logger = logging.getLogger(__name__)

COLLECTION_NAME = "portfolio_knowledge"
_client = None
_collection = None


def get_chroma_client():
    """Get or create a persistent ChromaDB client."""
    global _client
    if _client is None:
        db_path = getattr(settings, 'CHROMA_DB_PATH', './chroma_db')
        _client = chromadb.PersistentClient(path=db_path)
        logger.info("ChromaDB client initialized at: %s", db_path)
    return _client


def get_or_create_collection():
    """Get or create the portfolio knowledge collection."""
    global _collection
    if _collection is None:
        client = get_chroma_client()
        _collection = client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"}
        )
        logger.info("ChromaDB collection ready: %s (count=%d)", COLLECTION_NAME, _collection.count())
    return _collection


def retrieve_relevant_chunks(question: str, n_results: int = 5) -> list[dict]:
    """
    Retrieve the most relevant knowledge chunks for a given question.

    Args:
        question: The user's question.
        n_results: Number of results to retrieve.

    Returns:
        List of dicts with keys: text, source, distance.
    """
    collection = get_or_create_collection()

    if collection.count() == 0:
        logger.warning("ChromaDB collection is empty. Run ingest_knowledge_base first.")
        return []

    # Generate embedding for the question
    query_embedding = generate_embedding(question)
    if query_embedding is None:
        logger.error("Failed to generate embedding for question.")
        return []

    try:
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=min(n_results, collection.count()),
            include=["documents", "metadatas", "distances"]
        )
    except Exception as e:
        logger.error("ChromaDB query failed: %s", str(e))
        return []

    chunks = []
    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    # Similarity threshold: skip chunks that are too dissimilar (cosine distance > 1.5)
    DISTANCE_THRESHOLD = 1.5

    for doc, meta, dist in zip(documents, metadatas, distances):
        if dist <= DISTANCE_THRESHOLD:
            chunks.append({
                "text": doc,
                "source": meta.get("source", "unknown"),
                "distance": round(dist, 4)
            })

    logger.info("Retrieved %d relevant chunks (from %d candidates).", len(chunks), len(documents))
    return chunks


def reset_collection():
    """Delete and recreate the collection (used during re-ingestion)."""
    global _collection
    client = get_chroma_client()
    try:
        client.delete_collection(COLLECTION_NAME)
        logger.info("Deleted existing collection: %s", COLLECTION_NAME)
    except Exception:
        pass
    _collection = None
    return get_or_create_collection()
