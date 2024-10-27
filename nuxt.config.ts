// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "~directus": "../directus",
  },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/globals.css',],
  devtools: { enabled: true },
  experimental: {
    inlineRouteRules: true,
  },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      PUBLIC_URL: process.env.PUBLIC_URL
    },
  }
})