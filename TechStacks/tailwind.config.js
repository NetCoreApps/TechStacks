module.exports = {
  content: ["./Pages/**/*.{html,js,mjs,md,cshtml,razor}","./Areas/**/*.{html,js,mjs,md,cshtml,razor}", "./Css.cs"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        danger:  'rgb(153 27 27)',
        success: 'rgb(22 101 52)',
      },
    },
  },
  plugins: [],
}
