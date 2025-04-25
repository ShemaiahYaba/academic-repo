/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}', // Update to match your project structure
      './index.html',
    ],
    theme: {
      extend: {
        fontFamily: {
          montserrat: ['Montserrat', 'serif'], // Define the Montserrat font
        },
      },
    },
    plugins: [],
  };
  