"use client";

import { useMemo, useState } from "react";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { ResultCard } from "@/components/ResultCard";
import { calculateKleinunternehmer } from "@/lib/calculators/kleinunternehmer";
import { kleinunternehmerSchema } from "@/lib/validation/kleinunternehmer";
import { formatCurrency, parseGermanNumber } from "@/lib/format";
import { DEFAULT_REGIME_KEY, KLEINUNTERNEHMER_REGIMES } from "@/config/thresholds";

const statusStyles: Record<string, string> = {
  within: "bg-mist/80 text-ink",
  near: "bg-clay/60 text-ink",
  exceeded: "bg-ember/10 text-ember"
};

const statusLabels: Record<string, string> = {
  within: "Innerhalb der Grenze (Orientierung)",
  near: "Nahe an der Grenze",
  exceeded: "Grenze überschritten"
};

export function KleinunternehmerCalculator() {
  const [period, setPeriod] = useState("monthly");
  const [regimeKey, setRegimeKey] = useState(DEFAULT_REGIME_KEY);
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
      <div className="card-surface rounded-3xl p-6">
        <h2 className="text-lg font-semibold">Eingaben</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <FormField label="Regelung" hint="Wähle die passende Umsatzgrenze">
            <Select value={regimeKey} onChange={(event) => setRegimeKey(event.target.value)}>
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
              value={revenueCurrent}
              onChange={(event) => setRevenueCurrent(event.target.value)}
            />
          </FormField>
        </div>
        <p className="mt-4 text-xs text-ink/60">{regime.notes}</p>
      </div>

      <div className="card-surface rounded-3xl p-6">
        <h2 className="text-lg font-semibold">Ergebnisse (Orientierung)</h2>
        {!result ? (
          <p className="mt-3 text-sm text-ink/60">Bitte ergänze gültige Werte, um Ergebnisse zu sehen.</p>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl border border-mist bg-white/90 p-4">
              <div className="text-sm text-ink/60">Gesamtstatus</div>
              <div
                className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                  statusStyles[result.overallStatus]
                }`}
              >
                {statusLabels[result.overallStatus]}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
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

            <div className="rounded-2xl border border-mist bg-mist/60 p-4 text-sm text-ink/70">
              <p>
                Quelle: {regime.sourceLabel}. Bitte prüfe bei Bedarf die aktuellen Werte. Diese Auswertung ist nur
                unverbindliche Orientierung.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
