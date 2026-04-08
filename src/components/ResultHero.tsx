import { ReactNode } from "react";

type ResultHeroProps = {
  eyebrow: string;
  title: string;
  summary: string;
  tone?: "brand" | "success" | "warning" | "danger";
  children?: ReactNode;
};

const toneClasses = {
  brand: "border-brand-200 bg-brand-50 text-brand-900",
  success: "border-success-500/20 bg-success-50 text-success-700",
  warning: "border-warning-500/20 bg-warning-50 text-warning-700",
  danger: "border-danger-500/20 bg-danger-50 text-danger-700"
} as const;

export function ResultHero({
  eyebrow,
  title,
  summary,
  tone = "brand",
  children
}: ResultHeroProps) {
  return (
    <div className={`rounded-2xl border p-5 sm:p-6 ${toneClasses[tone]}`}>
      <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{eyebrow}</div>
      <div className="mt-2 text-h1">{title}</div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-90">{summary}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
