export interface Config {
  defaultLocale: string;
  locales: string[];
  datetimes: Record<string, Intl.DateTimeFormatOptions>;
  numbers: Record<string, Intl.NumberFormatOptions>;
}

export default {
  defaultLocale: "en",
  locales: ["en", "de"],
  datetimes: {
    short: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "2-digit",
      weekday: "long",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
    },
    datetime: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
  },
  numbers: {
    currency: {
      style: "currency",
      currency: "EUR",
      notation: "standard",
      currencyDisplay: "symbol",
    },
    decimal: {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    },
    percent: {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
} as const satisfies Config;
