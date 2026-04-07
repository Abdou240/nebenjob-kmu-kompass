import { ReactNode } from "react";

type ResultCardProps = {
  label: string;
  value: ReactNode;
  helper?: string;
  variant?: "default" | "highlight";
};

export function ResultCard({ label, value, helper, variant = "default" }: ResultCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        variant === "highlight"
          ? "border-brand-200 bg-brand-50"
          : "border-surface-border bg-white"
      }`}
    >
      <div className="text-xs font-medium uppercase tracking-wider text-text-tertiary">{label}</div>
      <div className={`mt-1.5 text-h2 ${variant === "highlight" ? "text-brand-700" : "text-text"}`}>
        {value}
      </div>
      {helper ? <div className="mt-1 text-xs text-text-tertiary">{helper}</div> : null}
    </div>
  );
}
