import { Config } from 'prettier';

const config: Config = {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  printWidth: 120,
  singleAttributePerLine: true,
  singleQuote: true,
};

export default config;
