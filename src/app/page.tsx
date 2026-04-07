import Link from "next/link";
import { Container } from "@/components/Container";
import { FAQ } from "@/components/FAQ";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { faqLanding } from "@/content/faqs";
import { globalDisclaimer } from "@/content/disclaimers";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Nebenjob & Kleinunternehmer Helfer",
  description:
    "Kostenlose Rechner für Nebenverdienst, Kleinunternehmer-Grenzen und Stundenlohn. Schnell, mobilfreundlich und unverbindlich.",
  path: "/"
});

const calculators = [
  {
    title: "Stundenlohn / Arbeitszeit",
    description: "Rechne deinen Stundenlohn, Monatsstunden und Überstunden in Sekunden.",
    href: "/calculators/stundenlohn",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v4l2.5 2.5" />
      </svg>
    )
  },
  {
    title: "Nebenverdienst-Rechner",
    description: "Schätze deinen Nebenverdienst pro Monat und Jahr mit Szenarien.",
    href: "/calculators/nebenverdienst",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 4v12M7 7l3-3 3 3M13 13l-3 3-3-3" />
      </svg>
    )
  },
  {
    title: "Kleinunternehmer-Check",
    description: "Prüfe unverbindlich, wie nah du an Umsatzgrenzen bist.",
    href: "/calculators/kleinunternehmer",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 16V6l7-4 7 4v10l-7 2-7-2z" />
        <path d="M10 8v4" />
        <circle cx="10" cy="14" r="0.5" fill="currentColor" />
      </svg>
    )
  }
];

const features = [
  { text: "Keine Registrierung nötig" },
  { text: "Mobilfreundlich & schnell" },
  { text: "Alle Annahmen transparent dokumentiert" },
  { text: "Unverbindliche Orientierung" }
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="border-b border-surface-border bg-surface-muted">
        <Container className="py-16 sm:py-22">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-pill border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Kostenlos & unverbindlich
            </div>
            <h1 className="mt-5 text-display-sm sm:text-display">
              Schnelle Orientierung für Nebenverdienst und Kleinunternehmer
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary">
              Kostenlose Rechner für Stundenlohn, Nebenverdienst und Umsatzgrenzen. Einfach, mobilfreundlich, ohne Schnickschnack.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/calculators/stundenlohn" className="btn-primary">
                Stundenlohn berechnen
              </Link>
              <Link href="/calculators/kleinunternehmer" className="btn-secondary">
                Umsatzgrenzen prüfen
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Feature badges */}
      <Container className="py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {features.map((f) => (
            <div key={f.text} className="flex items-center gap-2 text-sm text-text-secondary">
              <svg className="h-4 w-4 text-success-500" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" /></svg>
              {f.text}
            </div>
          ))}
        </div>
      </Container>

      {/* Calculator cards */}
      <Container className="pb-16 sm:pb-20">
        <h2 className="text-center text-h1">Unsere Rechner</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-body text-text-secondary">
          Wähle einen Rechner und erhalte in Sekunden eine unverbindliche Schätzung.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="card-hover group p-5 sm:p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                {calc.icon}
              </div>
              <h3 className="mt-4 text-h3 text-text">{calc.title}</h3>
              <p className="mt-1.5 text-sm text-text-secondary">{calc.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                Zum Rechner
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 3l4 4-4 4" /></svg>
              </span>
            </Link>
          ))}
        </div>
      </Container>

      {/* Why section + disclaimer */}
      <div className="border-t border-surface-border bg-surface-muted">
        <Container className="grid gap-8 py-12 sm:py-16 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div>
            <h2 className="text-h1">Warum diese Rechner?</h2>
            <p className="mt-3 text-body text-text-secondary max-w-lg">
              Viele Menschen brauchen schnelle Orientierung: Was bleibt monatlich übrig? Wie viel Umsatz ist noch okay?
              Wie hoch ist mein echter Stundenlohn? Dieser Helfer liefert klare Antworten – ohne Überladung.
            </p>
          </div>
          <DisclaimerBox disclaimer={globalDisclaimer} />
        </Container>
      </div>

      {/* FAQ */}
      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-prose">
          <h2 className="text-h1">Häufige Fragen</h2>
          <div className="mt-5">
            <FAQ items={faqLanding} />
          </div>
        </div>
      </Container>
    </div>
  );
}
