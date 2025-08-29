import { defineConfig, envField } from 'astro/config';

// Integrations
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Plugins
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],

  env: {
    schema: {
      PUBLIC_URL: envField.string({ context: 'client', access: 'public' }),
      SECRET_EMAIL: envField.string({ context: 'server', access: 'secret' }),
      SECRET_PASSWORD: envField.string({ context: 'server', access: 'secret' }),
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
    ],
  },
});
