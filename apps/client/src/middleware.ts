import { defineMiddleware } from "astro:middleware";
import { setLocale } from "@i18n/i18n";
import i18nConfig from "@i18n/i18n.config";

export const onRequest = defineMiddleware(async (context, next) => {
  const locale = context.params.locale;

  if (locale && (i18nConfig.locales as string[]).includes(locale)) {
    await setLocale(locale);
  } else {
    await setLocale(i18nConfig.defaultLocale);
  }

  return next();
});
