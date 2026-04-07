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
    <section className="gradient-bg py-12">
      <Container className="space-y-10">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Rechner</p>
          <h1 className="text-3xl font-semibold md:text-4xl">{title}</h1>
          <p className="max-w-2xl text-base text-ink/70">{subtitle}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">{children}</div>
          <aside className="space-y-6">
            <AdSlot placement="calculator" />
            <div className="rounded-2xl border border-mist bg-white/90 p-5">
              <h2 className="text-base font-semibold">Weitere Rechner</h2>
              <div className="mt-4 space-y-3 text-sm">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl border border-mist/70 bg-mist/40 p-3 hover:border-moss"
                  >
                    <div className="font-medium text-ink">{link.label}</div>
                    <div className="text-ink/60">{link.description}</div>
                  </Link>
                ))}
              </div>
            </div>
            {disclaimer}
          </aside>
        </div>

        <div>
          <h2 className="text-xl font-semibold">FAQ</h2>
          <div className="mt-4">{faq}</div>
        </div>
      </Container>
    </section>
  );
}
