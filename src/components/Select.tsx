import { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={`w-full rounded-lg border border-surface-border bg-white px-3 py-2 text-sm text-text shadow-xs transition-colors duration-150 hover:border-surface-border-hover focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none ${className ?? ""}`}
      {...props}
    />
  );
}
