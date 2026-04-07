import { describe, expect, it } from "vitest";
import { calculateStundenlohn } from "@/lib/calculators/stundenlohn";

describe("calculateStundenlohn", () => {
  it("berechnet Stundenlohn und Überstunden korrekt", () => {
    const result = calculateStundenlohn({
      monthlySalary: 3000,
      weeklyHours: 40,
      overtimeHours: 10,
      overtimePremiumPercent: 25,
      weeksPerMonth: 4.33
    });

    expect(result.monthlyHours).toBe(173.2);
    expect(result.hourlyWage).toBe(17.32);
    expect(result.overtimePay).toBe(216.51);
    expect(result.totalMonthlyPay).toBe(3216.51);
    expect(result.totalMonthlyHours).toBe(183.2);
    expect(result.effectiveHourlyWage).toBe(17.56);
    expect(result.annualSalaryWithOvertime).toBe(38598.12);
  });

  it("vermeidet Division durch Null", () => {
    const result = calculateStundenlohn({
      monthlySalary: 0,
      weeklyHours: 0,
      overtimeHours: 0,
      overtimePremiumPercent: 0,
      weeksPerMonth: 4.33
    });

    expect(result.hourlyWage).toBe(0);
    expect(result.effectiveHourlyWage).toBe(0);
  });
});
