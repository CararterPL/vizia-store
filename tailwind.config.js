/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brand: ["var(--font-brand)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        // Główny kolor dla kompatybilności
        primary: "#020202", 
        
        // Spójna paleta Vizia - używamy zapisu z myślnikiem
        "vizia-red": "#ff133a",
        "vizia-black": "#020202",
        "vizia-gray": "#050505",
        "vizia-accent": "rgba(255, 19, 58, 0.3)",
      },
    },
  },
  plugins: [],
}