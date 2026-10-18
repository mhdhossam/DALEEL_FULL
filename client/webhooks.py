import hashlib
import hmac

from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Payment
from courses.models import Enrollment


def _verify_paymob_hmac(request) -> bool:
    """
    Verify the HMAC Paymob sends as a query param.
    Paymob concatenates specific obj fields (in this order) then
    signs with HMAC-SHA512 using your HMAC secret.
    """
    received = request.query_params.get("hmac", "")
    if not received:
        return False

    obj = request.data.get("obj", {})

    fields = [
        str(obj.get("amount_cents", "")),
        str(obj.get("created_at", "")),
        str(obj.get("currency", "")),
        str(obj.get("error_occured", "")).lower(),
        str(obj.get("has_parent_transaction", "")).lower(),
        str(obj.get("id", "")),
        str(obj.get("integration_id", "")),
        str(obj.get("is_3d_secure", "")).lower(),
        str(obj.get("is_auth", "")).lower(),
        str(obj.get("is_capture", "")).lower(),
        str(obj.get("is_refunded", "")).lower(),
        str(obj.get("is_standalone_payment", "")).lower(),
        str(obj.get("is_voided", "")).lower(),
        str(obj.get("order", {}).get("id", "")),
        str(obj.get("owner", "")),
        str(obj.get("pending", "")).lower(),
        str(obj.get("source_data", {}).get("pan", "")),
        str(obj.get("source_data", {}).get("sub_type", "")),
        str(obj.get("source_data", {}).get("type", "")),
        str(obj.get("success", "")).lower(),
    ]

    concat = "".join(fields)
    expected = hmac.new(
        settings.PAYMOB_HMAC_SECRET.encode(),
        concat.encode(),
        hashlib.sha512,
    ).hexdigest()

    return hmac.compare_digest(expected, received)


class PaymobWebhook(APIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):

        if not _verify_paymob_hmac(request):
            return Response({"error": "Invalid signature"}, status=403)

        try:
            data = request.data

            if data.get("obj", {}).get("success"):

                order_id = data["obj"]["order"]["id"]

                payment = Payment.objects.get(
                    paymob_order_id=order_id
                )

                payment.status = "paid"
                payment.transaction_id = str(data["obj"]["id"])
                payment.save()

                Enrollment.objects.update_or_create(
                    user=payment.user,
                    course=payment.course,
                    defaults={
                        "is_paid": True,
                        "paymob_order_id": payment.paymob_order_id,
                        "transaction_id": payment.transaction_id,
                    }
                )

            return Response({"ok": True})

        except Payment.DoesNotExist:
            return Response(
                {"error": "Payment not found"},
                status=404
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=400
            )
