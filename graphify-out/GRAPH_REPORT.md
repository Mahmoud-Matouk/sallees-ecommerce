# Graph Report - sallees-ecommerce (2026-06-10)

## Corpus Check

- 89 files · ~44,095 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary

- 501 nodes · 984 edges · 22 communities (15 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `ed17e5b0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 21|Community 21]]

## God Nodes (most connected - your core abstractions)

1. `cn()` - 137 edges
2. `compilerOptions` - 16 edges
3. `Button()` - 13 edges
4. `apiClient` - 11 edges
5. `ENDPOINTS` - 11 edges
6. `useSidebar()` - 9 edges
7. `SidebarMenuButton()` - 9 edges
8. `ProductSummary` - 9 edges
9. `SidebarMenu()` - 7 edges
10. `SidebarMenuItem()` - 7 edges

## Surprising Connections (you probably didn't know these)

- `AvatarBadge()` --calls--> `cn()` [EXTRACTED]
  components/ui/avatar.tsx → lib/utils.ts
- `AvatarGroup()` --calls--> `cn()` [EXTRACTED]
  components/ui/avatar.tsx → lib/utils.ts
- `AvatarGroupCount()` --calls--> `cn()` [EXTRACTED]
  components/ui/avatar.tsx → lib/utils.ts
- `BreadcrumbEllipsis()` --calls--> `cn()` [EXTRACTED]
  components/ui/breadcrumb.tsx → lib/utils.ts
- `DropdownMenuRadioItem()` --calls--> `cn()` [EXTRACTED]
  components/ui/dropdown-menu.tsx → lib/utils.ts

## Import Cycles

- None detected.

## Communities (22 total, 7 thin omitted)

### Community 0 - "Community 0"

Cohesion: 0.06
Nodes (54): data, TableCellViewer(), NavDocuments(), NavMain(), NavSecondary(), NavUser(), useIsMobile(), Avatar() (+46 more)

### Community 1 - "Community 1"

Cohesion: 0.06
Nodes (50): apiClient, authHeaders(), HttpMethod, RequestOptions, ENDPOINTS, addressService, authService, brandService (+42 more)

### Community 2 - "Community 2"

Cohesion: 0.09
Nodes (27): ProductCard(), ProductCardProps, ProductDetails(), ProductDetailsProps, ProductGrid(), ProductGridProps, ProductImageGallery(), ProductReviews() (+19 more)

### Community 3 - "Community 3"

Cohesion: 0.10
Nodes (15): AppSidebar(), ChartAreaInteractive(), DataTable(), SectionCards(), SiteHeader(), orderKeys, orderService, CreateOrderBody (+7 more)

### Community 4 - "Community 4"

Cohesion: 0.04
Nodes (44): dependencies, axios, class-variance-authority, clsx, @dnd-kit/core, @dnd-kit/modifiers, @dnd-kit/sortable, @dnd-kit/utilities (+36 more)

### Community 5 - "Community 5"

Cohesion: 0.06
Nodes (66): chartData, chartData, columns, schema, cn(), Badge(), badgeVariants, Card() (+58 more)

### Community 6 - "Community 6"

Cohesion: 0.20
Nodes (9): app/, Architecture Layers, Best Practices, components/, core/, Core Principles, features/, hooks/ & lib/ (+1 more)

### Community 7 - "Community 7"

Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 8 - "Community 8"

Cohesion: 0.17
Nodes (16): ProductImageGalleryProps, Button(), buttonVariants, Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps (+8 more)

### Community 9 - "Community 9"

Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 11 - "Community 11"

Cohesion: 0.08
Nodes (28): geistMono, metadata, MenuItem, Navbar(), NavbarProps, ThemeProvider(), appConfig, Accordion() (+20 more)

### Community 12 - "Community 12"

Cohesion: 0.07
Nodes (26): AI-Augmented Development, Antigravity (Primary AI Coding Agent), API Integration, Architecture & Design Decisions, Available Scripts, Context7 MCP (Documentation Intelligence), Core Framework, Feature-Sliced Design (FSD) (+18 more)

### Community 21 - "Community 21"

Cohesion: 0.29
Nodes (6): Best Practices, Commit Message Format, Core Principles, Examples, Git Commit Guidelines, Types

## Knowledge Gaps

- **170 isolated node(s):** `geistMono`, `metadata`, `metadata`, `$schema`, `style` (+165 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 5` to `Community 0`, `Community 2`, `Community 3`, `Community 8`, `Community 11`?**
  _High betweenness centrality (0.188) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 8` to `Community 0`, `Community 2`, `Community 3`, `Community 5`, `Community 11`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `apiClient` connect `Community 1` to `Community 2`, `Community 3`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `geistMono`, `metadata`, `metadata` to the rest of the system?**
  _170 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05834464043419267 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05548654244306418 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08943089430894309 - nodes in this community are weakly interconnected._
