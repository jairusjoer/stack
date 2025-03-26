import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '~directus': '../directus',
  },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/tailwind.css'],
  devtools: { enabled: true },
  experimental: {
    inlineRouteRules: true,
  },
  runtimeConfig: {
    admin: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    },

    public: {
      url: process.env.PUBLIC_URL,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
