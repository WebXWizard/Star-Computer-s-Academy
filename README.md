# Star Computer's Academy

Star Computer's Academy is a full-stack academy management app with a public website and an admin panel.

It helps an institute:
- Show courses and academy information
- Collect student enrollments and contact messages
- Manage courses, testimonials, and inquiries from an admin dashboard

## Tech Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL, Drizzle ORM
- Monorepo tooling: pnpm workspaces

## Extra Info

- Monorepo structure:
  - `artifacts/star-academy` -> frontend (public + admin UI)
  - `artifacts/api-server` -> backend API
  - `lib/db` -> database schema and DB client
- Frontend uses API routes under `/api/*`
- Local development includes a safe in-memory fallback mode when PostgreSQL is unavailable
- Built to run both as local development setup and deployable frontend/backend services
