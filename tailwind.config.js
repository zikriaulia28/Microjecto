const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{html,js,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#6379F4',
        'secondary': '#EFF0Fc',
        'home': '#473AD10F',
        'font-primary': '#3A3D42',
        'font-primary-blur': '#3A3D4299',
        'font-primary-blurs': '#3A3D42CC',
        'font-secondary': '#ffffff',
        'font-secondary-blur': '#DFDCDC',
        'font-placeholder': '#A9A9A9CC',
        'font-error': '#FF5B37',

      },
      fontFamily: {
        nunitosans: ["Nunito Sans"],
      },
    },
  },
  plugins: [require("daisyui"), require("tw-elements/dist/plugin.cjs")],
  daisyui: {
    themes: ["emerald"],
  },
}
