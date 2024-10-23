/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        autocol_sm: 'fr',
        autocol_lg: '1fr 1fr',
      },
    },
  },
  darkMode: 'class',
};
