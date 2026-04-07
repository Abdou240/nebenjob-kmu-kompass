import { siteConfig } from "@/config/app";

export const numberFormatter = new Intl.NumberFormat(siteConfig.locale, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

export const currencyFormatter = new Intl.NumberFormat(siteConfig.locale, {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatPercent(value: number): string {
  return `${formatNumber(value)} %`;
}

export function parseGermanNumber(value: string): number | null {
  const raw = value.trim();
  if (!raw) return null;
  let cleaned = raw.replace(/\s/g, "");

  if (cleaned.includes(",") && cleaned.includes(".")) {
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  } else {
    cleaned = cleaned.replace(",", ".");
  }

  const number = Number(cleaned);
  if (!Number.isFinite(number)) return null;
  return number;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
