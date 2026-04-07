"use client";

import { useMemo, useState } from "react";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { calculateNebenverdienst } from "@/lib/calculators/nebenverdienst";
import { nebenverdienstSchema } from "@/lib/validation/nebenverdienst";
import { formatCurrency, parseGermanNumber } from "@/lib/format";
import { DEFAULT_VARIANCE_PERCENT } from "@/config/calculators";

export function NebenverdienstCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState("800");
  const [monthlyExpenses, setMonthlyExpenses] = useState("150");
  const [variancePercent, setVariancePercent] = useState(String(DEFAULT_VARIANCE_PERCENT));

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
              onChange={(event) => setMonthlyIncome(event.target.value)}
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
              onChange={(event) => setMonthlyExpenses(event.target.value)}
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
              onChange={(event) => setVariancePercent(event.target.value)}
            />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Ergebnisse (Schätzung)">
        {!result ? (
          <p className="text-sm text-text-tertiary">Bitte ergänze gültige Werte, um Ergebnisse zu sehen.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Monatlicher Überschuss" value={formatCurrency(result.monthlyNet)} variant="highlight" />
            <ResultCard label="Jährlicher Überschuss" value={formatCurrency(result.yearlyNet)} variant="highlight" />
            <ResultCard
              label="Konservativ (Monat)"
              value={formatCurrency(result.scenario.lowMonthlyNet)}
              helper="Schwankung nach unten"
            />
            <ResultCard
              label="Optimistisch (Monat)"
              value={formatCurrency(result.scenario.highMonthlyNet)}
              helper="Schwankung nach oben"
            />
            <ResultCard
              label="Konservativ (Jahr)"
              value={formatCurrency(result.scenario.lowYearlyNet)}
            />
            <ResultCard
              label="Optimistisch (Jahr)"
              value={formatCurrency(result.scenario.highYearlyNet)}
            />
          </div>
        )}
      </SectionCard>
    </div>
  );
}
