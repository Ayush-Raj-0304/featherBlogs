/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".glass-panel": {
          "@apply backdrop-blur-xl bg-white/40 border border-white/50 shadow-md rounded-xl": {},
        },
      });
    },
  ],
}
