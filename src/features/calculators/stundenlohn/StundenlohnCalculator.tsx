"use client";

import { useMemo, useState } from "react";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
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
      <SectionCard
        title="Eingaben"
        footer={
          <p className="text-xs text-text-tertiary">
            Annahme: {DEFAULT_WEEKS_PER_MONTH} Wochen pro Monat (Durchschnitt). Ergebnisse sind Schätzungen.
          </p>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Monatsgehalt (brutto)"
            hint="z.B. 3.000"
            error={errors.monthlySalary ? "Bitte ein gültiges Monatsgehalt eingeben." : undefined}
          >
            <Input
              inputMode="decimal"
              placeholder="3.000"
              value={monthlySalary}
              onChange={(event) => setMonthlySalary(event.target.value)}
            />
          </FormField>
          <FormField
            label="Wochenarbeitszeit (Stunden)"
            hint="z.B. 40"
            error={errors.weeklyHours ? "Bitte eine gültige Wochenarbeitszeit eingeben." : undefined}
          >
            <Input
              inputMode="decimal"
              placeholder="40"
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
              placeholder="5"
              value={overtimeHours}
              onChange={(event) => setOvertimeHours(event.target.value)}
            />
          </FormField>
          <FormField
            label="Überstundenzuschlag (%)"
            hint="Standard: 25 %"
            error={errors.overtimePremiumPercent ? "Bitte eine gültige Prozentzahl eingeben." : undefined}
          >
            <Input
              inputMode="decimal"
              placeholder="25"
              value={overtimePremium}
              onChange={(event) => setOvertimePremium(event.target.value)}
            />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Ergebnisse (Schätzung)">
        {!result ? (
          <p className="text-sm text-text-tertiary">Bitte ergänze gültige Werte, um Ergebnisse zu sehen.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Stundenlohn" value={formatCurrency(result.hourlyWage)} variant="highlight" />
            <ResultCard label="Monatsarbeitszeit" value={`${formatNumber(result.monthlyHours)} Std.`} />
            <ResultCard label="Überstundenvergütung" value={formatCurrency(result.overtimePay)} />
            <ResultCard label="Monat inkl. Überstunden" value={formatCurrency(result.totalMonthlyPay)} />
            <ResultCard
              label="Effektiver Stundenlohn"
              value={formatCurrency(result.effectiveHourlyWage)}
              helper="inkl. Überstunden"
              variant="highlight"
            />
            <ResultCard
              label="Jahresgehalt (Schätzung)"
              value={formatCurrency(result.annualSalaryWithOvertime)}
            />
          </div>
        )}
      </SectionCard>
    </div>
  );
}
