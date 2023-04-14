module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'golden-tainoi': {
          DEFAULT: '#FFCD64',
          '100': '#FFFFFF',
          '200': '#FFF4DE',
          '300': '#FFE7B6',
          '400': '#FFDA8D',
          '500': '#FFCD64',
          '600': '#FFBB2C',
          '700': '#F3A400',
          '800': '#BB7E00',
          '900': '#835800'
        },
        'mantis': {
          DEFAULT: '#86C556',
          '100': '#DDEFD0',
          '200': '#C7E4B1',
          '300': '#B1DA93',
          '400': '#9CCF74',
          '500': '#86C556',
          '600': '#6AA93A',
          '700': '#507F2C',
          '800': '#36551D',
          '900': '#1B2C0F'
        },
        'thepro-gray': '#333333'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
