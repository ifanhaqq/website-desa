/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        /* Custom palette built around #29A645 */
        emerald: {
          50:  '#edfbf0',
          100: '#d2f5da',
          200: '#a8ecb8',
          300: '#6ddb86',
          400: '#3ec95e',
          500: '#29A645',
          600: '#1f8a38',
          700: '#1a6e2d',
          800: '#175827',
          900: '#134821',
          950: '#092812',
        },
        teal: {
          50:  '#eefbf2',
          100: '#d5f5de',
          200: '#adecc0',
          300: '#74db96',
          400: '#42c96a',
          500: '#2db050',
          600: '#249242',
          700: '#1e7537',
          800: '#1a5d2e',
          900: '#164d27',
          950: '#0a2b14',
        },
        cyan: {
          50:  '#eefcf3',
          100: '#d6f7e0',
          200: '#b0efc5',
          300: '#7ce3a0',
          400: '#4dd379',
          500: '#32b85a',
          600: '#289a4a',
          700: '#217b3d',
          800: '#1c6233',
          900: '#18502b',
          950: '#0b2d18',
        },
      },
    },
  },
  plugins: [],
};
