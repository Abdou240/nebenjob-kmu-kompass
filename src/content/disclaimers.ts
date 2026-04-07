export type Disclaimer = {
  id: string;
  title: string;
  body: string[];
};

export const globalDisclaimer: Disclaimer = {
  id: "global",
  title: "Wichtiger Hinweis",
  body: [
    "Alle Ergebnisse sind unverbindliche Schätzungen zur Orientierung.",
    "Keine rechtliche oder steuerliche Beratung. Bitte prüfe Details bei offiziellen Stellen oder Fachleuten.",
    "Berechnungen basieren auf deinen Eingaben und einfachen Annahmen. Es besteht keine Gewähr auf Vollständigkeit oder Aktualität."
  ]
};

export const calculatorDisclaimers = {
  stundenlohn: {
    id: "stundenlohn",
    title: "Hinweis zum Stundenlohn-Rechner",
    body: [
      "Der Rechner nutzt Durchschnittswerte (z.B. Wochen pro Monat) und kann individuelle Arbeitsverträge nicht abbilden.",
      "Überstunden-Zuschläge können je nach Tarifvertrag oder Vereinbarung abweichen."
    ]
  },
  nebenverdienst: {
    id: "nebenverdienst",
    title: "Hinweis zum Nebenverdienst-Rechner",
    body: [
      "Die Ergebnisse zeigen Einnahmen und Ausgaben vor Steuern und Sozialabgaben.",
      "Für steuerliche Fragen bitte eine fachliche Beratung einholen."
    ]
  },
  kleinunternehmer: {
    id: "kleinunternehmer",
    title: "Hinweis zum Kleinunternehmer-Check",
    body: [
      "Die Einordnung basiert ausschließlich auf Umsatzgrenzen und ersetzt keine Prüfung durch das Finanzamt.",
      "Grenzwerte können sich ändern. Bitte regelmäßig aktuelle Quellen prüfen."
    ]
  }
} satisfies Record<string, Disclaimer>;
