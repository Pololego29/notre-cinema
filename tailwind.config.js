/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080808',
        surface: '#111111',
        surface2: '#1c1c1c',
        surface3: '#252525',
        wine: '#8B0000',
        crimson: '#C41E3A',
        gold: '#D4AF37',
        'gold-light': '#F0D060',
        'gold-dim': '#7A6010',
      },
      fontFamily: {
        cinematic: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulse_gold: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 4s ease-in-out infinite',
        pulse_gold: 'pulse_gold 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
