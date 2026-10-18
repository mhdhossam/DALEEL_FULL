# Daleel

Daleel is an accessibility-focused, Arabic-first platform intended to help people with disabilities discover learning opportunities, scholarships, and inclusive employment resources.

## Repository branches

The application is maintained as two independent, directly check-outable branches:

- **[Frontend](https://github.com/mhdhossam/DALEEL_FULL/tree/frontend)** — the React, TypeScript, and Vite application. The frontend files are at the branch root.
- **[Backend](https://github.com/mhdhossam/DALEEL_FULL/tree/backend)** — the Django and Django REST Framework API. The backend files are at the branch root.
- **Main** — project overview, implementation notes, and CI workflow definitions.

There is no application-source submodule required for either component.

## Frontend setup

```bash
git clone --single-branch --branch frontend https://github.com/mhdhossam/DALEEL_FULL.git daleel-frontend
cd daleel-frontend
npm ci
npm run dev
```

The Vite dev server proxies `/api`, `/data`, and `/media` to `http://127.0.0.1:8000`. Start the backend separately for API-backed pages.

## Backend setup

```bash
git clone --single-branch --branch backend https://github.com/mhdhossam/DALEEL_FULL.git daleel-backend
cd daleel-backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Copy `.env.example` to `.env`, replace the example secret, then run:

```bash
python manage.py migrate
python manage.py check
python manage.py test
python manage.py runserver
```

The backend uses SQLite for local development when `DB_NAME` is empty. For production, set a unique `DJANGO_SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and PostgreSQL credentials when needed. Never commit real secrets or production data.

## Verification

The component CI workflow runs frontend dependency installation, build, tests, and lint, plus backend migrations, Django checks, and tests. Each component branch has a `VERIFICATION.md` recording actual command results. A result should be treated as passing only when the recorded command exits successfully.
