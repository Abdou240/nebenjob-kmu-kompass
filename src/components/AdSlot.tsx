import { adsConfig } from "@/config/ads";

type AdSlotProps = {
  placement: keyof typeof adsConfig.placements;
};

export function AdSlot({ placement }: AdSlotProps) {
  if (!adsConfig.placements[placement]) return null;
  if (!adsConfig.enabled && !adsConfig.showPlaceholder) return null;

  return (
    <div className="rounded-2xl border border-dashed border-clay bg-white/60 p-4 text-xs text-ink/60">
      <div className="font-semibold uppercase tracking-wide text-ink/50">
        {adsConfig.label}
      </div>
      <div className="mt-2">{adsConfig.placeholderCopy}</div>
    </div>
  );
}
