# AGENTS.md

## Project mission

Build a lean German utility web app called **Nebenjob & Kleinunternehmer Helfer**.

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

## Technical preferences

Preferred stack:
- Next.js
- TypeScript
- Tailwind CSS
- Zod
- minimal dependencies
- local-first where possible

Only add:
- Prisma
- PostgreSQL
- Supabase
- auth
when the chosen implementation truly requires persistence.

Keep the MVP deployable on a very low-cost setup.

---

## Architecture rules

Use clear separation between:
- UI
- domain calculation logic
- validation
- config/content
- infrastructure

Calculator logic must be:
- reusable
- pure where possible
- testable independently from UI
- easy to port later to mobile

Create a repeatable calculator pattern so future tools can be added with minimal duplication.

Suggested high-level structure:
- `app/` for routes/pages
- `components/` for UI
- `features/calculators/` for calculator-specific flows
- `lib/calculators/` for domain logic
- `lib/validation/` for schemas
- `content/` or `config/` for assumptions/disclaimers/text
- `lib/seo/` for metadata helpers
- `tests/` for logic tests

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
- strong metadata
- internal linking
- FAQ-friendly structure
- clear H1/H2 hierarchy
- clean German copy matching user search intent

Likely intents:
- Nebenverdienst Rechner
- Kleinunternehmer Grenze Rechner
- Stundenlohn Rechner
- Überstunden Rechner

---

## Ad strategy rules

Ads are secondary to UX.

Implement monetization architecture so ad components are:
- optional
- isolated
- easily removable
- not mixed into calculation logic

Do not hardwire ad logic into business logic.

Create:
- `AdSlot` component
- optional placement areas
- configuration-based enable/disable path

---

## Coding rules

- write production-quality code
- avoid pseudo-code
- avoid giant files
- prefer readable code over clever abstractions
- keep functions small
- comment only where helpful
- use TypeScript properly
- validate all user input
- handle edge cases gracefully

Before adding a new dependency, ask:
1. Is this necessary?
2. Is there a lighter built-in option?
3. Does this increase long-term maintenance cost?

---

## Testing rules

At minimum, test:
- calculator logic
- edge cases
- invalid inputs
- rounding/formatting assumptions

Do not ship calculator logic without tests.

---

## Deployment rules

Favor the cheapest practical hosting setup.

Default preference:
- frontend on Vercel
- serverless only where needed
- add database only when needed

The first shipped version should be easy for a solo founder to deploy and maintain.

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
- Updated dependencies to patched Next.js and Vitest versions.
