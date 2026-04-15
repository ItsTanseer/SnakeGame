/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dynapuff: ['DynaPuff', 'sans-serif'],
        lovelight: ['Love Light', 'cursive'],
        raleway: ['Raleway', 'sans-serif'],
        stick: ['Stick No Bills', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
