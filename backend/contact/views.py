import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)

class ContactSubmitView(APIView):
    """
    POST /api/contact/
    Accepts contact inquiries, validates fields, and records them in the database.
    """
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            message_obj = serializer.save()
            logger.info("New contact message received from: %s <%s>", message_obj.name, message_obj.email)
            return Response(
                {
                    "success": True,
                    "message": "Thank you! Your message has been received and saved successfully.",
                    "data": {
                        "name": message_obj.name,
                        "subject": message_obj.subject,
                    }
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"success": False, "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
