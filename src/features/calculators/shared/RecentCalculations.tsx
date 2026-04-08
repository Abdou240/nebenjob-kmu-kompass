"use client";

import { CalculatorValues, RecentCalculationEntry } from "@/lib/calculators/state";
import { SectionCard } from "@/components/SectionCard";

type RecentCalculationsProps<T extends CalculatorValues> = {
  title?: string;
  description: string;
  entries: RecentCalculationEntry<T>[];
  historyEnabled: boolean;
  onToggleHistory: (enabled: boolean) => void;
  onRestore: (entry: RecentCalculationEntry<T>) => void;
  onClear: () => void;
};

export function RecentCalculations<T extends CalculatorValues>({
  title = "Zuletzt verwendet",
  description,
  entries,
  historyEnabled,
  onToggleHistory,
  onRestore,
  onClear
}: RecentCalculationsProps<T>) {
  return (
    <SectionCard
      title={title}
      footer={
        <div className="flex flex-wrap items-center gap-3 text-xs text-text-tertiary">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={historyEnabled}
              onChange={(event) => onToggleHistory(event.target.checked)}
            />
            Lokal auf diesem Gerät merken
          </label>
          {entries.length > 0 ? (
            <button type="button" className="font-medium text-brand-600" onClick={onClear}>
              Verlauf löschen
            </button>
          ) : null}
        </div>
      }
    >
      <p className="text-sm text-text-secondary">{description}</p>
      {entries.length === 0 ? (
        <div className="mt-4 rounded-lg border border-dashed border-surface-border bg-surface-muted px-4 py-3 text-sm text-text-tertiary">
          Noch keine lokal gespeicherten Berechnungen.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-3 rounded-lg border border-surface-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-text">{entry.label}</div>
                <div className="mt-1 text-sm text-text-secondary">{entry.summary}</div>
                <div className="mt-1 text-xs text-text-tertiary">
                  {new Date(entry.createdAt).toLocaleString("de-DE", {
                    dateStyle: "short",
                    timeStyle: "short"
                  })}
                </div>
              </div>
              <button type="button" className="btn-secondary" onClick={() => onRestore(entry)}>
                Wiederherstellen
              </button>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
