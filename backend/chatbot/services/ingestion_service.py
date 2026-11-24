"""
Document ingestion pipeline: reads knowledge base Markdown files,
chunks them, generates embeddings, and stores in ChromaDB.
"""
import os
import re
import uuid
import logging
from pathlib import Path
from django.conf import settings
from chatbot.services.embedding_service import generate_embedding
from chatbot.services import retrieval_service

logger = logging.getLogger(__name__)

KNOWLEDGE_BASE_DIR = Path(__file__).resolve().parent.parent.parent / "knowledge_base"
CHUNK_SIZE = 400       # characters per chunk
CHUNK_OVERLAP = 50     # overlap between chunks


def load_documents(knowledge_base_dir: Path = KNOWLEDGE_BASE_DIR) -> list[dict]:
    """
    Load all Markdown documents from the knowledge base directory.

    Returns:
        List of dicts with keys: filename, content.
    """
    documents = []
    if not knowledge_base_dir.exists():
        logger.error("Knowledge base directory not found: %s", knowledge_base_dir)
        return documents

    md_files = sorted(knowledge_base_dir.glob("*.md"))
    logger.info("Found %d Markdown files in %s", len(md_files), knowledge_base_dir)

    for filepath in md_files:
        try:
            content = filepath.read_text(encoding="utf-8")
            documents.append({
                "filename": filepath.name,
                "content": content
            })
            logger.info("Loaded: %s (%d chars)", filepath.name, len(content))
        except Exception as e:
            logger.error("Failed to read %s: %s", filepath.name, str(e))

    return documents


def clean_text(text: str) -> str:
    """Clean and normalize text for embedding."""
    # Replace multiple blank lines with a single newline
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Remove leading/trailing whitespace
    text = text.strip()
    return text


def chunk_document(content: str, source: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> list[dict]:
    """
    Split document content into overlapping chunks.

    Args:
        content: Full document text.
        source: Source filename for metadata.
        chunk_size: Target chunk size in characters.
        overlap: Overlap between consecutive chunks.

    Returns:
        List of dicts with keys: text, source, chunk_index.
    """
    content = clean_text(content)
    chunks = []

    if len(content) <= chunk_size:
        # Short document: single chunk
        chunks.append({
            "text": content,
            "source": source,
            "chunk_index": 0
        })
        return chunks

    start = 0
    chunk_index = 0
    while start < len(content):
        end = start + chunk_size

        # Try to break at a paragraph boundary
        if end < len(content):
            # Look for a newline within the last 100 chars
            boundary = content.rfind('\n', start + chunk_size - 100, end)
            if boundary > start:
                end = boundary

        chunk_text = content[start:end].strip()
        if chunk_text:
            chunks.append({
                "text": chunk_text,
                "source": source,
                "chunk_index": chunk_index
            })
            chunk_index += 1

        start = end - overlap
        if start >= len(content):
            break

    return chunks


def ingest_all(force_reingest: bool = False) -> dict:
    """
    Main ingestion pipeline.

    Args:
        force_reingest: If True, clears the existing collection before ingesting.

    Returns:
        Dict with keys: documents_loaded, chunks_created, chunks_embedded, errors.
    """
    stats = {
        "documents_loaded": 0,
        "chunks_created": 0,
        "chunks_embedded": 0,
        "errors": 0
    }

    # Reset collection if forced
    if force_reingest:
        logger.info("Force re-ingestion: clearing existing collection...")
        collection = retrieval_service.reset_collection()
    else:
        collection = retrieval_service.get_or_create_collection()
        existing_count = collection.count()
        if existing_count > 0:
            logger.info("Collection already has %d chunks. Skipping (use --force to re-ingest).", existing_count)
            stats["chunks_embedded"] = existing_count
            return stats

    # Load documents
    documents = load_documents()
    stats["documents_loaded"] = len(documents)

    if not documents:
        logger.error("No documents found to ingest.")
        return stats

    # Process each document
    all_ids = []
    all_embeddings = []
    all_documents = []
    all_metadatas = []

    for doc in documents:
        chunks = chunk_document(doc["content"], source=doc["filename"])
        stats["chunks_created"] += len(chunks)
        logger.info("Document '%s': %d chunks", doc["filename"], len(chunks))

        for chunk in chunks:
            embedding = generate_embedding(chunk["text"])
            if embedding is None:
                logger.warning("Failed to embed chunk from %s (index %d)", chunk["source"], chunk["chunk_index"])
                stats["errors"] += 1
                continue

            chunk_id = str(uuid.uuid4())
            all_ids.append(chunk_id)
            all_embeddings.append(embedding)
            all_documents.append(chunk["text"])
            all_metadatas.append({
                "source": chunk["source"],
                "chunk_index": chunk["chunk_index"]
            })
            stats["chunks_embedded"] += 1

    # Batch upsert into ChromaDB
    if all_ids:
        try:
            # Upsert in batches of 100
            batch_size = 100
            for i in range(0, len(all_ids), batch_size):
                batch_end = i + batch_size
                collection.upsert(
                    ids=all_ids[i:batch_end],
                    embeddings=all_embeddings[i:batch_end],
                    documents=all_documents[i:batch_end],
                    metadatas=all_metadatas[i:batch_end]
                )
            logger.info("Successfully upserted %d chunks into ChromaDB.", len(all_ids))
        except Exception as e:
            logger.error("ChromaDB upsert failed: %s", str(e))
            stats["errors"] += 1

    return stats
