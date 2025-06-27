/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  printWidth: 120,
  singleAttributePerLine: true,
  singleQuote: true,
};

export default config;