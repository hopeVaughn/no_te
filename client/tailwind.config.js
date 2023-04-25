/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-diagonal': 'linear-gradient(to bottom right, #333333, #cccccc)',
      },
    },
  },
  plugins: [],
}

