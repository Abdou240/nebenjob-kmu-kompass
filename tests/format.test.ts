import { describe, expect, it } from "vitest";
import { parseGermanNumber, roundCurrency, clamp } from "@/lib/format";

describe("parseGermanNumber", () => {
  it("parst einfache Zahlen", () => {
    expect(parseGermanNumber("1000")).toBe(1000);
    expect(parseGermanNumber("3.5")).toBe(3.5);
  });

  it("parst deutsche Kommazahlen", () => {
    expect(parseGermanNumber("3,5")).toBe(3.5);
    expect(parseGermanNumber("1.000,50")).toBe(1000.5);
  });

  it("gibt null für ungültige Eingaben", () => {
    expect(parseGermanNumber("")).toBeNull();
    expect(parseGermanNumber("abc")).toBeNull();
    expect(parseGermanNumber("   ")).toBeNull();
  });
});

describe("roundCurrency", () => {
  it("rundet auf 2 Dezimalstellen", () => {
    expect(roundCurrency(10.005)).toBe(10.01);
    expect(roundCurrency(10.004)).toBe(10);
    expect(roundCurrency(99.999)).toBe(100);
  });
});

describe("clamp", () => {
  it("begrenzt Werte", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});
