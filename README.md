# Stack

Monorepo for the Stack application, built with Turborepo, Tauri v2, and Vue 3.

## Features

- **Monorepo**: Managed with Turborepo and pnpm workspaces.
- **Tauri v2**: Desktop application shell using Rust.
- **Vue 3**: Frontend application using Vite and TypeScript.

## Directory Structure

```
.
├── apps
│   ├── app             # Tauri v2 desktop application (Rust)
│   └── web             # Frontend application (Vue 3 + Vite)
├── turbo.json          # Turborepo task pipeline configuration
├── pnpm-workspace.yaml # Workspace configuration
└── package.json        # Root dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- pnpm (v10+ recommended)
- Rust (for Tauri development)

### Installation

```bash
pnpm install
```

### Development

Start the development environment (Frontend + Tauri):

```bash
pnpm dev
```

### Building

Build the application:

```bash
pnpm build
```
