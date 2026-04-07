import { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function SectionCard({ title, children, footer }: SectionCardProps) {
  return (
    <div className="card p-5 sm:p-6">
      <h2 className="text-h3 text-text">{title}</h2>
      <div className="mt-5">{children}</div>
      {footer ? <div className="mt-5 border-t border-surface-border pt-4">{footer}</div> : null}
    </div>
  );
}
