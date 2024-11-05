import type { Config } from 'tailwindcss';

// Plugins
import typography from '@tailwindcss/typography';

const mix = (name: string) => {
  return `rgb(from var(${name}) r g b / <alpha-value>)`;
};

export default <Partial<Config>>{
  theme: {
    borderWidth: {
      DEFAULT: 'var(--border-width)',
    },
    colors: {
      background: {
        DEFAULT: mix('--background'),
        subtle: mix('--background-subtle'),
      },

      foreground: {
        DEFAULT: mix('--foreground'),
        subtle: mix('--foreground-subtle'),
      },

      neutral: {
        DEFAULT: mix('--neutral'),
        subtle: mix('--neutral-subtle'),
      },

      brand: {
        bold: mix('--brand-bold'),
        DEFAULT: mix('--brand'),
        subtle: mix('--brand-subtle'),
      },

      informative: {
        bold: mix('--informative-bold'),
        DEFAULT: mix('--informative'),
        subtle: mix('--informative-subtle'),
      },

      successful: {
        bold: mix('--successful-bold'),
        DEFAULT: mix('--successful'),
        subtle: mix('--successful-subtle'),
      },

      cautionary: {
        bold: mix('--cautionary-bold'),
        DEFAULT: mix('--cautionary'),
        subtle: mix('--cautionary-subtle'),
      },

      destructive: {
        bold: mix('--destructive-bold'),
        DEFAULT: mix('--destructive'),
        subtle: mix('--destructive-subtle'),
      },

      border: mix('--border'),

      input: mix('--input'),

      ring: mix('--ring'),
    },
    fontSize: {
      '3xs': ['.625rem', '1rem'],
      '2xs': ['.75rem', '1rem'],
      xs: ['.8125rem', '1rem'],
      sm: ['.875rem', '1.5rem'],
      md: '1rem',
      h6: ['1.25rem', 1.25],
      h5: ['1.625rem', 1.25],
      h4: ['2.125rem', 1.25],
      h3: ['2.75rem', 1.25],
      h2: ['3.5rem', 1.25],
      h1: ['4.375rem', 1.25],
    },
    extend: {
      typography: () => ({
        brand: {
          css: {
            '--tw-prose-body': mix('--foreground-subtle'),
            '--tw-prose-headings': mix('--foreground'),
            '--tw-prose-lead': mix('--foreground-subtle'),
            '--tw-prose-links': mix('--brand'),
            '--tw-prose-bold': mix('--foreground'),
            '--tw-prose-counters': mix('--brand'),
            '--tw-prose-bullets': mix('--brand'),
            '--tw-prose-hr': mix('--border'),
            '--tw-prose-quotes': mix('--foreground'),
            '--tw-prose-quote-borders': mix('--brand'),
            '--tw-prose-captions': mix('--foreground-subtle'),
            '--tw-prose-code': mix('--foreground'),
            '--tw-prose-pre-code': mix('--foreground'),
            '--tw-prose-pre-bg': mix('--background-subtle'),
            '--tw-prose-th-borders': mix('--border'),
            '--tw-prose-td-borders': mix('--border'),
            '--tw-prose-kbd': mix('--foreground'),
          },
        },
      }),
    },
  },
  plugins: [typography],
};
