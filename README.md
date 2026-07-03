<p align="center">
  <img src="https://nextjs.org/favicon.ico" width="48" alt="Next.js" />
</p>

<h1 align="center">Sallees E-Commerce</h1>

<p align="center">
  A production-grade e-commerce storefront built with <strong>Next.js 16</strong>, <strong>React 19</strong>, and a <strong>feature-sliced architecture</strong> — designed for scalability, maintainability, and real-world team workflows. Fully internationalized with <strong>Arabic (RTL) and English (LTR)</strong> support.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/i18n-AR_%7C_EN-green" alt="Internationalization" />
  <img src="https://img.shields.io/badge/AI_Augmented-Antigravity_+_Context7-blueviolet" alt="AI Augmented" />
</p>

---

## Table of Contents

- [Why This Project Exists](#why-this-project-exists)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [Internationalization (i18n)](#internationalization-i18n)
- [Scalability by Design](#scalability-by-design)
- [AI-Augmented Development](#ai-augmented-development)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)

---

## Why This Project Exists

This is not a tutorial follow-along. It is a deliberate engineering exercise that demonstrates:

1. **Production architecture patterns** — Feature-sliced design that scales from solo dev to multi-team ownership.
2. **AI-augmented workflows** — Every phase of development (scaffolding, documentation lookup, code review, knowledge graph generation) leverages AI tooling in a structured, repeatable way.
3. **Modern React & Next.js mastery** — React 19 Server Components, Next.js 16 App Router with `async` pages, dynamic metadata generation, ISR caching, and streaming.
4. **Type-safe full-stack integration** — End-to-end TypeScript from API client to UI components, with Zod runtime validation at data boundaries.
5. **Full internationalization** — Locale-aware routing, RTL layout switching, locale-scoped number/currency/date formatting, and translated UI strings for Arabic and English.

---

## Architecture & Design Decisions

### Feature-Sliced Design (FSD)

The codebase follows a **feature-sliced architecture** — a methodology borrowed from large-scale frontend teams at Yandex and adopted across the industry for projects that need to grow without collapsing under their own weight.

```
Why FSD over a flat "components + pages" approach?
```

| Decision        | Flat Structure                                         | Feature-Sliced (This Project)                                  |
| --------------- | ------------------------------------------------------ | -------------------------------------------------------------- |
| **Ownership**   | Any file can depend on any other file                  | Each feature owns its types, services, hooks, and components   |
| **Onboarding**  | New devs must understand the entire codebase           | New devs only need to understand one feature slice             |
| **Refactoring** | Moving a component risks breaking 12 unrelated imports | Features are self-contained — rename or delete with confidence |
| **Code Review** | PRs touch files across the entire tree                 | PRs are scoped to a single `features/` directory               |
| **Testing**     | Mocking requires understanding global state            | Each feature's service layer is independently testable         |

### Layered Dependency Rule

```
app/ → features/ → core/ → lib/
 ↓         ↓          ↓
pages    domain     shared
         logic     utilities
```

- **`app/`** — Route handlers and page layouts. Thin wrappers that compose feature components.
- **`features/`** — Self-contained business domains. Each feature owns its own `types/`, `services/`, `hooks/`, and `components/`.
- **`core/`** — Cross-cutting infrastructure: API client, shared types, endpoint constants, and i18n context.
- **`components/`** — Reusable UI primitives (Shadcn/ui) with no business logic.
- **`lib/`** — Pure utility functions (`cn()`, `formatCurrency()`, `formatNumber()`, etc.).

> Dependencies flow **downward only**. A feature never imports from another feature. Core never imports from features.

### Server-First Data Fetching

Pages use **async Server Components** with Next.js native `fetch` extensions:

```tsx
// app/[lang]/(products)/page.tsx — No useEffect, no loading spinners on first paint
export default async function ProductsPage() {
  const { data: products } = await productService.getAll();
  return <ProductGrid products={products} />;
}
```

This approach gives us:

- **Zero client-side waterfalls** — Data arrives with the HTML.
- **Built-in ISR** — `{ next: { revalidate: 60 } }` gives us stale-while-revalidate caching for free.
- **SEO without effort** — Full HTML is available to crawlers on first response.

---

## Internationalization (i18n)

The application supports **Arabic (RTL)** and **English (LTR)** through a fully integrated localization system — no third-party i18n library required.

### How It Works

| Layer | File | Responsibility |
| ----- | ---- | -------------- |
| **Routing** | `app/[lang]/layout.tsx` | Reads the `[lang]` segment, sets `<html lang dir>` attributes |
| **Context** | `core/i18n/I18nProvider.tsx` | Exposes `locale`, `dir`, and `lang` (translation map) to all client components |
| **Translations** | `core/i18n/languages/en.json` / `ar.json` | Flat key-value translation strings |
| **Locale types** | `core/i18n/languages.ts` | `Locale` union type (`'en' | 'ar'`) |
| **Direction type** | `core/types/common.types.ts` | `Direction = 'ltr' | 'rtl'` |
| **Helpers** | `lib/helper.ts` | `formatCurrency()`, `formatNumber()`, `formatDate()`, `getLocalizedPath()`, `getAppDirection()` |
| **Switcher** | `components/language-switcher.tsx` | UI control to switch between locales |
| **Proxy** | `proxy.ts` | Redirects root `/` to the locale stored in the `NEXT_LOCALE` cookie |

### RTL Support

- The `<html dir>` attribute switches between `ltr` and `rtl` automatically based on locale.
- The Navbar reads `dir` from `I18nProvider` and **reverses menu item order** in Arabic so items read naturally right-to-left.
- Embla Carousel (`ProductImageGallery`) receives `direction: dir` in its options so slide transforms are computed in the correct axis for RTL.
- All number, currency, and date formatting uses locale-appropriate `Intl` APIs (e.g., `ar-EG` for Arabic).

### Adding a New Language

1. Add a translation file at `core/i18n/languages/<code>.json`.
2. Extend the `Locale` union in `core/i18n/languages.ts`.
3. Add the locale to the `[lang]` segment's `generateStaticParams` in `app/[lang]/layout.tsx`.

---

## Scalability by Design

This architecture was chosen because real e-commerce projects grow in predictable ways. Here is how each growth vector is handled:

| Growth Vector                                            | How This Architecture Handles It                                                                                                 |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **More features** (wishlist, reviews, orders, addresses) | Add a new `features/` directory. Zero changes to existing code.                                                                  |
| **More developers**                                      | Each developer "owns" a feature slice. No merge conflicts on shared files.                                                       |
| **More API versions**                                    | `ENDPOINTS` constant supports v1/v2 side-by-side (`cart` vs `cartV2`).                                                           |
| **More UI complexity**                                   | Shadcn/ui primitives compose without modification. CVA handles variant explosion.                                                |
| **Performance at scale**                                 | Server Components eliminate client JS for read-heavy pages. TanStack Query handles client-side cache invalidation for mutations. |
| **Backend migration**                                    | All API calls funnel through `core/api/client.ts`. Swap the base URL, and every feature follows.                                 |
| **More languages**                                       | Add a JSON translation file and extend the `Locale` type. The routing and context system picks it up automatically.              |

The centralized API client (`apiClient`) acts as an **anti-corruption layer** — if the backend changes its error format or auth scheme, you fix it in one place, not across 10 feature directories.

---

## AI-Augmented Development

This project is built with a deliberate AI-augmented workflow. Every tool below is configured, versioned, and integrated into the development process:

### Antigravity (Primary AI Coding Agent)

The entire codebase was developed in collaboration with **Antigravity** — an agentic AI coding assistant. It handles:

- Architecture scaffolding and feature generation
- Code review and refactoring suggestions
- Automated file creation following the feature-sliced convention
- Real-time documentation lookups via Context7

### Context7 MCP (Documentation Intelligence)

[Context7](https://context7.com) is integrated as an **MCP server** that provides the AI agent with **live, version-accurate documentation** for every library in the stack.

**Why it matters:** LLM training data goes stale. Next.js 16 and React 19 have breaking changes that don't exist in most models' training data. Context7 fetches the _actual current docs_ — not hallucinated patterns from 2023.

**Configured via:** `mcp_config.json` with authenticated API key for higher rate limits.

### Neon MCP (Database Intelligence)

[Neon](https://neon.tech) is configured as an MCP server for serverless Postgres integration, enabling AI-assisted database schema design, query optimization, and migration planning.

### Agent Rules & Custom Skills (Codebase Guardrails)

The project leverages custom agent instructions and automated skills inside the [`.agents/rules/`](file:///c:/sallees-ecommerce/.agents/rules/) directory:

- **`commit.md`**: Enforces unified commit style rules.
- **`context7.md`**: Directs agents to fetch version-accurate library documentation.
- **`structure.md`**: Ensures adherence to the Feature-Sliced Design (FSD) boundaries.
- **`update_readme.md`**: Orchestrates keeping codebase changes documented in the README.

### Tool Configuration Summary

| Tool            | Purpose                                               | Integration Point  |
| --------------- | ----------------------------------------------------- | ------------------ |
| **Antigravity** | AI coding agent (architecture, code gen, review)      | IDE-native         |
| **Context7**    | Live documentation for Next.js, React, Tailwind, etc. | MCP Server (HTTPS) |
| **Neon**        | Serverless Postgres, schema design, query tuning      | MCP Server (HTTPS) |
| **Agent Rules** | Strict architecture guardrails and automation skills  | Local `.agents/`   |

---

## Tech Stack

### Core Framework

| Technology                               | Version | Role                                                   |
| ---------------------------------------- | ------- | ------------------------------------------------------ |
| [Next.js](https://nextjs.org)            | 16.2.6  | App Router, Server Components, ISR, Image optimization |
| [React](https://react.dev)               | 19.2.6  | Server Components, streaming, use() hook               |
| [TypeScript](https://typescriptlang.org) | 6.0     | End-to-end type safety, strict mode                    |

### UI & Styling

| Technology                                    | Role                                                 |
| --------------------------------------------- | ---------------------------------------------------- |
| [Tailwind CSS 4](https://tailwindcss.com)     | Utility-first styling with CSS-first configuration   |
| [Shadcn/ui](https://ui.shadcn.com)            | Accessible, composable UI primitives (23 components) |
| [Radix UI](https://radix-ui.com)              | Unstyled accessible component primitives             |
| [Lucide React](https://lucide.dev)            | Consistent icon system                               |
| [Class Variance Authority](https://cva.style) | Type-safe component variants                         |
| [Recharts](https://recharts.org)              | Dashboard analytics charts                           |
| [Embla Carousel](https://embla-carousel.com)  | Product image galleries with RTL direction support   |

### State & Data

| Technology                                   | Role                                                    |
| -------------------------------------------- | ------------------------------------------------------- |
| [TanStack Query](https://tanstack.com/query) | Server state management, caching, optimistic updates    |
| [TanStack Table](https://tanstack.com/table) | Headless data table with sorting, filtering, pagination |
| [Zustand](https://zustand.docs.pmnd.rs)      | Client-side state (cart, UI preferences)                |
| [Zod](https://zod.dev)                       | Runtime schema validation at data boundaries            |
| [Axios](https://axios-http.com)              | HTTP client (available for client-side mutations)       |

### Internationalization

| Technology / Module                   | Role                                                        |
| ------------------------------------- | ----------------------------------------------------------- |
| `core/i18n/I18nProvider.tsx`          | React context exposing locale, direction, and translations  |
| `core/i18n/languages/`               | JSON translation files for `en` and `ar`                   |
| `lib/helper.ts`                       | Locale-aware `formatCurrency`, `formatNumber`, `formatDate` |
| `components/language-switcher.tsx`    | UI control for switching between Arabic and English         |
| `proxy.ts`                            | Cookie-based locale detection and root redirect             |

### UX Enhancements

| Technology                                                | Role                                    |
| --------------------------------------------------------- | --------------------------------------- |
| [dnd-kit](https://dndkit.com)                             | Drag-and-drop table row reordering      |
| [Sonner](https://sonner.emilkowal.ski)                    | Toast notifications                     |
| [Vaul](https://vaul.emilkowal.ski)                        | Mobile-friendly drawer component        |

---

## Project Structure

```
sallees-ecommerce/
├── app/                          # Next.js App Router (pages & layouts)
│   └── [lang]/                   # Locale segment — all routes are locale-scoped
│       ├── layout.tsx            # Locale layout: sets <html lang dir>, wraps I18nProvider
│       ├── (products)/           # Product catalog route group
│       │   ├── page.tsx          # Product listing (SSR + ISR)
│       │   ├── loading.tsx       # Streaming skeleton for product list
│       │   └── [id]/             # Dynamic product detail
│       │       ├── page.tsx      # generateMetadata + SSR detail page
│       │       └── loading.tsx   # Streaming skeleton for product detail
│       └── dashboard/            # Admin dashboard
│           ├── page.tsx          # Server Component — fetches products & orders
│           └── data.json         # Dashboard mock data
│
├── features/                     # Feature-sliced business domains
│   ├── products/                 # Product domain
│   │   ├── components/           #   ProductCard, ProductGrid, ProductDetails,
│   │   │                         #   ProductImageGallery, ProductReviews
│   │   ├── hooks/                #   useProducts (TanStack Query wrappers)
│   │   ├── services/             #   product.service.ts (API calls)
│   │   └── types/                #   Product, ProductSummary, Brand, Category
│   ├── auth/                     # Authentication domain
│   │   ├── services/             #   authService (signup, signin, reset)
│   │   └── types/                #   AuthResponse, SignupBody, etc.
│   ├── cart/                     # Shopping cart domain
│   │   ├── components/           #   CartPanel (translated UI)
│   │   ├── hooks/                #   useCartStore (Zustand)
│   │   ├── services/             #   Cart API operations
│   │   └── types/                #   Cart types
│   ├── orders/                   # Order management domain
│   │   ├── hooks/                #   Order query hooks
│   │   ├── services/             #   orderService (cash, checkout sessions)
│   │   └── types/                #   Order types
│   ├── wishlist/                 # Wishlist domain
│   ├── reviews/                  # Product reviews domain
│   ├── categories/               # Category browsing domain
│   ├── subcategories/            # Subcategory domain
│   ├── brands/                   # Brand browsing domain
│   └── addresses/                # User addresses domain
│
├── core/                         # Cross-cutting infrastructure
│   ├── api/
│   │   └── client.ts             # Centralized fetch wrapper (auth, caching, errors)
│   ├── constants/
│   │   └── endpoints.ts          # All API endpoint definitions (v1 + v2)
│   ├── i18n/                     # Internationalization system
│   │   ├── I18nProvider.tsx      # React context: locale, dir, lang translations
│   │   ├── languages.ts          # Locale union type + translation loader
│   │   └── languages/
│   │       ├── en.json           # English translation strings
│   │       └── ar.json           # Arabic translation strings
│   └── types/
│       └── common.types.ts       # PaginatedResponse, SingleResponse, Direction, etc.
│
├── components/                   # Shared UI components
│   ├── ui/                       # Shadcn/ui primitives (23 components)
│   ├── navbar.tsx                # RTL-aware top navigation with locale support
│   ├── language-switcher.tsx     # Locale toggle (AR / EN)
│   ├── app-sidebar.tsx           # Dashboard sidebar navigation
│   ├── chart-area-interactive.tsx # Analytics area chart
│   ├── data-table.tsx            # Full-featured data table (drag, sort, filter)
│   └── section-cards.tsx         # Dashboard KPI cards
│
├── hooks/                        # Global custom hooks
│   └── use-mobile.ts             # Responsive breakpoint detection
│
├── lib/                          # Pure utilities
│   ├── utils.ts                  # cn() — Tailwind class merging
│   └── helper.ts                 # formatCurrency, formatNumber, formatDate,
│                                 # getLocalizedPath, getAppDirection
│
├── proxy.ts                      # Cookie-based locale detection & root redirect
│
├── .agents/                      # Agent instructions, workflows, and development rules
│   └── rules/                    # Guardrails and skills for AI agents
│       ├── commit.md             # Commit message guidelines
│       ├── context7.md           # External library lookup guidelines
│       ├── structure.md          # Architecture and layered dependency rules
│       └── update_readme.md      # Skill for syncing README with codebase changes
│
├── next.config.ts                # Next.js configuration (remote images)
├── tsconfig.json                 # TypeScript strict config with path aliases
├── postcss.config.mjs            # PostCSS configuration for Tailwind CSS
├── package.json                  # Dependencies & scripts
└── pnpm-workspace.yaml           # pnpm workspace config
```

---

## Getting Started

### Prerequisites

| Requirement                   | Minimum Version |
| ----------------------------- | --------------- |
| [Node.js](https://nodejs.org) | 18.0.0+         |
| [pnpm](https://pnpm.io)       | 9.0+            |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Mahmoud-Matouk/sallees-ecommerce.git
cd sallees-ecommerce

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You will be redirected to `/en` or `/ar` based on your locale cookie.

### Quick Navigation

| Page           | URL (English)      | URL (Arabic)       | Description                                          |
| -------------- | ------------------ | ------------------ | ---------------------------------------------------- |
| Products       | `/en`              | `/ar`              | Full product catalog (SSR)                           |
| Product Detail | `/en/[id]`         | `/ar/[id]`         | Individual product page with reviews & image gallery |
| Dashboard      | `/en/dashboard`    | `/ar/dashboard`    | Admin dashboard with charts, tables, and KPIs        |

---

## Available Scripts

| Command      | Description                              |
| ------------ | ---------------------------------------- |
| `pnpm dev`   | Start development server with hot reload |
| `pnpm build` | Create optimized production build        |
| `pnpm start` | Serve the production build               |
| `pnpm lint`  | Run ESLint across the codebase           |

---

## API Integration

The application consumes the **Route E-Commerce REST API** (`https://ecommerce.routemisr.com`).

All API communication flows through a single, type-safe client:

```
Request → apiClient (core/api/client.ts) → ENDPOINTS (core/constants/endpoints.ts) → Feature Service → Hook / Server Component
```

### Supported Domains

| Domain         | Endpoints                             | Auth Required |
| -------------- | ------------------------------------- | ------------- |
| Products       | List, Detail                          | No            |
| Categories     | List, Detail, Subcategories           | No            |
| Brands         | List, Detail                          | No            |
| Cart (v1 & v2) | Get, Add, Update, Remove, Clear       | Yes           |
| Wishlist       | Get, Add, Remove                      | Yes           |
| Orders         | List, Create (Cash & Checkout)        | Yes           |
| Auth           | Signup, Signin, Forgot/Reset Password | No            |
| Addresses      | List, Add, Update, Remove             | Yes           |
| Reviews        | List, Detail, By Product              | Partial       |
