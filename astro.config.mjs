import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://vmgraphiteindustries.com',
  integrations: [
    react(),
  ],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['sanity', 'styled-components'],
    },
  },
});
