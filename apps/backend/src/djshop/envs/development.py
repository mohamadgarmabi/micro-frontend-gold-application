import os

from .common import *

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
  "daphne",
  "drf_spectacular",
] + INSTALLED_APPS


DATABASES = {
  "default": {
    "ENGINE": "django.db.backends.postgresql",
    "NAME": os.environ.get("POSTGRES_DB", "djshop"),
    "USER": os.environ.get("POSTGRES_USER", "djshop"),
    "PASSWORD": os.environ.get("POSTGRES_PASSWORD", "123@456"),
    "HOST": os.environ.get("POSTGRES_HOST", "localhost"),
    "PORT": os.environ.get("POSTGRES_PORT", "5432"),
  }
}