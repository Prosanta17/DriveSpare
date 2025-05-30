/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9B72D2",
        danger: "#FF4C4C",
      },
      fontFamily: {
        nunito: ['"Nunito"', "sans-serif"],
        oswald: ['"Oswald"', "sans-serif"],
      },
      boxShadow: {
        card: "0px 0px 12px rgba(0, 0, 0, 0.1)",
        nav: "0 8px 18px rgba(0, 0, 0, 0.04)",
        search: "4px 4px 14px rgba(0, 0, 0, 0.04)",
        button: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
