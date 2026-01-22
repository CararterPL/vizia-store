/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // To obejmuje app, components, styles itd.
  ],
  theme: {
    extend: {
      fontFamily: {
        brand: ["var(--font-brand)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        // TUTAJ musi być definicja primary
        primary: "#020202", 
        vizia: {
          red: "#ff133a",
          black: "#020202",
          gray: "#050505",
          accent: "rgba(255, 19, 58, 0.3)",
        },
      },
    },
  },
  plugins: [],
}