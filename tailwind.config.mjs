/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './sanity/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: {
          50: '#f4f6f9',
          100: '#e5e9f0',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          800: '#121824',
          900: '#0b0f17',
          950: '#06080e',
        },
        gold: {
          300: '#fde68a',
          400: '#f7d070',
          500: '#d4af37',
          600: '#c59635',
          700: '#9a7432',
        },
        onyx: {
          800: '#0e131f',
          900: '#080a10',
          950: '#040508',
        },
        industrial: {
          copper: '#d4af37',
          'copper-hover': '#c59635',
          'copper-light': '#fef3c7',
          steel: '#38bdf8',
          'steel-dark': '#0284c7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'industrial': '0 4px 20px -2px rgba(8, 10, 16, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)',
        'industrial-lg': '0 12px 36px -4px rgba(0, 0, 0, 0.6), 0 4px 12px -2px rgba(212, 175, 55, 0.15)',
        'industrial-glow': '0 0 25px -5px rgba(212, 175, 55, 0.35)',
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
};
