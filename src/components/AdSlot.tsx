import { adsConfig } from "@/config/ads";

type AdSlotProps = {
  placement: keyof typeof adsConfig.placements;
};

export function AdSlot({ placement }: AdSlotProps) {
  if (!adsConfig.placements[placement]) return null;
  if (!adsConfig.enabled && !adsConfig.showPlaceholder) return null;

  return (
    <div className="rounded-lg border border-dashed border-surface-border bg-surface-muted p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">{adsConfig.label}</div>
      <div className="mt-1 text-xs text-text-tertiary">{adsConfig.placeholderCopy}</div>
    </div>
  );
}
