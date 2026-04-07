import Link from "next/link";
import { Container } from "@/components/Container";
import { globalDisclaimer } from "@/content/disclaimers";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-muted">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 6V14H10V10H6V14H2V6L8 2Z" fill="white" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-text">KMU Kompass</span>
          </div>
          <p className="mt-3 text-sm text-text-secondary">
            Kostenlose, unverbindliche Rechner für Nebenverdienst, Umsatzgrenzen und Arbeitszeit.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">Rechner</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/calculators/stundenlohn" className="text-text-secondary transition-colors hover:text-brand-600">Stundenlohn & Arbeitszeit</Link>
            </li>
            <li>
              <Link href="/calculators/nebenverdienst" className="text-text-secondary transition-colors hover:text-brand-600">Nebenverdienst</Link>
            </li>
            <li>
              <Link href="/calculators/kleinunternehmer" className="text-text-secondary transition-colors hover:text-brand-600">Kleinunternehmer-Check</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">{globalDisclaimer.title}</h3>
          <ul className="mt-3 space-y-1.5 text-xs text-text-tertiary">
            {globalDisclaimer.body.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-surface-border">
        <Container className="py-4 text-center text-xs text-text-tertiary">
          Alle Angaben ohne Gewähr. Keine rechtliche oder steuerliche Beratung.
        </Container>
      </div>
    </footer>
  );
}
