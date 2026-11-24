"""
Django management command: ingest portfolio knowledge base into ChromaDB.
Usage:
  python manage.py ingest_knowledge_base
  python manage.py ingest_knowledge_base --force
"""
from django.core.management.base import BaseCommand
from chatbot.services import ingestion_service


class Command(BaseCommand):
    help = "Ingest portfolio knowledge base documents into ChromaDB for the RAG chatbot."

    def add_arguments(self, parser):
        parser.add_argument(
            '--force',
            action='store_true',
            help='Force re-ingestion: clears existing ChromaDB collection before ingesting.'
        )

    def handle(self, *args, **options):
        force = options['force']

        self.stdout.write(self.style.NOTICE("=" * 60))
        self.stdout.write(self.style.NOTICE("  Lantern Portfolio — Knowledge Base Ingestion"))
        self.stdout.write(self.style.NOTICE("=" * 60))

        if force:
            self.stdout.write(self.style.WARNING("  Mode: FORCE RE-INGEST (clearing existing data)"))
        else:
            self.stdout.write(self.style.SUCCESS("  Mode: Normal (skip if already ingested)"))

        self.stdout.write("")
        self.stdout.write("  Starting ingestion pipeline...")
        self.stdout.write("")

        try:
            stats = ingestion_service.ingest_all(force_reingest=force)
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"  ERROR: Ingestion failed — {str(e)}"))
            raise

        self.stdout.write("  " + "-" * 40)
        self.stdout.write(f"  Documents loaded:   {stats['documents_loaded']}")
        self.stdout.write(f"  Chunks created:     {stats['chunks_created']}")
        self.stdout.write(f"  Chunks embedded:    {stats['chunks_embedded']}")
        self.stdout.write(f"  Errors:             {stats['errors']}")
        self.stdout.write("  " + "-" * 40)

        if stats['errors'] > 0:
            self.stdout.write(self.style.WARNING(
                f"  Completed with {stats['errors']} error(s). Check logs for details."
            ))
        else:
            self.stdout.write(self.style.SUCCESS(
                f"  Ingestion complete! {stats['chunks_embedded']} chunks stored in ChromaDB."
            ))

        self.stdout.write("")
