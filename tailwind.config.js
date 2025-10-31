
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 7s linear infinite',
      },
      screens: {
        '3xl': '2200px',
      },
      colors: {
        ubuntu: {
          orange: '#E95420',
          aubergine: '#772953',
          lightOrange: '#F6B024',
          darkAubergine: '#2C001E',
          warmGrey: '#AEA79F',
          white: '#FFFFFF',
          lightGrey: '#E0E0E0',
        },
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        ubuntu: {
          primary: '#E95420', // Ubuntu Orange
          secondary: '#772953', // Aubergine
          accent: '#F6B024', // Light Orange
          neutral: '#2C001E', // Dark Aubergine
          'base-100': '#FFFFFF',
          'base-200': '#F5F5F5',
          'base-content': '#2C001E',
          info: '#3794ff',
          success: '#25A65B',
          warning: '#F6B024',
          error: '#E95420',
        },
      },
      'light',
      'dark',
    ],
  },
  darkMode: ['class', '[data-theme="dark"]'],
};


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       animation: {
//         'spin-slow': 'spin 7s linear infinite',
//       },
//       screens: {
//         '3xl': '2200px',
//       },
//     },
//   },
//   plugins: [require('daisyui')],
//   daisyui: {
//     themes: ['light', 'dark'],
//   },
//   darkMode: ['class', '[data-theme="dark"]'],
// };
