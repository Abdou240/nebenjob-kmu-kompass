import Link from "next/link";
import { Container } from "@/components/Container";
import { globalDisclaimer } from "@/content/disclaimers";

export function Footer() {
  return (
    <footer className="border-t border-mist/70 bg-white/90">
      <Container className="grid gap-6 py-10 md:grid-cols-[2fr_1fr]">
        <div>
          <h3 className="text-base font-semibold">{globalDisclaimer.title}</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            {globalDisclaimer.body.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-ink/70">
          <h3 className="text-base font-semibold text-ink">Mehr Tools</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/calculators/stundenlohn">Stundenlohn & Arbeitszeit</Link>
            </li>
            <li>
              <Link href="/calculators/nebenverdienst">Nebenverdienst</Link>
            </li>
            <li>
              <Link href="/calculators/kleinunternehmer">Kleinunternehmer-Check</Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
