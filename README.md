# Star Academy Training (Simple Run Guide)

This project has 2 parts:
1. Frontend (website)
2. Backend (API + database)

You must run both.

## What you need first
- Node.js 24
- pnpm
- PostgreSQL running (local or cloud)

## 1) Open terminal in project folder
```powershell
cd C:\Users\hp\Downloads\Star-Academy-Training
```

## 2) Install packages
```powershell
pnpm.cmd install
```

## 3) Add database URL in `.env`
File: `.env`

Example for local PostgreSQL:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/heliumdb?sslmode=disable
```

Important:
- `@helium` host works on Replit internal network.
- On your local Windows machine, use `localhost` (or a real public DB host).

## 4) Create/update database tables
```powershell
$env:DATABASE_URL="postgresql://postgres:password@localhost:5432/heliumdb?sslmode=disable"
pnpm.cmd --filter @workspace/db push
```

## 5) Run backend (Terminal 1)
```powershell
$env:PORT="5000"
$env:DATABASE_URL="postgresql://postgres:password@localhost:5432/heliumdb?sslmode=disable"
pnpm.cmd --filter @workspace/api-server exec tsx ./src/index.ts
```

Backend check:
```powershell
Invoke-WebRequest http://localhost:5000/api/healthz -UseBasicParsing
```

## 6) Run frontend (Terminal 2)
```powershell
$env:PORT="5173"
$env:BASE_PATH="/"
pnpm.cmd --filter @workspace/star-academy dev
```

Open website:
- http://localhost:5173

## 7) Admin panel login
- URL: http://localhost:5173/admin
- Username: `admin`
- Password: `admin123`

## If data is not loading
1. Check backend is running on port `5000`.
2. Check PostgreSQL is running on port `5432`.
3. Check `DATABASE_URL` host is reachable.
4. Run DB push again:
```powershell
pnpm.cmd --filter @workspace/db push
```

## Development fallback mode (new)
If PostgreSQL is down/unreachable, backend now uses an in-memory fallback automatically.

This means:
- Public pages still show course/testimonial data.
- Admin panel APIs still work.
- Data is temporary and resets when backend restarts.

## Quick one-time checklist
- [ ] `pnpm.cmd install` completed
- [ ] PostgreSQL started
- [ ] `.env` has correct `DATABASE_URL`
- [ ] `pnpm.cmd --filter @workspace/db push` completed
- [ ] Backend running on `5000`
- [ ] Frontend running on `5173`
