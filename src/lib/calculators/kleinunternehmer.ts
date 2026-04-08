import {
  DEFAULT_REGIME_KEY,
  KLEINUNTERNEHMER_REGIMES,
  NEAR_THRESHOLD_PERCENT,
  KleinunternehmerRegime
} from "@/config/thresholds";

export type RevenuePeriod = "monthly" | "quarterly" | "yearly";

export type KleinunternehmerInput = {
  period: RevenuePeriod;
  revenuePrevPeriod: number;
  revenueCurrentPeriod: number;
  regimeKey?: KleinunternehmerRegime["key"];
};

export type KleinunternehmerResult = {
  annualPrevRevenue: number;
  annualCurrentRevenue: number;
  annualizationFactor: number;
  regime: KleinunternehmerRegime;
  prevYearDelta: number;
  currentYearDelta: number;
  prevYearUsagePercent: number;
  currentYearUsagePercent: number;
  prevYearStatus: "within" | "near" | "exceeded";
  currentYearStatus: "within" | "near" | "exceeded";
  overallStatus: "within" | "near" | "exceeded";
};

const periodMultiplier: Record<RevenuePeriod, number> = {
  monthly: 12,
  quarterly: 4,
  yearly: 1
};

function resolveRegime(key?: KleinunternehmerRegime["key"]) {
  return (
    KLEINUNTERNEHMER_REGIMES.find((regime) => regime.key === key) ||
    KLEINUNTERNEHMER_REGIMES.find((regime) => regime.key === DEFAULT_REGIME_KEY) ||
    KLEINUNTERNEHMER_REGIMES[0]
  );
}

function statusFor(value: number, limit: number): "within" | "near" | "exceeded" {
  if (value > limit) return "exceeded";
  const nearLimit = limit * (1 - NEAR_THRESHOLD_PERCENT / 100);
  if (value >= nearLimit) return "near";
  return "within";
}

export function calculateKleinunternehmer(input: KleinunternehmerInput): KleinunternehmerResult {
  const regime = resolveRegime(input.regimeKey);
  const multiplier = periodMultiplier[input.period];

  const annualPrevRevenue = input.revenuePrevPeriod * multiplier;
  const annualCurrentRevenue = input.revenueCurrentPeriod * multiplier;
  const prevYearDelta = regime.prevYearLimit - annualPrevRevenue;
  const currentYearDelta = regime.currentYearLimit - annualCurrentRevenue;
  const prevYearUsagePercent = regime.prevYearLimit > 0 ? (annualPrevRevenue / regime.prevYearLimit) * 100 : 0;
  const currentYearUsagePercent = regime.currentYearLimit > 0 ? (annualCurrentRevenue / regime.currentYearLimit) * 100 : 0;

  const prevYearStatus = statusFor(annualPrevRevenue, regime.prevYearLimit);
  const currentYearStatus = statusFor(annualCurrentRevenue, regime.currentYearLimit);

  const overallStatus =
    prevYearStatus === "exceeded" || currentYearStatus === "exceeded"
      ? "exceeded"
      : prevYearStatus === "near" || currentYearStatus === "near"
        ? "near"
        : "within";

  return {
    annualPrevRevenue,
    annualCurrentRevenue,
    annualizationFactor: multiplier,
    regime,
    prevYearDelta,
    currentYearDelta,
    prevYearUsagePercent,
    currentYearUsagePercent,
    prevYearStatus,
    currentYearStatus,
    overallStatus
  };
}
