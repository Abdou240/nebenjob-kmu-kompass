"use client";

import { useMemo, useState } from "react";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { ResultCard } from "@/components/ResultCard";
import { SectionCard } from "@/components/SectionCard";
import { calculateKleinunternehmer } from "@/lib/calculators/kleinunternehmer";
import { kleinunternehmerSchema } from "@/lib/validation/kleinunternehmer";
import { formatCurrency, parseGermanNumber } from "@/lib/format";
import { DEFAULT_REGIME_KEY, KLEINUNTERNEHMER_REGIMES } from "@/config/thresholds";

const statusConfig: Record<string, { style: string; label: string }> = {
  within: {
    style: "bg-success-50 text-success-700 border-success-500/20",
    label: "Innerhalb der Grenze (Orientierung)"
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

export function KleinunternehmerCalculator() {
  const [period, setPeriod] = useState("monthly");
  const [regimeKey, setRegimeKey] = useState<"bis_2024" | "ab_2025">(DEFAULT_REGIME_KEY);
  const [revenuePrev, setRevenuePrev] = useState("1500");
  const [revenueCurrent, setRevenueCurrent] = useState("2200");

  const parsed = useMemo(() => {
    const prevValue = parseGermanNumber(revenuePrev) ?? Number.NaN;
    const currentValue = parseGermanNumber(revenueCurrent) ?? Number.NaN;

    return kleinunternehmerSchema.safeParse({
      period,
      revenuePrevPeriod: prevValue,
      revenueCurrentPeriod: currentValue,
      regimeKey
    });
  }, [period, revenuePrev, revenueCurrent, regimeKey]);

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

  return (
    <div className="space-y-6">
      <SectionCard
        title="Eingaben"
        footer={<p className="text-xs text-text-tertiary">{regime.notes}</p>}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Regelung" hint="Wähle die passende Umsatzgrenze">
            <Select value={regimeKey} onChange={(event) => setRegimeKey(event.target.value as "bis_2024" | "ab_2025")}>
              {KLEINUNTERNEHMER_REGIMES.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label} ({formatCurrency(item.prevYearLimit)} / {formatCurrency(item.currentYearLimit)})
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Eingabezeitraum" hint="Monat, Quartal oder Jahr">
            <Select value={period} onChange={(event) => setPeriod(event.target.value)}>
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
              value={revenuePrev}
              onChange={(event) => setRevenuePrev(event.target.value)}
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
              value={revenueCurrent}
              onChange={(event) => setRevenueCurrent(event.target.value)}
            />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Ergebnisse (Orientierung)">
        {!result ? (
          <p className="text-sm text-text-tertiary">Bitte ergänze gültige Werte, um Ergebnisse zu sehen.</p>
        ) : (
          <div className="space-y-4">
            <div className={`rounded-xl border p-4 ${statusConfig[result.overallStatus].style}`}>
              <div className="text-xs font-medium uppercase tracking-wider opacity-70">Gesamtstatus</div>
              <div className="mt-1 text-sm font-semibold">
                {statusConfig[result.overallStatus].label}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>

            <div className="rounded-lg bg-surface-muted p-4 text-xs text-text-tertiary">
              Quelle: {regime.sourceLabel}. Bitte prüfe bei Bedarf die aktuellen Werte. Diese Auswertung ist nur
              unverbindliche Orientierung.
            </div>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
