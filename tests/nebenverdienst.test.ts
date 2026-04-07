import { describe, expect, it } from "vitest";
import { calculateNebenverdienst } from "@/lib/calculators/nebenverdienst";

describe("calculateNebenverdienst", () => {
  it("berechnet monatliche und jährliche Werte", () => {
    const result = calculateNebenverdienst({
      monthlyIncome: 1000,
      monthlyExpenses: 200,
      variancePercent: 10
    });

    expect(result.monthlyNet).toBe(800);
    expect(result.yearlyNet).toBe(9600);
    expect(result.scenario.lowMonthlyNet).toBe(700);
    expect(result.scenario.highMonthlyNet).toBe(900);
    expect(result.scenario.lowYearlyNet).toBe(8400);
    expect(result.scenario.highYearlyNet).toBe(10800);
  });
});
