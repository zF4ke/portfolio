module.exports = {
  content: [    
    "./pages/**/*.{js,ts,jsx,tsx}",    
    "./components/**/*.{js,ts,jsx,tsx}",  
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'purple': '#6d71f9',
        'dark-blurple': '#16151f'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
