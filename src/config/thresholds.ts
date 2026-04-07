export type KleinunternehmerRegime = {
  key: "bis_2024" | "ab_2025";
  label: string;
  validFrom?: string;
  validUntil?: string;
  prevYearLimit: number;
  currentYearLimit: number;
  basis: "brutto" | "netto";
  notes: string;
  sourceLabel: string;
};

export const KLEINUNTERNEHMER_REGIMES: KleinunternehmerRegime[] = [
  {
    key: "ab_2025",
    label: "Regelung ab 2025",
    validFrom: "2025-01-01",
    prevYearLimit: 25000,
    currentYearLimit: 100000,
    basis: "netto",
    notes: "Seit 2025 gelten höhere Netto-Grenzen und eine sofortige Überschreitung im laufenden Jahr.",
    sourceLabel: "IHK-Informationen zur Kleinunternehmerregelung"
  },
  {
    key: "bis_2024",
    label: "Regelung bis 2024",
    validUntil: "2024-12-31",
    prevYearLimit: 22000,
    currentYearLimit: 50000,
    basis: "brutto",
    notes: "Bis 2024 galten niedrigere Brutto-Grenzen mit Prognose für das laufende Jahr.",
    sourceLabel: "IHK-Informationen zur Kleinunternehmerregelung"
  }
];

export const DEFAULT_REGIME_KEY: KleinunternehmerRegime["key"] = "ab_2025";

export const NEAR_THRESHOLD_PERCENT = 10;
