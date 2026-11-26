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
        h4t: {
          dark: '#080A10',
          darker: '#040609',
          card: '#0F1420',
          border: '#1F293D',
          cyan: '#00F0FF',
          blue: '#0284C7',
          purple: '#9333EA',
          violet: '#7C3AED',
          pink: '#F43F5E',
          neon: '#06B6D4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif']
      },
      boxShadow: {
        'neon-cyan': '0 0 20px -2px rgba(0, 240, 255, 0.4)',
        'neon-purple': '0 0 20px -2px rgba(147, 51, 234, 0.4)',
        'neon-pink': '0 0 20px -2px rgba(244, 63, 94, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(0, 240, 255, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 240, 255, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
