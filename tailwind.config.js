/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        'primary-dark': '#6D28D9',
        'primary-light': '#8B5CF6',
        accent: '#F59E0B',
        'bg-dark': '#0F0D1A',
        'bg-card': '#1A1730',
        'bg-card-hover': '#211E3A',
        'bg-sidebar': '#130F21',
        'text-muted': '#8B83A3',
        'text-light': '#C4BAE0',
        'border-subtle': '#2A2545',
        success: '#10B981',
        danger: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        heading: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl2': '16px',
        'xl3': '20px',
        'xl4': '24px',
      },
      boxShadow: {
        'glow': '0 0 24px rgba(124, 58, 237, 0.3)',
        'glow-sm': '0 0 12px rgba(124, 58, 237, 0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
