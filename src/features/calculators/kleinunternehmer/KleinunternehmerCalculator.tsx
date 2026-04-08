"use client";

import { useEffect, useMemo } from "react";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { ResultHero } from "@/components/ResultHero";
import { RecentCalculations } from "@/features/calculators/shared/RecentCalculations";
import { useShareableCalculator } from "@/features/calculators/shared/useShareableCalculator";
import { calculateKleinunternehmer } from "@/lib/calculators/kleinunternehmer";
import { kleinunternehmerSchema } from "@/lib/validation/kleinunternehmer";
import { formatCurrency, formatNumber, parseGermanNumber } from "@/lib/format";
import { DEFAULT_REGIME_KEY, KLEINUNTERNEHMER_REGIMES } from "@/config/thresholds";
import { calculatorGuidance } from "@/content/calculator-guidance";

const statusConfig: Record<string, { style: string; label: string }> = {
  within: {
    style: "bg-success-50 text-success-700 border-success-500/20",
    label: "Aktuell innerhalb der Grenze"
  },
  near: {
    style: "bg-warning-50 text-warning-700 border-warning-500/20",
    label: "Nahe an der Grenze"
  },
  exceeded: {
    style: "bg-danger-50 text-danger-700 border-danger-500/20",
    label: "Grenze überschritten"
  }
};

const DEFAULT_VALUES = {
  period: "monthly",
  regimeKey: DEFAULT_REGIME_KEY,
  revenuePrevPeriod: "1500",
  revenueCurrentPeriod: "2200"
};

function formatDelta(delta: number) {
  if (delta >= 0) {
    return `Puffer: ${formatCurrency(delta)}`;
  }

  return `Überschreitung: ${formatCurrency(Math.abs(delta))}`;
}

function annualizationLabel(factor: number) {
  if (factor === 12) return "Monatswerte × 12";
  if (factor === 4) return "Quartalswerte × 4";
  return "Jahreswerte ohne Hochrechnung";
}

export function KleinunternehmerCalculator() {
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
    calculatorKey: "kleinunternehmer",
    defaults: DEFAULT_VALUES
  });

  const { period, regimeKey, revenuePrevPeriod, revenueCurrentPeriod } = values;

  const parsed = useMemo(() => {
    const prevValue = parseGermanNumber(revenuePrevPeriod) ?? Number.NaN;
    const currentValue = parseGermanNumber(revenueCurrentPeriod) ?? Number.NaN;

    return kleinunternehmerSchema.safeParse({
      period,
      revenuePrevPeriod: prevValue,
      revenueCurrentPeriod: currentValue,
      regimeKey
    });
  }, [period, revenuePrevPeriod, revenueCurrentPeriod, regimeKey]);

  const errors = parsed.success ? {} : parsed.error.flatten().fieldErrors;

  const result = parsed.success
    ? calculateKleinunternehmer({
        period: parsed.data.period,
        revenuePrevPeriod: parsed.data.revenuePrevPeriod,
        revenueCurrentPeriod: parsed.data.revenueCurrentPeriod,
        regimeKey: parsed.data.regimeKey
      })
    : null;

  const regime = result?.regime ?? KLEINUNTERNEHMER_REGIMES.find((item) => item.key === regimeKey)!;

  useEffect(() => {
    if (!parsed.success || !result) return;

    const timeoutId = window.setTimeout(() => {
      saveRecent({
        label: statusConfig[result.overallStatus].label,
        summary: `${formatCurrency(result.annualCurrentRevenue)} hochgerechnet, ${formatDelta(result.currentYearDelta)}`,
        values
      });
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [parsed, result, saveRecent, values]);

  const summary = result
    ? result.overallStatus === "exceeded"
      ? `Mit der aktuellen Hochrechnung würdest du mindestens eine relevante Umsatzgrenze überschreiten. Bitte prüfe die Einordnung zeitnah im Detail.`
      : result.overallStatus === "near"
        ? `Du liegst mit deiner Hochrechnung nah an mindestens einer Grenze. Der verbleibende Puffer ist klein und sollte aktiv beobachtet werden.`
        : `Nach deinen Angaben liegst du aktuell innerhalb der gewählten Grenzen. Trotzdem lohnt sich ein regelmäßiger Blick auf die Entwicklung deiner Umsätze.`
    : "";

  const meaningText = result
    ? `Der Rechner vergleicht deine Eingaben nicht direkt mit Monatsgrenzen, sondern rechnet sie auf einen Jahreswert hoch. So werden sie mit den offiziellen Jahresgrenzen derselben Regelung verglichen.`
    : "";

  const nextChecks = [
    "Prüfe, ob deine Angaben zur Regelung wirklich zum Zeitraum passen, besonders beim Wechsel zwischen 2024 und 2025.",
    "Wenn dein Puffer klein wird, verfolge deine tatsächlichen Umsätze monatlich statt nur grob hochzurechnen.",
    "Ziehe bei Grenznähe oder Unsicherheit offizielle Informationen oder steuerliche Beratung hinzu."
  ];

  return (
    <div className="space-y-6">
      <SectionCard
        title="Eingaben"
        footer={<p className="text-xs text-text-tertiary">{regime.notes}</p>}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Regelung" hint="Wähle die passende Umsatzgrenze">
            <Select value={regimeKey} onChange={(event) => setField("regimeKey", event.target.value as "bis_2024" | "ab_2025")}>
              {KLEINUNTERNEHMER_REGIMES.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label} ({formatCurrency(item.prevYearLimit)} / {formatCurrency(item.currentYearLimit)})
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Eingabezeitraum" hint="Monat, Quartal oder Jahr">
            <Select value={period} onChange={(event) => setField("period", event.target.value as typeof period)}>
              <option value="monthly">Monat</option>
              <option value="quarterly">Quartal</option>
              <option value="yearly">Jahr</option>
            </Select>
          </FormField>
          <FormField
            label="Umsatz Vorjahr"
            hint="Netto/Brutto gemäß Regelung"
            error={errors.revenuePrevPeriod ? "Bitte gültigen Umsatz eingeben." : undefined}
          >
            <Input
              inputMode="decimal"
              placeholder="1.500"
              value={revenuePrevPeriod}
              onChange={(event) => setField("revenuePrevPeriod", event.target.value)}
            />
          </FormField>
          <FormField
            label="Umsatz laufendes Jahr"
            hint="Bisher oder erwarteter Wert"
            error={errors.revenueCurrentPeriod ? "Bitte gültigen Umsatz eingeben." : undefined}
          >
            <Input
              inputMode="decimal"
              placeholder="2.200"
              value={revenueCurrentPeriod}
              onChange={(event) => setField("revenueCurrentPeriod", event.target.value)}
            />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Ergebnisse (Orientierung)">
        {!result ? (
          <p className="text-sm text-text-tertiary">Bitte ergänze gültige Werte, um Ergebnisse zu sehen.</p>
        ) : (
          <div className="space-y-4">
            <ResultHero
              eyebrow="Gesamtstatus"
              title={statusConfig[result.overallStatus].label}
              summary={summary}
              tone={result.overallStatus === "exceeded" ? "danger" : result.overallStatus === "near" ? "warning" : "success"}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/70 p-3 text-sm">
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Puffer laufendes Jahr</div>
                  <div className="mt-1 text-h3">{formatDelta(result.currentYearDelta)}</div>
                </div>
                <div className="rounded-xl bg-white/70 p-3 text-sm">
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Hochrechnung</div>
                  <div className="mt-1 text-h3">{annualizationLabel(result.annualizationFactor)}</div>
                </div>
              </div>
            </ResultHero>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ResultCard
                label="Umsatz Vorjahr (hochgerechnet)"
                value={formatCurrency(result.annualPrevRevenue)}
                helper={`Grenze: ${formatCurrency(regime.prevYearLimit)} (${regime.basis})`}
              />
              <ResultCard
                label="Umsatz laufendes Jahr (hochgerechnet)"
                value={formatCurrency(result.annualCurrentRevenue)}
                helper={`Grenze: ${formatCurrency(regime.currentYearLimit)} (${regime.basis})`}
              />
              <ResultCard
                label="Puffer Vorjahr"
                value={formatDelta(result.prevYearDelta)}
                helper={`${formatNumber(result.prevYearUsagePercent)} % der Grenze genutzt`}
              />
              <ResultCard
                label="Puffer laufendes Jahr"
                value={formatDelta(result.currentYearDelta)}
                helper={`${formatNumber(result.currentYearUsagePercent)} % der Grenze genutzt`}
              />
            </div>

            <div className="rounded-lg bg-surface-muted p-4 text-sm text-text-secondary">
              <div className="font-medium text-text">Was bedeutet die Hochrechnung?</div>
              <p className="mt-1 leading-relaxed">
                {annualizationLabel(result.annualizationFactor)}. Dadurch lassen sich Monats- oder Quartalswerte mit den
                Jahresgrenzen vergleichen. Quelle: {regime.sourceLabel}. Diese Auswertung bleibt unverbindliche Orientierung.
              </p>
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

      <SectionCard title={calculatorGuidance.kleinunternehmer.howItWorks.title}>
        <ul className="space-y-2 text-sm leading-relaxed text-text-secondary">
          {calculatorGuidance.kleinunternehmer.howItWorks.bullets.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <RecentCalculations
        description="Letzte Prüfungen bleiben nur lokal auf diesem Gerät. Das ist praktisch für Vergleichsrechnungen und bleibt ohne Benutzerkonto."
        entries={recent}
        historyEnabled={historyEnabled}
        onToggleHistory={setHistoryEnabled}
        onRestore={restoreRecent}
        onClear={clearRecent}
      />
    </div>
  );
}
