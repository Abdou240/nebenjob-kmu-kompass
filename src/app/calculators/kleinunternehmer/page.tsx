import { CalculatorLayout, RelatedLink } from "@/components/CalculatorLayout";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQ } from "@/components/FAQ";
import { KleinunternehmerCalculator } from "@/features/calculators/kleinunternehmer/KleinunternehmerCalculator";
import { calculatorDisclaimers } from "@/content/disclaimers";
import { faqKleinunternehmer } from "@/content/faqs";
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
      subtitle="Prüfe unverbindlich, ob deine Umsätze innerhalb der Kleinunternehmer-Grenzen liegen."
      disclaimer={<DisclaimerBox disclaimer={calculatorDisclaimers.kleinunternehmer} />}
      faq={<FAQ items={faqKleinunternehmer} />}
      relatedLinks={relatedLinks}
    >
      <KleinunternehmerCalculator />
    </CalculatorLayout>
  );
}
