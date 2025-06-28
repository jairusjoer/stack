import { defineConfig, globalIgnores } from 'eslint/config';
import css from '@eslint/css';
import globals from 'globals';
import js from '@eslint/js';
import markdown from '@eslint/markdown';
import pluginReact from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
// import json from '@eslint/json';

export default defineConfig([
  globalIgnores(['**/.astro/**', '**/dist/**', '**/src/styles/ui.css']),
  {
    extends: ['js/recommended'],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { js },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/gfm', extends: ['markdown/recommended'] },
  {
    extends: ['css/recommended'],
    files: ['**/*.css'],
    language: 'css/css',
    plugins: { css },
    rules: {
      'css/no-invalid-at-rules': 'off',
      'css/use-baseline': ['warn', { available: 'newly' }],
    },
  },
  // { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  // { files: ['**/*.jsonc'], plugins: { json }, language: 'json/jsonc', extends: ['json/recommended'] },
  // { files: ['**/*.json5'], plugins: { json }, language: 'json/json5', extends: ['json/recommended'] },
]);
