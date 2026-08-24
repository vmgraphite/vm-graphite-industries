import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

const sanityStudioSpaFallback = () => ({
  name: 'sanity-studio-spa-fallback',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.startsWith('/admin/') && !req.url.includes('.')) {
        req.url = '/admin';
      }
      next();
    });
  },
});

// https://astro.build/config
export default defineConfig({
  site: 'https://vmgraphiteindustries.com',
  integrations: [
    react(),
  ],
  output: 'static',
  vite: {
    plugins: [tailwindcss(), sanityStudioSpaFallback()],
    optimizeDeps: {
      include: [
        'sanity',
        'sanity/structure',
        'styled-components',
        'refractor',
        '@sanity/icons',
        'rxjs',
        'rxjs/operators',
      ],
    },
  },
});
