/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#F05A00',
          hover: '#D44F00',
        },
        teal: {
          DEFAULT: '#0D6D6E',
          hover: '#0a5a5b',
        },
        dark: '#111111',
        mid: '#2A2A2A',
        muted: '#6B6B6B',
        cream: '#FAF8F4',
        cultborder: '#E2DDD6',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
