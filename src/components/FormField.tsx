import { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, hint, error, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-ink/80">
      <span className="font-medium text-ink">{label}</span>
      {children}
      {hint ? <span className="text-xs text-ink/60">{hint}</span> : null}
      {error ? <span className="text-xs text-ember">{error}</span> : null}
    </label>
  );
}
