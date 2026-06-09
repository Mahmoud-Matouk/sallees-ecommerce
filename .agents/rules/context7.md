---
trigger: always_on
description: Guide the agent to query the context7 MCP server for external library/framework documentation.
---

## context7

This project has the context7 MCP server configured.

Rules:
- For questions about external libraries, frameworks, APIs, or deprecation warnings (e.g. Next.js, React Query, Zustand, Radix, Tailwind, Shadcn), use the context7 MCP server tools to search for the official documentation and code examples first.
- Avoid using hallucinated or generic web-search patterns if context7 has the structured, library-specific documentation available.
