module.exports = {
  content: [    
    "./pages/**/*.{js,ts,jsx,tsx}",    
    "./components/**/*.{js,ts,jsx,tsx}",  
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ['"JetBrains Mono"'],
      },
      colors: {
        'purple': '#6d71f9',
        'dark-purple': '#4b4eab',
        'dark-blurple': '#16151f'
      },
    },
  },
  plugins: [],
}
