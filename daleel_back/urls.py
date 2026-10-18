"""
Root URL configuration — Daleel.

Dynamic admin routes via schema registry.
Existing client + courses routes are preserved unchanged.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework import serializers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from core.views import admin_index
from core.viewsets import AdminModelViewSet
from apps.schema.registry import registry


# ── Helpers ───────────────────────────────────────────────────────────────────

def _make_serializer_getter(read_cls, write_cls):
    def get_serializer_class(self):
        return read_cls if self.request.method == "GET" else write_cls
    return get_serializer_class


def _build_dynamic_router() -> DefaultRouter:
    """
    Walk the schema registry and register one ViewSet per model.
    Models already handled by explicit routes are excluded.
    """
    registry.autodiscover()
    registry.auto_register_all_models()

    router = DefaultRouter()

    # Already covered by explicit viewsets in client.urls / courses.urls / apps.files.urls.
    # Keep them here so the dynamic router doesn't generate a duplicate auto-ViewSet.
    # CustomUser is NOT here — its schema sets exclude=["password","last_login"] so
    # the dynamic router creates a safe /api/customusers/ ViewSet from that.
    EXPLICIT_ROUTES = {
        "courses", "course-details", "enrollments", "payments",
        "files",
    }

    for q_name, schema_class in registry.all().items():
        model    = schema_class.model
        endpoint = schema_class.endpoint
        if not endpoint:
            continue

        route_name = endpoint.strip("/")
        if route_name.startswith("api/") or route_name.startswith("data/"):
            route_name = route_name.split("/", 1)[1].strip("/")

        if route_name in EXPLICIT_ROUTES:
            continue

        exclude = getattr(schema_class, "exclude", None)
        meta_attrs = {"model": model}
        if exclude:
            meta_attrs["exclude"] = exclude
        else:
            meta_attrs["fields"] = "__all__"

        flat_serializer = type(
            f"{model.__name__}Serializer",
            (serializers.ModelSerializer,),
            {"Meta": type("Meta", (), meta_attrs)},
        )

        read_cls  = getattr(schema_class, "read_serializer_class",  None) or flat_serializer
        write_cls = getattr(schema_class, "write_serializer_class", None) or flat_serializer

        viewset = type(
            f"{model.__name__}ViewSet",
            (AdminModelViewSet,),
            {
                "queryset":             model.objects.all(),
                "get_serializer_class": _make_serializer_getter(read_cls, write_cls),
                "search_fields":        getattr(schema_class, "search_fields", []),
                "ordering":             getattr(schema_class, "ordering", ["-id"]),
            },
        )

        router.register(route_name, viewset, basename=route_name)

    return router


dynamic_router = _build_dynamic_router()


# ── URL patterns ──────────────────────────────────────────────────────────────

urlpatterns = [
    # Django admin
    path("django-admin/", admin.site.urls),

    # Client app — register, token, payments, webhook, password reset
    path("", include("client.urls")),

    # Course / enrollment / payment admin CRUD (IsAdminUser)
    path("data/", include("courses.urls")),
    path("api/public/", include("content.public_urls")),

    # File management
    path("api/", include("apps.files.urls")),

    # Schema introspection (sidebar nav + field metadata)
    path("api/schema/", include("apps.schema.urls")),

    # Dynamic CRUD for all registry-managed models
    path("api/", include(dynamic_router.urls)),

    # React SPA catch-all — serves nexus_admin/index.html for /admin/* routes
    re_path(r"^admin/.*$", admin_index, name="admin_index"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
