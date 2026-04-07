"use client";

import { useMemo, useState } from "react";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { ResultCard } from "@/components/ResultCard";
import { calculateStundenlohn } from "@/lib/calculators/stundenlohn";
import { stundenlohnSchema } from "@/lib/validation/stundenlohn";
import { formatCurrency, formatNumber, parseGermanNumber } from "@/lib/format";
import { DEFAULT_OVERTIME_PREMIUM_PERCENT, DEFAULT_WEEKS_PER_MONTH } from "@/config/calculators";

export function StundenlohnCalculator() {
  const [monthlySalary, setMonthlySalary] = useState("3000");
  const [weeklyHours, setWeeklyHours] = useState("40");
  const [overtimeHours, setOvertimeHours] = useState("5");
  const [overtimePremium, setOvertimePremium] = useState(String(DEFAULT_OVERTIME_PREMIUM_PERCENT));

  const parsed = useMemo(() => {
    const monthlySalaryValue = parseGermanNumber(monthlySalary) ?? Number.NaN;
    const weeklyHoursValue = parseGermanNumber(weeklyHours) ?? Number.NaN;
    const overtimeHoursValue = parseGermanNumber(overtimeHours) ?? 0;
    const overtimePremiumValue = parseGermanNumber(overtimePremium) ?? DEFAULT_OVERTIME_PREMIUM_PERCENT;

    return stundenlohnSchema.safeParse({
      monthlySalary: monthlySalaryValue,
      weeklyHours: weeklyHoursValue,
      overtimeHours: overtimeHoursValue,
      overtimePremiumPercent: overtimePremiumValue
    });
  }, [monthlySalary, weeklyHours, overtimeHours, overtimePremium]);

  const errors = parsed.success ? {} : parsed.error.flatten().fieldErrors;

  const result = parsed.success
    ? calculateStundenlohn({
        monthlySalary: parsed.data.monthlySalary,
        weeklyHours: parsed.data.weeklyHours,
        overtimeHours: parsed.data.overtimeHours,
        overtimePremiumPercent: parsed.data.overtimePremiumPercent,
        weeksPerMonth: DEFAULT_WEEKS_PER_MONTH
      })
    : null;

  return (
    <div className="space-y-6">
      <div className="card-surface rounded-3xl p-6">
        <h2 className="text-lg font-semibold">Eingaben</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <FormField
            label="Monatsgehalt (brutto)"
            hint="Beispiel: 3.000"
            error={errors.monthlySalary ? "Bitte ein gültiges Monatsgehalt eingeben." : undefined}
          >
            <Input
              inputMode="decimal"
              value={monthlySalary}
              onChange={(event) => setMonthlySalary(event.target.value)}
            />
          </FormField>
          <FormField
            label="Wochenarbeitszeit (Stunden)"
            hint="Beispiel: 40"
            error={errors.weeklyHours ? "Bitte eine gültige Wochenarbeitszeit eingeben." : undefined}
          >
            <Input
              inputMode="decimal"
              value={weeklyHours}
              onChange={(event) => setWeeklyHours(event.target.value)}
            />
          </FormField>
          <FormField
            label="Überstunden pro Monat"
            hint="Optional, z.B. 5"
            error={errors.overtimeHours ? "Bitte eine gültige Zahl eingeben." : undefined}
          >
            <Input
              inputMode="decimal"
              value={overtimeHours}
              onChange={(event) => setOvertimeHours(event.target.value)}
            />
          </FormField>
          <FormField
            label="Überstundenzuschlag (%)"
            hint="Optional, Standard: 25%"
            error={errors.overtimePremiumPercent ? "Bitte eine gültige Prozentzahl eingeben." : undefined}
          >
            <Input
              inputMode="decimal"
              value={overtimePremium}
              onChange={(event) => setOvertimePremium(event.target.value)}
            />
          </FormField>
        </div>
        <p className="mt-4 text-xs text-ink/60">
          Annahme: {DEFAULT_WEEKS_PER_MONTH} Wochen pro Monat (Durchschnitt). Ergebnisse sind Schätzungen.
        </p>
      </div>

      <div className="card-surface rounded-3xl p-6">
        <h2 className="text-lg font-semibold">Ergebnisse (Schätzung)</h2>
        {!result ? (
          <p className="mt-3 text-sm text-ink/60">Bitte ergänze gültige Werte, um Ergebnisse zu sehen.</p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ResultCard label="Stundenlohn" value={formatCurrency(result.hourlyWage)} />
            <ResultCard label="Monatsarbeitszeit" value={`${formatNumber(result.monthlyHours)} Std.`} />
            <ResultCard label="Überstundenvergütung" value={formatCurrency(result.overtimePay)} />
            <ResultCard label="Monat inkl. Überstunden" value={formatCurrency(result.totalMonthlyPay)} />
            <ResultCard
              label="Effektiver Stundenlohn"
              value={formatCurrency(result.effectiveHourlyWage)}
              helper="inkl. Überstunden"
            />
            <ResultCard
              label="Jahresgehalt (Schätzung)"
              value={formatCurrency(result.annualSalaryWithOvertime)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
