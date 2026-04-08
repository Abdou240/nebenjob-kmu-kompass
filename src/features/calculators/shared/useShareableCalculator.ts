"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  applyQueryValues,
  buildQueryString,
  CalculatorValues,
  RecentCalculationEntry,
  upsertRecentCalculation
} from "@/lib/calculators/state";

type UseShareableCalculatorOptions<T extends CalculatorValues> = {
  calculatorKey: string;
  defaults: T;
};

export function useShareableCalculator<T extends CalculatorValues>({
  calculatorKey,
  defaults
}: UseShareableCalculatorOptions<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initializedRef = useRef(false);
  const [values, setValues] = useState<T>(defaults);
  const [historyEnabled, setHistoryEnabled] = useState(true);
  const [recent, setRecent] = useState<RecentCalculationEntry<T>[]>([]);

  const historyStorageKey = `calculator-history:${calculatorKey}`;
  const toggleStorageKey = `calculator-history-enabled:${calculatorKey}`;

  useEffect(() => {
    const nextValues = applyQueryValues(defaults, new URLSearchParams(searchParams.toString()));
    setValues(nextValues);

    const storedToggle = window.localStorage.getItem(toggleStorageKey);
    if (storedToggle === "false") {
      setHistoryEnabled(false);
    }

    const storedRecent = window.localStorage.getItem(historyStorageKey);
    if (storedRecent) {
      try {
        setRecent(JSON.parse(storedRecent) as RecentCalculationEntry<T>[]);
      } catch {
        setRecent([]);
      }
    }

    initializedRef.current = true;
  }, [defaults, historyStorageKey, searchParams, toggleStorageKey]);

  useEffect(() => {
    if (!initializedRef.current) return;

    const queryString = buildQueryString(values, defaults);
    const href = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  }, [defaults, pathname, router, values]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(toggleStorageKey, String(historyEnabled));
  }, [historyEnabled, toggleStorageKey]);

  function setField<K extends keyof T>(key: K, value: T[K]) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value
    }));
  }

  function saveRecent(entry: Omit<RecentCalculationEntry<T>, "id" | "createdAt">) {
    if (!historyEnabled || typeof window === "undefined") return;

    const nextEntry: RecentCalculationEntry<T> = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    setRecent((currentEntries) => {
      const nextEntries = upsertRecentCalculation(currentEntries, nextEntry);
      window.localStorage.setItem(historyStorageKey, JSON.stringify(nextEntries));
      return nextEntries;
    });
  }

  function restoreRecent(entry: RecentCalculationEntry<T>) {
    setValues(entry.values);
  }

  function clearRecent() {
    setRecent([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(historyStorageKey);
    }
  }

  return {
    values,
    setValues,
    setField,
    recent,
    saveRecent,
    restoreRecent,
    clearRecent,
    historyEnabled,
    setHistoryEnabled
  };
}
