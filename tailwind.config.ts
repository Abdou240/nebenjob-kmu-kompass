import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1F2A24",
        moss: "#2F5C4D",
        sand: "#F4F1EA",
        mist: "#EEF2ED",
        clay: "#C7B39A",
        ember: "#B85C38"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(31, 42, 36, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
