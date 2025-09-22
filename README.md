# Stack 2027

Monorepo containing an Astro frontend application and internal packages (UI kit, utilities, configuration, and Supabase helpers). Built with Turborepo + pnpm workspaces. The previous Directus/Postgres backend layer was removed on this branch in favor of a lighter Supabase approach.

> _Node >= 22 and pnpm >= 10 are required_

## Directory Structure

```
.
├── apps
│   └── frontend        # Astro site (React, Tailwind via @tailwindcss/vite, Supabase client)
├── packages
│   ├── configs         # Centralized ESLint (flat config) & future shared config exports
│   ├── shared          # Cross-runtime utilities (Only, Try, cn, etc.)
│   ├── supabase        # Supabase SDK wrappers (api & schemas placeholder)
│   └── ui              # Reusable UI primitives (Radix, Tailwind, CVA)
├── turbo.json          # Turborepo task pipeline configuration
├── pnpm-workspace.yaml # Workspace + dependency catalog (ensures single versions)
└── prettier.config.js  # Formatting rules (Astro + Tailwind plugins)
```

## Packages Overview

| Package            | Description                                      | Notable Exports                         |
| ------------------ | ------------------------------------------------ | --------------------------------------- |
| `@stack/shared`    | Lightweight utilities shared across apps         | `utils/only`, `utils/try`, `utils/ui`   |
| `@stack/ui`        | Design system / component primitives             | `components/ui/*`, Tailwind base styles |
| `@stack/supabase`  | Supabase client wrappers & (future) schema types | `api/*`, `schemas/*`                    |
| `@stack/configs`   | ESLint flat config & future shared config points | `eslint.config.js`                      |

## Utility Snippets

```ts
// Try helper (returns { data: T | undefined; error: E | undefined })
import { Try } from '@stack/shared/utils';
const { data, error } = await Try(() => fetchSomething());
if (error) {
	// handle error
}

// Only helper (conditionally run code client/server)
import { Only } from '@stack/shared/utils';
Only('client', () => console.log('Runs only in browser'));

// cn (merge class names + Tailwind dedupe)
import { cn } from '@stack/shared/utils';
const classes = cn('p-2', conditional && 'opacity-50');
```

## Tech Stack

- Turborepo (task orchestration & caching)
- pnpm (workspaces + catalog pinned versions)
- Astro + React + Tailwind CSS
- Radix UI + class-variance-authority for composable components
- Supabase (auth + database + storage) via `@supabase/supabase-js`
- TypeScript 5.8
- ESLint (flat config) + Prettier (Astro + Tailwind plugins)

## Scripts (Root)

| Script             | Purpose                                                      |
| ------------------ | ------------------------------------------------------------ |
| `pnpm dev`         | Run all dev tasks (non-cached) across filtered packages/apps |
| `pnpm build`       | Build all (respects dependency graph)                        |
| `pnpm lint`        | Lint all (with `--fix`)                                      |
| `pnpm format`      | Prettier format supported files                              |
| `pnpm check-types` | Typecheck all packages/apps                                  |

You can target a single workspace with Turborepo filters, e.g.:

```sh
pnpm build --filter @stack/frontend
pnpm lint --filter @stack/ui
pnpm dev --filter @stack/frontend
```

## Running the Frontend (Astro + Supabase)

```sh
pnpm dev --filter @stack/frontend
```

Environment variables consumed by Astro are declared via `envField` in `astro.config.ts`:

```ts
env: {
	schema: {
		SUPABASE_URL: envField.string({ context: 'client', access: 'public' }),
		SUPABASE_KEY: envField.string({ context: 'client', access: 'public' }),
	}
}
```

Add a `.env` (or `.env.local`) in `apps/frontend`:

```env
SUPABASE_URL=your-project-url
SUPABASE_KEY=anon-or-service-role-key
```

Supabase client example (already provided in `src/data/supabase.ts`):

```ts
import { supabase } from '@/data/supabase';
const { data, error } = await supabase.from('table').select('*');
```

## Adding a New Package

1. Create a folder under `packages/your-package`.
2. Add a `package.json` with `name`, `version`, `type`, and scripts (`lint`, `check-types`).
3. Reference internal dependencies using `workspace:*`.
4. Export public entrypoints through the `exports` field.
5. (Optional) Add build / type tasks if the package produces artifacts.

Update imports elsewhere using the new package name (e.g. `@stack/your-package`). Prefer filtering builds while iterating: `pnpm dev --filter @stack/your-package`.

## Coding Standards

- Flat ESLint config shared via `@stack/configs`.
- Prettier enforced via `pnpm format` (Tailwind plugin sorts class names logically).
- Type safety: run `pnpm check-types` or rely on IDE incremental checks.

## Turborepo Tasks

`turbo.json` defines pipelines:

- `build` depends on upstream builds (`^build`), caches `.dist/**` (excluding Astro internals)
- `dev` is marked `persistent` and not cached (ideal for watch servers)
- `lint` / `check-types` run independently

Use filters to narrow scope:

```sh
pnpm turbo run build --filter=@stack/ui
```
