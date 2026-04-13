/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Courier New', 'monospace'],
      },
      colors: {
        dark: {
          bg: '#0f1419',
          surface: '#1a1f2e',
          elevated: '#232936',
          border: '#2d3748',
          text: {
            primary: '#e2e8f0',
            secondary: '#a0aec0',
            muted: '#718096',
          },
          accent: {
            blue: '#60a5fa',
            purple: '#a78bfa',
            green: '#34d399',
          }
        },
      },
    },
  },
  plugins: [],
};
