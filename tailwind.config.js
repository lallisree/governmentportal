/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#FDE047',
          400: '#F3E5AB',
          500: '#D4AF37',
          600: '#AA7C11',
          700: '#8B6508',
        },
        dark: {
          950: '#050505',
          900: '#0B0B0F',
          850: '#111116',
          800: '#18181F',
          750: '#22222C',
          700: '#2D2D3A',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(212, 175, 55, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
