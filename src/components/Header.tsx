import Link from "next/link";
import { Container } from "@/components/Container";

const navItems = [
  { href: "/calculators/stundenlohn", label: "Stundenlohn" },
  { href: "/calculators/nebenverdienst", label: "Nebenverdienst" },
  { href: "/calculators/kleinunternehmer", label: "Kleinunternehmer" }
];

export function Header() {
  return (
    <header className="border-b border-mist/70 bg-white/80 backdrop-blur">
      <Container className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-xl font-serif font-semibold text-ink">
            Nebenjob & Kleinunternehmer Helfer
          </Link>
          <p className="text-sm text-ink/70">
            Schnelle Orientierung für Nebenverdienst, Umsatzgrenzen und Arbeitszeit.
          </p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-mist bg-white/70 px-4 py-2 text-ink/80 hover:border-moss hover:text-moss"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
