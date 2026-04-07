import { CalculatorLayout, RelatedLink } from "@/components/CalculatorLayout";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQ } from "@/components/FAQ";
import { StundenlohnCalculator } from "@/features/calculators/stundenlohn/StundenlohnCalculator";
import { calculatorDisclaimers } from "@/content/disclaimers";
import { faqStundenlohn } from "@/content/faqs";
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
      subtitle="Berechne Stundenlohn, Monatsarbeitszeit und Überstunden in wenigen Sekunden. Unverbindlich und einfach."
      disclaimer={<DisclaimerBox disclaimer={calculatorDisclaimers.stundenlohn} />}
      faq={<FAQ items={faqStundenlohn} />}
      relatedLinks={relatedLinks}
    >
      <StundenlohnCalculator />
    </CalculatorLayout>
  );
}
