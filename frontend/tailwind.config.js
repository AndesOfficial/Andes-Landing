/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, TSX files in src folder
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0890f1',
          dark: '#0670bd', // ~10% darker for hover
          light: '#3ea8f4', // lighter shade if needed
        },
      },
      boxShadow: {
        'brand-soft': '0 10px 15px -3px rgba(8, 144, 241, 0.1)',
      }
    },
  },
  plugins: [],
}
