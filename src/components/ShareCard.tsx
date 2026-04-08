"use client";

import { useState } from "react";
import { SidebarCard } from "@/components/SidebarCard";

type ShareCardProps = {
  title?: string;
  description?: string;
};

export function ShareCard({
  title = "Teilen",
  description = "Der aktuelle Eingabestand wird in den Link übernommen."
}: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (typeof window === "undefined") return;

    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <SidebarCard title={title}>
      <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
      <button type="button" onClick={handleCopy} className="btn-secondary mt-3 w-full justify-center">
        {copied ? "Link kopiert" : "Link kopieren"}
      </button>
    </SidebarCard>
  );
}
