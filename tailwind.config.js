/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#E8F0E8',
          100: '#D1E1D1',
          200: '#A3C4A3',
          300: '#76A676',
          400: '#488848',
          500: '#DEB420', // Main primary color
          600: '#254C25',
          700: '#1D3A1D',
          800: '#162716',
          900: '#0F130F',
        },
        secondary: {
          50: '#FEF6E7',
          100: '#FEECD0',
          200: '#FCD9A1',
          300: '#FBC772',
          400: '#FAB44E',
          500: '#850003', // Main secondary color
          600: '#C7861E',
          700: '#956317',
          800: '#63410F',
          900: '#322108',
        },
        accent: {
          50: '#F9E7E7',
          100: '#F4D0D0',
          200: '#E9A1A1',
          300: '#DF7272',
          400: '#D44F4F',
          500: '#D62828', // Main accent color
          600: '#AB2020',
          700: '#801818',
          800: '#561010',
          900: '#2B0808',
        },
        success: {
          50: '#E7F5E7',
          100: '#CFEACF',
          200: '#9FD59F',
          300: '#6FC16F',
          400: '#4EAC4E',
          500: '#2E972E',
          600: '#257925',
          700: '#1C5B1C',
          800: '#123D12',
          900: '#091E09',
        },
        warning: {
          50: '#FEF6E7',
          100: '#FDEDD0',
          200: '#FBDAA1',
          300: '#F9C872',
          400: '#F7B64F',
          500: '#F5A623',
          600: '#C4851C',
          700: '#936415',
          800: '#62420E',
          900: '#312107',
        },
        error: {
          50: '#FDEBEB',
          100: '#FAD6D6',
          200: '#F5ADAD',
          300: '#F08585',
          400: '#EB6565',
          500: '#E53E3E',
          600: '#B73232',
          700: '#892525',
          800: '#5C1919',
          900: '#2E0C0C',
        },
      },
      boxShadow: {
        soft: '0 2px 10px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      gridTemplateColumns: {
        'products': 'repeat(auto-fill, minmax(250px, 1fr))',
        'products-lg': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [],
}