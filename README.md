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

## Cloudflare R2 media storage

The backend can store uploaded media in Cloudflare R2 using its S3-compatible API. Keep the R2 credentials on the backend only; never put them in frontend `VITE_*` variables or commit them.

Set these environment variables in the backend deployment (or local backend `.env`):

- `R2_ACCOUNT_ID`: Cloudflare account ID
- `R2_ACCESS_KEY_ID`: a newly rotated R2 access key ID
- `R2_SECRET_ACCESS_KEY`: its secret
- `R2_BUCKET_NAME`: the R2 bucket name
- `R2_PUBLIC_URL`: the public bucket URL, for example the `r2.dev` URL or a custom domain

When all five values are present, Django's default media storage switches to R2. If none are present, it uses local filesystem storage for development. Partial configuration raises an error so a deployment cannot silently store uploads on the wrong backend.

Install the added dependency with `pip install -r requirements.txt` and restart the Django service. Existing files stored on local disk or Cloudinary are not automatically migrated; their database references and files remain where they were until a separate migration is planned and run.

R2 configuration was added to the backend branch. The connection still needs to be tested with the newly rotated credentials in the actual deployment environment.
