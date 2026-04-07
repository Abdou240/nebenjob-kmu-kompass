import { CalculatorLayout, RelatedLink } from "@/components/CalculatorLayout";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQ } from "@/components/FAQ";
import { NebenverdienstCalculator } from "@/features/calculators/nebenverdienst/NebenverdienstCalculator";
import { calculatorDisclaimers } from "@/content/disclaimers";
import { faqNebenverdienst } from "@/content/faqs";
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
      subtitle="Schätze monatliche und jährliche Nebenverdienste inkl. Szenarien – schnell, klar und unverbindlich."
      disclaimer={<DisclaimerBox disclaimer={calculatorDisclaimers.nebenverdienst} />}
      faq={<FAQ items={faqNebenverdienst} />}
      relatedLinks={relatedLinks}
    >
      <NebenverdienstCalculator />
    </CalculatorLayout>
  );
}
