# Daleel

Daleel is an accessibility-focused Arabic-first platform intended to help people with disabilities discover learning opportunities, scholarships, and inclusive employment resources.

## Project components

The current project package is split into two applications:

- **Frontend:** React, TypeScript, Vite, React Router, TanStack Query, and a component library built around Radix UI.
- **Backend:** Django and Django REST Framework, with JWT authentication, content/course APIs, and a schema-driven admin infrastructure.
- **Payments:** Paymob configuration is present for course enrollment/payment flows.
- **Data:** SQLite is the local development fallback; PostgreSQL can be configured through environment variables.

## Current implementation snapshot

See [Implementation results and verification status](docs/IMPLEMENTATION_RESULTS.md) for source-inspection findings and checks still to run. The application source is connected as a Git submodule: [frontend source](https://github.com/mhdhossam/DALEELFULL/tree/main/daleel_frontend_generic_content_admin) and [backend source](https://github.com/mhdhossam/DALEELFULL/tree/main/daleel_backend_generic_content_admin). Clone with `git clone --recurse-submodules https://github.com/mhdhossam/DALEEL_FULL.git` to check out the source under `daleel-source/`.

## Local setup

### Frontend

1. Install Node.js (a current LTS release is recommended).
2. Install dependencies with `npm install`.
3. Start the Vite dev server with `npm run dev`.
4. Run the configured checks with `npm run lint`, `npm test`, and `npm run build`.

The Vite configuration proxies `/api`, `/data`, and `/media` to `http://127.0.0.1:8000` during development.

### Backend

1. Create and activate a Python virtual environment.
2. Install the backend dependencies from the project's dependency manifest.
3. Copy `.env.example` to `.env` and configure the secret key, allowed hosts, database, CORS origins, and Paymob values.
4. Apply migrations with `python manage.py migrate`.
5. Start the server with `python manage.py runserver`.

Do not use development defaults such as a placeholder secret key, wildcard hosts, or permissive CORS settings in production.

## Project status

This README documents the supplied application package; it does not claim that a deployment or automated test suite has passed. The frontend/backend source is linked through the `daleel-source` submodule at a pinned commit. The code has not been executed or tested as part of this documentation update; run the checks listed above before claiming a successful build or deployment.
