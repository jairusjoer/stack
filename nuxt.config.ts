// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '~directus': '../directus',
  },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/globals.scss'],
  devtools: { enabled: true },
  experimental: {
    inlineRouteRules: true,
  },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    admin: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    },

    public: {
      url: process.env.PUBLIC_URL,
    },
  },
  tailwindcss: {
    viewer: false,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
});
