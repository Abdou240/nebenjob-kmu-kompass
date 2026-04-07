import { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, hint, error, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-label text-text">{label}</span>
      {children}
      {hint && !error ? (
        <span className="text-xs text-text-tertiary">{hint}</span>
      ) : null}
      {error ? (
        <span className="text-xs font-medium text-danger-700">{error}</span>
      ) : null}
    </label>
  );
}
