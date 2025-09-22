import { defineConfig, envField } from 'astro/config';

// Integrations
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Plugins
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),

  env: {
    schema: {
      SUPABASE_URL: envField.string({ context: 'client', access: 'public' }),
      SUPABASE_KEY: envField.string({ context: 'client', access: 'public' }),
    },
  },

  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
