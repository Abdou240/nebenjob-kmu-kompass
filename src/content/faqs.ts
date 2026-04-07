export type FAQItem = {
  question: string;
  answer: string;
};

export const faqLanding: FAQItem[] = [
  {
    question: "Sind die Rechner kostenlos?",
    answer: "Ja. Alle Rechner sind kostenlos nutzbar und bleiben bewusst schlank ohne Zwangs-Registrierung."
  },
  {
    question: "Sind die Ergebnisse verbindlich?",
    answer: "Nein. Die Ergebnisse sind unverbindliche Schätzungen zur Orientierung und ersetzen keine Beratung."
  },
  {
    question: "Warum gibt es so wenige Eingaben?",
    answer: "Wir priorisieren Schnelligkeit und Klarheit. Für eine grobe Orientierung reichen wenige Angaben oft aus."
  }
];

export const faqStundenlohn: FAQItem[] = [
  {
    question: "Wie wird der Stundenlohn berechnet?",
    answer: "Wir teilen dein Monatsgehalt durch die geschätzte Monatsarbeitszeit (Wochenstunden × Durchschnittswochen pro Monat)."
  },
  {
    question: "Was bedeutet der Überstundenzuschlag?",
    answer: "Der Zuschlag ist ein Prozentwert auf den regulären Stundenlohn. Die tatsächliche Höhe kann abweichen."
  },
  {
    question: "Warum ist das nur eine Schätzung?",
    answer: "Arbeitsverträge, Feiertage und Tarifregeln unterscheiden sich stark. Der Rechner bietet eine schnelle Orientierung."
  }
];

export const faqNebenverdienst: FAQItem[] = [
  {
    question: "Sind Steuern und Abgaben berücksichtigt?",
    answer: "Nein. Der Rechner zeigt nur Einnahmen minus Ausgaben und ersetzt keine steuerliche Beratung."
  },
  {
    question: "Was bedeutet die Schwankung?",
    answer: "Mit der Schwankung siehst du eine konservative und eine optimistische Variante deiner Monatswerte."
  },
  {
    question: "Warum werden Ausgaben abgezogen?",
    answer: "Weil viele Nebenjobs oder Selbstständigkeit laufende Kosten verursachen."
  }
];

export const faqKleinunternehmer: FAQItem[] = [
  {
    question: "Welche Grenzen werden geprüft?",
    answer: "Wir vergleichen deinen Umsatz mit den aktuellen Umsatzgrenzen der Kleinunternehmerregelung."
  },
  {
    question: "Was bedeutet „nahe an der Grenze“?",
    answer: "Wir markieren einen Sicherheitsabstand von 10%. Das ist nur eine Orientierung, kein rechtlicher Schwellenwert."
  },
  {
    question: "Ist das eine verbindliche Auskunft?",
    answer: "Nein. Die Entscheidung liegt beim Finanzamt. Bitte prüfe die Details mit offiziellen Quellen."
  }
];
