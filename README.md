# Star Computer's Academy

A full-stack academy website and admin panel for managing courses, enrollments, contacts, and testimonials.

This repository is a pnpm monorepo with:
- Public website (React + Vite)
- Admin panel (inside the same frontend app)
- Backend API (Express + TypeScript)
- Database layer (PostgreSQL + Drizzle ORM)

## What This App Does

### Public side
- Shows courses, facilities, testimonials, and contact pages
- Lets users submit enrollments and contact forms

### Admin side
- Login to admin dashboard
- Manage courses
- Manage enrollments (status update + delete)
- Manage contact messages
- Manage testimonials
- View dashboard stats

## Tech Stack

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- React Query
- shadcn/ui components

### Backend
- Node.js
- Express 5
- TypeScript

### Database
- PostgreSQL
- Drizzle ORM
- drizzle-kit

### Monorepo tooling
- pnpm workspaces

## Project Structure

```text
artifacts/
  star-academy/      # Frontend app (public + admin UI)
  api-server/        # Backend API
lib/
  db/                # Drizzle schema + DB client
  api-spec/          # OpenAPI spec
  api-client-react/  # Generated API client for frontend
  api-zod/           # Generated Zod types
```

## Environment Variables

Create a `.env` file in repo root (or set env vars in terminal):

```env
DATABASE_URL=postgresql://DB_USER:DB_PASSWORD@DB_HOST:5432/DB_NAME?sslmode=disable
```

Backend also needs:
- `PORT` (example: `5000`)

Frontend also needs:
- `PORT` (example: `5173`)
- `BASE_PATH` (use `/`)
- Optional: `API_TARGET` (default `http://localhost:5000`)

## Local Run (Windows PowerShell)

### 1) Open repo
```powershell
cd C:\Users\hp\Downloads\Star-Academy-Training
```

### 2) Install dependencies
```powershell
pnpm.cmd install
```

### 3) Push DB schema (when PostgreSQL is available)
```powershell
$env:DATABASE_URL="postgresql://DB_USER:DB_PASSWORD@DB_HOST:5432/DB_NAME?sslmode=disable"
pnpm.cmd --filter @workspace/db push
```

### 4) Run backend (Terminal 1)
```powershell
$env:PORT="5000"
$env:DATABASE_URL="postgresql://DB_USER:DB_PASSWORD@DB_HOST:5432/DB_NAME?sslmode=disable"
pnpm.cmd --filter @workspace/api-server exec tsx ./src/index.ts
```

### 5) Run frontend (Terminal 2)
```powershell
$env:PORT="5173"
$env:BASE_PATH="/"
$env:API_TARGET="http://localhost:5000"
pnpm.cmd --filter @workspace/star-academy dev
```

Open:
- `http://localhost:5173`
- Admin: `http://localhost:5173/admin`

## API Behavior in Local Development

- Frontend `/api/*` requests are proxied to backend using Vite proxy.
- Proxy target is `API_TARGET` (default: `http://localhost:5000`).

## Database Fallback Mode (Local Dev Safety)

If PostgreSQL is unreachable, backend automatically uses an in-memory fallback store.

This helps you continue UI/admin development without blocking.

Important:
- Data is temporary in fallback mode
- Data resets when backend restarts
- Use real PostgreSQL for persistent production data

## Common Commands

```powershell
# Install all dependencies
pnpm.cmd install

# Typecheck workspace
pnpm.cmd run typecheck

# Backend only
pnpm.cmd --filter @workspace/api-server exec tsx ./src/index.ts

# Frontend only
pnpm.cmd --filter @workspace/star-academy dev

# Push DB schema
pnpm.cmd --filter @workspace/db push
```

## Troubleshooting

### `Failed to fetch courses`
Usually backend cannot reach database.

Check:
1. PostgreSQL is running
2. `DATABASE_URL` host/port/user/password are correct
3. Backend is running on port `5000`
4. Frontend `API_TARGET` points to backend

### `pnpm` blocked in PowerShell
Use `pnpm.cmd` instead of `pnpm`.

### Port already in use
Stop existing process on that port, then run again.

## Security Notes

- Do not commit real credentials in `.env`.
- `.env` is ignored by git in this repo.
- Use placeholders in documentation and screenshots.
- Change demo/default admin credentials before production use.

## Deploy Notes

- Frontend and backend can be deployed separately.
- Frontend should forward `/api/*` to backend domain.
- Backend requires a reachable PostgreSQL instance.

---

For extra setup detail, see: [APP_SETUP_GUIDE.md](./APP_SETUP_GUIDE.md)
