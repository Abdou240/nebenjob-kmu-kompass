import { nebenverdienstSchema } from "@/lib/validation/nebenverdienst";
import { calculateNebenverdienst, NebenverdienstResult } from "@/lib/calculators/nebenverdienst";

export function computeNebenverdienst(raw: unknown): { data: NebenverdienstResult } | { error: ReturnType<typeof nebenverdienstSchema.safeParse> } {
  const parsed = nebenverdienstSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed };

  const result = calculateNebenverdienst(parsed.data);
  return { data: result };
}
