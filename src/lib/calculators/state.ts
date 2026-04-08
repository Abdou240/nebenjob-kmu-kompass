export type CalculatorValues = Record<string, string>;

export type RecentCalculationEntry<T extends CalculatorValues = CalculatorValues> = {
  id: string;
  label: string;
  summary: string;
  values: T;
  createdAt: string;
};

export function applyQueryValues<T extends CalculatorValues>(
  defaults: T,
  params: URLSearchParams
): T {
  const nextValues = { ...defaults };

  for (const key of Object.keys(defaults)) {
    const param = params.get(key);
    if (param !== null) {
      nextValues[key as keyof T] = param as T[keyof T];
    }
  }

  return nextValues;
}

export function buildQueryString<T extends CalculatorValues>(
  values: T,
  defaults: Partial<T> = {}
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(values)) {
    const trimmedValue = value.trim();
    const defaultValue = defaults[key as keyof T];

    if (!trimmedValue || trimmedValue === defaultValue) {
      continue;
    }

    params.set(key, trimmedValue);
  }

  return params.toString();
}

export function upsertRecentCalculation<T extends CalculatorValues>(
  entries: RecentCalculationEntry<T>[],
  nextEntry: RecentCalculationEntry<T>,
  maxEntries = 5
): RecentCalculationEntry<T>[] {
  const filteredEntries = entries.filter(
    (entry) => JSON.stringify(entry.values) !== JSON.stringify(nextEntry.values)
  );

  return [nextEntry, ...filteredEntries].slice(0, maxEntries);
}
