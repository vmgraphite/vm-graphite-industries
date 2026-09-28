import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
const projectId = String(env.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || '').trim().replace(/['"]/g, '');
const dataset = String(env.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || '').trim().toLowerCase().replace(/['"]/g, '');

export default defineConfig({
  site: 'https://vmgraphiteindustries.com',
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: '2026-03-01',
      studioBasePath: '/admin',
    }),
    react(),
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['refractor'],
    },
  },
});
