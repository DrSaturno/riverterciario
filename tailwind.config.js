/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#2a2a2a",
          800: "#393939",
          700: "#444444",
          600: "#4e4e4e",
          500: "#5c5c5c",
        },
        river: {
          red: "#C8102E",
          "red-dark": "#a00e24",
        },
      },
    },
  },
  plugins: [],
};
