import { kleinunternehmerSchema } from "@/lib/validation/kleinunternehmer";
import { calculateKleinunternehmer, KleinunternehmerResult } from "@/lib/calculators/kleinunternehmer";

export function computeKleinunternehmer(raw: unknown): { data: KleinunternehmerResult } | { error: ReturnType<typeof kleinunternehmerSchema.safeParse> } {
  const parsed = kleinunternehmerSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed };

  const result = calculateKleinunternehmer(parsed.data);
  return { data: result };
}
