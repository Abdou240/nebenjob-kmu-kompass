import { formatCurrency } from "@/lib/format";
import { KLEINUNTERNEHMER_REGIMES } from "@/config/thresholds";

export type GuidanceBlock = {
  title: string;
  intro?: string;
  bullets: string[];
};

export const calculatorGuidance = {
  stundenlohn: {
    updatedLabel: "Rechenstand",
    updatedValue: "Durchschnittsannahme mit 4,33 Wochen pro Monat",
    shortExplanation: [
      "Gut für eine schnelle Orientierung bei Monatsgehalt, Stundenlohn und bezahlten Überstunden.",
      "Individuelle Tarifverträge, Zuschläge und Freizeitausgleich können abweichen."
    ],
    howItWorks: {
      title: "Wie wird gerechnet?",
      bullets: [
        "Monatsarbeitszeit = Wochenstunden × 4,33.",
        "Stundenlohn = Monatsgehalt ÷ Monatsarbeitszeit.",
        "Überstundenvergütung = Überstunden × Stundenlohn × (1 + Zuschlag)."
      ]
    } satisfies GuidanceBlock,
    nextCalculator: {
      href: "/calculators/nebenverdienst",
      label: "Nebenverdienst-Rechner",
      description: "Sinnvoll, wenn du zusätzliche Einnahmen neben dem Hauptjob einschätzen möchtest."
    }
  },
  nebenverdienst: {
    updatedLabel: "Rechenstand",
    updatedValue: "Einfache Einnahmen-Ausgaben-Schätzung ohne Steuerlogik",
    shortExplanation: [
      "Zeigt dir schnell, was monatlich und jährlich voraussichtlich übrig bleibt.",
      "Steuern, Sozialabgaben und branchenspezifische Pflichten sind bewusst nicht eingerechnet."
    ],
    howItWorks: {
      title: "Wie wird gerechnet?",
      bullets: [
        "Monatlicher Überschuss = Einnahmen minus laufende Ausgaben.",
        "Jährlicher Überschuss = monatlicher Überschuss × 12.",
        "Die Szenarien verschieben nur die Einnahmen um den gewählten Schwankungswert."
      ]
    } satisfies GuidanceBlock,
    nextCalculator: {
      href: "/calculators/kleinunternehmer",
      label: "Kleinunternehmer-Check",
      description: "Hilfreich, wenn dein Nebenverdienst in Richtung regelmäßiger Selbstständigkeit wächst."
    }
  },
  kleinunternehmer: {
    updatedLabel: "Regelungsstand",
    updatedValue: `Ab 2025: ${formatCurrency(KLEINUNTERNEHMER_REGIMES[0].prevYearLimit)} / ${formatCurrency(KLEINUNTERNEHMER_REGIMES[0].currentYearLimit)} netto`,
    shortExplanation: [
      "Der Rechner rechnet Monats- oder Quartalswerte auf ein Jahr hoch, um sie mit den Jahresgrenzen zu vergleichen.",
      "Das Ergebnis bleibt ausdrücklich eine Orientierung und ersetzt keine steuerliche Prüfung."
    ],
    howItWorks: {
      title: "Wie wird gerechnet?",
      bullets: [
        "Monatswerte werden mit 12, Quartalswerte mit 4 auf ein Jahr hochgerechnet.",
        "Die hochgerechneten Umsätze werden getrennt mit Vorjahres- und laufender Jahresgrenze verglichen.",
        "Innerhalb von 10 % zur Grenze markieren wir den Status vorsichtig als \"nahe an der Grenze\"."
      ]
    } satisfies GuidanceBlock,
    nextCalculator: {
      href: "/calculators/nebenverdienst",
      label: "Nebenverdienst-Rechner",
      description: "Hilft dir einzuschätzen, wie viel vom Umsatz nach laufenden Kosten übrig bleiben könnte."
    }
  }
} as const;
