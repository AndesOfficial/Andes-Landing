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
          DEFAULT: '#0084FF', // Primary Brand Blue
          dark: '#0066cc',    // Darker shade for hover
          light: '#e6f2ff',   // Very light blue for backgrounds/accents
        },
      },
      boxShadow: {
        'brand-soft': '0 10px 15px -3px rgba(8, 144, 241, 0.1)',
      }
    },
  },
  plugins: [],
}
