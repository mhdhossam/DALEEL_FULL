# Daleel Frontend

React + TypeScript + Vite frontend for the Arabic-first Daleel accessibility and learning platform.

## Requirements
- Node.js 22 or newer
- The Django API from the `backend` branch for API-backed pages

## Local development

```bash
npm ci
npm run dev
```

The Vite dev proxy forwards `/api`, `/data`, and `/media` to `http://127.0.0.1:8000`. Start the backend separately. The landing page uses the lightweight `public/hero-bg.webp` asset as its hero background to avoid bundling a large MP4 into the initial page.

## Checks

```bash
npm run build
npm test
npm run lint
```
