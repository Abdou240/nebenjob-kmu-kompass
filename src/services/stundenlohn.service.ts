import { stundenlohnSchema } from "@/lib/validation/stundenlohn";
import { calculateStundenlohn, StundenlohnResult } from "@/lib/calculators/stundenlohn";
import { DEFAULT_WEEKS_PER_MONTH } from "@/config/calculators";

export type StundenlohnServiceInput = {
  monthlySalary: number;
  weeklyHours: number;
  overtimeHours: number;
  overtimePremiumPercent: number;
};

export function computeStundenlohn(raw: unknown): { data: StundenlohnResult } | { error: ReturnType<typeof stundenlohnSchema.safeParse> } {
  const parsed = stundenlohnSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed };

  const result = calculateStundenlohn({
    ...parsed.data,
    weeksPerMonth: DEFAULT_WEEKS_PER_MONTH
  });

  return { data: result };
}
