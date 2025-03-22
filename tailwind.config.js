/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: '#FFA142',
        red: '#FF6E61',
        yellow: '#FFD84D',
        green: '#A1D9B2',
        blue: '#6D9DC5',
        gray: '#4C4747',
        white: '#FEFEFE',
        lightgray: '#77828B'
      },
      fontFamily: {
        sans: ['YDWBananaSlipPlus', 'sans-serif'],
      },
      // rounded
      borderRadius: {
        xs: '10px',
        sm: '15px',
        md: '30px',
        lg: '40px'
      },
      // text
      fontSize: {
        xs: '16px',
        sm: '20px',
        base: '28px',
        lg: '64px',
        xl: '120px'
      },    
      // border
      borderWidth: {
        xs: '3px', 
        sm: '5px',
      },
      // shadow
      boxShadow: {
        'custom': '4px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
