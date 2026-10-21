# Lumenfold design-repo

A machine-validated PageSpec system for the **Lumenfold** design-system clone, so an LLM can compose new on-brand pages without inventing colours, copy budgets, structure or assets.

- **Source project:** a React 18.3 + Vite 5 + Tailwind v3 + framer-motion 11 + react-router-dom 6 clone of **relevanceai.com**, which is a real company, rebranded as the fictional "Lumenfold". All copy is original, photos are licensed stock, and every logo, avatar and app icon is generated. See *Compliance* below.
- **Status:** `design-review-pending`, `productionApproved: false`. This is a snapshot of the source project, not a living mirror. Because the source is a real company's design language, do not publish this repo or make it public.
- **Self-contained:** nothing in this folder needs the source project. When the folder still sits next to `src/`, `extraction/verify_all.py` also re-checks every citation against the real files. When it ships alone, those re-checks downgrade to warnings.

## Requirements and running

Python 3.9+ and the **`jsonschema`** package (Draft7Validator) are required. If you can't install it globally, install it into a scratch target and point `PYTHONPATH` there:

```bash
python3 -m pip install --target /tmp/pylib jsonschema
export PYTHONPATH=/tmp/pylib

python3 extraction/verify_all.py                                   # 10 repo-level checks
python3 schema/tests/adversarial_test.py                           # controls + mutations
python3 schema/semantic_validate.py schema/example.pagespec.json   # validate any PageSpec
```

All three scripts derive their root from `__file__`, so you can run them from any directory.

## Layout

| path | what it is |
|---|---|
| `registry.manifest.json` | id, versions, status, counts (recomputed by verify_all), entry points (all inside this folder) |
| `tokens/00-foundation/` | color, typography, radius, spacing, breakpoint, elevation, blur, motion (DTCG-style `$value`/`$type` + `citation`) |
| `tokens/10-semantic/`, `20-component/`, `30-layout/` | semantic roles, component-scoped tokens (button, glass, grain, nav, tabs, card) and layout (gutter rails, padding, rhythm) |
| `tokens/themes/light.json` | the only theme: every semantic token resolved to a hex value |
| `tokens/llm/` | `component-allowlist.json` (closed instantiable set, versioned), `token-catalog.json`, `token-policy.json` |
| `assets/asset-roles.json` | closed `assetRole` enum, pinned `generationPolicy` per role, compliance statement, real-brand denylist |
| `primitives/`, `components/` | atomic and composed contracts, each with `implementedBy` and citations |
| `sections/` | one contract per section type: archetype content model, `maxWords`, variants, constraints, motion, asset roles, responsive, evidence |
| `templates/templates.json` | one entry per page shape. `nodes[]` are structured `{section, required, repeatable, variants}` |
| `templates/routes.json` | every routed page bound to one template, plus redirects and scope exclusions |
| `compatibility/graph.json` | rhythm, position, motion and compliance rules with severity, plus observed adjacency |
| `schema/` | `pagespec.schema.json` (Draft-07), `example.pagespec.json`, `semantic_validate.py`, `tests/adversarial_test.py` |
| `extraction/` | `measured-values.json` (citation ledger, word budgets, corrections, evidence gaps) and `verify_all.py` |

## Counts (recomputed from disk; `verify_all.py` fails if this table drifts)

| item | count |
|---|---|
| tokens | 183 |
| primitives | 14 |
| components | 14 |
| sections | 169 |
| templates | 53 |
| routes | 296 |
| assetRoles | 13 |
| rules | 22 |
| citations | 135 |
| redirects | 4 |
| exclusions | 7 |

Section categories are SHELL, HERO, PROOF, FEATURES, CONTENT, CATALOG and CONVERSION. The 53 templates break down by source group as follows: content 12, product-legacy 12, company 10, product 9, catalog 7, plus home, academy and not-found. Two detail templates carry most of the routes: integration detail has 120 and use-case detail has 56.

## How a generator uses it

1. Pick a `template` and one of its real `route`s from `templates/routes.json`. The rule `ROUTE_BOUND_TO_TEMPLATE` enforces this.
2. Emit `nodes[]` in the template's exact order. Every `required` node must be present, a `repeatable` node can appear up to `maxRepeat` times, and nothing else may appear (`TEMPLATE_SEQUENCE_MATCH`). The validator cross-references the declared template; it never checks `nodes[]` in isolation.
3. For each node, pick a `variant` from the template node's `variants`, and fill `content` with the section's archetype (`#/definitions/content_<archetype>`). Every text field must stay within the section's `maxWords`.
4. Set `motion` to one of the section's patterns. Its `trigger` and `reducedMotionFallback` are pinned per pattern.
5. Every media reference is an `assets[]` item. It uses a role from the section's `assetRoles`, carries that role's pinned `generationPolicy`, and follows the role's `ref` or `name` rule.
6. Styling is not set per instance. PageSpecs have no token-override field (see `token-policy.json#overrides`).

Run `semantic_validate.py` on the result, and keep it only when it reports 0 errors.

## Structurally unusual: kept explicit, not normalised away

- **Deliberate scope exclusions.** These must not be recreated as templates, and `NO_EXCLUDED_ROUTES` rejects them:
  - `/academy`, which redirects to an external academy.* domain.
  - `/templates` and `/agent-templates-*`, which live on an external marketplace.* domain.
  - `/resources/:slug`, which was never specced.
  - Legacy and test pages: `-old`, `-copy`, `backup-home`, `untitled-2`, `abm-test`, `scratch-pad`, `unsubscribe` and `app`.
- **Redirect-only routes.** These are not pages, and `NO_REDIRECT_ONLY_ROUTES` rejects them:
  - `/app-tools/:slug` → `/integrations`
  - `/prompt-engineering` → `/learn`
  - `/changelog/:entry` → `/changelog#entry`
  - `/relevance-academy` → the first lesson
- **Legacy-Webflow originals were rebuilt on the current Lumenfold tokens.** This covers about-us, contact-support, partners, the learn/topics/prompt-engineering pages, the FAQ, workflows, llm-models, industry, and the product "B" pages. There are 23 such templates, each flagged `legacyWebflowOriginal`. Their legacy values are evidence of layout only. Do not reintroduce the legacy chrome or the "Inter Display" type.
- **Forms are visual-only.** No submission endpoint exists anywhere in the clone. The form archetype has no action field, and `FORMS_VISUAL_ONLY` rejects URLs in form copy.
- **Videos are a poster plus a placeholder modal.** No real video ships. The `video.poster` role is pinned to `poster-placeholder-only`.
- **`/specialist-agents` renders without the footer** (`src/App.jsx` NO_FOOTER). The template has `footer: false` and no `shell.footer` node, and `FOOTER_ABSENT_NO_FOOTER_TEMPLATES` enforces this. **This corrects `ia.json`,** which still lists the footer and carries a stale note saying the clone mounts one on every route.
- **The original `/topics/<x>` pages had no nav or footer.** The clone renders both, and the repo keeps them as built.
- **Parallel copies become one contract with variants.** `ia.json` found 13 sections implemented more than once. Each one is a single section contract. Where the copies genuinely differ, it carries variants keyed on `(section, variant)`. Where they are identical, it has one `default` variant, and the copies are listed in `variants.default.implementedBy`.

| section | variants (source group that uses each) |
|---|---|
| `conversion.grain-cta` (×4 copies) | `violet` (content, company) · `function-palette` (product, catalog) |
| `content.faq-accordion` (×4) | `single-open` (content, product, catalog) · `multi-open` (FAQ page only) · `centered-narrow` (company) |
| `proof.logo-wall` | `standard` · `story-links` (company) |
| `hero.legacy-uc` | `workflow` (catalog) · `use-case` (product-legacy) |
| `features.stack-collapse` (×3) | `enterprise` · `use-case-cta-tile` · `invent` |
| `features.autonomy-timeline` | `standalone` · `framework-embedded` |
| `features.evals-panel` | `catalog-panel` · `invent-floor` |
| `features.deploy-paths` | `catalog-tiles` · `workforce-tiles` |
| `conversion.legacy-footer-cta` | `workflow` · `legacy-b7` |
| `conversion.tasks-cta` (×3), `proof.legacy-logo-row` (×3), `features.legacy-values`, `features.legacy-vertical-tabs` | `default`, because the copies are identical |

## Compliance: asset roles (the source is a real company)

Never reproduce Relevance AI's (or any real company's) logos, product screenshots, mascot, people's photos or copy. Customer, press, analyst, certification and integration marks must be generated fictional wordmarks and glyphs. Photos must be licensed stock with no visible brand marks.

Each role's `generationPolicy` is checked twice. The first check is enum membership. The second is a **pinned value**: `verify_all.py` holds an independent `PINNED` table, and the schema has an `if/then const` per role. The adversarial suite proves the pin by mutating roles to a *different but still valid* policy and confirming that both the PageSpec layer and the registry layer reject it.

| assetRole | pinned generationPolicy |
|---|---|
| brand.logo, brand.mascot | reuse-exact (Lumenfold's own mark and lantern mascot, never the original's badge mascot) |
| proof.customer-wordmark, proof.press-mark, catalog.app-icon, badge.certification-seal | generate-fictional-mark |
| people.illustrated-avatar | generate-illustrated-person |
| photo.customer-story, photo.editorial-cover, photo.company-place, photo.product-scene | licensed-stock-no-marks (ref restricted to the shipped file families) |
| video.poster | poster-placeholder-only |
| illustration.diagram | generate-original-illustration |

`NO_REAL_BRAND_REFERENCES` applies two checks:
- "Relevance AI" may not appear in any PageSpec text.
- Generated mark names may not match the denylist of brands seen in the saved original page's asset filenames.

Real third-party product names appear only as nominative text where the clone itself uses them, as on the `/slack` template, and never as a logo.

## Measured corrections that supersede CLONE_SPEC

These come from a Playwright animation audit of the live original. The project's `src/` already implements them, and they are cited in `extraction/measured-values.json#measuredCorrections`:

- **Mega-menu:** there is no fade. It opens after a 200ms hover delay and closes after 150ms.
- **CostHero:** the entrance runs on mount, not on scroll. The live feed adds a row every 3400ms.
- **Autonomy:** the tabs never change the level state; they only re-fade the diagrams. Purple marks L3 and L4.
- **UseCases:** one IntersectionObserver at 0.15 reveals the cards, with 0.5s EASE and a (i%4)×0.06s stagger.
- **Primary button:** on hover, the inner gradient stop tweens over about 300ms (`@property --btn-c`).

## Evidence levels and gaps

- **Homepage:** measured. This covers Playwright geometry, type and motion (CLONE_SPEC), plus the section heights stored on each home section contract.
- **Every other template:** derived from SSR HTML/CSS/JS recon (`specs/PAGES_*.md`). Those pages were never rendered, so their heights are **derived, not measured**. Each template states its own `evidenceLevel`.
- **Copy budgets:** each `maxWords` is the observed maximum for that content key across `src/content*.js`. They are not invented; the method is recorded in `measured-values.json#wordBudgets`.
- **Responsive behaviour:** structured fields exist for the 14 homepage sections plus `grain-cta` and `faq-accordion`. The other sections are marked `not-measured-per-section` and inherit the Row padding and rails.
- **Motion outside the homepage:** patterns are classified from the implementing component and the recon spec, but their timings were not re-measured. `reducedMotionFallback` is a requirement for generated pages; the clone itself honours reduced motion only in `index.css` and in some islands that use `useReducedMotion`.

## Version fields

- `allowlistVersion` is **machine-checked**: `verify_all` fails if it differs from the allowlist's `version`.
- `pageSpecVersion` is enforced as a schema `const`.
- `repositoryVersion` is **documentation-only**, and nothing checks it.

## Packaging

The sibling `design-repo.zip` is built with the CLI `zip` tool, last, after every check passes. The build excludes `.DS_Store`, `__MACOSX` and `__pycache__`. The project is not a git repository. If it ever becomes one, add `design-repo.zip` to `.gitignore` so the zip is never committed alongside this folder.
