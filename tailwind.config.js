/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9B72D2",
      },
      fontFamily: {
        nunito: ['"Nunito"', "sans-serif"],
        oswald: ['"Oswald"', "sans-serif"],
      },
      boxShadow: {
        card: "-6px -2px 12px rgba(0, 0, 0, 0.05)",
        nav: "0 8px 18px rgba(0, 0, 0, 0.04)",
        search: "4px 4px 14px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
