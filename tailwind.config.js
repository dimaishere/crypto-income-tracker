module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'serif': '"Libre Baskerville", serif',
      },
      fontSize: {
        xs: "13px",
        sm: "13px",
        tiny: "14px",
        base: "15px",
        big: "16px",
        lg: "17px",
        xl: "19px",
        "2xl": "1.4rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
        "7xl": "5rem",
        "8xl": "7rem",
        "10xl": "10rem"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
