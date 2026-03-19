# Workspace

## Overview

pnpm workspace monorepo using TypeScript. This is the website for **Star Computer's Academy** — a computer training institute in Sarsaundi, Uttar Pradesh, India — with a full admin panel.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui + framer-motion

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── star-academy/       # React + Vite frontend (public site + admin panel)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Application Features

### Public Website (/)
- **Hero**: "Star Computer's Academy" with enrollment CTA
- **About**: Academy description
- **Courses**: Dynamic from DB (Basic Computer, MS Office, Typing, CCC, Internet)
- **Features**: 4 key selling points
- **Testimonials**: Dynamic from DB with student reviews
- **Contact**: Address (X323+PRJ, Sarsaundi UP 225001), Phone, WhatsApp, Google Maps
- **Floating WhatsApp Button**: Always visible
- **Enrollment Modal**: Form to submit enrollment (POST /api/enrollments)
- **Contact Form**: (POST /api/contacts)
- **SEO**: Meta tags for the academy

### Admin Panel (/admin)
- **Login**: Username: `admin`, Password: `admin123` (localStorage auth)
- **Dashboard**: Stats overview (enrollments, contacts, courses)
- **Enrollments Management**: View, update status, delete
- **Contacts Management**: View, delete
- **Courses Management**: Full CRUD
- **Testimonials Management**: Full CRUD

## API Routes

All routes prefixed with `/api`:

- `GET /api/healthz` — Health check
- `GET/POST /api/enrollments` — List / create enrollments
- `PATCH/DELETE /api/enrollments/:id` — Update status / delete
- `GET/POST /api/contacts` — List / create contact messages
- `DELETE /api/contacts/:id` — Delete contact
- `GET/POST /api/courses` — List / create courses
- `PATCH/DELETE /api/courses/:id` — Update / delete course
- `GET/POST /api/testimonials` — List / create testimonials
- `DELETE /api/testimonials/:id` — Delete testimonial
- `GET /api/admin/stats` — Admin dashboard stats

## Database Schema

- `enrollments` — student enrollment submissions
- `contacts` — contact form messages
- `courses` — courses offered (seeded with 5 courses)
- `testimonials` — student testimonials (seeded with 4 reviews)

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Codegen

Run: `pnpm --filter @workspace/api-spec run codegen`
