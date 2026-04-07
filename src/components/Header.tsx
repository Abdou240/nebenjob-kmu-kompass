"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/Container";

const navItems = [
  { href: "/calculators/stundenlohn", label: "Stundenlohn" },
  { href: "/calculators/nebenverdienst", label: "Nebenverdienst" },
  { href: "/calculators/kleinunternehmer", label: "Kleinunternehmer" }
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-white/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-text hover:text-text">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 6V14H10V10H6V14H2V6L8 2Z" fill="white" />
            </svg>
          </div>
          <div>
            <span className="text-sm font-semibold tracking-tight">KMU Kompass</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-text-secondary hover:bg-surface-muted hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-muted hover:text-text md:hidden focus-ring"
          aria-label={mobileOpen ? "Navigation schließen" : "Navigation öffnen"}
          aria-expanded={mobileOpen}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="5" y1="5" x2="15" y2="15" />
                <line x1="15" y1="5" x2="5" y2="15" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-surface-border bg-white md:hidden">
          <Container className="flex flex-col gap-0.5 py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-text-secondary hover:bg-surface-muted hover:text-text"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </Container>
        </div>
      )}
    </header>
  );
}
