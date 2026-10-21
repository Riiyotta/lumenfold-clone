# Lumenfold information architecture

**`ia.json` is the only file to edit by hand.** `IA.md` and `matrix.csv` are generated from it by `build.mjs`. Never edit those two directly, because the next build overwrites them.

This project is a React 18 + Vite + Tailwind design-system clone of relevanceai.com, rebranded as the fictional "Lumenfold". The IA maps every route the router serves (`src/App.jsx` plus each `src/pages/*/routes.jsx`) to a template and an ordered list of sections. Each section is defined once in `ia.json` and linked, where confirmed, to the component that renders it (`implementedBy`).

| file | what it is |
|---|---|
| `ia.json` | Source of truth: categories, sections (each defined once), templates (ordered section ids, route counts) |
| `IA.md` | Generated readable doc: site shape, build-status partition, sections by reuse, per-template tables, section reference |
| `matrix.csv` | Generated section × template matrix, for a spreadsheet |
| `validate.mjs` | Checks the route and template totals, that every referenced section exists, and that categories are valid. Also reports reuse |
| `build.mjs` | Regenerates `IA.md` and `matrix.csv` |

## Re-running

```bash
node validate.mjs && node build.mjs
```

Run this from the project root after any edit to `ia.json`. When a builder adds a route, edit `ia.json` and re-run. Parameterised routes are counted by the real number of slugs in `src/content/*.js`, so adding a story, post, integration or use case changes a `routeCount` too.

## How to read the `chrome` field

The `chrome` field records **build status**, not page chrome. Every route in the clone renders the same `Navbar` and `Footer`, because `App.jsx` mounts them around the router, so a chrome axis would say nothing. This holds even where the original had a different header, or no footer (for example `/topics/:slug` and `/specialist-agents`). The values are:

- `built`: the route is registered in a `routes.jsx` and its sections were read from the JSX, top to bottom.
- `spec-only`: the route exists only in a recon spec, so its section order comes from the spec and its spec-only sections have no `implementedBy`. The generated `IA.md` marks those sections "_not yet built_".

## Scope exclusions

These are not templates:
- `/academy` redirects to an external academy.* domain.
- `/templates` and `/agent-templates-*` redirect to an external marketplace.* domain (PAGES_CATALOG M1–M4).
- `/resources/:slug` was seen in passing during recon but was never specced.
- Legacy and test pages: `-old`, `-copy`, `backup-home`, `untitled-2`, `abm-test`, `scratch-pad`, `unsubscribe`, `app`.

These are redirects, so they are not counted as routes:
- `/app-tools/:slug` → `/integrations`
- `/prompt-engineering` → `/learn`
- `/changelog/:entry` → `/changelog#entry`

The catch-all `*` NotFound route is counted as one route. It is a real rendered template.

## Build status

Every template is built: company, content, catalog, product, product-legacy and academy each have a `routes.jsx`, and every section has an `implementedBy`. The Academy lesson template (PAGES_CONTENT T11) has 8 lessons from `src/content/academy.js`; `/relevance-academy` redirects to the first one.

## Findings (from the validate/build output for this project)

- **Two detail templates carry most of the site.** 296 routes across 53 templates. Integration detail (120) and use-case detail (56) are 176 routes (59%) between them, and adding the blog article makes it 188 (64%). Overall, 13 parameterised templates produce 250 routes (84%). The other 41 templates each serve 1–4 routes, and that is where the per-page build effort goes.
- **Most sections are page-local.** 40 of the 169 sections appear in more than one template; 38 of those 40 are outside the navbar/footer shell. The other 129 sections are single-use and should stay page-local until a second caller appears.
- **The most widely shared sections have parallel copies.** The grain closing CTA reaches 145 routes, but it is implemented four times: `content/ClosingCTA`, `company/shared > GrainCTA`, `product/lib > ClosingCTA` and `catalog/sections > ClosingCTA/CtaTile`. The FAQ accordion is likewise built four times. In total, 13 sections list a parallel copy in their `implementedBy`, including the logo wall, StackCollapse, TasksCTA, the evals panel, deploy paths and the legacy footer CTA. These copies are the best candidates for consolidating into one shared component.
- `validate.mjs` reports every hard invariant as reconciled, and no number in any scope sentence disagrees with its computed route count.
