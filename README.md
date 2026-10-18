# Daleel Backend

Django REST Framework API for Daleel, an Arabic-first accessibility, learning, courses, and enrollment platform.

## Local setup

Requires Python 3.12 or newer. Create and activate a virtual environment, then install dependencies:

    python -m venv .venv
    # Windows: .venv\Scripts\activate
    # macOS/Linux: source .venv/bin/activate
    python -m pip install --upgrade pip
    python -m pip install -r requirements.txt

Copy .env.example to .env and replace the example secret. The settings load this file automatically. Leave DB_NAME empty for local SQLite use; set the PostgreSQL variables only when using PostgreSQL.

Run the development commands:

    python manage.py migrate
    python manage.py check
    python manage.py test
    python manage.py runserver

## Configuration

- DJANGO_SECRET_KEY: unique random value; required when debug is off.
- DEBUG: true only for local development.
- ALLOWED_HOSTS: comma-separated hostnames.
- CORS_ALLOWED_ORIGINS: comma-separated, explicit frontend origins.
- DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT: optional PostgreSQL config.
- PAYMOB_*: optional payment integration settings.

Do not commit real secrets, generated databases, bytecode, or production data. Frontend code is maintained on this repository's frontend branch.
