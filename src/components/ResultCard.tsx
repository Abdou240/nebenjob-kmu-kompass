import { ReactNode } from "react";

type ResultCardProps = {
  label: string;
  value: ReactNode;
  helper?: string;
};

export function ResultCard({ label, value, helper }: ResultCardProps) {
  return (
    <div className="rounded-2xl border border-mist bg-white p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-ink/50">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-ink">{value}</div>
      {helper ? <div className="mt-2 text-sm text-ink/60">{helper}</div> : null}
    </div>
  );
}
