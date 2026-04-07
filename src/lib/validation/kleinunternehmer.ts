import { z } from "zod";
import { KLEINUNTERNEHMER_REGIMES } from "@/config/thresholds";

export const kleinunternehmerSchema = z.object({
  period: z.enum(["monthly", "quarterly", "yearly"]),
  revenuePrevPeriod: z.number().min(0),
  revenueCurrentPeriod: z.number().min(0),
  regimeKey: z.enum(KLEINUNTERNEHMER_REGIMES.map((item) => item.key) as [
    "bis_2024",
    "ab_2025"
  ])
});

export type KleinunternehmerSchema = z.infer<typeof kleinunternehmerSchema>;
