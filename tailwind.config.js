module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        'purple': '#6d71f9',
        'dark-purple': '#4b4eab',
        'dark-blurple': '#16151f',
        // neutral ramp, off-tones for depth (never pure black)
        base: '#0e0d14',       // canvas
        surface: '#16151e',    // surface
        surface2: '#1c1b26',   // well / raised
        line: 'rgba(255,255,255,0.07)',
        line2: 'rgba(255,255,255,0.12)',
        accent: {
          300: '#aab0ff',
          400: '#8b91fb',
          500: '#6d71f9',
          600: '#585ce6',
        },
      },
      transitionTimingFunction: {
        // the two easings from DESIGN_PRINCIPLES
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        lift: '0 10px 30px -12px rgba(8,7,14,0.7)',
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
