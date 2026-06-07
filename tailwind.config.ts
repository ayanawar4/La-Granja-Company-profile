import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1e2a4a',
        'navy-deep': '#141c35',
        green: { DEFAULT: '#4a7c3f', light: '#6aaa5b', accent: '#7cbf6e' },
        cream: '#f8f5f0',
        sand: '#e8e0d0',
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'Outfit', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        cairo: ['Cairo', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
