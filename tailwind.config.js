/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Satoshi", "system-ui", "sans-serif"],
        sans: ["Geist", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        "ink-dim": "var(--ink-dim)",
        "ink-faint": "var(--ink-faint)",
        line: "var(--line)",
        // Was missing: border-line-strong / bg-line-strong are used in
        // several components and silently resolved to nothing without this.
        "line-strong": "var(--line-strong)",
        blue: "var(--blue)",
        "blue-soft": "var(--blue-soft)",
      },
      borderRadius: {
        btn: "var(--radius-btn)",
        card: "var(--radius-card)",
        panel: "var(--radius-panel)",
      },
      maxWidth: {
        editorial: "78rem",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s var(--ease-out-expo) both",
      },
    },
  },
  plugins: [],
};
