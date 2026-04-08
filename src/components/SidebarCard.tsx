import { ReactNode } from "react";

type SidebarCardProps = {
  title: string;
  children: ReactNode;
};

export function SidebarCard({ title, children }: SidebarCardProps) {
  return (
    <div className="card p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
