# Graph Report - sallees-ecommerce  (2026-06-09)

## Corpus Check
- 82 files · ~18,149 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 434 nodes · 884 edges · 21 communities (15 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d80c4f3d`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 126 edges
2. `compilerOptions` - 16 edges
3. `Button()` - 12 edges
4. `apiClient` - 11 edges
5. `ENDPOINTS` - 11 edges
6. `useSidebar()` - 9 edges
7. `SidebarMenuButton()` - 9 edges
8. `ProductSummary` - 9 edges
9. `SidebarMenu()` - 7 edges
10. `SidebarMenuItem()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `BreadcrumbEllipsis()` --calls--> `cn()`  [EXTRACTED]
  components/ui/breadcrumb.tsx → lib/utils.ts
- `DrawerOverlay()` --calls--> `cn()`  [EXTRACTED]
  components/ui/drawer.tsx → lib/utils.ts
- `DropdownMenuRadioItem()` --calls--> `cn()`  [EXTRACTED]
  components/ui/dropdown-menu.tsx → lib/utils.ts
- `DropdownMenuShortcut()` --calls--> `cn()`  [EXTRACTED]
  components/ui/dropdown-menu.tsx → lib/utils.ts
- `DropdownMenuSubTrigger()` --calls--> `cn()`  [EXTRACTED]
  components/ui/dropdown-menu.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (21 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (47): SiteHeader(), cn(), Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage() (+39 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (40): apiClient, authHeaders(), HttpMethod, RequestOptions, ENDPOINTS, orderKeys, addressService, brandService (+32 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (36): ProductCard(), ProductCardProps, ProductDetails(), ProductDetailsProps, ProductGrid(), ProductGridProps, ProductImageGallery(), ProductReviews() (+28 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (34): AppSidebar(), ChartAreaInteractive(), chartData, DataTable(), TableCellViewer(), SectionCards(), useIsMobile(), Card() (+26 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (42): dependencies, axios, class-variance-authority, clsx, @dnd-kit/core, @dnd-kit/modifiers, @dnd-kit/sortable, @dnd-kit/utilities (+34 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (27): chartData, columns, schema, Badge(), badgeVariants, Drawer(), DrawerClose(), DrawerContent() (+19 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (25): data, NavDocuments(), NavMain(), NavSecondary(), NavUser(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent() (+17 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (16): ProductImageGalleryProps, Button(), buttonVariants, Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps (+8 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (9): authService, AuthResponse, ChangePasswordBody, ForgotPasswordBody, ResetPasswordBody, SigninBody, SignupBody, UpdateUserBody (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (4): geistMono, metadata, ThemeProvider(), TooltipProvider()

### Community 12 - "Community 12"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **136 isolated node(s):** `geistMono`, `metadata`, `metadata`, `$schema`, `style` (+131 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 2`, `Community 3`, `Community 5`, `Community 6`, `Community 8`?**
  _High betweenness centrality (0.200) - this node is a cross-community bridge._
- **Why does `apiClient` connect `Community 1` to `Community 10`, `Community 2`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `ENDPOINTS` connect `Community 1` to `Community 10`, `Community 2`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `geistMono`, `metadata`, `metadata` to the rest of the system?**
  _136 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06861239119303636 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06398730830248546 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0641025641025641 - nodes in this community are weakly interconnected._