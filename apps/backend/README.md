# Backend

A Django-based web application skeleton featuring Django Rest Framework, Channels, PostgreSQL (with Docker), OpenAPI (drf_spectacular), and CORS support. Designed for ecommerce or generic shop/backoffice APIs with modern best practices.

---

## Features

- Django 5.x project
- Django Rest Framework (API-ready)
- Token auth and filtering
- CORS headers configured
- PostgreSQL database support (via Docker Compose)
- Static/media mapping (volume-ready)
- Async and Channels support (ASGI and Daphne)
- API schema via drf_spectacular (OpenAPI)
- Modern middleware and app structure (env split)
- Docker-compose for local development

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional) Python 3.11+ with [pipenv](https://pipenv.pypa.io/) or `venv` if developing outside Docker

### Clone the repository

```bash
git clone <YOUR_REPO_URL>
cd backend
```

---

### Run with Docker

```bash
docker-compose up --build
```

- The web app will be live at: **http://localhost:8000/**
- PostgreSQL runs on port **5432** (see docker-compose.yml for creds)

---

## Usage

### Development

- App code lives in `src/`
- Django settings are env-specific (`src/core/envs/`)
  - `common.py`: shared config
  - `development.py`: overrides for local/Postgres/Docker

#### Example: Running migrations & server manually

```bash
docker-compose run app python manage.py migrate
docker-compose run app python manage.py createsuperuser
docker-compose up
```

### API

- Default API root: `http://localhost:8000/api/`
- API schema: `http://localhost:8000/api/schema/`
- Swagger UI (if enabled): `http://localhost:8000/api/docs/`

---

## Environment Variables

Configured in `docker-compose.yml` for the app and database services:

- `POSTGRES_HOST`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT`

You can override via your `.env` or Compose file.

---

## Customization

- Add new Django apps in `src/`
- Install additional dependencies in `requirements.txt`
- Update environment settings in `src/core/envs/`

---

## Useful Commands

Inside the running container (`docker-compose exec app sh`):

- `python manage.py makemigrations`
- `python manage.py migrate`
- `python manage.py createsuperuser`
- `python manage.py collectstatic`
- `python manage.py test`

---

## License

MIT (or specify your own).

---

## Credits

- Django
- Django Rest Framework
- Django Channels
- Treebeard, django-filters, corsheaders, drf_spectacular, daphne, and friends.

---