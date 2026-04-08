# Nebenjob & Kleinunternehmer Helfer

Kostenlose, unverbindliche Rechner für Nebenverdienst, Kleinunternehmer-Grenzen und Stundenlohn. Deutschsprachig, mobilfreundlich und auf schnelle Orientierung ausgelegt.

## Rechner

- **Stundenlohn / Arbeitszeit** — Stundenlohn, Monatsstunden und Überstunden berechnen
- **Nebenverdienst** — Monatlichen und jährlichen Nebenverdienst inkl. Szenarien schätzen
- **Kleinunternehmer-Check** — Umsatzgrenzen der Kleinunternehmerregelung unverbindlich prüfen

## Produktfeatures

- Prominente Ergebnisbereiche mit Hauptwert, Kurzfazit und nächsten Prüfpunkten
- Sharebare Eingaben via URL-Query-Parametern
- Lokale letzte Berechnungen mit Wiederherstellen und Löschen ohne Konto
- Nützlichere Sidebar mit Teilen, Kurz-Erklärung, Regelungsstand und Empfehlungen
- "Wie wird gerechnet?"-Blöcke und praxisnähere FAQ-Inhalte

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
│   ├── ResultHero.tsx          # Primary calculator result
│   ├── SidebarCard.tsx         # Reusable sidebar module shell
│   ├── ShareCard.tsx           # Copy current calculator state URL
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
│   ├── faqs.ts                 # FAQ content per calculator
│   └── calculator-guidance.ts  # Short explanations, next steps, how-it-works copy
├── features/                   # Calculator UI components (client)
│   └── calculators/
│       ├── shared/             # URL state + recent calculation helpers
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

Both tables remain available as backend foundation. The current MVP keeps recent calculations privacy-friendly in local storage and does not require account-based persistence.

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

- **Colors**: `brand-*`, `surface-*`, `text-*`, plus semantic `success-*`, `warning-*`, `danger-*`
- **Typography**: Inter for UI/body, Source Serif 4 for headings
- **Spacing**: compact page headers, card-based sections, mobile-first form spacing
- **Components**: section cards, result hero, metric cards, sidebar modules, FAQ accordion, disclaimer box, share card

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

Apache-2.0 — see [LICENSE](LICENSE)
