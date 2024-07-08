/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        theme_logo: ['PressStart2P-Regular'],
      },
      colors: {
        primary: 'rgba(95, 74, 140, 1)',
        secondry: 'rgba(40, 17, 89, 1)', // rgba(28, 119, 246, 1)
        secondry_act: 'rgba(40, 17, 89, .85)', // rgba(28, 119, 246, 1)
        accent: 'rgba(191, 170, 107, 1)', // rgba(28, 119, 246, 1)
        theme_grey: 'rgba(217,217,217,1)',
        // cwu_theme_orng: 'rgba(191, 170, 107, 1)', // rgba(28, 119, 246, 1)
        // cwu_theme_orng_hover: 'rgba(28, 119, 246, 0.8)',
        // cwu_theme_orng_magenta: 'rgba(95, 74, 140, 1)', //rgba(63, 62, 79, 1)
        // cwu_brown: 'rgba(189, 178, 178, 1)',
      },
      keyframes: {
        popIn: {
          '0%': {
            transform: 'scale(0.5)',
            opacity: '0',
          },
          '80%': {
            transform: 'scale(1.1)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
      slideDown: {
        '0%': { transform: 'translateY(-100%)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(0)', opacity: '1' },
        '100%': { transform: 'translateY(-100%)', opacity: '0' },
      },
      animation: {
        popIn: 'popIn 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
      },
    },
  },
  variants: {},
  plugins: [],
};
