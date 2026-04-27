import { setLocale } from "@i18n/i18n";
import { type App } from "vue";

export default async (app: App) => {
  if (!import.meta.env.SSR) {
    await setLocale(document.documentElement.lang);
  }

  return app;
};
