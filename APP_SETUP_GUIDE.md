# Star Academy - Local Run Guide (Windows PowerShell)

This guide gives exact commands to run this app locally.

## Project layout
- Frontend: `artifacts/star-academy` (React + Vite)
- Backend: `artifacts/api-server` (Express + TypeScript)
- Database package: `lib/db` (Drizzle + PostgreSQL)

## Prerequisites
1. Node.js `24.x`
2. pnpm `10+`
3. PostgreSQL running locally or remotely

## 1) Open terminal in repo root
```powershell
cd C:\Users\hp\Downloads\Star-Academy-Training
```

## 2) Install dependencies
Use `pnpm.cmd` in PowerShell (safer on Windows if script execution blocks `pnpm`).

```powershell
pnpm.cmd install
```

## 3) Set database URL and push schema
Replace with your real PostgreSQL connection string:

```powershell
$env:DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
pnpm.cmd --filter @workspace/db push
```

## 4) Start backend (Terminal 1)
```powershell
$env:PORT="5000"
$env:DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
pnpm.cmd --filter @workspace/api-server exec tsx ./src/index.ts
```

Expected log:
```text
Server listening on port 5000
```

Health check (in another terminal):
```powershell
Invoke-WebRequest http://localhost:5000/api/healthz -UseBasicParsing
```

## 5) Start frontend (Terminal 2)
```powershell
$env:PORT="5173"
$env:BASE_PATH="/"
pnpm.cmd --filter @workspace/star-academy dev
```

Open:
- `http://localhost:5173`

## 6) Admin login
- URL: `http://localhost:5173/admin`
- Username: `admin`
- Password: `admin123`

## Important local-dev note about API
This repo now includes a Vite dev proxy:
- `/api/*` from frontend (`localhost:5173`) is forwarded to backend (`http://localhost:5000`)

Optional: if your backend runs on another URL/port, set:
```powershell
$env:API_TARGET="http://localhost:5001"
```
before running frontend.

## Quick commands summary
Run these from repo root:

```powershell
# Install
pnpm.cmd install

# DB schema
$env:DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
pnpm.cmd --filter @workspace/db push

# Backend
$env:PORT="5000"
$env:DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
pnpm.cmd --filter @workspace/api-server exec tsx ./src/index.ts

# Frontend (new terminal)
$env:PORT="5173"
$env:BASE_PATH="/"
pnpm.cmd --filter @workspace/star-academy dev
```

## Troubleshooting
1. `pnpm` blocked in PowerShell:
   Use `pnpm.cmd` instead of `pnpm`.
2. Backend crashes with `DATABASE_URL must be set`:
   Set `$env:DATABASE_URL` before starting backend.
3. `PORT environment variable is required`:
   Set `$env:PORT` before starting frontend/backend.
4. Frontend starts but data is missing:
   Backend may not be running, DB may be unavailable, or `API_TARGET` is pointing to the wrong backend URL.
