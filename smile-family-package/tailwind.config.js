/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#087ea4',
        secondary: '#23b5c8',
        dark: '#07364a',
        light: '#f5fbfd',
        muted: '#657783',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(8, 54, 74, 0.15)',
        card: '0 4px 24px -8px rgba(8, 126, 164, 0.18)',
        glow: '0 0 60px -10px rgba(35, 181, 200, 0.35)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #087ea4 0%, #23b5c8 100%)',
        'gradient-soft': 'linear-gradient(160deg, #f5fbfd 0%, #e5f4f8 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
