import Link from "next/link";
import { Suspense } from "react";
import { CalculatorLayout, RelatedLink } from "@/components/CalculatorLayout";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQ } from "@/components/FAQ";
import { ShareCard } from "@/components/ShareCard";
import { SidebarCard } from "@/components/SidebarCard";
import { StundenlohnCalculator } from "@/features/calculators/stundenlohn/StundenlohnCalculator";
import { calculatorDisclaimers } from "@/content/disclaimers";
import { faqStundenlohn } from "@/content/faqs";
import { calculatorGuidance } from "@/content/calculator-guidance";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Stundenlohn Rechner",
  description: "Berechne Stundenlohn, Monatsstunden und Überstunden – schnell und unverbindlich.",
  path: "/calculators/stundenlohn"
});

const relatedLinks: RelatedLink[] = [
  {
    href: "/calculators/nebenverdienst",
    label: "Nebenverdienst-Rechner",
    description: "Monatlichen Nebenverdienst und Szenarien schätzen."
  },
  {
    href: "/calculators/kleinunternehmer",
    label: "Kleinunternehmer-Check",
    description: "Umsatzgrenzen unverbindlich einordnen."
  }
];

export default function StundenlohnPage() {
  return (
    <CalculatorLayout
      title="Stundenlohn / Arbeitszeit / Überstunden"
      subtitle="Berechne Stundenlohn, Monatsarbeitszeit und bezahlte Überstunden kompakt und unverbindlich."
      disclaimer={<DisclaimerBox disclaimer={calculatorDisclaimers.stundenlohn} />}
      faq={<FAQ items={faqStundenlohn} />}
      relatedLinks={relatedLinks}
      sidebarExtra={
        <>
          <ShareCard />
          <SidebarCard title="Kurz erklärt">
            <ul className="space-y-2 text-sm leading-relaxed text-text-secondary">
              {calculatorGuidance.stundenlohn.shortExplanation.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SidebarCard>
          <SidebarCard title={calculatorGuidance.stundenlohn.updatedLabel}>
            <p className="text-sm leading-relaxed text-text-secondary">{calculatorGuidance.stundenlohn.updatedValue}</p>
          </SidebarCard>
          <SidebarCard title="Nächster sinnvoller Rechner">
            <Link href={calculatorGuidance.stundenlohn.nextCalculator.href} className="block rounded-lg border border-surface-border p-3 transition-colors hover:border-brand-200 hover:bg-brand-50">
              <div className="text-sm font-medium text-text">{calculatorGuidance.stundenlohn.nextCalculator.label}</div>
              <div className="mt-1 text-xs leading-relaxed text-text-tertiary">{calculatorGuidance.stundenlohn.nextCalculator.description}</div>
            </Link>
          </SidebarCard>
        </>
      }
    >
      <Suspense fallback={null}>
        <StundenlohnCalculator />
      </Suspense>
    </CalculatorLayout>
  );
}
