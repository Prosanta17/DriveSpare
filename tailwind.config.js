/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9B72D2", // Button background, active link
        secondary: "#E4D8F9", // Light lavender (backgrounds, hover)
        accent: "#F5CBA7", // Automatic tag
        success: "#C4F0D2", // Manual tag
        text: "#111827", // Main dark text
        light: "#F9FAFB", // Page background
        danger: "#FF4C4C", // Trash icon
        white: "#FFFFFF",
        gray: {
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          500: "#6B7280",
        },
      },
      fontFamily: {
        nunito: ['"Nunito"', "sans-serif"],
        oswald: ['"Oswald"', "sans-serif"],
      },
      borderRadius: {
        card: "1rem",
        tag: "0.5rem",
        btn: "1.5rem",
      },
      boxShadow: {
        card: "-6px -2px 12px rgba(0, 0, 0, 0.05)",
        nav: "0 8px 18px rgba(0, 0, 0, 0.04)",
        search: "4px 4px 14px rgba(0, 0, 0, 0.04)",
      },
      spacing: {
        "card-gap": "1.25rem",
        "section-pad": "2rem",
      },
      width: {
        search: "25rem",
      },
    },
  },
  plugins: [],
};
