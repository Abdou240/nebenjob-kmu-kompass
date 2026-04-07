# Nebenjob & Kleinunternehmer Helfer

Ein schlanker, deutschsprachiger Utility-Stack für Nebenverdienst, Kleinunternehmer-Grenzen und Stundenlohn.

## Features (MVP)
- **Stundenlohn / Arbeitszeit / Überstunden-Rechner**
- **Nebenverdienst-Rechner** mit Szenario-Bandbreite
- **Kleinunternehmer-Check / Umsatzgrenzen Tracker**
- Landing Page + SEO-Metadaten
- Zentrale Disclaimer & Annahmen
- Platzhalter-AdSlot (konfigurierbar)
- Unit-Tests für alle Rechner-Logiken

## Lokal starten

```bash
npm install
npm run dev
```

App läuft standardmäßig auf `http://localhost:3000`.

## Tests

```bash
npm run test
```

## Projektstruktur

```
app/                         # Next.js App Router
components/                  # UI-Komponenten
content/                     # Disclaimer, FAQ, Copy
config/                      # Konstanten, Grenzwerte, Ads
features/                    # UI-Logik der Rechner
lib/calculators/             # Reine Domain-Logik
lib/validation/              # Zod-Schemas
lib/seo/                     # Metadata-Helper
tests/                       # Unit-Tests
```

## Konfiguration & Inhalte
- **Disclaimer & Copy**: `src/content/disclaimers.ts`, `src/content/faqs.ts`
- **Grenzwerte**: `src/config/thresholds.ts`
- **Annahmen**: `src/config/calculators.ts`
- **Ads**: `src/config/ads.ts`

## Ads (MVP)
`AdSlot` ist ein reiner Platzhalter und kann später an ein Ad-Netzwerk angebunden oder vollständig deaktiviert werden.

## Deployment (Vercel)
- Repository mit Vercel verbinden
- Build Command: `npm run build`
- Output: Next.js (Standard)
- Optional: `NEXT_PUBLIC_BASE_URL` setzen

## Changelog
- 2026-04-07: Grundgerüst, 3 Rechner, Tests, SEO-Setup, Disclaimer-System
