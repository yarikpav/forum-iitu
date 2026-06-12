from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("api/", include("forum.urls")),  # 🔹 префикс api только здесь
    path("admin/", admin.site.urls),
]
