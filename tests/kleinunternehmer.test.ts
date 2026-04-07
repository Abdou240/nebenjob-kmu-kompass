import { describe, expect, it } from "vitest";
import { calculateKleinunternehmer } from "@/lib/calculators/kleinunternehmer";


describe("calculateKleinunternehmer", () => {
  it("ordnet Umsätze in die Grenzen ein", () => {
    const result = calculateKleinunternehmer({
      period: "monthly",
      revenuePrevPeriod: 2000,
      revenueCurrentPeriod: 8000,
      regimeKey: "ab_2025"
    });

    expect(result.annualPrevRevenue).toBe(24000);
    expect(result.annualCurrentRevenue).toBe(96000);
    expect(result.prevYearStatus).toBe("near");
    expect(result.currentYearStatus).toBe("near");
    expect(result.overallStatus).toBe("near");
  });

  it("markiert Überschreitungen", () => {
    const result = calculateKleinunternehmer({
      period: "monthly",
      revenuePrevPeriod: 3000,
      revenueCurrentPeriod: 9000,
      regimeKey: "ab_2025"
    });

    expect(result.annualCurrentRevenue).toBe(108000);
    expect(result.overallStatus).toBe("exceeded");
  });
});
