/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
        },
        lavender: {
          50: '#F8F5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
        },
        sage: {
          50: '#F1F8F4',
          100: '#ECFDF5',
          200: '#D1FAE5',
          300: '#A7F3D0',
        },
        warmrose: {
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
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
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(244, 114, 182, 0.18)',
        'soft-lg': '0 12px 40px -12px rgba(244, 114, 182, 0.25)',
        petal: '0 2px 12px -2px rgba(51, 65, 85, 0.08)',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        floatY: 'floatY 6s ease-in-out infinite',
        shimmer: 'shimmer 8s ease infinite',
      },
    },
  },
  plugins: [],
};
