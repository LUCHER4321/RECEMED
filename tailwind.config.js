/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "rm-blue-100": "#367CF4",
        "rm-blue-200": "#367cc8",
        "rm-cyan-100": "#00FFFF",
        "rm-cyan-200": "#007FFF"
      }
    },
  },
  plugins: [],
}

