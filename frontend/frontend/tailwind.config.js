/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
      animation: {
        popIn: "popIn 0.3s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
