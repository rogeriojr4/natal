module.exports = {
  content: ['./src/**/*.njs', './src/**/*.jsx', './src/**/*.nts', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'light-green': '#8AA846',
        'dark-green': '#718E54',
        'dark-red': '#B01F24',
        'light-red': '#D82028',
        'light-brown': '#E0BFA0',
        'dark-brown': '#BC7444',
      },
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      'crete-round': ['Crete Round', 'sans-serif'],
    },
  },
  plugins: [],
}
