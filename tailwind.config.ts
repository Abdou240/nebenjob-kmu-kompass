import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
          800: "#1E3A8A",
          900: "#172554"
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8FAFC",
          subtle: "#F1F5F9",
          border: "#E2E8F0",
          "border-hover": "#CBD5E1"
        },
        text: {
          DEFAULT: "#0F172A",
          secondary: "#475569",
          tertiary: "#94A3B8",
          inverse: "#FFFFFF"
        },
        success: {
          50: "#F0FDF4",
          500: "#22C55E",
          700: "#15803D"
        },
        warning: {
          50: "#FFFBEB",
          500: "#F59E0B",
          700: "#B45309"
        },
        danger: {
          50: "#FEF2F2",
          500: "#EF4444",
          700: "#B91C1C"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      fontSize: {
        "display": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-sm": ["2rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h1": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
        "h2": ["1.375rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h3": ["1.125rem", { lineHeight: "1.35", fontWeight: "600" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.65" }],
        "body": ["0.9375rem", { lineHeight: "1.6" }],
        "sm": ["0.8125rem", { lineHeight: "1.5" }],
        "xs": ["0.75rem", { lineHeight: "1.5" }],
        "label": ["0.8125rem", { lineHeight: "1.4", fontWeight: "500" }]
      },
      borderRadius: {
        "sm": "0.375rem",
        "DEFAULT": "0.5rem",
        "md": "0.625rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.25rem",
        "pill": "9999px"
      },
      boxShadow: {
        "xs": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "card": "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "card-hover": "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
        "elevated": "0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.04)"
      },
      maxWidth: {
        "content": "72rem",
        "prose": "42rem"
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem"
      }
    }
  },
  plugins: []
};

export default config;
