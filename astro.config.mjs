import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'twycammz';
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';

// https://astro.build/config
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
  // SSR mode: pages render fresh from Sanity on every request.
  // New products published in the CMS appear on the live site immediately.
  output: 'server',
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
    define: {
      'process.env': {},
    },
    optimizeDeps: {
      exclude: ['refractor'],
    },
  },
});
