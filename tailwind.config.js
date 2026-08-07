/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#F9F4F2',
          100: '#F3E8E4',
          200: '#E8D4CE',
          300: '#D4A5A0',
          400: '#C4877F',
          500: '#A86B66',
        },
        lavender: {
          50: '#F7F5F4',
          100: '#EFEBE9',
          200: '#E2DBD7',
          300: '#C9BDB6',
        },
        sage: {
          50: '#F4F6F3',
          100: '#E8EDE6',
          200: '#D4DDD0',
          300: '#A8B8A4',
        },
        warmrose: {
          100: '#F5EBE7',
          200: '#EAD9D2',
          300: '#C9A09A',
          400: '#B07F78',
        },
        cream: {
          50: '#FFFBF7',
          100: '#FAF6F0',
          200: '#F5EFE6',
          300: '#EDE4D8',
          400: '#E4D8C8',
        },
        champagne: {
          50: '#FDFCF7',
          100: '#FDF8F0',
          200: '#F7EBD9',
          300: '#F5E6D3',
          400: '#EED6B5',
          500: '#E8CA9B',
        },
        ink: {
          900: '#1E293B',
          800: '#334155',
          700: '#475569',
          600: '#64748B',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(90, 70, 60, 0.12)',
        'soft-lg': '0 12px 40px -12px rgba(90, 70, 60, 0.16)',
        petal: '0 2px 12px -2px rgba(51, 65, 85, 0.08)',
        glass: '0 8px 32px 0 rgba(90, 70, 60, 0.08)',
        glow: '0 0 25px 2px rgba(168, 107, 102, 0.12)',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        floatY: 'floatY 6s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};
