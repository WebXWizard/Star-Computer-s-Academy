# App Setup Guide (Sanitized)

This file is a quick setup companion to `README.md`.

## 1) Prerequisites
- Node.js 24+
- pnpm
- PostgreSQL (for persistent data)

## 2) Install
```powershell
pnpm.cmd install
```

## 3) Environment variables
Use placeholders, not real secrets:

```env
DATABASE_URL=postgresql://DB_USER:DB_PASSWORD@DB_HOST:5432/DB_NAME?sslmode=disable
```

Frontend runtime vars:
- `PORT=5173`
- `BASE_PATH=/`
- Optional `API_TARGET=http://localhost:5000`

Backend runtime vars:
- `PORT=5000`
- `DATABASE_URL` (same as above)

## 4) Database schema push (when DB is available)
```powershell
$env:DATABASE_URL="postgresql://DB_USER:DB_PASSWORD@DB_HOST:5432/DB_NAME?sslmode=disable"
pnpm.cmd --filter @workspace/db push
```

## 5) Run backend
```powershell
$env:PORT="5000"
$env:DATABASE_URL="postgresql://DB_USER:DB_PASSWORD@DB_HOST:5432/DB_NAME?sslmode=disable"
pnpm.cmd --filter @workspace/api-server exec tsx ./src/index.ts
```

## 6) Run frontend
```powershell
$env:PORT="5173"
$env:BASE_PATH="/"
$env:API_TARGET="http://localhost:5000"
pnpm.cmd --filter @workspace/star-academy dev
```

Open:
- `http://localhost:5173`
- Admin route: `/admin`

## 7) If DB is down
Backend automatically switches to in-memory fallback mode for local development.

- UI/admin can still be tested
- Data is temporary and resets on backend restart

## 8) Security reminder
- Never put real secrets in docs.
- Keep real credentials only in local `.env` or hosting secrets manager.
