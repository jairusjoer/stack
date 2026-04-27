import { defineConfig } from "astro/config";
import i18nConfig from "./src/i18n/i18n.config";
import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: i18nConfig.defaultLocale,
    locales: i18nConfig.locales,
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    vue({
      appEntrypoint: "./src/app.ts",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
