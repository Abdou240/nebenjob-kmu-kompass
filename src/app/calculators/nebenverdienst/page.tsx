import Link from "next/link";
import { Suspense } from "react";
import { CalculatorLayout, RelatedLink } from "@/components/CalculatorLayout";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQ } from "@/components/FAQ";
import { ShareCard } from "@/components/ShareCard";
import { SidebarCard } from "@/components/SidebarCard";
import { NebenverdienstCalculator } from "@/features/calculators/nebenverdienst/NebenverdienstCalculator";
import { calculatorDisclaimers } from "@/content/disclaimers";
import { faqNebenverdienst } from "@/content/faqs";
import { calculatorGuidance } from "@/content/calculator-guidance";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Nebenverdienst Rechner",
  description: "Schätze deinen Nebenverdienst pro Monat und Jahr – unverbindlich und übersichtlich.",
  path: "/calculators/nebenverdienst"
});

const relatedLinks: RelatedLink[] = [
  {
    href: "/calculators/stundenlohn",
    label: "Stundenlohn-Rechner",
    description: "Stundenlohn, Monatsstunden und Überstunden berechnen."
  },
  {
    href: "/calculators/kleinunternehmer",
    label: "Kleinunternehmer-Check",
    description: "Umsatzgrenzen unverbindlich einordnen."
  }
];

export default function NebenverdienstPage() {
  return (
    <CalculatorLayout
      title="Nebenverdienst-Rechner"
      subtitle="Schätze monatliche und jährliche Überschüsse aus einem Nebenverdienst inklusive einfacher Szenarien."
      disclaimer={<DisclaimerBox disclaimer={calculatorDisclaimers.nebenverdienst} />}
      faq={<FAQ items={faqNebenverdienst} />}
      relatedLinks={relatedLinks}
      sidebarExtra={
        <>
          <ShareCard />
          <SidebarCard title="Kurz erklärt">
            <ul className="space-y-2 text-sm leading-relaxed text-text-secondary">
              {calculatorGuidance.nebenverdienst.shortExplanation.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SidebarCard>
          <SidebarCard title={calculatorGuidance.nebenverdienst.updatedLabel}>
            <p className="text-sm leading-relaxed text-text-secondary">{calculatorGuidance.nebenverdienst.updatedValue}</p>
          </SidebarCard>
          <SidebarCard title="Nächster sinnvoller Rechner">
            <Link href={calculatorGuidance.nebenverdienst.nextCalculator.href} className="block rounded-lg border border-surface-border p-3 transition-colors hover:border-brand-200 hover:bg-brand-50">
              <div className="text-sm font-medium text-text">{calculatorGuidance.nebenverdienst.nextCalculator.label}</div>
              <div className="mt-1 text-xs leading-relaxed text-text-tertiary">{calculatorGuidance.nebenverdienst.nextCalculator.description}</div>
            </Link>
          </SidebarCard>
        </>
      }
    >
      <Suspense fallback={null}>
        <NebenverdienstCalculator />
      </Suspense>
    </CalculatorLayout>
  );
}
