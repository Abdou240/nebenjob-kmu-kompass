import { z } from "zod";

export const stundenlohnSchema = z.object({
  monthlySalary: z.number().positive(),
  weeklyHours: z.number().min(1).max(80),
  overtimeHours: z.number().min(0).max(200),
  overtimePremiumPercent: z.number().min(0).max(200)
});

export type StundenlohnSchema = z.infer<typeof stundenlohnSchema>;
