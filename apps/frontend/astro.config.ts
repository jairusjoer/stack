import { defineConfig, envField } from 'astro/config';

// Integrations
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Plugins
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],

  env: {
    schema: {
      PUBLIC_URL: envField.string({ context: 'client', access: 'public' }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
