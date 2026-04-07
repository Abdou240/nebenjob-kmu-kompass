# Nebenjob & Kleinunternehmer Helfer

Kostenlose, unverbindliche Rechner für Nebenverdienst, Kleinunternehmer-Grenzen und Stundenlohn. Einfach, mobilfreundlich, ohne Schnickschnack.

## Rechner

- **Stundenlohn / Arbeitszeit** — Stundenlohn, Monatsstunden und Überstunden berechnen
- **Nebenverdienst** — Monatlichen und jährlichen Nebenverdienst inkl. Szenarien schätzen
- **Kleinunternehmer-Check** — Umsatzgrenzen der Kleinunternehmerregelung unverbindlich prüfen

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, standalone output)
- TypeScript (strict mode)
- Tailwind CSS 3
- Zod (input validation)
- Prisma 7 + PostgreSQL (database foundation)
- Vitest (unit tests)
- Docker / Docker Compose

## Architecture

```
src/
├── app/                        # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── health/             # GET /api/health
│   │   └── calculators/        # POST endpoints per calculator
│   ├── calculators/            # Calculator pages (SSG)
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles & design tokens
│   ├── robots.ts               # SEO
│   └── sitemap.ts              # SEO
├── components/                 # Shared UI components
│   ├── Container.tsx           # Max-width wrapper
│   ├── Header.tsx              # Sticky header with active nav states
│   ├── Footer.tsx              # Footer with disclaimer
│   ├── CalculatorLayout.tsx    # Shared calculator page layout
│   ├── SectionCard.tsx         # Card wrapper for form/result sections
│   ├── FormField.tsx           # Label + hint + error wrapper
│   ├── Input.tsx               # Styled input
│   ├── Select.tsx              # Styled select
│   ├── ResultCard.tsx          # Result display card
│   ├── FAQ.tsx                 # Collapsible FAQ accordion
│   ├── DisclaimerBox.tsx       # Disclaimer with info icon
│   └── AdSlot.tsx              # Ad placeholder
├── config/                     # App-wide configuration
│   ├── app.ts                  # Site name, URL, locale
│   ├── ads.ts                  # Ad placement config
│   ├── calculators.ts          # Calculator defaults
│   └── thresholds.ts           # Kleinunternehmer regime data
├── content/                    # German copy & content
│   ├── disclaimers.ts          # Centralized disclaimer texts
│   └── faqs.ts                 # FAQ content per calculator
├── features/                   # Calculator UI components (client)
│   └── calculators/
│       ├── stundenlohn/
│       ├── nebenverdienst/
│       └── kleinunternehmer/
├── generated/                  # Prisma generated client (gitignored)
├── lib/                        # Shared utilities & domain logic
│   ├── api/response.ts         # API response helpers
│   ├── calculators/            # Pure calculator functions
│   ├── db/client.ts            # Prisma client singleton
│   ├── format.ts               # Number/currency formatters
│   ├── seo/metadata.ts         # SEO metadata builder
│   └── validation/             # Zod schemas per calculator
├── services/                   # Service layer (domain + persistence)
│   ├── stundenlohn.service.ts
│   ├── nebenverdienst.service.ts
│   └── kleinunternehmer.service.ts
tests/                          # Unit tests
prisma/
└── schema.prisma               # Database schema
```

## Local Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Generate Prisma client
npm run db:generate

# Start dev server
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | TypeScript type checking |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Prisma Studio |

## Docker Development

### Prerequisites

- Docker & Docker Compose

### Start

```bash
# Start app + PostgreSQL
docker compose up --build

# In a separate terminal, run migrations
docker compose exec app npx prisma migrate dev
```

The app runs at [http://localhost:3000](http://localhost:3000).
PostgreSQL is available at `localhost:5432`.

### Stop

```bash
docker compose down        # Stop containers
docker compose down -v     # Stop and remove volumes
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_BASE_URL` | Public URL of the app | `http://localhost:3000` |
| `DATABASE_URL` | PostgreSQL connection string | (see .env.example) |

## Database

The database schema includes:

- **Calculation** — saved calculation inputs and results (for future history feature)
- **Event** — lightweight analytics events (for future product insights)

Both tables are prepared for future features and currently not actively written to from the frontend.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/calculators/stundenlohn` | Stundenlohn calculation |
| `POST` | `/api/calculators/nebenverdienst` | Nebenverdienst calculation |
| `POST` | `/api/calculators/kleinunternehmer` | Kleinunternehmer check |

All calculator endpoints accept JSON body, validate with Zod, and return `{ ok: true, data: ... }` or `{ ok: false, error: ..., details: ... }`.

## Design System

The UI uses a calm, professional design language:

- **Colors**: ink (text), moss (primary), sand (background), mist (borders), clay (accents), ember (warnings/CTAs)
- **Typography**: Alegreya Sans (body) + Fraunces (headings), with a defined scale from `overline` to `display`
- **Spacing**: Consistent section/card spacing tokens
- **Components**: Card surfaces, pill buttons, collapsible FAQ, disclaimer boxes with icons, result cards with highlight variants

## Konfiguration & Inhalte

- **Disclaimer & Copy**: `src/content/disclaimers.ts`, `src/content/faqs.ts`
- **Grenzwerte**: `src/config/thresholds.ts`
- **Annahmen**: `src/config/calculators.ts`
- **Ads**: `src/config/ads.ts`

## Deployment (Vercel)

- Repository mit Vercel verbinden
- Build Command: `npm run build`
- Output: Next.js (standalone)
- `NEXT_PUBLIC_BASE_URL` setzen

## Legal

Alle Ergebnisse sind unverbindliche Schätzungen zur Orientierung. Keine rechtliche oder steuerliche Beratung.

## License

AGPL-3.0 — see [LICENSE](LICENSE)
