/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cwu_dk_charcoal: "rgba(51, 51, 51, 1)",
        cwu_blue_magentabro: "rgba(63, 62, 79, 1)",
        cwu_brown: "rgba(189, 178, 178, 1)",
      },
      keyframes: {
        popIn: {
          "0%": {
            transform: "scale(0.5)",
            opacity: "0",
          },
          "80%": {
            transform: "scale(1.1)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
      },
      slideDown: {
        "0%": { transform: "translateY(-100%)", opacity: "0" },
        "100%": { transform: "translateY(0)", opacity: "1" },
      },
      slideUp: {
        "0%": { transform: "translateY(0)", opacity: "1" },
        "100%": { transform: "translateY(-100%)", opacity: "0" },
      },
      animation: {
        popIn: "popIn 0.3s ease-out",
        slideDown: "slideDown 0.3s ease-out",
        slideUp: "slideUp 0.3s ease-out",
      },
    },
  },
  variants: {},
  plugins: [],
};
