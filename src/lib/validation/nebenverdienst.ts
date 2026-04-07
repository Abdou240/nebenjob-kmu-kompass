import { z } from "zod";

export const nebenverdienstSchema = z.object({
  monthlyIncome: z.number().min(0),
  monthlyExpenses: z.number().min(0),
  variancePercent: z.number().min(0).max(50)
});

export type NebenverdienstSchema = z.infer<typeof nebenverdienstSchema>;
