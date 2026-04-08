"use client";

import { useEffect, useMemo } from "react";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { ResultHero } from "@/components/ResultHero";
import { RecentCalculations } from "@/features/calculators/shared/RecentCalculations";
import { useShareableCalculator } from "@/features/calculators/shared/useShareableCalculator";
import { calculateStundenlohn } from "@/lib/calculators/stundenlohn";
import { stundenlohnSchema } from "@/lib/validation/stundenlohn";
import { formatCurrency, formatNumber, parseGermanNumber } from "@/lib/format";
import { DEFAULT_OVERTIME_PREMIUM_PERCENT, DEFAULT_WEEKS_PER_MONTH } from "@/config/calculators";
import { calculatorGuidance } from "@/content/calculator-guidance";

const DEFAULT_VALUES = {
  monthlySalary: "3000",
  weeklyHours: "40",
  overtimeHours: "5",
  overtimePremiumPercent: String(DEFAULT_OVERTIME_PREMIUM_PERCENT)
};

export function StundenlohnCalculator() {
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
    calculatorKey: "stundenlohn",
    defaults: DEFAULT_VALUES
  });

  const { monthlySalary, weeklyHours, overtimeHours, overtimePremiumPercent } = values;

  const parsed = useMemo(() => {
    const monthlySalaryValue = parseGermanNumber(monthlySalary) ?? Number.NaN;
    const weeklyHoursValue = parseGermanNumber(weeklyHours) ?? Number.NaN;
    const overtimeHoursValue = parseGermanNumber(overtimeHours) ?? 0;
    const overtimePremiumValue = parseGermanNumber(overtimePremiumPercent) ?? DEFAULT_OVERTIME_PREMIUM_PERCENT;

    return stundenlohnSchema.safeParse({
      monthlySalary: monthlySalaryValue,
      weeklyHours: weeklyHoursValue,
      overtimeHours: overtimeHoursValue,
      overtimePremiumPercent: overtimePremiumValue
    });
  }, [monthlySalary, weeklyHours, overtimeHours, overtimePremiumPercent]);

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
  const parsedData = parsed.success ? parsed.data : null;

  useEffect(() => {
    if (!parsed.success || !result || !parsedData) return;

    const timeoutId = window.setTimeout(() => {
      saveRecent({
        label: `${formatCurrency(result.hourlyWage)} pro Stunde`,
        summary: `${formatCurrency(result.totalMonthlyPay)} im Monat inkl. ${formatNumber(parsedData.overtimeHours)} Überstunden`,
        values
      });
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [parsed, result, saveRecent, values]);

  const summary = result && parsedData
    ? parsedData.overtimeHours > 0
      ? `Bei ${formatNumber(parsedData.weeklyHours)} Wochenstunden und ${formatNumber(parsedData.overtimeHours)} bezahlten Überstunden kommst du auf rund ${formatCurrency(result.totalMonthlyPay)} im Monat.`
      : `Bei ${formatNumber(parsedData.weeklyHours)} Wochenstunden liegt dein geschätzter Stundenlohn bei ${formatCurrency(result.hourlyWage)}.`
    : "";

  const meaningText = result
    ? `Der Wert zeigt dir, was eine reguläre Arbeitsstunde auf Basis deines Monatsgehalts ungefähr wert ist. Der effektive Stundenlohn hilft dir zusätzlich dabei, bezahlte Überstunden realistisch einzuordnen.`
    : "";

  const nextChecks = [
    "Prüfe, ob Überstunden bei dir bezahlt, mit Zuschlag vergütet oder per Freizeitausgleich abgegolten werden.",
    "Berücksichtige Sonderzahlungen wie Boni, Urlaubsgeld oder unbezahlte Ausfälle separat.",
    "Nutze den Nebenverdienst-Rechner, wenn du Hauptjob und zusätzliche Einnahmen zusammendenken möchtest."
  ];

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
              onChange={(event) => setField("monthlySalary", event.target.value)}
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
              onChange={(event) => setField("weeklyHours", event.target.value)}
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
              onChange={(event) => setField("overtimeHours", event.target.value)}
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
              value={overtimePremiumPercent}
              onChange={(event) => setField("overtimePremiumPercent", event.target.value)}
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
              title={`${formatCurrency(result.hourlyWage)} pro Stunde`}
              summary={summary}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/70 p-3 text-sm text-brand-900">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-700/80">Monat inkl. Überstunden</div>
                  <div className="mt-1 text-h3">{formatCurrency(result.totalMonthlyPay)}</div>
                </div>
                <div className="rounded-xl bg-white/70 p-3 text-sm text-brand-900">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-700/80">Effektiver Stundenlohn</div>
                  <div className="mt-1 text-h3">{formatCurrency(result.effectiveHourlyWage)}</div>
                </div>
              </div>
            </ResultHero>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <ResultCard label="Monatsarbeitszeit" value={`${formatNumber(result.monthlyHours)} Std.`} />
              <ResultCard label="Überstundenvergütung" value={formatCurrency(result.overtimePay)} />
              <ResultCard label="Jahresgehalt (Schätzung)" value={formatCurrency(result.annualSalaryWithOvertime)} />
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

      <SectionCard title={calculatorGuidance.stundenlohn.howItWorks.title}>
        <ul className="space-y-2 text-sm leading-relaxed text-text-secondary">
          {calculatorGuidance.stundenlohn.howItWorks.bullets.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <RecentCalculations
        description="Frühere Eingaben bleiben nur auf diesem Gerät gespeichert und können mit einem Klick wiederhergestellt werden."
        entries={recent}
        historyEnabled={historyEnabled}
        onToggleHistory={setHistoryEnabled}
        onRestore={restoreRecent}
        onClear={clearRecent}
      />
    </div>
  );
}
