---
trigger: always_on
description: Rules for codebase directory structure and architecture conventions
globs: *
---

# Project Structure and Architecture Guidelines

This guide defines the directory structure, dependency flow, and feature organization principles to ensure scalability and maintainability.

## Core Principles

1. **Strict Dependency Flow** - Dependencies must flow downward only: `app/` → `features/` → `core/` → `components/` / `hooks/` / `lib/`.
2. **Feature Isolation** - A feature must never import from another feature. If code needs to be shared, elevate it to `core/` or `components/`.
3. **Centralized API Communication** - All API calls must use `apiClient` (`core/api/client.ts`) and fetch endpoints defined in `core/constants/endpoints.ts`.
4. **Logic-less Pages** - Pages (`app/` route files) are composition wrappers. They should coordinate data fetching and layout, delegating complex logic to features.

## Architecture Layers

### app/

_Next.js routing layer (layouts, templates, async Server Components)._

- **Location**: `app/[route]/`
- **Use for**: Routing, route segment configuration, and high-level page layouts.
- **Rule**: Keep components thin. Fetch data and pass it to feature components.

### features/

_Self-contained business domains containing domain logic, components, state, and services._

- **Location**: `features/[feature-name]/`
- **Internal Structure**:
  - `components/` - Feature-specific UI components (e.g., `ProductCard.tsx` in `products`)
  - `hooks/` - Domain hooks, query wrappers, and state binding (e.g., `useCart.ts`)
  - `services/` - Services implementing domain API logic (e.g., `order.service.ts`)
  - `types/` - TypeScript typings and schemas (e.g., `auth.types.ts`)
- **Rule**: Features are self-contained. `features/cart` cannot import from `features/products`.

### core/

_Cross-cutting application infrastructure, configuration, and base modules._

- **Location**: `core/`
- **Structure**:
  - `api/` - Base Axios/fetch wrapper and anti-corruption layer (`client.ts`)
  - `constants/` - App-wide config, API endpoint paths (`endpoints.ts`)
  - `types/` - Shared system-level interfaces (`common.types.ts`)
- **Rule**: Core must not import from features or routing layers.

### components/

_Presentational UI components containing zero business logic._

- **Location**: `components/`
- **Structure**:
  - `ui/` - Shadcn UI primitive blocks (e.g., `button.tsx`, `card.tsx`)
  - Root: Global shell components (e.g., `app-sidebar.tsx`, `site-header.tsx`, `data-table.tsx`)
- **Rule**: Do not import features, hooks, or service layers here.

### hooks/ & lib/

_Global hooks and pure helpers/utilities._

- **Location**: `hooks/` (e.g., `use-mobile.ts`) and `lib/` (e.g., `utils.ts` for Tailwind class merges)
- **Rule**: Must be completely context-free, generic, and stateless helpers.

## Best Practices

- **Adding a new feature?** Scaffold `features/[new-feature]/` directory with its subfolders (`components`, `services`, `types`).
- **Need a new endpoint?** Define the route in `core/constants/endpoints.ts` and fetch via the service layer.
- **Unsure where to put a component?**
  - Does it refer to `product`, `cart`, `user` objects or context? Put it in `features/[feature]/components/`.
  - Is it a generic button, input, or container? Put it in `components/ui/` or `components/`.
- **Running validations?** Use `Zod` schemas placed inside the respective domain's `types/` folder.
