import i18next, { type TOptions } from "i18next";
import i18nConfig from "./i18n.config";

export type Messages = typeof import("./locales/en").messages;

const { datetimes, numbers } = i18nConfig;

export const d = (date: number | Date, format: keyof typeof datetimes) => {
  return new Intl.DateTimeFormat(i18next.language, datetimes[format]).format(
    date,
  );
};

export const n = (number: number, format: keyof typeof numbers) => {
  return new Intl.NumberFormat(i18next.language, numbers[format]).format(
    number,
  );
};

export const t = (key: keyof Messages, options?: TOptions): string => {
  return i18next.t(key, options);
};
