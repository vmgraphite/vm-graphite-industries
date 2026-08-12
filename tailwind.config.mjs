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
        industrial: {
          copper: '#d97706',
          'copper-hover': '#b45309',
          'copper-light': '#fef3c7',
          steel: '#0284c7',
          'steel-dark': '#0369a1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'industrial': '0 4px 20px -2px rgba(15, 23, 42, 0.12), 0 2px 6px -1px rgba(15, 23, 42, 0.08)',
        'industrial-lg': '0 12px 36px -4px rgba(15, 23, 42, 0.16), 0 4px 12px -2px rgba(15, 23, 42, 0.1)',
        'industrial-glow': '0 0 25px -5px rgba(217, 119, 6, 0.25)',
      },
    },
  },
  plugins: [],
};
