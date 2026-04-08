import Link from "next/link";
import { Suspense } from "react";
import { CalculatorLayout, RelatedLink } from "@/components/CalculatorLayout";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQ } from "@/components/FAQ";
import { ShareCard } from "@/components/ShareCard";
import { SidebarCard } from "@/components/SidebarCard";
import { KleinunternehmerCalculator } from "@/features/calculators/kleinunternehmer/KleinunternehmerCalculator";
import { calculatorDisclaimers } from "@/content/disclaimers";
import { faqKleinunternehmer } from "@/content/faqs";
import { calculatorGuidance } from "@/content/calculator-guidance";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Kleinunternehmer Check",
  description: "Unverbindliche Orientierung zu Umsatzgrenzen der Kleinunternehmerregelung.",
  path: "/calculators/kleinunternehmer"
});

const relatedLinks: RelatedLink[] = [
  {
    href: "/calculators/stundenlohn",
    label: "Stundenlohn-Rechner",
    description: "Arbeitszeit, Stundenlohn und Überstunden prüfen."
  },
  {
    href: "/calculators/nebenverdienst",
    label: "Nebenverdienst-Rechner",
    description: "Nebenverdienst monatlich und jährlich schätzen."
  }
];

export default function KleinunternehmerPage() {
  return (
    <CalculatorLayout
      title="Kleinunternehmer-Check / Umsatzgrenzen"
      subtitle="Prüfe unverbindlich, ob deine Umsätze innerhalb der gewählten Kleinunternehmer-Grenzen liegen und wie viel Puffer bleibt."
      disclaimer={<DisclaimerBox disclaimer={calculatorDisclaimers.kleinunternehmer} />}
      faq={<FAQ items={faqKleinunternehmer} />}
      relatedLinks={relatedLinks}
      sidebarExtra={
        <>
          <ShareCard description="Der Link übernimmt Zeitraum, Regelung und aktuelle Umsatzwerte." />
          <SidebarCard title="Kurz erklärt">
            <ul className="space-y-2 text-sm leading-relaxed text-text-secondary">
              {calculatorGuidance.kleinunternehmer.shortExplanation.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SidebarCard>
          <SidebarCard title={calculatorGuidance.kleinunternehmer.updatedLabel}>
            <p className="text-sm leading-relaxed text-text-secondary">{calculatorGuidance.kleinunternehmer.updatedValue}</p>
          </SidebarCard>
          <SidebarCard title="Nächster sinnvoller Rechner">
            <Link href={calculatorGuidance.kleinunternehmer.nextCalculator.href} className="block rounded-lg border border-surface-border p-3 transition-colors hover:border-brand-200 hover:bg-brand-50">
              <div className="text-sm font-medium text-text">{calculatorGuidance.kleinunternehmer.nextCalculator.label}</div>
              <div className="mt-1 text-xs leading-relaxed text-text-tertiary">{calculatorGuidance.kleinunternehmer.nextCalculator.description}</div>
            </Link>
          </SidebarCard>
        </>
      }
    >
      <Suspense fallback={null}>
        <KleinunternehmerCalculator />
      </Suspense>
    </CalculatorLayout>
  );
}
