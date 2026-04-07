import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-lg border border-surface-border bg-white px-3 py-2 text-sm text-text shadow-xs placeholder:text-text-tertiary transition-colors duration-150 hover:border-surface-border-hover focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none ${className ?? ""}`}
      {...props}
    />
  );
}
