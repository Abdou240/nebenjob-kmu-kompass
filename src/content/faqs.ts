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
    answer: "Wir teilen dein Monatsgehalt durch die geschätzte Monatsarbeitszeit. Dafür nutzen wir Wochenstunden × 4,33 als Durchschnittsmonat."
  },
  {
    question: "Was bedeutet der Überstundenzuschlag?",
    answer: "Der Zuschlag ist ein Aufschlag auf den regulären Stundenlohn. Bei 0 % werden Überstunden zum normalen Satz bewertet, nicht mit 0 Euro."
  },
  {
    question: "Warum ist das nur eine Schätzung?",
    answer: "Arbeitsverträge, Feiertage, Zuschlagsregeln und Freizeitausgleich unterscheiden sich stark. Der Rechner gibt dir deshalb nur eine schnelle Orientierung."
  }
];

export const faqNebenverdienst: FAQItem[] = [
  {
    question: "Sind Steuern und Abgaben berücksichtigt?",
    answer: "Nein. Der Rechner zeigt nur Einnahmen minus Ausgaben. Steuern, Sozialabgaben und branchenspezifische Pflichten musst du separat prüfen."
  },
  {
    question: "Was bedeutet die Schwankung?",
    answer: "Mit der Schwankung siehst du eine vorsichtige und eine optimistische Variante deiner Einnahmen. Die Ausgaben bleiben dabei unverändert."
  },
  {
    question: "Warum werden Ausgaben abgezogen?",
    answer: "Weil viele Nebenjobs oder kleine Selbstständigkeiten laufende Kosten verursachen, zum Beispiel Material, Fahrten oder Software."
  }
];

export const faqKleinunternehmer: FAQItem[] = [
  {
    question: "Welche Grenzen werden geprüft?",
    answer: "Wir vergleichen deine hochgerechneten Umsätze mit den Jahresgrenzen der ausgewählten Kleinunternehmerregelung."
  },
  {
    question: "Was bedeutet „nahe an der Grenze“?",
    answer: "Wir markieren vorsichtig einen Sicherheitsabstand von 10 % zur Grenze. Das ist nur eine Orientierung und kein eigener gesetzlicher Schwellenwert."
  },
  {
    question: "Ist das eine verbindliche Auskunft?",
    answer: "Nein. Die Entscheidung liegt nicht beim Rechner, sondern bei der tatsächlichen rechtlichen Einordnung. Bitte prüfe Details mit offiziellen Quellen oder Beratung."
  }
];
