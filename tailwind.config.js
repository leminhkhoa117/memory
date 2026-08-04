/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171113',
        paper: '#f1e5dc',
        kraft: '#d8c3a5',
        archive: {
          DEFAULT: '#4a453c',
          dark: '#1d1b18',
          light: '#6b6355',
          bone: '#e8e0cf',
        },
        rose: {
          DEFAULT: '#b96e72',
          light: '#f0b7b2',
        },
        wine: '#4c202b',
        gold: '#d8aa70',
        dusk: '#110d0f',
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'sans-serif'],
        serif: ['Lora', 'serif'],
        display: ['"Dancing Script"', 'cursive'],
        hand: ['Caveat', '"Patrick Hand"', 'cursive'],
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.08)' },
        },
        'hint-shake': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '25%': { transform: 'translate3d(-3px, 0, 0) rotate(-2deg)' },
          '75%': { transform: 'translate3d(3px, 0, 0) rotate(2deg)' },
        },
        'lock-flash': {
          '0%': { opacity: '0', transform: 'scale(0.6)' },
          '40%': { opacity: '1', transform: 'scale(1.35)' },
          '100%': { opacity: '0', transform: 'scale(1.9)' },
        },
        'soft-float': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -6px, 0)' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 2.4s ease-in-out infinite',
        'hint-shake': 'hint-shake 0.6s ease-in-out infinite',
        'lock-flash': 'lock-flash 0.7s ease-out forwards',
        'soft-float': 'soft-float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}