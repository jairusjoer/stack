import type { Messages } from "@i18n/format";

export const icon = "🇩🇪";

export const name = "Deutsch";

export const messages = {
  "Index.Title.HelloWorld": "Hallo Welt!",
} as const satisfies Record<keyof Messages, string>;
