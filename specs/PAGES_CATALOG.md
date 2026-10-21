Source: https://relevanceai.com/

# PAGES_CATALOG: catalog and detail templates (Lumenfold design-system clone)

Scope: this is a design-system clone for the fictional brand **Lumenfold**. Do not reuse their copy, item names, logos, vendor icons, avatars, photos or illustrations. Text slots are recorded as role + words/chars + lines. Media slots are recorded as size/ratio/fit/radius/overlay. Catalog taxonomies are recorded as structure only (number of groups and options).

**Read `../CLONE_SPEC.md` first.** It already defines the tokens, Inter/Sora fonts, the gutter-rail Row (`224 | ≤1300 | 290`, rails at ≥1440), StackedSection (`py-12 md:py-28`, content padding `px-6 md:px-12 lg:px-20`), SectionHeading, Buttons (primary radial / secondary / pill), PillTabs, GrainBand + noise, glass chips, the HowWeWork ExpandTiles, UseCases card grid, CostHero app card, LogoGrid, Testimonials, EnterpriseSecurity, IntegrationsShowcase, the Header and the Footer. This file documents only what is new.

How this was measured: on 2026-10-21 the pages were fetched with curl only (no browser, because the shared Playwright session was in use). Values come from the SSR HTML class strings, inline styles, the compiled CSS bundles (`/_astro/agents.CG0qEBST.css`, `marketplace…/_astro/_slug_.BIQpxPXB.css`, Webflow `/css/relevance-site.css`) and the Astro/React island JS. The limits of this method:
- Rendered heights and line counts were not measured. Column widths below are **derived** as (content width − gaps) / columns, using the content widths in CLONE_SPEC (766 at 1440, 1120 at 1280, 672 at 768, 327 at 375).
- Canvas or graph diagrams (react-flow) and hover-only states were read from source, not observed on screen.

---

## 0. Route → template map (the minimum set)

Three different stacks serve these URLs. Several sitemap sections no longer render their own page: they **redirect** to another site.

| Requested route (sample used) | What actually serves it | Template |
|---|---|---|
| `/integrations` | main Astro site | **T1 Catalog index (client-filtered grid)** |
| `/integrations/<x>` (hubspot, 0codekit) | main Astro site | **T2 Integration detail** |
| `/use-cases/<x>` (bug-report-triager) | main Astro site | **T3 Use-case (agent) detail** |
| `/agents` | main Astro site | **T4 Product landing** (mostly home components, plus 6 new sections) |
| `/templates`, `/templates/<x>`, `/agent-templates-meetings/<x>`, `/agent-templates-roles/<x>` | **308 redirect → `https://marketplace.relevanceai.com/`**. Every sampled child (3 per section) lands on the marketplace home, so no detail page exists. | **M1 Marketplace home** |
| `/agent-templates-tasks/<x>` (a-b-testing-ai-agents) | redirect → `marketplace.relevanceai.com/listing/<uuid>` | **M3 Marketplace listing detail** |
| `/agent-templates-software/<x>` (15five) | redirect → `marketplace.relevanceai.com/integrations/<other-slug>`. The slug is remapped, e.g. 15five → bamboohr and appsflyer → attribution. | **M4 Marketplace SEO integration landing** |
| (catalog reached from M1: `/search`, `/category/<id>`) | marketplace | **M2 Marketplace search/category catalog** (the real filter + pagination catalog) |
| `/workflows` | legacy Webflow | **W1 Legacy card list** |
| `/workflows/<x>` (audio_core) | legacy Webflow | **W2 Legacy product page** |
| `/llm-models/<x>` (deepseek-v3) and `/industry/<x>` (banking) | legacy Webflow, the **same template** | **W3 Legacy SEO article + TOC** |
| `/app-tools/<x>` (aida-framework + 3 more samples) | legacy Webflow | **W0 Empty shell**: the navbar and footer render with nothing between them (8 words of body text). Do not build. Redirect to M3 or T1, or 404. |

**Answer to "do the four agent-template families share one template?"** No. They split by redirect target. *meetings* and *roles* both go to M1. *tasks* goes to M3. *software* goes to M4. *meetings* and *roles* do share one destination (M1), and *templates* goes there too.

Build order for the Lumenfold clone: **T1, T2, T3, M2, M3**. These are true catalog/detail templates. T4 and M1 are landing pages. M4 and W1–W3 are legacy or SEO pages, so build them last or fold them into T2/T3.

---

## Part A: main site (Astro, `tw-` prefix, same tokens as CLONE_SPEC)

### A.0 New shared components

**Section types used here:**
- `Section`: hero-style, no top border, custom padding.
- `StackedSection` / `PageSection`: from CLONE_SPEC.
- `GridWrapper`: an outer wrapper that draws the absolute rail lines once for several stacked rows.

**ClosingCTA (GrainBand CTA panel)**: used on T1, T2, T3 and T4.
- Layout: StackedSection (center bg #fff) holding a GrainBand tile, `rounded-2xl` (16px), `overflow-hidden`.
  - Palette: violet by default. Pages with a function use that function's palette (see A.0 palettes).
  - Inner: `relative px-6 py-16 md:py-24` (64 / 96px). T3 uses `py-12 md:py-24`.
- Floating coins (lg+ only, `absolute inset-0 hidden lg:block pointer-events-none`):
  - 6 glass coins, each `h-11 w-11` (44px), `rounded-full border border-white/60 bg-white/70 backdrop-blur(8px)`, shadow `glass`. Each holds a 20px icon (or a 28px avatar).
  - Positions and rotations:
    | Side | Top | Inset from side | Rotation |
    |---|---|---|---|
    | left | 16% | 4% | −8° |
    | left | 48% | 10% | 6° |
    | left | 76% | 5% | −4° |
    | right | 14% | 4% | 7° |
    | right | 50% | 10% | −6° |
    | right | 74% | 5% | 5° |
  - Placeholders: Lumenfold glyphs.
- Centre content: `relative mx-auto max-w-xl (576) flex-col items-center`.
  - SectionHeading, centred: h2 Sora 30/40.5 → md 36/48.6, −0.025em. 5–9 words, 29–47 chars.
  - Description: Inter 16/25.6 in `rgba(13,22,47,.8)`, `max-w-lg` (512). 13–26 words, 89–144 chars.
  - Buttons: `mt-8 flex-wrap justify-center gap-4`. Primary pill (`!rounded-full`), 3 words. Secondary pill with `!bg-white`, hover `#f9f9fa`, 3 words. T3 shows the primary only.
- Motion: the heading block uses the SectionHeading reveal (`opacity 0, y16 → 1, 0`, EASE, whileInView amount .4). The coins are static.

**FAQ accordion** (`FAQSection` and `AgentsFAQ`, the same UI).
- Layout: PageSection. Heading block `max-w-2xl mb-12 md:mb-14`.
  - h2 is 3 words / 26 chars.
  - Description: Inter 16 → md 18, lh 1.6, #868a97. It is 5 words of text plus an inline link of 4 words / 25 chars in #6056ff with hover underline.
- List: `border border-border-default divide-y divide-border-default`, square corners.
  - Item counts: T1 has 5 items, T4 has 7.
- Row button: `w-full flex items-center gap-4 py-5 px-4 md:px-6 text-left` (20px vertical). Hover bg `rgba(249,250,251,.5)`, `transition-colors` 150ms.
  - Icon disc: 32px circle with a 1px border.
    - Closed: border #e6e7ea, hover gray-400, holding a 12px "+" in #868a97 (stroke 2, round caps).
    - Open: bg and border #6056ff, holding a white 12px "−".
    - Transition `all` 150ms.
  - Question: Inter 500, 16 → md 18, leading-relaxed (1.625), #0d162f. 6–12 words / 36–73 chars.
  - Answer: `pb-5 pl-[52px] md:pl-[56px] pr-6`, #868a97, leading-relaxed. The answer may contain `ul.list-disc pl-5 space-y-1.5` and paragraphs `mb-3`.
- Behaviour: single-open (clicking the open item closes it). All items start closed.
  - Motion: AnimatePresence `height 0 → auto, opacity 0 → 1`, exit reversed, `duration .2s`.
  - The page emits FAQPage JSON-LD.

**Function palettes** (GrainBand inputs, same 5-layer builder as CLONE_SPEC 1.2). These add accents for per-function pages (T3):
| id | deep | second | warm | base (3 stops) | accent a / d |
|---|---|---|---|---|---|
| sales (default violet) | 138,105,255 | 109,74,255 | 199,207,255 | #e6e6fb #e2e3fa #dfe2fa | #6056ff / #4b40d6 |
| cs | 207,161,251 | 244,114,182 | 125,170,255 | #f0ddff #f6e3fb #fbe8f5 | #db2777 / #be185d |
| marketing | 116,187,224 | 167,139,250 | 110,231,183 | #bbe2ff #cbeaff #d6f0f5 | #0284c7 / #0369a1 |
| hr | 122,196,187 | 143,231,199 | 255,190,80 | #bfe9d6 #cdeede #d9f2e6 | #0e9384 / #0a7468 |
| support | 251,146,60 | 253,186,116 | 244,114,182 | #ffe4cf #ffe9d6 #ffe1e6 | #ea580c / #c2410c |
| operations | 52,211,153 | 110,231,183 | 96,165,250 | #c6f0dd #d2f3e4 #d9ecff | #059669 / #047857 |
| research | 167,139,250 | 196,181,253 | 244,114,182 | #e5ddff #ece5ff #f4e3fb | #7c3aed / #6d28d9 |

The accent `a` colours mini-UI pieces inside cards: chat bubbles, bars, the active calendar cell, the active StackCollapse label and their shadows (`0 2px 8px {a}4d`).

**Text field / select (catalog controls)**: new, used on T1.
- Shared: `py-2.5` (10px) text-sm (14/20), height 42px, 1px #e6e7ea border, `rounded-button` (4.8px), bg #fff, text #0d162f.
- Focus: `outline none; ring 2px rgba(96,86,255,.2); border #6056ff`, `transition-all` 150ms.
- Search input: `w-full pl-10 pr-4`, placeholder colour #868a97. A 16px search icon (stroke 2, currentColor = #868a97) sits at `absolute left-3 top-1/2 -translate-y-1/2`.
- Select: `px-4 appearance-none cursor-pointer`. **No chevron is rendered** (appearance-none and no icon), so the original shows a flat box. Lumenfold may add a 16px chevron at `right-3`.

**Breadcrumb** (T2):
- `nav[aria-label=Breadcrumb] mb-8`, `ol flex flex-wrap items-center gap-2` (8px), Inter 14/20 #868a97.
- Links hover #0d162f. Separator is a "/" glyph (aria-hidden). The current item is #0d162f.
- 3 levels: Home / Section / Item. Item 1 is 1 word, item 2 is 1 word, the current item is 1–3 words.

**Numbered step list** (T2 "setup"):
- Container: `max-w-3xl` (768).
- Each step: `flex gap-5 py-6 border-t #e6e7ea`. The first step has `border-t-0 pt-0`.
  - Badge: 28px circle (`h-7 w-7`), bg slate-50 #f8fafc, 1px border, Inter 14 #868a97, centred numeral.
  - h3: Sora 16/24 500 #0d162f, `mb-2`. 4–5 words / 26–29 chars.
  - p: Inter 14, lh 1.6, #868a97. 19–28 words / 84–163 chars.
- 3 steps. After them comes `pt-2` and a primary button sized `text-base px-6 py-3` (16px text, 48px tall), 2 words.

**Definition rows** (T2 "tool steps"):
- Group label: `p` in Sora 14 500 #0d162f `mb-2`, followed by a count span "(n)" in #868a97 at 400.
- Row: `grid grid-cols-1 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-1 md:gap-6 py-4 border-t`. Term column is 224px max.
  - h3: Sora 16 500 #0d162f. 2–3 words / about 12 chars.
  - p: Inter 14 #868a97. 6–8 words / 30–41 chars.
- At most **12 rows per group**. If there are more, a final `p` 14 #868a97 `pt-4 border-t` reads "And N more…" (8–9 words).
- 2 groups (Actions, then Triggers), each `mb-10 last:mb-0`.
- The whole section is omitted when the item has 0 steps. HubSpot has 0 and 0CodeKit has 2.

### T1: Catalog index (`/integrations`)

Section order (all rows are gutter-rail Rows stacked with `mt-[-1px]`):
1. Header (CLONE_SPEC).
2. **Centered hero + icon aurora**.
3. **Catalog** (search, filter, count, grid, load-more, empty state).
4. Feature tiles (`IntegrationsPower`). This is the CLONE_SPEC HowWeWork ExpandTiles exactly:
   - 3 tiles, palettes sales / cs / marketing.
   - Heading: h2 4 words / 32 chars; p 13 words / 78 chars, `max-w-lg`. The block is `max-w-2xl mb-12 md:mb-14`.
   - Tile visuals: tile 1 is a 290×160 node diagram with 2 glass chips, 1 live avatar and 2 SVG connector paths (one dashed). Tiles 2 and 3 are 3-pill stacks (pill 2 at `ml-6`, pill 3 at `ml-3`; the 3rd pill can be "faded"). Pills hold a check disc, a 16px icon and a 3-word label.
5. Testimonials (CLONE_SPEC 3.10).
6. FAQ (A.0), 5 items.
7. ClosingCTA (A.0, violet, generic coins).
8. Footer.

**T1.2 Hero** (`Section`, `pt-10 md:pt-16 pb-16 md:pb-20 overflow-hidden`, standard padding):
- Text block: `flex-col items-center text-center`.
  - h1: Sora 400, 36 → md 48, lh 1.15 (41.4 / 55.2), letter-spacing −0.05em (−1.8 / −2.4px), `max-w-4xl` (896, so it fills the 766px column at 1440). 11 words / 71 chars. Expected 2 lines at 1440, 3–4 at 375.
  - p: `mt-5 max-w-2xl` (672), Inter 16 → md 18, lh 1.6, #868a97. 18 words / 95 chars.
  - CTA row: `mt-8 flex-wrap justify-center gap-4`. Primary and secondary buttons, each `text-base px-6 py-3` (16px text, 24/12 padding, 48px tall), 3 words each.
- Aurora panel: `mt-12 md:mt-16`. A full-width GrainBand (violet, **square corners**) with inner `py-12 md:py-16`.
  - Row: `flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-6` (20/28px × 24px).
  - 10 glass coins, each 44px with a 20px icon.
  - Each coin gets an inline transform `rotate(r) translateY(±8px)`. r = [−7, 5, 4, −5, 6, −4, −6, 7, −5, 4]°. Lift alternates −8 (even index), +8 (odd).
- Motion (on mount, framer):
  - Text: `opacity 0, y 16 → 1, 0`, EASE (.5s [.23,1,.32,1]).
  - Panel: `opacity 0, y 18 → 1, 0`, EASE, delay .1.
  - Panel content: the GrainBand whileInView reveal `y 32`, .7s.

**T1.3 Catalog** (inside GridWrapper → Row, center `border-t`, inner `relative py-12 md:py-28 px-6 md:px-12 lg:px-20`):
- **Control bar:** `flex flex-col sm:flex-row gap-3 mb-6`.
  - `[search input flex-1]`.
  - `[select]`: 1 "All" option + **15 category options** (single-level taxonomy, labels 2–5 words, 11–33 chars).
  - `[Reset text button]`: hidden until a query or category is set. `px-4 py-2.5` text-sm 500 #868a97, hover #0d162f, `transition-colors`.
  - Below sm the three stack full-width with a 12px gap.
- **Count line:** `p text-sm #868a97 mb-6`.
  - Pattern A: "Showing {48} of {N} integrations", used when results exceed the page size.
  - Pattern B: "{n} integration(s)" otherwise.
  - Numbers use the `en-US` locale with thousands separators.
- **Grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` (16px).
  | Breakpoint | Columns | Card width (derived) |
  |---|---|---|
  | 1440 | 3 | 244.7 |
  | 1280 | 3 | 362.7 |
  | 768 | 2 | 328 |
  | 375 | 1 | 327 |
- **Card** (the whole card is an `<a>`): `flex flex-col p-6` (24px), 1px #e6e7ea border, bg #fff, **square corners**. Hover bg `#f9f9f9` (`transition-colors 200ms`). There is no lift or shadow.
  - Logo tile: 48×48 (`w-12 h-12 mb-4`), `rounded-lg` (8px), bg #fff, 1px border, overflow hidden. It holds an img `object-contain p-1.5` (6px inset), so the art is 36×36. Media slot: 1:1 square logo, webp, lazy.
  - Eyebrow (category): Inter 12/16 #868a97 `mb-1`. 3–4 words / 11–33 chars.
  - h3 (name): **Sora** 18/28 500 #0d162f `mb-2`. 1–3 words / 4–22 chars, 1 line.
  - Description: Inter 14/20 #868a97, `line-clamp-3`. 3–29 words / 27–193 chars, 1–3 lines.
  - Each card carries `data-category` for filtering.
- **Load more:** `mt-8 flex justify-center`.
  - It is a `<button class="group">` wrapping a secondary button span sized `text-base px-6 py-3`. Label is 3 words.
  - Hidden when results ≤ the visible count.
- **Empty state** (hidden by default): `text-center py-16`. Line 1: Inter 18 #868a97, 3 words. Line 2: Inter 14 #868a97 `mt-2`, 6 words.
- **Data / paging behaviour** (inline script, no framework):
  - All N items are SSR'd into the grid. The sample has 2,728 items, of which the first 48 are visible and 2,680 carry `tw-hidden`.
  - The filter is client-side over each card's lowercase `textContent` plus an exact `data-category` match.
  - The search input is **debounced 80ms**. Any query or category change resets the visible limit to 48.
  - "Load more" adds 48 each click (48 → 96 → …). There is no numbered pagination and no infinite scroll.
  - Deep link: `?category=<exact option value>` preselects the select on load. T2 uses this for its "More {category} …" link.
  - Reset clears both controls.
  - No URL sync happens while typing, and there is no animation on filtering (cards toggle `display` instantly).
  - Lumenfold: render about 60–200 placeholder items, which is enough to exercise both "Showing X of Y" and load-more.

### T2: Integration detail (`/integrations/<slug>`)

Section order:
1. Header.
2. **Detail hero (left-aligned)**.
3. **Tool steps** (definition rows, A.0). Conditional; omit when there are 0 steps.
4. **Setup steps** (numbered step list, A.0). The section has `id="setup"`.
5. ClosingCTA. The coins mix the item logo, 2 avatars and 3 generic icons.
6. Footer.

There are no related-items rail, no sticky CTA and no testimonials. Sections 3–4 are PageSections:
- Heading block `max-w-2xl mb-12 md:mb-14`. Description Inter 16 → md 18, lh 1.6.
- Tool-steps h2: 7 words / 37 chars. Description: 25 words / 141 chars.
- Setup h2: 6 words / 30 chars. Description: 13 words / 72 chars.

**T2.2 Hero** (`Section`, `pt-8 md:pt-10 pb-12 md:pb-16`, standard padding, no center border):
- One wrapper animates on mount: `opacity 0, y 12 → 1, 0`, EASE.
- Breadcrumb (A.0), `mb-8`.
- Title row: `flex items-center gap-4` (16px).
  - Logo tile: 56×56 (`w-14 h-14 shrink-0 rounded-lg` 8px, 1px border, bg #fff). Img `object-contain p-2`, eager. Fallback: the first letter in Sora 18 500.
  - h1: Sora 400, 30 → md 36, lh 1.15 (34.5 / 41.4), −0.05em. "{Name} integration" pattern, 2–4 words / 15–30 chars, 1 line at md+ (2 at 375 for long names).
- p: `mt-6 max-w-2xl` (672), Inter 16 → md 18, lh 1.6, #868a97. 21 words / 146–163 chars.
- CTA row: `mt-8 flex flex-wrap items-center gap-4`.
  - Primary and secondary buttons (`text-base px-6 py-3`, 48px tall, 3 words each).
  - A text link, Inter 14 #868a97 with hover #0d162f: "More {category} integrations", 5–7 words. It links to T1 with `?category=`.

### T3: Use-case (agent) detail (`/use-cases/<slug>`)

Every T3 page is tied to one function palette (the sample uses `support` = orange). All GrainBand tiles and accents on the page use that palette.

Section order:
1. Header.
2. **Use-case hero + live run panel** (new).
3. LogoGrid (CLONE_SPEC 3.2).
4. **How it works**: pipeline tile, 3 feature texts, comparison table (new).
5. **Evals panel** (new; the same component as T4 EvalsFloor).
6. DeployPaths: an ExpandTiles clone with 3 tiles.
   - h2: 5 words / 36 chars. p: 16 words / 83 chars.
   - Tile visuals: a 280×150 avatar graph (3 glass avatars at (0,28), (110,0), (185,88) rotated −6°, plus a dashed 44px empty slot at (110,70) with a 1.5px dashed rgba(13,22,47,.35) border); a 294×130 node row; a 5-pill stack at opacities .55/.7/.85/1.
7. EnterpriseSecurity (CLONE_SPEC 3.8).
8. Testimonials (CLONE_SPEC 3.10).
9. **Related use-cases rail**: the CLONE_SPEC UseCases card grid in this function's palette and accent. h2 is 8 words / 44 chars with no description.
   - Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10`.
   - **7 cards**: all sibling agents in the function, minus the current one. That gives 2 rows at lg with the last row holding 3.
   - Whole-card link overlay `absolute inset-0 z-10`. Hover behaviour is exactly as on the home page.
10. **Shared stack** (StackCollapse, new) + final GrainBand CTA.
11. Footer.

**T3.2 Hero** (`Section`, `pt-10 md:pt-16 pb-16 md:pb-20`):
- Centred text column.
  - Integration cluster: 4 overlapping glass coins, each 40px, `border-slate-100 bg-white/70 blur(8px)`, shadow `glass`, holding a 19px icon.
    - `margin-left: −8px` from the 2nd coin on; z-index = index.
    - rotate = [−6, 4, −3, 5]°.
  - h1: `mt-4 max-w-3xl` (768), Sora 36 → 48, lh 1.15, −0.05em. 7 words / 52 chars.
  - p: `mt-5 max-w-xl` (576), 16 → 18, lh 1.6, #868a97. 24 words / 159 chars.
  - CTAs: primary and secondary (`text-base px-6 py-3`).
  - Motion: text `opacity 0, y16`; panel `opacity 0, y18`, delay .1; both EASE.
- **Run panel** (`mt-12`):
  - GrainBand tile in the function palette, `rounded-2xl`, inner `p-3 sm:p-5 md:p-8` (12/20/32).
  - It holds a white card: `rounded-xl` (12px), overflow hidden, shadow `0 1px 2px rgba(13,22,47,.06), 0 12px 32px -8px rgba(13,22,47,.16), inset 0 1px 0 rgba(255,255,255,.9)`.
  - PillTabs: md+ only, centred `w-fit`, wrapper `px/pt 20/28/36` (sm/md). **3 tabs**, 3–4 words / 20–23 chars each.
  - Scroll viewport: `h-[480px] md:h-[520px] overflow-y-auto p-5 sm:p-7 md:p-9`. Mask: `linear-gradient(to bottom, transparent 0, #000 28px, #000 calc(100% - 28px), transparent 100%)`. Inner `max-w-2xl` (672) centred.
  - Tab change: `scrollTo({top:0})` and the scene remounts (keyed by tab).
- **Run timeline anatomy** (all Inter):
  - Vertical guide: `absolute left-[17px] top-5 bottom-4 w-px`, bg `linear-gradient(to bottom, rgba(13,22,47,0) 0%, rgba(13,22,47,.11) 8%, .11 86%, 0 100%)`.
  - Trigger pill: `rounded-full bg-white py-1.5 pl-1 pr-4 gap-2.5`, shadow `inset 0 0 0 1px rgba(13,22,47,.08), 0 2px 6px rgba(13,22,47,.05)`.
    - 26px white icon disc (inset ring .07) holding a 14px icon, plus a 15px #6056ff badge at bottom-right (−4px) with a 1.5px white ring and a 9px check.
    - Label 13.5px 500 #0d162f, 6 words / 29 chars.
  - Agent row: `mt-4 pl-1 gap-2.5`, 26px avatar with a 2px white ring, then a name in 13.5/500 (3 words).
  - Narrative line: `pl-[42px]` 13.5/1.6 #868a97. 17–22 words / 94–120 chars.
  - Tool-call row: `mt-[18px] pl-1 gap-2.5`.
    - 26px disc (inset ring .08 + `0 1px 2px rgba(13,22,47,.06)`) holding a 15px icon.
    - Label 13.5/500, −0.01em, 6–9 words / 33–50 chars.
    - Trailing counter 12px #868a97, tabular-nums, opacity .8, 2 chars.
  - Result box: `ml-[42px] mt-1 p-4 rounded-lg bg-slate-50 border` 13.5/1.65 #0d162f, with a bold lead-in. About 60 words.
  - One run has 1 trigger, 1 agent, about 4 tool calls, about 3 narrative lines and 1 result.
  - Motion: each line uses whileInView (once, amount .4) `opacity 0, y 8 → 1, 0`, `.4s [.23,1,.32,1]`. Delays: trigger 0, agent .08, step i at `.16 + i*.08`. The stagger only applies within 1s of mount; after that, items appear with 0 delay as you scroll the viewport.

**T3.4 How it works** (StackedSection):
- SectionHeading: title only (3 words / 12 chars), `mb-10 md:mb-14`.
- Pipeline tile: GrainBand `rounded-2xl`, inner `px-6 py-10 md:px-10 lg:px-14 md:py-12`.
  - Grid `grid-cols-1 md:grid-cols-[1fr_44px_1fr_44px_1fr] items-center`.
  - Each content cell is `flex items-center justify-center md:h-[200px]`.
  - Col 1 (triggers) and col 5 (actions): a vertical stack `gap-2.5` with mask `linear-gradient(to bottom, transparent 0, #000 32%, #000 68%, transparent 100%)`.
    - 4 chips each: `rounded-full border border-white/60 py-1 pl-1 pr-3 text-[12px] 500 whitespace-nowrap` on a white/55 glass bg, with a 22px white icon disc (13px icon). Labels 2–5 words / 15–36 chars.
  - Connector cells: md shows an SVG arrow 40×12 (line `M2 6h29` + triangle head); below md a 12×36 down arrow. Stroke and fill `rgba(13,22,47,.30)`, 1.5px, round cap, `py-2 md:h-[190px]`.
  - Col 3: icon constellation, a box 200×170 with up to 8 glass squircles (`rounded-xl border-white/60`, white/55 glass) centred at fixed positions:
    | x% | y% | size | opacity |
    |---|---|---|---|
    | 50 | 48 | 52 | 1 |
    | 24 | 26 | 42 | .9 |
    | 77 | 24 | 40 | .85 |
    | 19 | 70 | 38 | .8 |
    | 80 | 72 | 44 | .9 |
    | 50 | 92 | 32 | .65 |
    | 51 | 6 | 30 | .6 |
    | 97 | 48 | 28 | .55 |
    - Each holds a white disc at 0.66 × size with an icon at 0.6 × disc. Use Lumenfold glyphs.
- Feature texts: the same 5-col grid, `mt-10 md:mt-12 gap-y-10`. Spacer cells are `hidden md:block`.
  - h3: Inter 18 500, −0.025em, #0d162f. 4–6 words / 24–29 chars.
  - p: `mt-2.5` Inter 14.5, lh 1.65, #868a97. 24–29 words / 128–166 chars.
- **Comparison table** (`mt-16 md:mt-24`): 1px border, bg #fff, square corners.
  - Header row (md+ only): `grid-cols-2 border-b`.
    - Left cell: `py-4` centred, Inter 16 #868a97, 2 words.
    - Right cell: `border-l border-dashed rgba(13,22,47,.1)`, Inter 16 500 #0d162f, with an 18px brand favicon, 2 words.
  - **6 rows**: `grid md:grid-cols-2`, rows 2+ have `border-t border-dashed rgba(13,22,47,.1)`.
    - Cell: `flex gap-3.5 p-6` (24px).
    - Marker disc: 24px, `mt-[-2px]`.
      - Left: bg #f3f3f4 holding a 10px "×" in #868a97 (stroke 1.4).
      - Right: bg #ecfdf3 holding a 10px check.
    - Text: 15px, lh 1.6, `-mt-1`. Left is #868a97 (9–15 words / 60–85 chars). Right is #0d162f (13–19 words / 81–119 chars).
  - Below md the columns stack and the header row is hidden.

**T3.5 / T4 Evals panel** (`EvalsFloor`):
- SectionHeading `max-w-2xl mb-10 md:mb-12`. h2 is 8 words / 35–50 chars. p is 18–26 words, `max-w-xl`.
- Panel: GrainBand (palette), **square corners**, inner `p-6 md:p-14 lg:p-20` (24/56/80).
- Card: 1px border, bg #fff, overflow hidden.
  - Header: `flex gap-2.5 px-5 py-3.5`, border-bottom `#f3f3f4`. 24px round avatar (bg #f3f3f4) and a name in 13.5px 600 #0d162f (3 words).
  - Chart block: `px-5 pt-5 pb-4`. A full-width SVG line or area chart, then a caption `mt-3` 11.5px #868a97 (about 11 words split by a separator).
  - **4 rows**: `flex justify-between px-5 py-3`, border-top #f3f3f4.
    - Left: a 6px dot (#0e9384 pass, #b42318 fail) and a label, 13px #374151, 3–6 words.
    - Right: score, 13px 500 tabular #0d162f (#b42318 when failing), 2 chars.
- Motion (IntersectionObserver threshold .3, once):
  - Line `pathLength 0 → 1`, 1.1s delay .2, out-quint.
  - Fill opacity → 1, .6s delay .6.
  - Labels opacity, .4s delay .9.
  - Threshold marker opacity, .4s delay 1.2.
  - Pass thresholds used: 90 / 90 / 85 / 90.

**T3.10 Shared stack** (`StackCollapse`), StackedSection:
- SectionHeading `max-w-2xl mb-10 md:mb-12`. h2 is 7 words / 36 chars. p is 24 words / 137 chars, `max-w-xl`.
- Grid `grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center`.
  - Left: an SVG stack diagram, `w-full max-w-[460px]`, centred below lg. Placeholder: your own layered-plates SVG.
  - Right: a list panel `bg-slate-50 rounded-2xl overflow-hidden` holding `ul flex-col gap-1 p-2` with **9 items**.
    - Item: `flex items-center gap-3 py-3 px-3.5 rounded-lg transition-all 300ms`.
    - Label: Inter 14 500. #0d162f by default; palette accent `a` when active.
    - Meta: `ml-auto hidden sm:inline` 12.5px #868a97, 2 words.
    - Active row: bg #fff, shadow `inset 0 0 0 1px rgba(13,22,47,.05), inset 0 2px 6px …`.
  - Motion:
    - On view, children stagger in (`staggerChildren .08, delayChildren .05`).
    - After `items*80 + 1600` ms, a `setInterval(1800ms)` advances the active row cyclically, wrapping at the end.
- Then the final CTA tile: GrainBand `rounded-2xl mt-16 md:mt-20`, inner `px-6 py-12 md:py-24`.
  - The 6 coins use the hero's 4 integrations.
  - h2: **text-2xl → md 36** (24 → 36), −0.025em. 9 words / 47 chars.
  - p: 26 words, rgba(13,22,47,.8).
  - Primary pill only.

### T4: Product landing (`/agents`)

Section order. Rows marked R are reused from CLONE_SPEC unchanged; the others are new.
1. Header.
2. **AgentsHero** (new).
3. LogoGrid (R).
4. HowWeWork (R).
5. DeployPaths (as in T3.6).
6. CaseStudies (R).
7. **AgentComparison** (new).
8. Evals panel (T3.5).
9. AgentActivity: this is the CostHero app card from CLONE_SPEC 3.6, rendered standalone.
   - SectionHeading `mb-12`. h2 is 4 words, with the last word in #6056ff.
   - Then the bordered card: KPI strip `grid-cols-2 md:grid-cols-4` and the live table, all exactly as in CLONE_SPEC, including the 3.4s row feed.
10. IntegrationsShowcase (R).
11. UseCases (R).
12. Testimonials (R).
13. EnterpriseSecurity (R).
14. **CompetitorComparison** (new).
15. FAQ (A.0), 7 items.
16. **TasksCTA** (new).
17. Footer.

**AgentsHero** (`Section`, `pt-10 md:pt-16 lg:pt-20 pb-16 md:pb-24`):
- Header grid: `grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-x-10 items-center pb-12 md:pb-16`.
  - h1 `lg:col-span-7 max-w-[30rem]` (480): Sora 48 at **all** breakpoints, lh 1.2, −0.15rem (−2.4px), `text-wrap: balance`. 11 words / about 55 chars, with a 2-word span in #6056ff. Expected 3 lines at lg; it wraps more at 375.
  - Right column `lg:col-span-5 lg:pt-2`: p 16 → 18, lh 1.6, #868a97, `max-w-xl`, 24 words / 138 chars. CTA row `mt-6 gap-4` with primary and secondary pills.
- Aurora panel (GrainBand violet, square), inner `px-6 py-14 md:py-20`. Centred column:
  1. **Prompt pill**: `rounded-full border-white/60 bg-white/80 blur pl-4 pr-1.5 py-1.5 gap-2.5`, shadow `glass`.
     - Text 12.5px #374151, 8 words / 40 chars, followed by a 1.5×14 #6056ff caret.
     - 28px #6056ff send disc (shadow `inset 0 1px 0 rgba(255,255,255,.25), 0 1px 2px rgba(13,22,47,.2)`) holding a 12px white icon.
  2. **sm+:** an SVG `w-full max-w-[620px] h-[68px]` (viewBox 620×68, `preserveAspectRatio none`) with 3 cubic paths from (310,2) to x = 103 / 310 / 517 at y = 66.
     - Each path is drawn twice: a base stroke rgba(13,22,47,.18) 1.5px, plus an overlay #6056ff 1.5px with `strokeDasharray 3 9`.
     - The overlay animates `strokeDashoffset 24 → 0`, **1.4s linear infinite**. Its opacity goes 0 → .7 over .4s. Per-path delays are 0 / .25 / .5s.
     - Below it, `grid grid-cols-3` holds 3 agent nodes.
  3. **<sm:** a 2×30 vertical dashed line with the same animation, then the 3 nodes stacked `gap-4`.
  - Agent node: `flex-col items-center gap-2.5`.
    - Disc: 56px glass (`bg-white/80`) holding a 38px avatar, plus a 10px #14b8a6 status dot at right/bottom 2px with a 2px white ring.
    - Under it, a glass pill (`px-3.5 py-2 gap-2`): a 2-word name and an overlapping pair of 20px white tool discs (`-5px` overlap, first `ml-4px`) with 10px icons.
    - Motion: whileInView amount .6, `opacity 0, scale .85, y 8 → 1, 1, 0`, .5s out-quint, delay `.15 + i*.18` (mobile `i*.12`).

**AgentComparison** (StackedSection):
- SectionHeading `max-w-2xl mb-12`. h2 is 9 words / 52 chars. p is 16 words / 103 chars.
- md+: a GrainBand panel (square, inner `p-6 md:p-14 lg:p-20`) holding a bordered white canvas **500px tall**.
  - It is a **react-flow (xyflow) graph**. Dot-grid background `radial-gradient(#d8dae0 1px, transparent 1px) 15px 15px`.
  - Nodes: an orchestrator chip `bg-gray-900 rounded-full pl-1.5 pr-3 py-1.5 ring-[5px] ring-indigo-500/15 shadow-lg`, scaled 1.25, with 12px/600 white text and an 11px white/50 sub-label.
  - Specialist chips: `bg-white rounded-full pl-1.5 pr-3 py-1.5`.
  - Mono tool tags: `font-mono text-xs #374151 bg-white rounded-lg px-2.5 py-1.5`.
  - A 256px detail card: `rounded-xl inset ring .08`.
  - A floating PillTabs control at `absolute bottom-4 right-4` (`bg-white/90 blur`).
  - Animation: rAF-driven, starting when ≥20% visible. **Node coordinates and edge timing were not measurable without a browser.** Build a static node graph placeholder with the same chrome.
- <md: a GrainBand panel with inner `p-5` holding stacked cards.
  - Card: `border border-gray-200 bg-white p-5`. Title Inter 16/500 `mb-3` (2–3 words). `ul gap-2`, each item a 15px check icon and 14px #868a97 text (3–5 words).
  - 2 cards × 4 items.

**CompetitorComparison** (StackedSection):
- SectionHeading `max-w-2xl mb-12 md:mb-14`. h2 is 6 words, with a 3-word span in #6056ff. p is 21 words / 130 chars.
- Table: `border border-gray-200 bg-white overflow-hidden`.
  - md+ columns: `grid-cols-[220px_1fr_1fr]`, lg `[260px_1fr_1fr]`.
  - Header row (border-bottom #e5e7eb, cell dividers #f3f4f6, `px-5 py-3.5`):
    - Col 1 is empty.
    - Col 2 is the brand logo cell, 18px tall.
    - Col 3 is a **competitor picker**: a button holding a 16px logo, a label (13px 600 #374151, −0.01em) and a 24px `rounded-md bg-gray-100 hover:gray-200` chevron box whose 14px chevron rotates 180° when open.
    - Picker popover: `absolute left-4 right-4 mt-2 z-20 bg-white border rounded-lg shadow-lg`. A fixed full-screen click-catcher closes it.
    - Options: `px-4 py-3` 13px 500 (#6056ff and bg gray-50 when selected).
  - **7 rows** (border-bottom #f3f4f6):
    - Label cell: `px-5 py-4` 13px 500 #111827, lh 1.4, 4 words.
    - Brand cell: bg **#fafafe**, `px-5 py-4 gap-3`. A 20px #ecfdf3 disc with a 12px check, then text 13px #374151, lh 1.55, about 22 words.
    - Competitor cell: a 20px #fffbeb disc with a warning glyph, then text 13px #6b7280, about 20 words.
    - The competitor cell fades on selection change (`opacity 0 → 1`, .15s).
  - <md: a 2-col header (`px-4 py-2.5`, 12px labels, 20px chevron box). Each row shows an uppercase row label (11px 600 #9ca3af, 0.05em tracking, `px-4 pt-3 pb-1`), then 2 cells (`px-4 py-3`, 12px, lh 1.5).

**TasksCTA** (custom Row: gutter cells plus center `relative min-h-[500px] flex items-center justify-center overflow-hidden`):
- It is a 4-phase scripted sequence that starts when 30% of it is visible (IntersectionObserver, once).
- Phases:
  1. **initial** (0s): centred h2 Sora 30 → md 36 → lg 48, lg `leading-normal` (1.5), `max-w-3xl`, 10 words / 56 chars. It enters `opacity 0, y 20 → 1, 0`, .6s.
  2. **tasks** (2.0s): h2 exits (`opacity 0, blur 10px`). A background grid fades in from `opacity 0, blur 20px` (.8s).
     - The grid is `absolute inset-0 p-8`: `grid-cols-1 sm:2 lg:3 gap-x-12 gap-y-3 max-w-4xl`, **24 task rows**.
     - Rows shown per breakpoint: 8 at mobile, 16 at sm, 24 at lg.
     - Each row: a 16px checkbox (`rounded border`, #868a97 at 40%) and 14px #868a97 text, 3–5 words, nowrap. Rows fade in with delay `i*.02`.
  3. **checking** (3.5s): each row ticks at `i*40ms`. The box fills #6056ff and pulses `scale [1, 1.2, 1]` (.2s). The check path draws (`pathLength`, .2s). The text gets a line-through at #868a97 50%.
  4. **final** (`3.5s + 24*40ms + 500ms` = 4.96s): the grid dims to `opacity .3, blur 12px`. A new h2 (same style, `mb-8`, 9 words) and a large primary button (`text-lg px-8 py-4`, 18px, 32/16 padding) enter `opacity 0, y 20 → 1, 0`, .8s delay .2.

---

## Part B: Marketplace (`marketplace.relevanceai.com`, Astro, **unprefixed Tailwind with its own tokens**)

This is a separate design system. Breakpoints are stock Tailwind (sm 640, md 768, lg 1024, xl 1280, 2xl 1536, plus 1920). There is **no gutter-rail grid** except on M3. The font is Inter only. The gray scale is Tailwind **slate**: gray-50 #f8fafc, 200 #e2e8f0, 400 #94a3b8, 500 #64748b, 600 #475569, 900 #0f172a.

Lumenfold choice: either keep this as a "marketplace sub-theme" with the tokens below, or map it onto the main tokens. The mapping is CTA #685fff → #6056ff, text #0d001a → #0d162f, radius 6/12 → 4.8/8. The measured values are given either way.

### B.0 Marketplace tokens

```js
colors: {
  'mp-text-primary': '#0d001a', 'mp-text-secondary': '#0d001ab3' /*70%*/, 'mp-text-tertiary': '#0d001a99' /*60%*/,
  'mp-text-disabled': '#0d001a66', 'mp-text-link': '#685fff',
  'mp-bg-primary': '#ffffff', 'mp-bg-secondary': '#f9f9fb', 'mp-bg-hover': '#0d001a0d',
  'mp-cta': '#685fff', 'mp-cta-hover': '#4d40ec',
  'mp-border': '#0d001a1a', 'mp-divider': '#0d001a0d', 'mp-hairline': '#e6e7ea',
  'mp-accent-purple': '#e5d3ff', 'mp-accent-green': '#defde7', 'mp-icon-purple': '#a75dff',
},
spacing /* named */: { xxs: 4, xs: 6, s: 8, m: 12, l: 16, xl: 32, xxl: 48 },
borderRadius: { 'radius-xs': 6, 'radius-s': 8, 'radius-m': 12, 'radius-l': 16 },
```

Type utilities (all Inter):
| Utility | Weight | Size / line-height | Letter-spacing |
|---|---|---|---|
| `heading-xxl` | 600 | 24/32 | — |
| `heading-xl` | 600 | 18/24 | — |
| `heading-l` | 600 | 16/24 | — |
| `heading-m` | 600 | 14/20 | — |
| `heading-s` | 600 | 12/16 | — |
| `paragraph-regular-l` | 400 | 16/24 | −.011em |
| `paragraph-medium-m` | 500 | 14/20 | −.006em |
| `paragraph-regular-m` | 400 | 14/20 | −.006em |
| `paragraph-regular-s` | 400 | 12/16 | — |

Shadows: stock `shadow-sm`, `shadow-md` (`0 4px 6px -1px rgb(0 0 0/.1), 0 2px 4px -2px rgb(0 0 0/.1)`) and `shadow-lg` (`0 10px 15px -3px rgb(0 0 0/.1), 0 4px 6px -4px rgb(0 0 0/.1)`).

Motion: CSS transitions only (colors 150ms, `transition-all duration-200`, transform 300ms ease-out). There is no framer and there are no scroll reveals. The keyframes present are `pulse` and `spin`. Islands: MobileHeader, InlineFilters, ListingMediaCarousel (`client:visible`), ToolFlowDiagram (`client:visible`), ShareButton, BuilderAvatar (`client:only`).

**MP Header:**
- Desktop (lg+): `sticky top-0 z-50 bg-white`, h-16 (64). Container `max-w-[90rem]` (1440) `mx-auto px-4 md:px-8 lg:px-16`.
  - Left: a 32px logo mark plus a wordmark text in `heading-l` with `ml-m` (12).
  - Right: `space-x-l` (16).
    - 2 nav links in `paragraph-medium-m`, mp-text-secondary, hover primary.
    - A "Categories" dropdown button (16px chevron) that opens on hover via CSS. Panel: `absolute top-full right-0 mt-xs bg-white border rounded-lg shadow-lg py-xs min-w-[200px]` with **6 links** in `px-m py-xs paragraph-regular-m`, hover bg mp-bg-hover.
    - CTA: `px-l py-xs` (16/6) bg mp-cta, white, `rounded-radius-xs` (6), `paragraph-medium-m`, hover mp-cta-hover. 3 words.
- Mobile (<lg): `sticky top-0 z-50 border-b`, h-14 (56), `px-4 md:px-8`. 28px logo mark and a 24px hamburger (`p-2 rounded-lg hover:bg-hover`).
- **MP Footer**: bg mp-bg-secondary, `border-t`, `py-xxl` (48).
  - Grid `grid-cols-1 md:2 lg:7 gap-xl` (32). The brand column holds a `heading-m` wordmark, a 12px tagline `max-w-xs` and 3 social icons (20px, tertiary → primary).
  - 6 link columns: h3 `heading-s` (12/16 600), then `ul space-y-xs` of 12px links. Columns hold 6, 5, 12+1, 12+1, … links.
  - Bottom bar: `py-l border-t border-divider`, 12px tertiary.

**MP listing card A (compact, used on M1):** the whole card is an `<a class="block group rounded-lg">`.
- Layout: `flex gap-3`.
- Icon: 48×48 `rounded-lg overflow-hidden bg-slate-100` holding an img (1:1, cover). Group-hover `scale(1.1) rotate(3deg)` (`transition-transform`).
- Body: `flex-1 min-w-0`.
  - Title: `paragraph-medium-m` truncated, #0d001a, group-hover indigo-500 #6366f1. 2–5 words / 15–31 chars.
  - Meta row: `mt-0.5 gap-1`. Rating value 12px plus a 12px yellow-400 star, a "·" separator, then a 12px clone icon (opacity .4) and a 12px count (1–5 chars).
  - Description: `mt-1` 12/16 secondary, `line-clamp-2`. The SSR source text runs 4–224 words but only 2 lines show.
  - Tool icons: `mt-2 gap-2`, 1–3 × 16px icons (in a 24px white disc on dark backgrounds).

**MP listing card B (bordered, used on M2 and M3):** an `<a class="block h-full">`.
- Box: `border rounded-radius-m (12) p-l (16) flex flex-col h-full`. Hover bg slate-50 + `shadow-md`, `transition-all 200ms`.
- Top row: `flex items-start justify-between mb-l`.
  - Left: a 48px icon, `rounded-radius-m` (12), bg mp-bg-secondary.
  - Right: a vendor icon row `gap-xs max-w-[60%]`. Each icon is 20px inside a chip `bg-secondary rounded-radius-xs p-xxs` (28px).
  - Hover tooltip (md+): `absolute top-full mt-2 left-1/2 -translate-x-1/2`, `px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md shadow-lg`, opacity 0 → 1 over 200ms. 3 words.
- h3: `heading-xl` (18/24 600) `mb-s`. 3–4 words / about 21 chars.
- Type row: `gap-x-xs mb-s`. A 16px type icon, a type label (`paragraph-regular-m` secondary, 1 word) and a rating.
- Description: `flex-1 mb-l`, `paragraph-regular-m` secondary, `line-clamp-2`.
- Footer: `flex justify-between mt-auto`. Left: builder avatar (client-only island, small round) and name (`paragraph-regular-m` secondary). Right: price or clone meta.

### M1: Marketplace home (destination of `/templates*`, `/agent-templates-meetings/*` and `/agent-templates-roles/*`)

Section order:
1. **Dark hero + search + featured cards.**
   - Section: `relative py-12 px-4 md:px-8 lg:px-16 overflow-hidden`.
   - Background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)` over a base #1a1a2e, plus a full-bleed starfield image (`cover`, `bottom`, mirrored with `scaleX(-1)`). Placeholder: your own dark star/noise texture.
   - Inner `max-w-[90rem]`, grid `grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start`.
   - Left column:
     - h1: 30 / md 36 / lg 48, weight 600, white, `leading-tight` (1.25), lg line-height 56px, `mb-12`, `md:max-w-[500px] lg:max-w-none`. 9 words split over 2 lines at lg with a forced `<br class="hidden lg:block">`.
     - Search form `max-w-md` (448): input `w-full pl-12 pr-4 py-3 text-base bg-white border border-slate-200 rounded-xl` (12) with focus border purple-500. 20px slate-400 icon at `pl-4`. Placeholder 6 words. Submits to `/search?q=` (GET, `name=q`).
   - Right column: `grid-cols-1 sm:grid-cols-2 gap-8`, **6 compact cards A** in the dark variant (title white, hover indigo-300; meta and description slate-300; clone icon inverted).
2. **Category tiles** (`pt-16 pb-6`):
   - Grid `grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden`. The tiles are flush with no gap.
   - **4 tiles**, each `p-4`. Backgrounds and text colours: red-50 #fef2f2 / #991b1b, blue-50 #eff6ff / #1e40af, orange-50 #fff7ed / #9a3412, violet-50 #f5f3ff / #5b21b6.
   - Tile title: a link h3 600 `mb-4`, hover opacity .7.
   - Icon row: `flex-wrap gap-2 justify-between`, 6 × 40px circles `bg-white/70 shadow-sm` with 24px icons. Hover `scale(1.25) bg-white shadow-lg`, `transition-all 200ms ease-out`. Each links to `/search?q=`.
   - Footer: a `p mt-3 text-xs leading-relaxed opacity-70` with 5 tag links separated by " · ", hover underline. Links go to `/search?tag=`.
3. **"Agents" rail:**
   - Grid `grid-cols-1 lg:grid-cols-4 gap-6`.
   - `lg:col-span-3`: a rail header (`flex justify-between mb-6`; h2 20/600 slate-900, 2 words; "View all" link 14 slate-500 → slate-900, 3 words) and a card grid `grid-cols-1 sm:2 lg:3 gap-x-6 gap-y-8` of **6 compact cards A**.
   - Plus a promo tile: `bg-green-50 rounded-2xl pt-6 px-4 pb-0 flex-col overflow-hidden`.
     - h3 18/600 green-800, centred, `mb-4`, 9 words / 51 chars.
     - An image pinned to the bottom (`object-contain object-bottom rounded-lg`) that starts at `translate-y-2` and goes to 0 on hover (300ms ease-out). Placeholder: a UI screenshot cropped at the bottom.
4. **"Tools" rail:**
   - `lg:col-span-2` with a 2-col card grid of **4 cards A**.
   - Plus a `lg:col-span-2` promo split card: `bg-gray-50 rounded-2xl flex-col md:flex-row`.
     - Left half `p-6`: h3 20/600 slate-900 `mb-2`, p 14 slate-600, and a link 500 with a 16px arrow (hover purple-600) `mt-4`.
     - Right half `min-h-[200px]`: an illustration.
5. **"Workforces" rail:** full width, `grid-cols-1 sm:2 lg:4 gap-x-6 gap-y-8`, **4 cards A**.
6. **Link cards:** `grid md:grid-cols-3 gap-6`. Each is `flex gap-4 p-5 rounded-xl border-slate-200`.
   - 40px icon tile (`rounded-lg`, tinted-100 bg, 20px tinted-600 icon). Tints: purple, blue, green.
   - h3 600 (hover tinted-700) and p 14 slate-500.
   - Hover: `border-{tint}-300 bg-{tint}-50`.
7. MP Footer.

Card counts on the page: 6 + 6 + 4 + 4 = **20 listing cards**, plus 4 category tiles.

### M2: Marketplace catalog (`/search?…`, `/category/<id>`, one template)

Section `pb-xl`. Container `max-w-7xl` (1280) `mx-auto px-l lg:px-xl` (16 / 32).
- **Title block:** `pt-xl pb-m mb-l` (32 / 12 / 16).
  - Search page h1: `heading-xxl` overridden to **48/58, weight 500**.
  - Category page h1: `heading-xxl` (24/32 600) `mb-xs`.
  - Subtitle: `paragraph-regular-l` (16/24) secondary `mt-xs`, `text-wrap: pretty`. About 10–15 words.
- **Filter bar** (InlineFilters island): `flex flex-wrap items-center gap-m mb-l` (12 / 16).
  1. **Type dropdown:**
     - Button: `bg-white border rounded-radius-xs (6) px-m py-xs (12/6) paragraph-medium-m`, hover bg-hover. Label, then a 16px chevron `ml-xs` that rotates when open.
     - Panel: `absolute top-full left-0 right-0 sm:right-auto mt-xs z-50 bg-white border rounded-radius-m (12) shadow-lg min-w-full max-h-64 (256) overflow-y-auto p-l (16)`.
     - Options: **3–4 entity types** (agent / tool / workforce, plus "trigger" in category data).
  2. **Sort cluster** (`sm:ml-auto`, `gap-xs`):
     - A custom dropdown button `sm:min-w-48` (192) styled like the type button. It drives a visually hidden native `<select name=sortBy>` with **6 options**: updated, created, name, price, clone count, rating.
     - A 38×38 direction toggle button (20px icon) that flips `sortOrder` asc/desc.
  3. **Chip row** (`w-full`, `flex-wrap gap-2`):
     - Active filter chips: `inline-flex gap-1 pl-3 pr-1.5 py-1 bg-violet-50 text-violet-700 border-violet-200 rounded-full text-sm 500`. Each has a remove "x" (`ml-0.5 p-0.5 rounded-full hover:bg-violet-200`).
     - **"+ Add filter" chip:** `inline-flex gap-1 px-3 py-1 text-sm mp-text-secondary border border-dashed rounded-full`, hover bg-hover. 14px plus icon.
     - The add-filter chip opens a tag popover: `absolute top-full left-0 mt-2 z-50 bg-white border rounded-xl shadow-lg w-72` (288).
       - Search field: 16px icon at `pl-3`, placeholder 2 words.
       - **4 tag groups: 12 / 14 / 28 / 8 options**.
     - Other facets in the filter model, which can also appear as chips: **category (21 options)**, **price type (2)**, min/max price, rating.
  - The URL is the source of truth. Every change navigates to a server-rendered page: `?entityType=&category=&tags=&priceType=&sortBy=&sortOrder=&page=`. Page size is **21**.
- **Results:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-l` (16) of **card B**. 21 per page = 7 rows at lg.
  - The SSR splits the first 3 into their own grid block, then 18 more with `mt-l`. The visual result is one continuous 3-column grid.
- **Pagination:** `nav[aria-label=Pagination] flex justify-center gap-xs mt-xl mb-l` (6 / 32 / 16).
  - Prev/Next: `px-m py-xs rounded-radius-xs border paragraph-medium-m`.
    - Enabled: bg white, hover bg-secondary.
    - Disabled: span, bg-secondary, mp-text-disabled, `cursor-not-allowed`.
  - Page numbers: `min-w-[40px] px-s py-xs rounded-radius-xs border text-center` (about 40×32).
    - Current: bg and border mp-cta, white, 500.
    - Others: white bg, mp-border, text primary.
  - Shape: `1 2 … last` with an ellipsis span (`px-s py-xs` secondary). The sample has 14 pages.
  - These are real links (`?page=n`, keeping filter and sort params), not JS.
- Column widths (derived, container 1280 − 64 = 1216 at lg+): 1440 and 1280 → 394.7 (3 cols); 768 → (768 − 32 − 16) / 2 = 360; 375 → 343 (1 col).

### M3: Marketplace listing detail (destination of `/agent-templates-tasks/*`)

Page wrapper: `relative overflow-x-clip`.
- **Rails:** an absolute layer `z-10 pointer-events-none` with a centred `max-w-[1120px] px-6 md:px-10` box and two 1px **#E6E7EA vertical hairlines** at `left/right 24px` (md 40px), full height. This is the marketplace version of the gutter rails.
- **Decor:** an absolute layer `z-[2]` with 18 scattered decorative SVG shapes (lg only), opacity .6 / .5 / .4 descending down the page.
  - Left side positions: top 8 / 14 / 26 / 37 / 44 / 53 / 62 / 72 / 84 %, left 3–4%.
  - Right side positions: top 11 / 15 / 20 / 33 / 40 / 48 / 57 / 67 / 78 %, right 3–14%.
  - Placeholder: Lumenfold outline glyphs (about 40–80px).

Sections. Container `max-w-[1120px] mx-auto` throughout; sections are divided by `border-t #E6E7EA`.
1. **Header block** (`bg-white`, inner `px-14 md:px-20`, 56 / 80):
   - Breadcrumb: `flex items-center gap-xs pt-6 pb-8`, 12/16 mp-text-tertiary. Links mp-text-link #685fff with hover primary. Separator "/". 3 levels; the current item is mp-text-primary.
   - Title row: `flex items-start gap-5 mb-6`.
     - Icon: 80 → md 96 square, `rounded-[22px]`, 1px #E6E7EA border, bg white, img cover.
     - Text column: `min-h-[5rem] md:min-h-[6rem]` with a row `flex justify-between gap-4`.
       - h1: 36 → md 48, **700**, slate-900, lh 1.1, `tracking-tight`. 3 words / 17 chars.
       - Actions `gap-3 shrink-0`: a share icon button (`px-m py-m rounded-radius-xs hover:bg-hover`, 20px icon) and the primary CTA (`px-6 py-2.5 bg-mp-cta text-white rounded-[5px] text-sm 600`, hover cta-hover, 2 words).
     - Subtitle: `p text-lg (18/28) slate-500 mt-2 leading-relaxed`, starting with a 2-word span in #4F46E5. 6 words in total.
   - Disclaimer: `text-xs (12) slate-400 leading-relaxed lg:pr-[180px] pb-8`. 33 words / 265 chars.
2. **Media carousel** (`border-t`, `px-6 md:px-10 py-8 md:py-10`, `space-y-4`):
   - Stage: `rounded-radius-l (16) overflow-hidden bg-mp-bg-secondary`, `aspect-video` (16:9), image `object-contain`.
   - Prev/next: 40px circles `bg-white/80 hover:bg-white` at `left-4` / `right-4`, vertically centred, holding 24px chevrons.
   - Counter badge: `absolute top-4 left-4 px-3 py-1 bg-white/80 rounded-radius-xs` 12px secondary ("1 / 3").
   - Thumbnail strip: `flex gap-2 overflow-x-auto pb-2` (scrollbar hidden). Each thumb is a button `width:120px; aspect-ratio:16/9; rounded-radius-s (8); border-2`, active border mp-cta, inactive border-default.
   - Slide change is instant (no transition). The sample has 3 media.
3. **Meta strip** (container `px-6 md:px-10`):
   - Grid `grid-cols-1 md:grid-cols-2 gap-px bg-[#E6E7EA] border-x`, which draws 1px hairline separators.
   - Cell: `bg-white p-5 flex justify-between gap-4`.
     - Label: `text-xs uppercase tracking-wider (0.05em) slate-400 mb-1`, 1 word.
     - Value: `text-sm 600 slate-900`, links hover mp-cta. Example: "Category, Category & more".
   - Right side of a cell: an anchor to `#how-it-works` with an emoji or number, plus 24px tool icons `rounded object-contain`.
4. **Description** (`px-14 md:px-20 py-10 md:py-14`):
   - Overlay `absolute inset-0 mx-6 md:mx-10 bg-gradient-to-br from-transparent via-transparent via-70% to-indigo-50/30`.
   - Body: Tailwind Typography `prose prose-sm prose-gray max-w-none` (14px / 1.714), headings 700 slate-900, p slate-500 relaxed, links indigo-600.
   - Content: 1 h3, about 7 paragraphs (about 900 words in total, with bold lead-ins) and one 4-item list.
5. **Social proof** (`px-14 md:px-24 py-14 md:py-20`):
   - h2: 24 → md 30, 700, `leading-tight`, centred, `mb-10`, 2 words.
   - Press pill row: `flex-wrap justify-center gap-3 mb-12`, **4 pills**. Each is `border #E6E7EA rounded-[5px] px-6 py-3.5 text-sm 500` holding a logo (`h-7` 28px, grayscale, opacity .7) and an 18px external-link icon in slate-400.
   - Logo grid: `grid-cols-2 sm:3 md:4 lg:5 gap-10 justify-items-center`, **14 logos**, `h-8` (32) `max-w-[140px]`, grayscale, opacity .6, hover full colour (`transition-all`).
6. **"Ways to start"** (`px-10 md:px-16 pt-12 md:pt-16 pb-8`):
   - Overlay gradient `to-tr … to-gray-100/40`. h2 is the same style as section 5, 2 words.
   - Grid `md:grid-cols-3 border-t` with **3 cells** `p-8 border-b md:border-b-0 md:border-r last:border-r-0`.
     - Title line: text-lg. A number span in #4F46E5 600, then `font-bold slate-900 ml-1`, 4 words.
     - Body: `p text-sm slate-500 leading-relaxed flex-1`, 28–34 words.
     - Buttons `mt-6 gap-3`. Secondary: `px-5 py-2.5 border-slate-300 text-slate-700 rounded-[5px] text-sm 600`, hover bg slate-50. Primary: same size, mp-cta.
7. **How it works** (`#how-it-works`, `border-t`, `scroll-mt-20`):
   - h2 centred, `pt-12 md:pt-16 pb-8`. Then a `border-t` and a dotted-grid stage: `mx-[18px] md:mx-[30px]`, `background: radial-gradient(circle, #d1d5db 1px, transparent 1px) 0 0 / 20px 20px`, inner `px-4 md:px-10 py-8 md:py-12`.
   - **Vertical flow diagram:** a centred column of **7 nodes**.
     - Node: `width 350px; padding 12px 20px; radius 10px; 14px; gap 10px`. The first node (agent) is 600 with a 20px icon; the others are 500 with a 16px emoji or icon. Text has ellipsis.
     - Connectors between nodes: a 24×28 down-arrow SVG (`padding 4px 0`).
     - Node fills are set inline per type (not captured). Use white + 1px border for agent and tool nodes and a tinted fill for the trigger node.
8. **Related rails** (`px-10 md:px-16 py-14 md:py-20`, inner `px-6 md:px-10`):
   - **2 rails** (`mb-14` between). Each has an h2 (24 → 30, 700, `leading-tight`, `mb-8`, 4 words) and a grid `grid-cols-1 md:2 lg:3 gap-6` of **3 card B**.
9. MP Footer.

There is **no sticky CTA**. Only the header is sticky.

### M4: Marketplace SEO integration landing (destination of `/agent-templates-software/*`)

This is a long static marketing page with no catalog behaviour. Container widths vary by section: `max-w-4xl` 896, `max-w-7xl` 1280, `max-w-6xl` 1152, all with `px-xl` (32).

1. **Hero** (`py-12`, centred, max-w-4xl):
   - h1: 36 → 48, 700, slate-900, `leading-tight`, `mb-4`, 3 words.
   - p: 18 → 20, slate-600, `max-w-3xl` (768), `leading-relaxed`, `mb-6`, 13 words.
   - Buttons: `flex-col sm:flex-row gap-m justify-center mb-xl`.
     - Primary: `px-xl py-m (32/12) bg-mp-cta text-white rounded-radius-m (12) heading-l (16/600)`, 4 words.
     - Secondary: the same shape, white, with a provider icon.
   - Trust row: `flex-wrap gap-x-8 gap-y-4 text-sm slate-600`, 3 items, each a 20px tinted icon (purple-600, blue-600, green-600) and a 2–3 word label.
2. **Logo strip:** label 14/500 slate-600 `mb-8`, 5 words. Grid `grid-cols-2 md:4 lg:7 gap-8`, 14 logos `h-8`. The whole grid is `opacity-60 grayscale` and goes to full colour on hover of the grid.
3. **3 benefit cards** (`py-16`):
   - h2: 30 → 36, 700, centred, `mb-12`, 4 words.
   - Grid `md:grid-cols-3 gap-8`. Card: `rounded-2xl p-8`, bg mp-accent-purple #e5d3ff / mp-accent-green #defde7 / a third tint.
     - Emoji, 36px, `mb-4`.
     - h3: 24/700 `mb-4`, 2–3 words.
     - `ul space-y-3` with 3 items: an accent bullet (e.g. #a75dff) and secondary text, 2–4 words.
4. **Prose band:** bg slate-50, max-w-4xl. h2 30/700 `mb-6`, then 2 paragraphs in slate-700 `leading-relaxed` (35–44 words each).
5. **Problem / solution:** h2 centred `mb-8`. Grid `md:grid-cols-2 gap-8 mb-12`.
   - Each column starts with a pill header: `bg-red-100 text-red-800` or `bg-green-100 text-green-800`, `px-4 py-2 rounded-full 600`, 20px icon, 3 words.
   - Then 4 item boxes `flex gap-3 p-4 rounded-lg`, bg red-50 with border red-200 (or the green equivalents), slate-700 text, 3–4 words.
6. **3 gradient cards:** h2, then `md:grid-cols-3 gap-6`. Card: `rounded-xl shadow-lg overflow-hidden` with inner `bg-gradient-to-br from-{purple|pink|blue}-600 to-{…}-700 p-6 text-white h-full`.
   - Emoji, 30px.
   - h3: 20/700 `mb-3`.
   - p: 14 `{tint}-100` `leading-relaxed`, 12–15 words.
7. **Callout:** `bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg`. A 24px amber-600 icon, then h3 600 `mb-1` and p 14 slate-700.
8. **Final CTA** (`py-16 bg-slate-50/30`, max-w-6xl):
   - Card: `bg-white rounded-3xl (24) p-8 md:p-16 shadow-sm border-slate-100 overflow-hidden`. Scattered slate-300 decorative glyphs at opacity .3, plus 2 corner illustrations (lg).
   - h2: 30 → 48, 700, `leading-tight`, `mb-6`, with a span in indigo-600.
   - p: 16 → 18, slate-600, `mb-10`.
   - Buttons: `px-8 py-3 rounded-xl 600`. Primary indigo-600 → 700. Secondary white with border slate-300.
   - Footnote: 14 slate-500 with a 16px icon.
9. MP Footer.

---

## Part C: Legacy Webflow pages (old design language)

These pages use `relevance-site.css` (Webflow + Relume). Breakpoints are max-width 991 / 767 / 479 and min 1280 / 1440 / 1920. They use the **old Webflow navbar and footer**, not the Astro header. Fonts are loaded via WebFont: Inter 400–800, Noto Sans, Epilogue, Inconsolata. Global `h1, h2, h3, h4` request "Inter Display", which **is not loaded**, so it falls back to the system `sans-serif`. Lumenfold should render them in Inter.

Legacy tokens (vars):

| Variable | Value |
|---|---|
| `--dark-purple` / `--midnight-blue` | #0d162f |
| `--dark-purple-50-text` | #868a97 (body copy) |
| `--dark-purple-30` | #b6b9c0 |
| `--indigo` | #6056ff |
| `--indigo-hover` / light | #7281ff |
| `--dark-indigio` | #3b32f9 |
| `--purple` | #943bff |
| `--borders` | #e6e7ea |

Body: Inter 16/150%, #868a97.

Legacy `.button` / `.button-primary`:
- Shape: bg #6056ff, 1px #3b32f9 border, radius 8, min-height 48, padding 12/24 (`.button`: .75rem / 1.5rem), 500.
- Shadow: `0 9px 13px -5px #6056ff66, 0 2px 2px 0 #6056ff40, inset 0 -2px 0 0 #3b32f980, inset 0 0 0 1px (white-20), inset 0 7px 12px 0 #943bff`.
- Hover: bg #7281ff, `transition all .2s ease`.
- `.is-small`: padding .3rem / 1rem.
- `.is-alternate`: bg white, border #e6e7ea, softer shadow.

Recommendation: build W1–W3 on the **main Lumenfold tokens** (Part A) and keep only the layouts below. The legacy visuals (gradient pill CTAs, 72px headings) would clash with the rest of the clone.

### W1: Legacy card list (`/workflows`)

- There is no page heading or hero. `main` starts directly with the list.
- Section `.blog-list-grid-section`: margin-top 60 (≤991: 30; ≤767: 40, with margin-bottom 60).
- Container `.function-header-container.blg-sec`: `max-width 1268; padding 0 20px` (≤991: 32; ≤767: 24), plus margin-top 20 at ≥1440.
- Grid `.collection-list-3`: **2 columns** at every width down to 480 (gap 48; ≤991: 32; ≤767: 24). It becomes a single flex column at ≤479.
- **101 cards on one page.** There are no filter, search or pagination controls.
- Card (`a.blg-tab-pane-div-content-wrraper`, `flex-col pt-24`, no border or background):
  - Image slot `.blg-image-div`: radius 8, mb 16. **The img is empty on every item** (`src=""`, `w-dyn-bind-empty`), so the slot collapses to 0 height. Lumenfold can omit it or use a 16:9 placeholder (radius 8).
  - Eyebrow: Inter 14/150% 500 #868a97 `mb-8`. It shows the item name (2–5 words / 10–39 chars).
  - h3: Inter 20/150% 600 #0d162f `mb-16` (18 at ≤767). The **same text as the eyebrow** (a CMS duplication).
  - Description: Inter 14/150% 500 #868a97, 15–31 words / 98–200 chars.
  - Each card carries a Webflow IX2 `data-w-id` (a hover interaction). Its values live in webflow.js and **were not captured**. Suggested: colour change only.
- Then the footer CTA (W.CTA, below) and the legacy footer.

### W2: Legacy product page (`/workflows/<slug>`)

Section order:
1. Hero (`.uc-hero-section`): padding-top 80 (≤991: 60, ≤479: 40), padding-bottom 20.
   - Row: flex. Text column 490 wide with `margin-right 40`. The media column pushes right.
   - Tag line: Inter 16/500 #0d162f, 5 words, inside a 40px-tall row.
   - h1: Inter 600, **72px / 112%**, −1px, `mb-32`. 40px at ≤767 and centred at ≤479. 5 words / 40 chars.
   - p: Inter 18/160% #313a53 `mb-32` (16 at ≤479), 27 words / 175 chars.
   - CTAs (`height 60, margin-top 20`):
     - Pill 1: 227×60, `radius 48`, `linear-gradient(90deg, #4325fa, #8325fa)`, white 18px, with an arrow icon.
     - Pill 2: 174×60, transparent, 1px #0d162f border, radius 48. Hover bg #eef2ff, border and text #4f46e5.
   - Media: an embedded **video iframe** (Loom), aspect 77.9% (about 1.28:1), radius 24 (8 at ≤479), `max-width 1080`, `translateX(100px)` at ≥992. Placeholder: your own 16:12.5 video poster.
2. Logo row: margin 120 / 120 (40 at ≤991). Label 16 #8a92ac centred `mb-40`, 11 words. 6-col grid (3 at ≤767), gap 16 × 52, **12 logos**.
3. Values: h2 and p in a 1.5fr / 1fr 2-col grid, then a centred h2 (it scales up from .92 via IX2 on scroll). Then a 3-col grid of **3 image cards** (each an image plus an h3 of 13–21 words).
4. "With / without" comparison: h3, then 2 columns. Each column has a 20px icon, an h4 and **3 items**, each a 20px icon and Inter 18/160% #0d162f text (16–29 words).
5. Vertical tabs: h2, then a `w-tabs` with a **4-tab** vertical menu on the right and an image pane on the left.
   - Each tab is an accordion card (title 3–6 words, body 18–28 words). The body opens with IX2 `height 0 → auto`, `translateY 20 → 0`, `scale .96 → 1`.
   - Clicking switches tabs. There is no auto-rotate in the markup; Webflow tabs can autoplay via data attributes, and none are set here.
6. Bottom CTA: an h3 (5 words) and an email capture form (an input plus a submit button with an arrow), with success and fail messages.
7. Old footer variant.

### W3: Legacy SEO article + TOC (`/llm-models/<slug>` and `/industry/<slug>`, shared)

1. **Banner** (`.features-top-banner`):
   - Background `linear-gradient(#fff0, #f8f6ff)`, padding 160 / 160 (80 / 80 at ≤767), overflow hidden.
   - Container 1268 / 20px.
   - Heading `div.heading-style-h1` (not an h1 tag): Inter 600, **64px** (52 at ≤991, 40 at ≤767), lh 1.2, #0d162f. 10 words / 60–63 chars.
   - CTA wrapper: `margin-top 2.2rem`, column, centred, gap 16.
     - 1 `.button-primary` (3 words; full-width 36px at ≤479).
     - A label row 14/140%: "2 words ✶ 3 words" with a 10px star divider `mx-8`.
   - **5 floating decorative SVGs**, absolute, eager-loaded:
     | Image | Position | Width | Breakpoint changes |
     |---|---|---|---|
     | a | bottom 6%, right −9% | 240 | hidden at ≤479 |
     | b | top 5%, right −5% | — | — |
     | c | bottom −4%, left −3% | — | — |
     | d | bottom −133px, right 10% | 340, z 1 | hidden at ≤991 |
     | e | top 19%, left 2% | z 1 | — |
     - Placeholder: Lumenfold abstract shapes.
2. **Article** (`.key-features-section`, bg `radial-gradient(circle closest-corner at 50% 0, #fbf8ff, #fff)`):
   - `.blog-grid`: `max-width 1080; margin auto; padding-left 282px; position relative`. At ≤991 padding-left is 200. At ≤767 it is 0 and the TOC moves above the content in flow. At ≤479 padding is 0 20.
   - **TOC sidebar:** `.content-left` is absolute (`top 0, left 0, bottom 0`), width 230 (200 at ≤991), padding-top 20.
     - Inside sits `.table-of-contents { position: sticky }` with **no top offset**, so it does not actually stick.
     - Title: 18/600 #0d162f, `pb-16`, 3 words.
     - Box `.auto-toc`: bg #fff, 1px #e6e7ea, radius 16, padding 16.
     - TOC items (`.toc-item`, generated by inline JS from headings): 11px/1.2 #4a6a86, `padding 10 10 10 8`, border-left 1px #dbe2eb, radius 0 5 5 0. Hover: border-left 2px #070e27, bg `#2962ff1a`, text #070e27, pl 7. Transition `color .2s, background-color .2s`. Text truncates at 120 chars.
     - **Bug in the original:** the heading selector string is empty (`querySelectorAll("")`), which throws, so the TOC renders as an empty box. Lumenfold should build a working TOC over the h2s, with a `top` offset (e.g. 96px) so it actually sticks.
   - Content column `.container-default.features`: `max-width 880; padding 20px 0`. Rich text styles:
     | Element | Style |
     |---|---|
     | h2 | 1.8rem (28.8) 600, `mb-1rem`, `mt-0`, #0d162f |
     | h3 | 1.5rem, `mt-1.5rem mb-.5rem` |
     | h4 | 1.4rem, `mt-1.5rem` |
     | p | 16px #0d162f, `mb-1rem` |
     | ul | `pl-1.25rem`, `my-1rem` |
     | ol | `pl-1.5rem`, `my-1rem` |
     | li | #0d162f, `my-.25rem pl-.5rem` |
     | a | underline, #0d162f |
     | blockquote | 2px #6056ff left border, #6056ff text, 1.25rem |
     | strong | 600 |
   - Volume: the llm sample has 10 h2 · 15 h3 · 38 p · 80 li (about 1,440 words). The industry sample has 10 h2 · 0 h3 · 34 p · 50 li (about 1,650 words).
   - No images, no related rail and no in-article CTA.
3. **W.CTA** (`.section_footer-cta`, also on W1): `.container-large` (max 1228, width 90%), `.padding-section-medium` (padding 5rem 0; 4rem at ≤991, 3rem at ≤767).
   - Card `.transform-cta-wrapper`: bg #fff, 1px #e6e7ea, radius 16, `pt-40 pb-60` (`80 20 20` at ≤479), centred column, overflow hidden.
   - Decor: a stars background SVG and 2 character illustrations. Placeholder: Lumenfold marks.
   - Glow: `.transform-gradient` ellipse, 90% × 200, bg #943bff, `blur(15px)`, opacity .08, bottom −100.
   - h1-styled heading `.heading-style-h2`: 48px (44 / 36 / 30 by breakpoint) 600, lh 1.2, `text-wrap: balance`, with a line break and an #6056ff span.
   - Body: 18px/150% #868a97.
   - Buttons `mt-24`, centred: `.button.is-small` and `.button.is-alternate.is-small`.
   - Fine-print row: 14px #868a97 with an icon.

---

## Cross-template component inventory (what Build must add beyond CLONE_SPEC)

| Component | Used by | Notes |
|---|---|---|
| SearchInput + SelectFilter + Reset + ResultCount + LoadMore + EmptyState | T1 | client filter, page size 48, debounce 80ms, `?category=` deep link |
| CatalogCard (logo-tile card, square, hover bg) | T1 | 3/3/2/1 cols, gap 16 |
| Breadcrumb (slash, 14px) | T2 | MP variant: 12px, link colour indigo, gap 6 |
| NumberedSteps / DefinitionRows (capped at 12 plus "and N more") | T2 | |
| ClosingCTA (GrainBand rounded-2xl + 6 coins) | T1–T4 | |
| FAQAccordion (single-open, 32px +/− disc) | T1, T4 | |
| RunTimeline panel (tabbed, masked scroll, staggered reveal) | T3 | |
| PipelineTile (3 cells + arrows) + Compare table (dashed) | T3 | |
| EvalsCard (path draw) | T3, T4 | |
| StackCollapse (cycling list, 1.8s) | T3 | |
| AgentsHero graph (animated dashed SVG paths) | T4 | |
| CompetitorTable (picker popover) | T4 | |
| TasksCTA (4-phase scripted checklist) | T4 | |
| Node canvas (react-flow placeholder) | T4 | not measurable; static placeholder |
| MP Header/Footer, CardA, CardB, FilterBar (dropdowns, sort, dashed add-filter chip, removable chips, tag popover), Pagination | M1–M3 | marketplace tokens B.0 |
| MediaCarousel (16:9 stage + 120px thumbs) | M3 | |
| HairlineMetaGrid (gap-px trick) | M3 | |
| VerticalFlowDiagram (350px nodes, dotted stage) | M3 | |
| Sticky TOC article layout | W3 | fix the empty-selector bug and add a sticky `top` |

**Sticky elements across all templates:** the main header (fixed) and the MP header (sticky). There are no sticky sidebars or sticky CTAs: W3's TOC is `sticky` with no offset, so it is effectively static.

## Not measured / open items
- Rendered section heights, line counts and real column pixel widths. These were not captured (no browser). Column widths above are derived.
- Webflow IX2 interaction timings (W1 card hover, W2 heading scale-in and accordion). These live in webflow.js and are not in the HTML.
- react-flow node layout and animation timing on T4 AgentComparison.
- Per-node fill colours in the M3 flow diagram, which are set at runtime.
- The `/agent-templates-software` → marketplace slug remap is data-driven and not 1:1. For Lumenfold, route every family to its own template instead of reproducing the redirects.
