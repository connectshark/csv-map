/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)'
      },
      fontFamily: {
        'title': [`Zen Maru Gothic`, 'system-ui', `Arial`, `Helvetica`, `sans-serif`, 'sans-serif', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas'],
        'main': [`FakePearl`, 'system-ui', `Arial`, `Helvetica`, `sans-serif`, 'sans-serif', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas']
      }
    }
  },
  plugins: [],
}
