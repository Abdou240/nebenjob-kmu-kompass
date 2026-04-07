import Link from "next/link";
import { Container } from "@/components/Container";
import { FAQ } from "@/components/FAQ";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { AdSlot } from "@/components/AdSlot";
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
    href: "/calculators/stundenlohn"
  },
  {
    title: "Nebenverdienst-Rechner",
    description: "Schätze deinen Nebenverdienst pro Monat und Jahr mit Szenarien.",
    href: "/calculators/nebenverdienst"
  },
  {
    title: "Kleinunternehmer-Check",
    description: "Prüfe unverbindlich, wie nah du an Umsatzgrenzen bist.",
    href: "/calculators/kleinunternehmer"
  }
];

export default function HomePage() {
  return (
    <div className="gradient-bg">
      <section className="py-14">
        <Container className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/50">
              Nebenjob & Kleinunternehmer Helfer
            </p>
            <h1 className="text-4xl font-semibold md:text-5xl">
              Ruhige Orientierung für Nebenverdienst, Kleinunternehmer-Grenzen und Arbeitszeit.
            </h1>
            <p className="text-lg text-ink/70">
              Kostenlose, unverbindliche Rechner für schnelle Entscheidungen. Ohne Registrierung, ohne Ablenkung.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/calculators/stundenlohn"
                className="rounded-full bg-moss px-6 py-3 text-sm font-semibold text-white hover:bg-ember"
              >
                Jetzt Stundenlohn berechnen
              </Link>
              <Link
                href="/calculators/kleinunternehmer"
                className="rounded-full border border-moss px-6 py-3 text-sm font-semibold text-moss hover:border-ember hover:text-ember"
              >
                Umsatzgrenzen prüfen
              </Link>
            </div>
          </div>
          <div className="card-surface rounded-3xl p-6">
            <h2 className="text-lg font-semibold">Was du hier bekommst</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink/70">
              <li>Unverbindliche Orientierung statt komplexer Fachbegriffe.</li>
              <li>Mobilfreundliche Rechner mit klaren Ergebnissen.</li>
              <li>Alle Annahmen und Grenzen zentral dokumentiert.</li>
            </ul>
            <div className="mt-6">
              <AdSlot placement="content" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container className="space-y-6">
          <h2 className="text-2xl font-semibold">Rechner im MVP</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="card-surface rounded-2xl p-5 transition hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold">{calc.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{calc.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Warum diese Rechner?</h2>
            <p className="text-sm text-ink/70">
              Viele Menschen brauchen schnelle Orientierung: Was bleibt monatlich übrig? Wie viel Umsatz ist noch okay?
              Wie hoch ist mein echter Stundenlohn? Dieser MVP liefert klare Antworten – ohne Überladung.
            </p>
          </div>
          <DisclaimerBox disclaimer={globalDisclaimer} />
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="mt-4">
            <FAQ items={faqLanding} />
          </div>
        </Container>
      </section>
    </div>
  );
}
