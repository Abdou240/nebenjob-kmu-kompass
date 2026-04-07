import { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={`w-full rounded-xl border border-mist bg-white px-3 py-2 text-base text-ink shadow-sm focus:border-moss focus:outline-none ${className ?? ""}`}
      {...props}
    />
  );
}
