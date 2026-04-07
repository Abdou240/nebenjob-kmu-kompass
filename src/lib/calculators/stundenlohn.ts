import { roundCurrency } from "@/lib/format";

export type StundenlohnInput = {
  monthlySalary: number;
  weeklyHours: number;
  overtimeHours: number;
  overtimePremiumPercent: number;
  weeksPerMonth: number;
};

export type StundenlohnResult = {
  monthlyHours: number;
  hourlyWage: number;
  overtimePay: number;
  totalMonthlyPay: number;
  totalMonthlyHours: number;
  effectiveHourlyWage: number;
  weeklyHoursWithOvertime: number;
  annualSalary: number;
  annualSalaryWithOvertime: number;
};

export function calculateStundenlohn(input: StundenlohnInput): StundenlohnResult {
  const monthlyHours = input.weeklyHours * input.weeksPerMonth;
  const hourlyWage = monthlyHours > 0 ? input.monthlySalary / monthlyHours : 0;
  const overtimeMultiplier = 1 + input.overtimePremiumPercent / 100;
  const overtimePay = input.overtimeHours * hourlyWage * overtimeMultiplier;
  const totalMonthlyPay = input.monthlySalary + overtimePay;
  const totalMonthlyHours = monthlyHours + input.overtimeHours;
  const effectiveHourlyWage = totalMonthlyHours > 0 ? totalMonthlyPay / totalMonthlyHours : 0;
  const weeklyHoursWithOvertime = input.weeksPerMonth > 0 ? totalMonthlyHours / input.weeksPerMonth : 0;
  const roundedMonthlyPay = roundCurrency(totalMonthlyPay);
  const roundedMonthlySalary = roundCurrency(input.monthlySalary);

  return {
    monthlyHours: roundCurrency(monthlyHours),
    hourlyWage: roundCurrency(hourlyWage),
    overtimePay: roundCurrency(overtimePay),
    totalMonthlyPay: roundedMonthlyPay,
    totalMonthlyHours: roundCurrency(totalMonthlyHours),
    effectiveHourlyWage: roundCurrency(effectiveHourlyWage),
    weeklyHoursWithOvertime: roundCurrency(weeklyHoursWithOvertime),
    annualSalary: roundCurrency(roundedMonthlySalary * 12),
    annualSalaryWithOvertime: roundCurrency(roundedMonthlyPay * 12)
  };
}
