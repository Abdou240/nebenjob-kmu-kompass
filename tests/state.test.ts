import { describe, expect, it } from "vitest";
import {
  applyQueryValues,
  buildQueryString,
  upsertRecentCalculation
} from "@/lib/calculators/state";

describe("buildQueryString", () => {
  it("schreibt nur abweichende und nicht-leere Werte in die URL", () => {
    const query = buildQueryString(
      {
        monthlyIncome: "1200",
        monthlyExpenses: "200",
        variancePercent: "10"
      },
      {
        variancePercent: "10"
      }
    );

    expect(query).toBe("monthlyIncome=1200&monthlyExpenses=200");
  });
});

describe("applyQueryValues", () => {
  it("übernimmt bekannte Query-Werte auf Defaults", () => {
    const values = applyQueryValues(
      {
        monthlyIncome: "800",
        monthlyExpenses: "150",
        variancePercent: "10"
      },
      new URLSearchParams("monthlyIncome=1200&variancePercent=20")
    );

    expect(values).toEqual({
      monthlyIncome: "1200",
      monthlyExpenses: "150",
      variancePercent: "20"
    });
  });
});

describe("upsertRecentCalculation", () => {
  it("setzt gleiche Eingaben nach oben statt Duplikate anzulegen", () => {
    const entries = upsertRecentCalculation(
      [
        {
          id: "old",
          label: "Alt",
          summary: "alt",
          createdAt: "2026-01-01T10:00:00.000Z",
          values: {
            monthlyIncome: "800"
          }
        }
      ],
      {
        id: "new",
        label: "Neu",
        summary: "neu",
        createdAt: "2026-01-02T10:00:00.000Z",
        values: {
          monthlyIncome: "800"
        }
      }
    );

    expect(entries).toHaveLength(1);
    expect(entries[0].id).toBe("new");
  });
});
