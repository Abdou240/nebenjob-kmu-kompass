"use client";

import { useEffect, useMemo } from "react";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { ResultHero } from "@/components/ResultHero";
import { RecentCalculations } from "@/features/calculators/shared/RecentCalculations";
import { useShareableCalculator } from "@/features/calculators/shared/useShareableCalculator";
import { calculateNebenverdienst } from "@/lib/calculators/nebenverdienst";
import { nebenverdienstSchema } from "@/lib/validation/nebenverdienst";
import { formatCurrency, parseGermanNumber } from "@/lib/format";
import { DEFAULT_VARIANCE_PERCENT } from "@/config/calculators";
import { calculatorGuidance } from "@/content/calculator-guidance";

const DEFAULT_VALUES = {
  monthlyIncome: "800",
  monthlyExpenses: "150",
  variancePercent: String(DEFAULT_VARIANCE_PERCENT)
};

export function NebenverdienstCalculator() {
  const {
    values,
    setField,
    recent,
    saveRecent,
    restoreRecent,
    clearRecent,
    historyEnabled,
    setHistoryEnabled
  } = useShareableCalculator({
    calculatorKey: "nebenverdienst",
    defaults: DEFAULT_VALUES
  });

  const { monthlyIncome, monthlyExpenses, variancePercent } = values;

  const parsed = useMemo(() => {
    const incomeValue = parseGermanNumber(monthlyIncome) ?? Number.NaN;
    const expenseValue = parseGermanNumber(monthlyExpenses) ?? 0;
    const varianceValue = parseGermanNumber(variancePercent) ?? DEFAULT_VARIANCE_PERCENT;

    return nebenverdienstSchema.safeParse({
      monthlyIncome: incomeValue,
      monthlyExpenses: expenseValue,
      variancePercent: varianceValue
    });
  }, [monthlyIncome, monthlyExpenses, variancePercent]);

  const errors = parsed.success ? {} : parsed.error.flatten().fieldErrors;

  const result = parsed.success ? calculateNebenverdienst(parsed.data) : null;

  useEffect(() => {
    if (!parsed.success || !result) return;

    const timeoutId = window.setTimeout(() => {
      saveRecent({
        label: `${formatCurrency(result.monthlyNet)} monatlich`,
        summary: `${formatCurrency(result.yearlyNet)} pro Jahr bei ${formatCurrency(parsed.data.monthlyIncome)} Einnahmen`,
        values
      });
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [parsed, result, saveRecent, values]);

  const summary = result
    ? `Nach laufenden Ausgaben bleiben dir voraussichtlich rund ${formatCurrency(result.monthlyNet)} pro Monat beziehungsweise ${formatCurrency(result.yearlyNet)} pro Jahr.`
    : "";

  const meaningText = result
    ? "Die Schätzung zeigt dir, wie viel nach deinen angegebenen Kosten übrig bleibt. Sie ist nützlich für eine erste Orientierung, ersetzt aber keine steuerliche oder sozialversicherungsrechtliche Einordnung."
    : "";

  const nextChecks = [
    "Prüfe separat, welche Steuern oder Sozialabgaben bei deinem konkreten Nebenverdienst anfallen können.",
    "Achte darauf, ob deine Ausgaben realistisch vollständig sind, zum Beispiel Fahrtkosten, Software oder Material.",
    "Nutze den Kleinunternehmer-Check, wenn aus dem Nebenverdienst regelmäßige selbstständige Umsätze werden."
  ];

  return (
    <div className="space-y-6">
      <SectionCard title="Eingaben">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Monatliche Einnahmen"
            hint="z.B. 800"
            error={errors.monthlyIncome ? "Bitte gültige Einnahmen eingeben." : undefined}
          >
            <Input
              inputMode="decimal"
              placeholder="800"
              value={monthlyIncome}
              onChange={(event) => setField("monthlyIncome", event.target.value)}
            />
          </FormField>
          <FormField
            label="Monatliche Ausgaben"
            hint="Optional, z.B. 150"
            error={errors.monthlyExpenses ? "Bitte gültige Ausgaben eingeben." : undefined}
          >
            <Input
              inputMode="decimal"
              placeholder="150"
              value={monthlyExpenses}
              onChange={(event) => setField("monthlyExpenses", event.target.value)}
            />
          </FormField>
          <FormField
            label="Schwankung in %"
            hint="Standard: 10 %"
            error={errors.variancePercent ? "Bitte gültige Prozentzahl (0–50) eingeben." : undefined}
          >
            <Input
              inputMode="decimal"
              placeholder="10"
              value={variancePercent}
              onChange={(event) => setField("variancePercent", event.target.value)}
            />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Ergebnisse (Schätzung)">
        {!result ? (
          <p className="text-sm text-text-tertiary">Bitte ergänze gültige Werte, um Ergebnisse zu sehen.</p>
        ) : (
          <div className="space-y-4">
            <ResultHero
              eyebrow="Hauptwert"
              title={`${formatCurrency(result.monthlyNet)} pro Monat`}
              summary={summary}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/70 p-3 text-sm text-brand-900">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-700/80">Jährliche Orientierung</div>
                  <div className="mt-1 text-h3">{formatCurrency(result.yearlyNet)}</div>
                </div>
                <div className="rounded-xl bg-white/70 p-3 text-sm text-brand-900">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-700/80">Schwankungsband</div>
                  <div className="mt-1 text-h3">{formatCurrency(result.scenario.lowMonthlyNet)} bis {formatCurrency(result.scenario.highMonthlyNet)}</div>
                </div>
              </div>
            </ResultHero>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ResultCard label="Konservativ (Monat)" value={formatCurrency(result.scenario.lowMonthlyNet)} helper="Schwankung nach unten" />
              <ResultCard label="Optimistisch (Monat)" value={formatCurrency(result.scenario.highMonthlyNet)} helper="Schwankung nach oben" />
              <ResultCard label="Konservativ (Jahr)" value={formatCurrency(result.scenario.lowYearlyNet)} />
              <ResultCard label="Optimistisch (Jahr)" value={formatCurrency(result.scenario.highYearlyNet)} />
            </div>
          </div>
        )}
      </SectionCard>

      {result ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Was bedeutet das?">
            <p className="text-sm leading-relaxed text-text-secondary">{meaningText}</p>
          </SectionCard>
          <SectionCard title="Was solltest du als Nächstes prüfen?">
            <ul className="space-y-2 text-sm leading-relaxed text-text-secondary">
              {nextChecks.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      ) : null}

      <SectionCard title={calculatorGuidance.nebenverdienst.howItWorks.title}>
        <ul className="space-y-2 text-sm leading-relaxed text-text-secondary">
          {calculatorGuidance.nebenverdienst.howItWorks.bullets.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <RecentCalculations
        description="Frühere Berechnungen bleiben nur lokal auf diesem Gerät und können jederzeit wieder geladen oder gelöscht werden."
        entries={recent}
        historyEnabled={historyEnabled}
        onToggleHistory={setHistoryEnabled}
        onRestore={restoreRecent}
        onClear={clearRecent}
      />
    </div>
  );
}
