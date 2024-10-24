// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  alias: {
    "~directus": "../directus",
  },
  runtimeConfig: {
    public: {
      DIRECTUS_URL: process.env.NUXT_PUBLIC_DIRECTUS_URL
    }
  }
})