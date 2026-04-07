import Link from "next/link";
import { ReactNode } from "react";
import { Container } from "@/components/Container";
import { AdSlot } from "@/components/AdSlot";

export type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

type CalculatorLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  disclaimer: ReactNode;
  faq: ReactNode;
  relatedLinks: RelatedLink[];
};

export function CalculatorLayout({
  title,
  subtitle,
  children,
  disclaimer,
  faq,
  relatedLinks
}: CalculatorLayoutProps) {
  return (
    <div>
      {/* Page header */}
      <div className="border-b border-surface-border bg-surface-muted">
        <Container className="py-8 sm:py-10">
          <div className="flex items-center gap-2 text-xs font-medium text-text-tertiary">
            <Link href="/" className="transition-colors hover:text-brand-600">Start</Link>
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.5 3L7.5 6L4.5 9" /></svg>
            <span className="text-text-secondary">Rechner</span>
          </div>
          <h1 className="mt-3 text-display-sm sm:text-display">{title}</h1>
          <p className="mt-2 max-w-2xl text-body-lg text-text-secondary">{subtitle}</p>
        </Container>
      </div>

      {/* Calculator + sidebar */}
      <Container className="grid gap-8 py-8 sm:py-10 lg:grid-cols-[5fr_2fr]">
        <div className="space-y-6">{children}</div>
        <aside className="space-y-5">
          <AdSlot placement="calculator" />
          <div className="card p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">Weitere Rechner</h2>
            <div className="mt-3 space-y-2">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg border border-surface-border p-3 transition-colors hover:border-brand-200 hover:bg-brand-50"
                >
                  <div className="text-sm font-medium text-text">{link.label}</div>
                  <div className="mt-0.5 text-xs text-text-tertiary">{link.description}</div>
                </Link>
              ))}
            </div>
          </div>
          {disclaimer}
        </aside>
      </Container>

      {/* FAQ section */}
      <div className="border-t border-surface-border bg-surface-muted">
        <Container className="py-12 sm:py-16">
          <div className="mx-auto max-w-prose">
            <h2 className="text-h2">Häufige Fragen</h2>
            <div className="mt-5">{faq}</div>
          </div>
        </Container>
      </div>
    </div>
  );
}
