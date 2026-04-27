import i18next from "i18next";
import i18nConfig from "./i18n.config";

export const setLocale = async (locale: string): Promise<void> => {
  if (!i18next.hasResourceBundle(locale, "translation")) {
    const { messages } = await import(`./locales/${locale}.ts`);

    i18next.addResourceBundle(locale, "translation", messages);
  }

  await i18next.changeLanguage(locale);
};

await i18next.init({
  fallbackLng: i18nConfig.defaultLocale,
  supportedLngs: i18nConfig.locales,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
