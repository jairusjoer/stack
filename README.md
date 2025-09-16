# Stack 2026

Monorepo containing the application stack: an Astro frontend, a Directus (Docker) backend, and shared internal packages (UI kit, utilities, schemas, and configuration). Built with Turborepo + pnpm workspaces.

> _Node >= 22 and pnpm >= 10 are required_

## Directory Structure

```
.
├── apps
│   ├── backend         # Directus + Postgres + Redis via docker-compose
│   └── frontend        # Astro site (React integrations, Tailwind via @tailwindcss/vite)
├── packages
│   ├── configs         # Centralized ESLint (flat config) & future shared config exports
│   ├── directus        # SDK layer: API helpers & schema exports around @directus/sdk
│   ├── shared          # Cross-runtime utilities (Only, Try, cn, etc.)
│   └── ui              # Reusable UI primitives (Radix, Tailwind, CVA)
├── turbo.json          # Turborepo task pipeline configuration
├── pnpm-workspace.yaml # Workspace + dependency catalog (ensures single versions)
└── prettier.config.js  # Formatting rules (Astro + Tailwind plugins)
```

## Packages Overview

| Package           | Description                                      | Notable Exports                         |
| ----------------- | ------------------------------------------------ | --------------------------------------- |
| `@stack/shared`   | Lightweight utilities shared across apps         | `utils/only`, `utils/try`, `utils/ui`   |
| `@stack/ui`       | Design system / component primitives             | `components/ui/*`, Tailwind base styles |
| `@stack/directus` | Directus schema + API client composition         | `api/*`, `schemas/*`                    |
| `@stack/configs`  | ESLint flat config & future shared config points | `eslint.config.js`                      |

## Utility Snippets

```ts
// Try helper (returns Data<T> | Error)
import { Try } from '@stack/shared/utils';
const { data, error } = await Try(() => fetchSomething());

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
- Directus (headless CMS / data layer) with Postgres + Redis
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
pnpm build --filter frontend
pnpm lint --filter directus
pnpm dev --filter backend
```

## Running the Frontend (Astro)

```sh
pnpm dev --filter frontend
```

Environment variables consumed by Astro are declared via `envField` in `astro.config.ts` (e.g. `PUBLIC_URL`). Add a `.env` or `.env.local` in `apps/frontend` as needed.

## Running the Backend (Directus Stack)

The backend uses `docker-compose` inside `apps/backend` to orchestrate:

- Postgres (postgis image)
- Redis
- Directus (official image)

Create an `.env` file in `apps/backend` (values are examples):

```env
DIRECTUS_PORT=8055
DIRECTUS_SECRET=replace_me

DB_USER=directus
DB_PASSWORD=directus
DB_DATABASE=directus

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_me

PUBLIC_URL=http://localhost:8055
WEBSOCKETS_ENABLED=true
CACHE_ENABLED=true
CACHE_AUTO_PURGE=true

# CORS
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000,http://localhost:4321
```

Then start services:

```sh
pnpm dev --filter backend
```

The Directus UI will be available at `http://localhost:8055` (assuming default port mapping).

### Hot Reloading Extensions / Uploads

`./uploads` and `./extensions` are volume-mounted; changes persist across container restarts.

## Adding a New Package

1. Create a folder under `packages/your-package`.
2. Add a `package.json` with `name`, `version`, `type`, and scripts (`lint`, `check-types`).
3. Reference internal dependencies using `workspace:*`.
4. Export public entrypoints through the `exports` field.
5. (Optional) Add build / type tasks if the package produces artifacts.

Update imports elsewhere using the new package name (e.g. `@stack/your-package`).

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
