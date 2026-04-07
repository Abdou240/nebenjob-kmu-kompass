# AGENTS.md

## Project mission

Build a lean German utility web app called **Nebenjob & Kleinunternehmer Helfer** (KMU Kompass).

The product helps users in Germany with simple, trustworthy calculators and helper tools around:
- side income
- small-business threshold orientation
- hourly wage / work time / overtime

This is a **free, ad-light, SEO-friendly, mobile-first** product intended to start small and expand step by step.

The app must be:
- cheap to host
- easy to maintain
- fast to load
- simple to understand
- structured for future PWA/mobile evolution

---

## Product priorities

1. Trust
2. Simplicity
3. Speed
4. Low operating cost
5. SEO discoverability
6. Reusable calculator architecture
7. Future extensibility

Do **not** prioritize flashy visuals or unnecessary complexity.

---

## Core business model

- free to use
- light advertising only
- minimal annoyance
- no aggressive ad patterns
- no interstitials in first session
- no autoplay video ads
- max one discreet ad area on result or content sections
- prepare for optional premium/ad-free version later

Retention and trust matter more than short-term ad extraction.

---

## MVP scope

Build exactly these 3 tools first:

1. **Nebenverdienst-Rechner**
2. **Kleinunternehmer-Check / Umsatzgrenzen Tracker**
3. **Stundenlohn / Arbeitszeit / Überstunden-Rechner**

Also build:
- landing page
- SEO-ready calculator pages
- disclaimer system
- shared calculator components
- responsive layout
- placeholder ad-slot component
- metadata and internal linking
- README
- tests for calculator logic

---

## Non-goals for MVP

Do not build unless clearly necessary:
- full user account system
- admin dashboard
- CMS
- complex API platform
- multi-tenant backend
- native mobile app
- real ad-network integration before foundation is stable
- heavy analytics setup
- AI chatbot
- large legal/tax knowledge engine

---

## Regulatory and trust rules

This product is **informational only**.

Never present legal, tax, or regulatory output as binding advice.

Use cautious wording such as:
- estimate
- orientation
- unverbindlich
- informational only
- no guarantee
- please verify with official or professional sources where relevant

All thresholds, constants, disclaimers, and assumption texts must live in structured config/content modules, not scattered across UI files.

---

## Technical stack

Current stack:
- **Next.js 15** (App Router, standalone output)
- **TypeScript** (strict mode)
- **Tailwind CSS 3** with custom design system tokens
- **Zod** for input validation
- **Prisma 7** + PostgreSQL (database foundation with driver adapter)
- **Vitest** for unit tests
- **Docker** / Docker Compose for local development
- **GitHub Actions** for CI (lint, test, build)

Fonts:
- **Inter** (sans-serif, body text)
- **Source Serif 4** (serif, headings)

---

## Architecture

```
src/
├── app/                        # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── health/             # GET /api/health
│   │   └── calculators/        # POST endpoints per calculator
│   ├── calculators/            # Calculator pages (SSG)
│   ├── layout.tsx              # Root layout (fonts, Header, Footer)
│   ├── page.tsx                # Homepage
│   └── globals.css             # Design system (component classes)
├── components/                 # Shared UI components
├── config/                     # App config, thresholds, ads, calculator defaults
├── content/                    # German copy (disclaimers, FAQs)
├── features/calculators/       # Calculator-specific client components
├── generated/                  # Prisma generated client (gitignored)
├── lib/                        # Domain logic, validation, formatters, API helpers
│   ├── api/response.ts         # Typed API response utilities
│   ├── calculators/            # Pure calculator functions
│   ├── db/client.ts            # Prisma client singleton
│   ├── format.ts               # Number/currency formatting
│   ├── seo/metadata.ts         # SEO metadata builder
│   └── validation/             # Zod schemas
├── services/                   # Service layer (validation + calculation)
tests/                          # Unit tests
prisma/schema.prisma            # Database schema
```

### Architecture rules

Use clear separation between:
- UI
- domain calculation logic
- validation
- config/content
- API layer
- services
- infrastructure

Calculator logic must be:
- reusable
- pure where possible
- testable independently from UI
- easy to port later to mobile

---

## Design system

The app uses a clean, professional fintech-inspired design:

**Color palette:**
- `brand-*` (blue scale) — primary actions, highlights, active states
- `surface-*` — backgrounds, borders, cards
- `text-*` — primary, secondary, tertiary text
- `success-*` / `warning-*` / `danger-*` — semantic status colors

**Typography:**
- Inter for body, labels, navigation
- Source Serif 4 for headings
- Scale: display, display-sm, h1, h2, h3, body-lg, body, sm, xs, label

**Component patterns:**
- `.card` / `.card-hover` — bordered cards with subtle shadows
- `.btn-primary` / `.btn-secondary` — consistent button styles
- `.focus-ring` — accessible focus indicators
- `.section-padding` — consistent vertical rhythm

---

## UX rules

The UX should feel:
- calm
- trustworthy
- quick
- mobile-friendly
- obvious

Use:
- short forms
- clear labels
- simple results
- contextual help
- visible disclaimers
- strong empty states
- clear validation errors

Avoid:
- clutter
- dark patterns
- noisy ad placements
- overcomplicated navigation

---

## SEO rules

The product relies heavily on organic traffic.

Requirements:
- one landing page
- one page per calculator
- strong metadata (OpenGraph, Twitter cards, canonical URLs)
- internal linking between calculators
- FAQ-friendly structure with collapsible accordions
- clear H1/H2 hierarchy
- clean German copy matching user search intent
- sitemap.xml and robots.txt

---

## Ad strategy rules

Ads are secondary to UX.

The `AdSlot` component is:
- optional
- isolated
- easily removable
- configuration-based enable/disable via `src/config/ads.ts`

Do not hardwire ad logic into business logic.

---

## Testing rules

At minimum, test:
- calculator logic
- edge cases
- invalid inputs
- rounding/formatting assumptions

Current test coverage: 10 tests across 4 test files.

---

## Deployment

**Vercel:**
- Build Command: `npm run build`
- Framework: Next.js (standalone output)
- Set `NEXT_PUBLIC_BASE_URL` and `DATABASE_URL`

**Docker:**
- `docker compose up --build` for app + PostgreSQL
- Multi-stage Dockerfile with standalone output
- Healthcheck on PostgreSQL

---

## CI/CD

GitHub Actions workflow runs on every push and pull request:
- Install dependencies
- Generate Prisma client
- Lint
- Type check
- Unit tests
- Production build

---

## Database

**Prisma 7** with PostgreSQL via `@prisma/adapter-pg`.

Schema includes:
- `Calculation` — saved inputs/results for future history feature
- `Event` — lightweight analytics events

Both tables are scaffolded for future features, not actively written to yet.

Commands:
- `npm run db:generate` — generate Prisma client
- `npm run db:migrate` — run migrations
- `npm run db:push` — push schema to DB
- `npm run db:studio` — open Prisma Studio

---

## Expansion roadmap

After MVP is complete and stable, expansion should happen in this order:
1. improve SEO pages
2. add more calculators
3. add PWA support
4. add saved history
5. add optional accounts
6. add premium/ad-free version
7. add mobile app via shared logic

Do not skip directly to native mobile unless the web/PWA version proves traction.

---

## Working style for the agent

When working on this project:
1. restate assumptions
2. keep scope tight
3. build the smallest usable version first
4. finish core flows before optional features
5. maintain a clear changelog of what was created
6. update README as the project evolves

If there are multiple good options, choose the simpler and cheaper one unless there is a strong reason not to.

If uncertain on legal/tax semantics, prefer neutral wording and isolate assumptions in config.

---

## Changelog

2026-04-07
- Scaffolded Next.js App Router project with TypeScript, Tailwind, ESLint, Zod, Vitest.
- Implemented landing page, shared layout, SEO metadata, sitemap, and robots.
- Built 3 calculators (Stundenlohn, Nebenverdienst, Kleinunternehmer) with reusable UI layout.
- Added pure calculator logic modules and Zod validation schemas.
- Centralized disclaimers, FAQs, assumptions, and threshold config.
- Added AdSlot placeholder component with config toggle.
- Added unit tests for calculator logic and fixed rounding consistency.

2026-04-07 (Phase 2 — Professionalization)
- Fixed hydration error (suppressHydrationWarning on html tag).
- Complete frontend redesign: new color palette (brand blue + slate), new fonts (Inter + Source Serif 4).
- Added design system with semantic colors (brand, surface, text, success, warning, danger).
- Redesigned all components: Header (sticky, active states, mobile nav), Footer, FAQ (collapsible accordion), ResultCard (highlight variant), DisclaimerBox (warning styling), SectionCard, FormField, Input, Select.
- Calculator pages: breadcrumb navigation, better section structure, colored status badges.
- Homepage: centered hero, feature badges, icon-decorated calculator cards.
- Added API foundation: health endpoint, 3 calculator POST endpoints with Zod validation.
- Added service layer for calculator domain logic.
- Added shared API response utilities (success/error/validation responses).
- Added Prisma 7 + PostgreSQL with driver adapter, initial schema (Calculation, Event).
- Added Prisma client singleton with dev-mode caching.
- Added Docker setup: multi-stage Dockerfile, docker-compose.yml (app + PostgreSQL), .dockerignore.
- Next.js standalone output for production Docker builds.
- Added format utility tests (parseGermanNumber, roundCurrency, clamp).
- Added GitHub Actions CI workflow (lint, typecheck, test, build).
- Updated README with full architecture docs, setup instructions, Docker guide.
- Updated AGENTS.md with current stack, architecture, and design system documentation.
