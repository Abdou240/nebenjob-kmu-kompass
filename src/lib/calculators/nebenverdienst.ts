import { roundCurrency } from "@/lib/format";

export type NebenverdienstInput = {
  monthlyIncome: number;
  monthlyExpenses: number;
  variancePercent: number;
};

export type NebenverdienstResult = {
  monthlyNet: number;
  yearlyNet: number;
  scenario: {
    lowMonthlyNet: number;
    highMonthlyNet: number;
    lowYearlyNet: number;
    highYearlyNet: number;
  };
};

export function calculateNebenverdienst(input: NebenverdienstInput): NebenverdienstResult {
  const monthlyNet = input.monthlyIncome - input.monthlyExpenses;
  const yearlyNet = monthlyNet * 12;
  const variance = input.variancePercent / 100;

  const lowIncome = input.monthlyIncome * (1 - variance);
  const highIncome = input.monthlyIncome * (1 + variance);
  const lowMonthlyNet = lowIncome - input.monthlyExpenses;
  const highMonthlyNet = highIncome - input.monthlyExpenses;

  return {
    monthlyNet: roundCurrency(monthlyNet),
    yearlyNet: roundCurrency(yearlyNet),
    scenario: {
      lowMonthlyNet: roundCurrency(lowMonthlyNet),
      highMonthlyNet: roundCurrency(highMonthlyNet),
      lowYearlyNet: roundCurrency(lowMonthlyNet * 12),
      highYearlyNet: roundCurrency(highMonthlyNet * 12)
    }
  };
}
