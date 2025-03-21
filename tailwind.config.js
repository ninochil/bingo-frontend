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
        light_gray: '#77828B'
      },
      fontFamily: {
        banana: ['YDWBananaSlipPlus', 'sans-serif'],
      },
      borderRadius: {
        xs: '10px',
        sm: '15px',
        md: '30px',
        lg: '40px'
      },
      fontSizes: {
        xs: '16px',
        sm: '20px',
        base: '28px',
        lg: '64px',
        xl: '120px'
      },    
      border: {
        xs: {
          width: '3px', 
          style: 'solid'
        },
        sm: {
          width: '5px', 
          style: 'solid'
        }
      },
    },
  },
  plugins: [],
}
