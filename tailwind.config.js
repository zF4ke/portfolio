module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'purple': '#6d71f9',
        'dark-purple': '#4b4eab',
        'dark-blurple': '#16151f',
        base: '#0f0e15',
        surface: '#17161f',
        surface2: '#1f1e29',
        line: 'rgba(255,255,255,0.08)',
        accent: {
          300: '#a9abfb',
          400: '#8b8efb',
          500: '#6d71f9',
          600: '#585ce6',
        },
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
