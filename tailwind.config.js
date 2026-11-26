/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pastel: {
          canvas: '#FAF7FD',
          card: '#FFFFFF',
          purple: '#7E22CE',
          'purple-dark': '#4A154B',
          'purple-deep': '#2E1065',
          'purple-light': '#F3E8FF',
          'purple-subtle': '#FAF5FF',
          pink: '#EC4899',
          'pink-dark': '#BE185D',
          'pink-light': '#FDF2F8',
          'pink-subtle': '#FFF5F8',
          border: '#E9D5FF',
          'border-pink': '#FBCFE8',
          'text-dark': '#1E1B4B',
          'text-muted': '#64748B',
        },
        h4t: {
          purple: '#6B21A8',
          magenta: '#C026D3',
          pink: '#EC4899',
          dark: '#1E1B4B',
          yellow: '#EAB308',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'pastel-purple': '0 10px 30px -5px rgba(126, 34, 206, 0.12)',
        'pastel-pink': '0 10px 30px -5px rgba(236, 72, 153, 0.15)',
        'pastel-card': '0 4px 25px 0 rgba(147, 51, 234, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        'pastel-hover': '0 14px 40px -5px rgba(126, 34, 206, 0.18)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
