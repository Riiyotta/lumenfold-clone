Source: https://relevanceai.com/

# PAGES_COMPANY — company / commercial page templates (Lumenfold clone)

Routes: `/pricing`, `/enterprise`, `/about-us`, `/careers`, `/customers`, `/customers/<story>` (sampled from `/customers/canva`), `/book-a-demo`, `/contact-support`, `/partners`, `/privacy-policy` (the legal template).

**Read `../CLONE_SPEC.md` first.** This file only covers what is new or different. Tokens, fonts, type scale, buttons, the gutter-rail Row, grain panels, glass chips, header, footer, LogoGrid, Testimonials, CaseStudies, EnterpriseSecurity, IntegrationsShowcase, ExpandTiles (HowWeWork) and the motion presets `EASE` = `{duration:.5, ease:[.23,1,.32,1]}` and `SPRING` = `{type:'spring',stiffness:190,damping:22,mass:.7}` all come from there.

**How this was measured (2026-10-21):** I could not use a live browser here because another agent was using the shared one. Instead I curled the server-rendered HTML for each route, the CSS bundles (`/_astro/agents.CG0qEBST.css`, `/_astro/_slug_.DpHba7i5.css`, `/css/relevance-site.css`, `/css/components.css`) and the Astro island JS. Values come from Tailwind class strings, compiled CSS and the JS source. Rendered heights were **not** measured. Anything that is filled in by a third party at runtime (the HubSpot forms, the Ashby jobs iframe) is marked as **not inspectable**.

**Copy policy:** Every text slot is given as role, approximate chars/words and lines. Do not reuse their copy, prices, names, logos or photos. Lumenfold placeholders must keep the same lengths.

---

## 0. Shared rules for these pages

### 0.1 Two stacks
| Routes | Stack | What to do in the clone |
|---|---|---|
| pricing, enterprise, careers, customers, customers/<story>, book-a-demo, privacy-policy | New Astro + Tailwind `tw-` system (same as home) | Build exactly as specced |
| about-us, contact-support, partners | **Legacy Webflow** template (`relevance-site.css`, jQuery, GSAP, Webflow IX `data-w-id`). It has a different header (`.rel-navbar_*`) and footer (`.footer-section`) | **Rebuild them on the new shell** (Header, gutter-rail Rows and Footer from CLONE_SPEC) so the brand stays consistent. Keep the section order and content structure below. Legacy measurements are listed for reference only, and the mapping to new components is given per section. The legacy colour vars resolve to the same palette (`--dark-purple #0d162f`, `--indigo #6056ff`, `--borders #e6e7ea`, `--borders-dark #cfd0d5`, `--dark-purple-50-text #868a97`, `--pill-bg #f9f9fb`), so no new tokens are needed |

### 0.2 Page shell (new stack)
- `<main class="pt-16 min-h-screen bg-surface-light">`. The 64px top padding clears the fixed 65px header.
- Every section is a Row: `[gutter L min-w 224 border-r][center max-w 1300][gutter R min-w 290 border-l]`, with gutters `hidden desktop:block` and an absolute rail copy behind. Stacked Rows use `mt-[-1px]` and `border-t` on the center and on both gutters.
- **Content padding presets** (centre column):
  - `Section` default: `px-6 md:px-12 lg:px-20`, i.e. 24, 48 and 80px (80 at 1024 and up, including 1280 and 1440).
  - `StackedSection` / `PageSection`: the above plus `py-12 md:py-28` (48/112px).
  - Pricing blocks: `px-6 md:px-12 py-16 md:py-24`, i.e. 24/48px horizontal and 64/96px vertical. **Different from the default**: there is no lg 80px step.
  - Legal and story body: `px-6 md:px-12`, with no lg step.
- **`PageSection` heading block** (careers, enterprise): wrapper `max-w-2xl mb-12 md:mb-14` (672px wide, 48/56px below). Inside it:
  - h2 `text-3xl md:text-4xl tracking-tight` (30 → 36px, -0.025em), `line-height:1.35`, Sora 400.
  - p `mt-5 text-base md:text-lg` (16 → 18px), `line-height:1.6`, #868a97. Some instances drop `md:text-lg`.
  - The block reveals with `initial {opacity:0,y:16}` → in view `{opacity:1,y:0}`, using EASE.
- **Page-hero H1 (new pages)**: `text-4xl md:text-5xl` (36 → 48px), `tracking-tighter` (-0.05em), `line-height:1.15`, Sora 400, #0d162f. Accent words use `<span class="text-brand-indigo">` (#6056ff).
- **Breakpoint key**: 375 is base, 768 = `md`, 1024 = `lg`, 1280 = `xl`, 1440 = `desktop` (rails appear). "1280" below means lg+xl with no rails. "1440" means rails on and a 926px centre column.

### 0.3 New shared components
**A. FAQ accordion (`PricingFAQ`)**
- Container: `max-w-3xl mx-auto border border-border-default divide-y divide-border-default`. That is 768px wide, square corners, 1px #e6e7ea hairlines between items.
- Trigger is a `<button>`:
  - `w-full flex items-center gap-4 py-5 px-4 md:px-6 text-left`, hover `bg-gray-50/50` (`transition-colors` 150ms).
  - Focus `outline-none`. There is no custom focus ring, so **add `focus-visible:ring-2 ring-brand-indigo` in the clone**.
- Icon disc: `w-8 h-8 rounded-full border shrink-0 transition-all`.
  - Closed: `border-border-default`, hover `border-gray-400` (#9ca3af). Inside is a 12×12 "+" glyph in #868a97, stroke 2, round caps.
  - Open: `bg-brand-indigo border-brand-indigo` with a white 12px "–" (`M1 6h10`).
- Question text: Sora 500, `text-base md:text-lg` (16 → 18px), `leading-relaxed` (1.625), #0d162f. Slots run 21–41 chars (3–7 words), one line on desktop and up to 2 lines on mobile.
- Answer: `pb-5 pl-[52px] md:pl-[56px] pr-6`, #868a97, leading-relaxed. Inline links are `text-brand-indigo hover:underline`.
- Behaviour: single-open (`useState(null)`), all closed initially. AnimatePresence `initial {height:0,opacity:0}` → `{height:'auto',opacity:1}`, exit reverses, `duration .2` (default ease). Content sits in an `overflow-hidden` wrapper.
- Pricing has 3 items. Section header: h2 `text-3xl md:text-4xl font-medium mb-4` Sora (30 → 36px, weight 500), 26 chars and 3 words. Sub p is 33 chars, #868a97. Block `text-center max-w-2xl mx-auto mb-12`.

**B. Check-list item (pricing card)**
`li.flex items-start gap-2`. It holds a 16×16 check icon (`text-green-500` #22c55e, shrink-0) and `span text-sm` (14/20) in #0d162f. Lists use `space-y-3` (12px).

**C. Media play tile** (customers, book-a-demo; same as the home Testimonials)
- Image `w-full h-full object-cover`.
- Overlay `bg-gradient-to-br from-brand-indigo/40 to-brand-indigo/0`.
- Play disc `w-16 h-16 rounded-full border-2 border-white bg-white/10`, hover `bg-white/25`, with a 24px white play icon.
- Click opens the YouTube VideoModal (same as home).

**D. Pill tag (static)**
- Story-card tags: `inline-block px-3 py-1.5 bg-gray-100 (#f3f4f6) text-xs (12/16) font-medium text-text-secondary-light rounded-full`.
- Story-header tags: `px-4 py-2 text-sm font-medium text-text-primary-light bg-gray-100 rounded-full`. The link variant adds `hover:bg-gray-200` and a trailing 14px external icon at opacity .5.

---

## 1. `/pricing`

The page is one enterprise-style plan card, not a tier grid. The live page has **1 tier, it is not highlighted, and there is no billing toggle, comparison table or price figure.** The card holds a plan name, a one-line description, 12 feature check rows in two columns, and a full-width CTA. If Lumenfold needs several tiers, repeat this card in a grid (`grid md:grid-cols-3 gap-px bg-border-default border`, matching the careers values grid idiom). That would be an extension, not something measured.

| # | Section | Notes |
|---|---|---|
| 1 | PricingHero (H1 + plan card) | |
| 2 | LogoGridSection | Same as home §3.2, `border-y` on the centre column. 13 logo cells, some with an indigo "story" link |
| 3 | PricingFAQ | §0.3 A, 3 items |
| 4 | Footer | Home |

**1. PricingHero**
- Section `relative bg-surface-light overflow-hidden` with rails. Inner padding `px-6 md:px-12 py-16 md:py-24`.
- **Floating decor**: 6 small SVG glyphs (`absolute w-8 h-8 opacity-50 pointer-events-none hidden lg:block`), each a 32px agent/shape sticker. Positions: top 8% right 8%; top 18% left 12%; top 5% left 25%; top 12% right 20%; top 22% right 5%; top 25% left 5%. They are hidden below 1024. Lumenfold should supply 6 of its own 32px mono glyphs.
- Title block `text-center max-w-4xl (896) mx-auto mb-12`. H1 `text-4xl md:text-5xl font-medium mb-4 leading-tight md:leading-snug`, Sora **500**: 36px/45 on mobile, 48px/66 from md. Copy is 2 forced lines (`<br>`): line 1 is about 29 chars (5 words), line 2 is about 12 chars (2 words).
- **Plan card**:
  - Wrapper `max-w-2xl (672) mx-auto border border-border-default` (square corners, 1px #e6e7ea).
  - Inner `flex flex-col p-8 md:p-10 bg-white` (32/40px).
  - Header `text-center mb-6`:
    - h3 `text-2xl (24/32) font-medium` Sora 500, about 10 chars, 1 word.
    - p `text-sm text-text-secondary-light mt-2`, about 76 chars (12 words): 2 lines on mobile, 1 to 2 on desktop.
  - Divider `border-t border-border-default mb-6`.
  - Features `grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8`. That is two `ul.space-y-3` columns of 6 rows each (12 rows total), using the §0.3 B check item. Each label is 14–26 chars (2–5 words) on a single line.
  - CTA: primary button (home) plus `w-full justify-center`, `px-5 py-2.5 text-sm`, `rounded-button` 4.8px. Label is about 13 chars (3 words).
- Motion: the card wrapper animates `initial {opacity:0,y:20}` → `animate {opacity:1,y:0}`, `duration .4`, **on mount** (not on scroll). The H1 does not animate.
- Per breakpoint: at 1440 the centre column is 926 and the card is 672 centred. At 1280 and 768 the card is 672 centred. At 375 the card is full width (327) with 1 feature column (12 stacked rows).

---

## 2. `/enterprise`

| # | Section (component) | Status |
|---|---|---|
| 1 | EnterpriseHero (split H1 + grain chip panel) | NEW |
| 2 | LogoGridSection | Home §3.2 |
| 3 | Testimonials (2 tabs) | Home §3.10, with 2 tabs (`grid-template-columns:repeat(2,1fr)`) |
| 4 | EnterpriseSecurity | Home §3.8. Same component: badge strip in the `rounded-xl bg-slate-50` panel (2 badges, 104px SVG), then a 3-column check-list grid with 4–5 items per column |
| 5 | AgentGovernance (3 ExpandTiles) | Home §3.3 ExpandTiles, with 3 tiles (violet, pink, blue). The heading uses the PageSection block, with the p held at `max-w-lg` |
| 6 | StackCollapse | NEW |
| 7 | CaseStudies | Home §3.4 |
| 8 | ProductionGap | NEW |
| 9 | IntegrationsShowcase | Home §3.9 |
| 10 | CompetitorComparison (table) | NEW |
| 11 | EnterpriseCTA (grain card) | NEW |
| 12 | Footer | Home |

**1. EnterpriseHero**
- Section `relative pt-10 md:pt-16 overflow-hidden`. Content padding is the Section default.
- Top grid `grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-y-8 lg:gap-x-10 items-center pb-10 md:pb-14`:
  - H1 `lg:col-span-7 text-5xl` (48px at every breakpoint), `line-height:1.2`, `letter-spacing:-0.15rem` (-2.4px), `text-wrap:balance`, Sora 400. About 44 chars (6 words), 2 lines at lg and up, 3–4 lines at 375.
  - Right column `lg:col-span-5 lg:pt-4`:
    - p `text-base max-w-xl`, `line-height:1.6`, #868a97, about 123 chars (19 words), 3–4 lines.
    - Buttons `flex flex-wrap gap-4 mt-6`: primary plus secondary, **both `!rounded-full`** (the pill variant). Labels are about 11 and 13 chars.
  - Below 1024 it is a single column: H1, then copy, then buttons.
- Grain panel block `pb-6 md:pb-12 lg:pb-20`. The panel is `relative w-full overflow-hidden` with the **violet grain** background and noise overlay, square corners. Inner `px-6 py-10 md:px-12 md:py-16 lg:px-16`.
- Inside the panel is a centred cloud of glass chips and avatars:
  - Layout: `flex flex-col items-center gap-2.5 md:gap-3`, made of 2 rows, each `flex flex-wrap justify-center gap-2.5 md:gap-3`. The rows hold about 8 and about 7 items.
  - Avatar: 30×30 `rounded-full bg-white`, `box-shadow: 0 0 0 2px rgba(255,255,255,.9), 0 2px 8px rgba(13,22,47,.12)`.
  - Chip: `rounded-full border border-white/60 py-1 pl-1 pr-3 text-[12px] font-medium gap-1.5`, `background: rgba(255,255,255,.55)`, shadow `glass-sm`, backdrop blur. It starts with a 22×22 white disc holding a 13px icon. Label is 4–18 chars.
  - Pattern per row: avatar, chip, chip, avatar, chip, chip, avatar…
- Motion (on mount, EASE):
  - Top grid `{opacity:0,y:16}` → `{1,0}`.
  - Panel `{opacity:0,y:18}` → `{1,0}`, delay .15.
  - Inner wrapper `{opacity:0,y:32}`.
  - Each chip or avatar `{opacity:0,y:10}` → `{1,0}`, delay `.3 + i*.05` (i counts across both rows, so about 15 items finish around 1.0s).

**6. StackCollapse** (layered stack diagram, list, marquee, closing card)
- Uses the StackedSection padding. Heading `max-w-3xl mb-12`:
  - h2 `text-3xl md:text-4xl tracking-tight`, `line-height:1.25`, about 31 chars (7 words).
  - p `mt-5 text-base md:text-lg max-w-2xl`, `lh 1.6`, about 127 chars (25 words).
- Body wrapper reveals `{opacity:0,y:18}` → in view (`once`, amount .2), EASE.
- Row 1 `grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center`:
  - Left: an SVG isometric layer stack, `width:100%; max-width:460px`, viewBox `0 56 380 478`, centred below lg. It has 8 stacked plates and a top plate. Plates use variants `hidden {opacity:0,y:14}` → `show {opacity:1,y:0}`, `staggerChildren .08, delayChildren .05`. Plate opacity runs `.32 + i/(n-1)*.4`, strokes are `rgba(13,22,47,.18)`, and fill/stroke transitions take .45s. After `(8*.08+.5)+.6`s ≈ 1.74s the plates "collapse" into one.
  - Right: list card `bg-slate-50 rounded-2xl (16px) overflow-hidden`, `ul flex flex-col gap-1 p-2` with **9 rows**:
    - Row `flex items-center gap-3 py-3 px-3.5 rounded-lg (8px) transition-all duration-300`.
    - Name: Inter 500 14px, 5–19 chars.
    - Right-aligned meta: `ml-auto hidden sm:inline` 12.5px #868a97, 8–15 chars.
    - Active row: `background:#fff; box-shadow: inset 0 0 0 1px rgba(13,22,47,.05), inset 0 2px 6px rgba(13,22,47,.08)` and name colour #6056ff. Inactive name colour is #0d162f.
    - Auto-cycle: once in view, it waits `(9-1)*80+1600` = 2240ms, then advances the active row every **1800ms**, looping. Disable it under `prefers-reduced-motion`.
- Row 2 `mt-16 md:mt-20`:
  - h3 Inter 400 24px, `lh 1.3`, `max-w-2xl mb-8`, about 50 chars (9 words).
  - **Marquee**: wrapper `overflow-hidden` with an edge mask `linear-gradient(to right, transparent 0, #000 64px, #000 calc(100% - 64px), transparent 100%)`. Track `flex w-max`, holding cards ×2 (duplicated for the loop).
    - CSS `@keyframes stackPairMarquee { from {transform:translateX(0)} to {transform:translateX(-50%)} }`, `animation: 80s linear infinite`. It pauses on hover and is `animation:none` under reduced motion. It is also paused (`animation-play-state:paused`) until in view.
    - Card cell `w-[340px] sm:w-[400px] shrink-0 pr-5`. Card `bg-slate-50 rounded-2xl p-5 flex flex-col gap-4 h-full`. It holds:
      - Title Inter 500 15.5px, lh 1.35, 31–41 chars.
      - Meta row 13px `mt-1.5 gap-1.5`: two coloured words (#7a49ff / #6d4fff / #744cff) with a grey "·" or "+" between them.
      - Mini-chart tile `bg-white rounded-xl px-4 py-5 mt-auto`, shadow `inset 0 0 0 1px rgba(13,22,47,.05)`, holding an SVG at viewBox 232×104–108.
    - There are 5 unique cards (10 rendered).
- Row 3: closing card `mt-8 md:mt-10 bg-slate-50 rounded-2xl p-6 md:p-10 lg:p-14`, laid out `grid md:grid-cols-2 gap-10 md:gap-16 items-center`:
  - h3 Inter 400 `font-size:clamp(24px,2.2vw,30px)`, lh 1.4, `max-w-md`, about 57 chars (11 words).
  - p `mt-5 max-w-sm` 16px, lh 1.6, `rgba(13,22,47,.72)`, about 83 chars.
  - Right: SVG diagram `max-width:420px`, viewBox 360×232.

**8. ProductionGap** (gap diagram)
- PageSection heading: h2 about 52 chars (8 words), 2 lines; p about 195 chars (33 words), 3–4 lines.
- **md and up**: one inline SVG `w-full h-auto`, viewBox `0 0 1000 470`. The connectors are dashed (`stroke #b6b9c0`, `strokeDasharray "4 6"`). Motion (in view):
  - Path 1 `pathLength 0→1`, duration 1.1, delay .1, ease [.23,1,.32,1].
  - Path 2 `pathLength 0→1`, duration 1.5, delay .55, same ease.
  - Labels `opacity 0→1`, duration .55, with staggered per-label delays.
- **Below md**: a stacked fallback list (no SVG):
  - Top box `border bg-white px-4 py-3.5`: title 14px semibold (about 8 chars) and sub 12px #868a97 (about 23 chars).
  - Then a `border-top:1.5px dashed rgba(96,86,255,.5)` divider.
  - Then 4 bands `px-4 py-3.5 border-x border-b`, with backgrounds getting darker: `rgba(238,242,255,.45)`, `rgba(238,242,255,.65)`, `rgba(227,233,255,.8)`, `rgba(219,226,255,.9)`. Each has a title 14px 500 (20–42 chars) and an optional 12px sub.

**10. CompetitorComparison** (comparison table)
- PageSection heading: h2 about 13 + 14 chars, with the second phrase in indigo. p `max-w-lg` about 130 chars.
- Table `border border-gray-200 (#e5e7eb) overflow-hidden bg-white` (square corners).
- **Columns (md and up)**: `grid-cols-[220px_1fr_1fr]`, which becomes `lg:grid-cols-[260px_1fr_1fr]`. They are: feature label | Lumenfold (highlighted) | competitor (switchable).
- **Header row** `border-bottom:1px solid #e5e7eb`. Cells are `px-5 py-3.5`, with `border-right:1px solid #f3f4f6` on cells 1 and 2.
  - Cell 1 is empty.
  - Cell 2 is the brand logo at 18px high.
  - Cell 3 is the **competitor dropdown**: button `flex items-center gap-2 w-full`. Label Inter 600 13px #374151, -0.01em, about 21 chars. Chevron chip `ml-auto w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200` with a 14px chevron that rotates 180° when open.
  - Menu: `absolute left-0 right-0 z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden`. Items are `flex gap-1.5 w-full px-4 py-2.5 hover:bg-gray-50`, with a 14px logo and a 12px/500 label. The active item gets `bg-gray-50` and label #6056ff (others #374151). Selecting an item closes the menu.
- **Body: 7 rows.** Rows are separated by `border-bottom:1px solid #f3f4f6`; the last row has none.
  - Label cell `px-5 py-4`: Inter 500 13px #111827, -0.01em, lh 1.4, 21–32 chars (4–6 words).
  - Lumenfold cell `px-5 py-4 flex gap-3`, **bg `#fafafe`** (the column highlight). It holds a 20px status disc (`rounded-full`, bg `#ecfdf3` with a green check) at `mt-0.5`, then text 13px #374151, lh 1.55, 72–135 chars (2–4 lines).
  - Competitor cell: same layout, text #6b7280. The status disc bg is `#fffbeb` (amber, "partial") or `#fef2f2` (red, "no"). Copy runs 84–124 chars.
  - On competitor change the cell content cross-fades: AnimatePresence `opacity 0→1`, exit 0, **duration .15**.
- **Below md**:
  - Header row is `grid-cols-2`: logo at 16px, and the dropdown with 12px label and `w-5 h-5` chip.
  - Each row becomes the label as an **uppercase eyebrow** (`px-4 pt-3 pb-1`, 11px, 600, #9ca3af, 0.05em), then `grid-cols-2` cells `px-4 py-3 gap-2` with 12px text, lh 1.5.

**11. EnterpriseCTA**
- StackedSection padding. Card `relative overflow-hidden rounded-2xl (16px)`, violet grain plus noise. Inner `relative px-6 py-16 md:py-24`.
- **Floating avatars (lg and up only)**: 6 glass discs `absolute h-11 w-11 rounded-full border-white/60 bg-white/70 backdrop-blur`, glass shadow, each holding a 28px avatar.
  | Position | Rotation |
  |---|---|
  | top 16% left 4% | -8° |
  | top 48% left 10% | +6° |
  | top 76% left 5% | -4° |
  | top 14% right 4% | +7° |
  | top 50% right 10% | -6° |
  | top 74% right 5% | +5° |
- Centre `mx-auto max-w-xl flex flex-col items-center`:
  - Text reveals `{opacity:0,y:16}` in view.
  - h2 PageSection style, about 26 chars (6 words).
  - p `max-w-lg mx-auto`, colour `text-primary/80`, about 160 chars, 3–4 lines.
  - Buttons `mt-8 gap-4`: primary pill (`!rounded-full`) and secondary pill with `!bg-white hover:!bg-[#f9f9fa]`.

---

## 3. `/careers`

| # | Section | Notes |
|---|---|---|
| 1 | CareersHero | NEW |
| 2 | CareersAbout (word-reveal statement) | NEW |
| 3 | CareersValues (6-cell grid) | NEW |
| 4 | CareersRoles (`#jobs`, Ashby embed) | NEW |
| 5 | Footer | |

**1. CareersHero**
- Section `relative pt-10 md:pt-16 pb-16 md:pb-20 overflow-hidden`, Section default padding.
- Centre stack `flex flex-col items-center text-center`:
  - H1 page-hero style (§0.2), `max-w-3xl`, about 38 chars plus an indigo span of about 12 chars (9+2 words), 2 lines.
  - p `mt-5 max-w-xl text-base md:text-lg`, lh 1.6, #868a97, about 77 chars, 2 lines.
  - Button row `mt-8 gap-4` with one primary button in the **large size** `text-base px-6 py-3`, about 9 chars, anchored to `#jobs`.
- Team photo `mt-12`: `img w-full border border-border-default`, square corners, natural ratio (wide group shot, about 2.4:1), `loading=eager`. Lumenfold should supply its own wide team image.
- Motion (mount, EASE): text block `{opacity:0,y:16}` → `{1,0}`, then image `{opacity:0,y:18}` with delay .1.

**2. CareersAbout** (scroll word reveal)
- PageSection with no title. h2 `max-w-4xl text-2xl md:text-[2rem]` (24 → 32px), tracking-tight, `line-height:1.5`, Sora 400. The statement is about 60 words (about 330 chars), 4–5 lines at desktop and about 10 at 375.
- Each word is its own `motion.span`:
  - `initial {opacity:.18}` → in view `{opacity:1}`.
  - `viewport {once:true, amount:.9}`.
  - `transition {...EASE, duration:.35, delay: i*.018}`, where i is the word index (about 1.1s across the whole paragraph).
- About 4 key phrases (place names and the product noun) are `text-brand-indigo`.

**3. CareersValues**
- PageSection heading: h2 only, about 14 chars.
- Grid `grid md:grid-cols-2 gap-px bg-border-default border border-border-default`. This is the **hairline-gap grid idiom**: the 1px gap shows the border colour, giving 6 cells in a 3 × 2 layout.
- Cell `bg-surface-light p-6 md:p-8`:
  - Icon `block h-8 w-8 text-brand-indigo` (an SVG 48×49 viewBox, scaled to 32).
  - h3 `mt-5 text-lg` (18px), lh 1.3, Sora 400, 16–30 chars.
  - p `mt-2.5 text-[15px]`, lh 1.6, #868a97, 194–238 chars (about 38 words, 4–5 lines at 2 columns).
- Motion: each cell `{opacity:0,y:16}` → in view (`once`, amount .3), EASE, `delay: (i%2)*.08`. Right-column cells lag by 80ms.

**4. CareersRoles** (job list)
- PageSection `id="jobs"`: h2 about 13 chars, p about 100 chars.
- Job list: `div#ashby_embed.min-h-[400px] overflow-hidden`, populated at runtime by a third-party iframe (`jobs.ashbyhq.com/<org>/embed`). **Not inspectable** (iframe, client-rendered), so the row design is unknown. At xl and up (1280) a CSS hack widens the iframe: `#ashby_embed:not(.ashby-detail) iframe { width: calc(200% - 672px); margin-left: calc(672px - 100%); }`. A `postMessage` listener toggles `.ashby-detail` for job detail views.
  - **For Lumenfold**: build a native list matching the system. Suggested: a `divide-y border` list with a role title (Inter 500 16px), a meta line (14px #868a97 for team · location) and a right chevron, with `hover:bg-gray-50/50`, inside the same hairline idiom. This is a suggestion, not a measurement.
- Notice card `mt-10 border border-border-default bg-white p-6 md:p-7`:
  - Title `font-display` (Sora) 15px semibold, about 31 chars.
  - Body `mt-2.5` 15px, lh 1.6, #868a97, about 236 chars, with an inline link `text-brand-indigo underline underline-offset-2`.

---

## 4. `/customers` (index)

| # | Section | Notes |
|---|---|---|
| 1 | Customers hero | NEW (static, no island motion) |
| 2 | CustomerShowcase (3 featured, tabbed) | The home Testimonials layout with variant `caseStudy` (differences below) |
| 3 | Story card grid | NEW |
| 4 | Footer | |

**1. Hero**
- Centre column padding `pt-10 md:pt-16 pb-16 md:pb-20` plus the Section default horizontal padding, `flex flex-col items-center text-center border-b border-border-default`.
- H1 page-hero style, `max-w-4xl`, about 50 chars (8 words), 2 lines (3 at 375).
- p `mt-5 max-w-2xl text-base md:text-lg`, lh 1.6, about 104 chars, 2 lines.
- Buttons `mt-8 gap-4`: primary and secondary, both large (`text-base px-6 py-3`), labels about 11 and 12 chars.
- No entrance animation.

**2. CustomerShowcase**: differences from the home Testimonials
- **lg and up**: `grid grid-cols-7`.
  - Left `col-span-3 p-16 lg:pl-20 border-r min-h-[490px] flex flex-col justify-center`. Content swaps with `{opacity:0,y:20}` → `{1,0}`, exit `{opacity:0,y:-20}`, duration .3. It contains:
    - h3 Inter 500 `text-2xl leading-snug mb-8` (24/33), about 66–78 chars, 2–3 lines.
    - **Stat list** `flex flex-col divide-y border-y mb-10`, 3 rows, each `flex items-baseline gap-4 py-3`. Value `w-20 shrink-0 text-2xl font-semibold` Sora, lh 1.1, 3–6 chars. Label `text-sm` #868a97, 10–23 chars.
    - Secondary button "read story" with a 16px arrow.
  - Right `col-span-4`:
    - Tablist `grid repeat(3,1fr)`. Each tab is `py-6 border-r last:border-r-0 hover:bg-black/5` with a grayscale logo `h-8 max-w-[140px]`: inactive opacity .5, active 1. The active indicator is `absolute bottom-[-1px] h-1 bg-brand-indigo` (4px), moving with a `layoutId` spring (stiffness 500, damping 35).
    - Below it, a media tile `h-[420px]` (§0.3 C).
- **Below lg**: `divide-y` stack of 3 cards, each `p-6 md:p-8`:
  - Logo `h-6 max-w-[120px] mb-4`.
  - Media `h-[200px] sm:h-[280px] mb-5`.
  - h3 Inter 500 `text-lg leading-snug mb-4`.
  - Stats `flex flex-wrap gap-x-6 gap-y-4 mb-5`: value `text-xl font-semibold` Sora, label `text-xs`.
  - Secondary "read story" button (`text-sm gap-2`, 14px arrow).

**3. Story card grid**
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (no gap), with page CSS:
  ```css
  .stories-grid{border-top:1px solid #e6e7ea}
  .stories-grid>a{border-bottom:1px solid #e6e7ea;border-right:1px solid #e6e7ea}
  @media(max-width:767px){.stories-grid>a{border-right:none}}
  @media(min-width:768px) and (max-width:1023px){.stories-grid>a:nth-child(2n){border-right:none}}
  @media(min-width:1024px){.stories-grid>a:nth-child(3n){border-right:none}}
  ```
- The live page has 7 cards, so the last row is partial at 3 columns.
- Card `a.group block p-6 md:p-8 hover:bg-gray-50/50 transition-colors`:
  - Logo row `mb-6 h-8 flex items-center`, image `h-6 max-w-[140px] object-contain`.
  - h3 Inter 500 `text-xl leading-snug mb-4` (20/27.5), 34–100 chars, 2–4 lines.
  - Tags `flex flex-wrap gap-2 mb-6`: 2 pills (§0.3 D, small), 10–19 chars.
  - Footer `flex items-center justify-between`:
    - Left: span 14px #868a97, about 19 chars ("read" CTA).
    - Right: arrow disc `w-10 h-10 rounded-full border border-border-default`. On card hover it gets `border-brand-primary bg-brand-primary/5`, the 16px arrow gets `text-brand-primary`, and the arrow does `translate-x-0.5`, all with `transition-all`.
- **Bug on the original**: `brand-primary` is not defined in the CSS bundle, so those hover colours do nothing. Only the bg tint and the arrow nudge happen. **For Lumenfold, map `brand-primary` to `brand-indigo` (#6056ff)** so the title, CTA text and arrow disc turn indigo on hover.

---

## 5. `/customers/<story>` (detail template)

| # | Section | Notes |
|---|---|---|
| 1 | Story hero (photo banner) | NEW |
| 2 | Meta bar + article body | NEW prose (`.story-content`) |
| 3 | Share row | NEW |
| 4 | TasksCTA (animated) | NEW |
| 5 | Footer | |

**1. Story hero** (inside the rail Row, full centre-column width)
- Background `absolute inset-0 z-0`: photo `object-cover` (eager), then `bg-indigo-950/50` (#1e1b4b at 50%), then `bg-gradient-to-t from-indigo-950/80 to-indigo-950/0`. The image is decorative (alt="").
- Content `relative z-10 py-12 sm:py-24 md:py-32 px-6 md:px-12`, inner `max-w-3xl (768) mx-auto`, left-aligned:
  - Breadcrumb `flex flex-wrap gap-2 mb-6`: link `text-white/90 text-sm hover:text-white` (about 16 chars), separator `text-white/60`, current page `text-white/80 text-sm` (about 5 chars).
  - H1 `font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-4` (24 → 30 → 36px, Sora 600, lh 1.25), `text-shadow: 0 2px 12px rgba(0,0,0,.4)`. About 54 chars (9 words), 2 lines at lg and 3 at 375.
  - Byline `flex gap-3 text-white text-sm`: about 10 chars, a "·" at opacity .6, then about 12 chars (date and read time).
- Banner height comes from padding only: about 48+content+48 on mobile and 128+content+128 at md.

**2. Meta bar + article**
- Row padding `py-12 pb-10 lg:py-20 lg:pb-10 px-6 md:px-12`, inner `max-w-3xl mx-auto w-full`.
- Meta bar `flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-border-default`: customer logo `h-6` (eager), then `flex flex-wrap gap-3` holding 2 static pills and 1 link pill (§0.3 D, large).
- Article prose `.story-content` (copy into the clone CSS; colours are tokens):
  ```css
  .story-content{color:#0d162f}
  .story-content h2{font-family:Sora;font-size:1.5rem;font-weight:600;margin:2.5rem 0 1rem}       /* md: 1.875rem */
  .story-content h3{font-family:Sora;font-size:1.25rem;font-weight:600;margin:2rem 0 .75rem}       /* md: 1.5rem */
  .story-content h4{font-family:Sora;font-size:1.125rem;font-weight:600;margin:1.5rem 0 .5rem}     /* md: 1.25rem */
  .story-content p{font-size:1rem;line-height:1.75;margin-bottom:1.5rem}                          /* md: 1.125rem */
  .story-content>p:first-child{font-size:1.125rem;line-height:1.75}                               /* md: 1.25rem (lede) */
  .story-content ul{list-style:disc;padding-left:1.5rem;margin-bottom:1.5rem} ol{list-style:decimal;...}
  .story-content li{font-size:1rem;line-height:1.75;margin-bottom:.5rem}                          /* md: 1.125rem */
  .story-content a{color:#6056ff;text-decoration:underline;text-underline-offset:2px;transition:color .2s} a:hover{color:#3b32f9}
  .story-content blockquote{border-left:4px solid #6056ff;padding:.5rem 0 .5rem 1.5rem;margin:2rem 0;font-style:italic}
  .story-content blockquote p{font-size:1.125rem;color:#868a97;margin:0}                          /* md: 1.25rem */
  .story-content strong{font-weight:600}
  .story-content hr{border:0;border-top:1px solid #e6e7ea;margin:2.5rem 0}
  .story-content img{border-radius:.75rem;margin:2rem 0;width:100%}
  .story-content figcaption{font-size:.875rem;color:#868a97;text-align:center;margin:.5rem 0 2rem}
  .story-content code{background:#f9f9f9;padding:.125rem .375rem;border-radius:.25rem;font-size:.875rem;font-family:monospace}
  .story-content pre{background:#0d162f;color:#fff;padding:1rem;border-radius:.75rem;overflow-x:auto;margin:1.5rem 0}
  ```
- Video embed: 16:9 wrapper (`padding-bottom:56.25%; border-radius:.75rem; margin:2rem 0`) holding an absolutely positioned YouTube iframe with radius .75rem.
- Sampled body shape: 2 lede paragraphs (about 220 chars each), 1 video, then **6 numbered h2 sections** (33–45 chars each, with `id` slugs). Each section has 2–15 paragraphs of 40–300 chars. Total is about 1,500 words.

**3. Share row**
- `mt-12 pt-6 flex flex-wrap items-center justify-between gap-6`: label `text-sm` #868a97 (about 6 chars), then `flex gap-3` holding 3 icon buttons (copy link, X, LinkedIn).
- Each button is `p-2 rounded-lg border border-border-default text-text-secondary-light hover:text-brand-indigo hover:border-brand-indigo transition-colors`, with a 20×21 icon. Total size is 36×37.

**4. TasksCTA** (full-width animated CTA, rail Row with `border-t`)
- Centre `relative min-h-[500px] flex items-center justify-center overflow-hidden`.
- Trigger: IntersectionObserver threshold .3, runs once.
- **Sequence**:
  1. **t=0, "initial"**: h2 shows `text-3xl md:text-4xl lg:text-5xl lg:leading-normal max-w-3xl` centred (`px-10`), about 56 chars (10 words), 2 lines at lg. Enter `{opacity:0,y:20}` → `{1,0}`, duration .6.
  2. **t=2.0s, "tasks"**: the h2 exits `{opacity:0, filter:blur(10px)}`. A task grid fades in behind as an `absolute inset-0 p-8` layer, `{opacity:0, filter:blur(20px)}` → `{opacity:1, blur(0)}`, duration .8.
     - Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-3 max-w-4xl`, holding 24 checkbox rows. All 24 show at lg, items 0–15 at sm, and 0–7 on mobile.
     - Each row is `flex gap-2 text-sm #868a97 whitespace-nowrap`, 18–35 chars, fading in with delay `i*.02`.
  3. **t=3.5s, "checking"**: each row gets checked one by one every **40ms**.
     - Box `w-4 h-4 rounded border` goes from `border-text-secondary/40` to `bg-brand-indigo border-brand-indigo`, with a scale pulse `[1,1.2,1]` over .2s.
     - A white check path draws in (`pathLength 0→1`, .2s).
     - The label gets `line-through` at `text-secondary/50`.
  4. **t = 3.5 + 24×0.04 + 0.5 ≈ 4.96s, "final"**: the grid animates to `{opacity:.3, blur(12px)}`. A new block enters `{opacity:0,y:20}` → `{1,0}`, duration .8, delay .2. It holds an h2 of the same style with `mb-8` (about 52 chars) and a primary button at XL size `text-lg px-8 py-4`.
- Lumenfold: write 24 short "busywork" task strings of 18–35 chars each.

---

## 6. `/book-a-demo`

| # | Section | Notes |
|---|---|---|
| 1 | DemoHero (form + testimonial carousel) | NEW |
| 2 | LogoGridSection | Home |
| 3 | Footer | |

**DemoHero**
- Centre column `border-b`. Grid `grid grid-cols-1 lg:grid-cols-2 min-h-[600px]`.
- **Left column (form)** `p-6 md:p-12 lg:p-16 flex flex-col justify-center border-r border-border-default`:
  - H1 `text-4xl md:text-5xl md:leading-tight font-medium mb-4` Sora 500 (36/40 → 48/60). It is 2 forced lines: about 16 chars (3 words) and about 12 chars (2 words).
  - p `text-lg mb-8 max-w-md` (18/28), #868a97, about 107 chars, 3 lines.
  - Form container `max-w-md (448) relative`.
- **Form loading skeleton** (shown until the HubSpot `onFormReady` fires; the real form layer is `opacity-0 absolute inset-0` until then):
  - `space-y-4 animate-pulse`, made of 4 field stubs. Each stub has a label bar `h-4 w-24 bg-gray-200 rounded mb-2` and an input bar `h-12 bg-gray-100 rounded-lg border border-border-default`.
  - The submit stub is `h-12 bg-brand-indigo/20 rounded-lg`.
- **Form field styling** (applied to the injected HubSpot markup; the field list itself is **not inspectable** because it is rendered client-side by HubSpot. The skeleton implies 4 fields plus submit). Use these exact styles for the Lumenfold native form:
  | Element | Classes / values |
  |---|---|
  | Field wrapper | `mb-4` |
  | Label | HubSpot default. Use Inter 14px/20 500 #0d162f, `mb-2` (matching the skeleton's 16px bar plus 8px gap) |
  | Input / select | `w-full bg-white border border-border-default rounded-lg (8px) px-4 py-3 text-text-primary-light`. That makes it about 48px tall at 16px text, matching the `h-12` skeleton |
  | Input focus | `outline-none border-brand-indigo ring-1 ring-brand-indigo` (1px #6056ff ring plus border, which reads as 2px indigo) |
  | Error message | `mt-1 text-sm text-red-500` (#ef4444). Also give the invalid input `border-red-500` (suggested) |
  | Checkbox row (consent) | `flex items-start gap-2`, input `mt-1` |
  | Rich text / legal | `text-sm text-text-secondary-light` |
  | Submit | `w-full bg-brand-indigo text-white font-medium px-6 py-3 rounded-lg cursor-pointer transition-colors`, hover `bg-brand-indigo-dark` (#3b32f9). Note that this is a **flat** indigo, not the radial-gradient button |
  - Suggested 4 fields: first name, last name, work email, company. Use 2 columns at sm and up only if desired; the skeleton is 1 column.
- **Right column (testimonial carousel)**: `hidden lg:flex p-12 bg-gradient-to-br from-surface-secondary-light (#f9f9f9) to-transparent`, inner `flex flex-col h-full`, then `flex-1 flex flex-col justify-center`.
  - Slide content swaps with AnimatePresence: `{opacity:0,y:20}` → `{1,0}`, exit `{opacity:0,y:-20}`, duration .4.
  - Video thumb `button relative w-full aspect-video rounded-xl (12px) overflow-hidden mb-6 group`:
    - Image `object-cover`, overlay `bg-gradient-to-t from-black/40 to-transparent`.
    - Play disc `w-14 h-14 rounded-full border-2 border-white bg-black/30`, which on hover gets `bg-brand-indigo border-brand-indigo`, with a 24px icon.
    - Customer logo bottom-left (`bottom-3 left-3`, `h-5 max-w-[100px] brightness-0 invert drop-shadow-lg`, i.e. white).
    - Click opens the VideoModal.
  - Quote `blockquote relative my-6`:
    - Decorative quote mark `absolute -top-3 -left-1 text-5xl text-gray-300 font-serif leading-none`.
    - p Sora 400 `text-lg lg:text-xl leading-relaxed pl-6` (18 → 20px, lh 1.625), about 137 chars (23 words), 4 lines.
  - Attribution `flex items-center gap-3 pl-4`: avatar `w-10 h-10 rounded-full object-cover border-2 border-border-default`, name 14px 500 #0d162f (about 13 chars), role `text-xs` #868a97 (about 25 chars, role · company).
  - Dots `flex gap-2 justify-center mt-6`: there are **6 slides**. Each dot is a `w-2 h-2 rounded-full transition-all`. The active dot is `bg-brand-indigo w-6` (a 24×8 pill); inactive dots are `bg-border-default hover:bg-text-secondary-light`. Each dot has an aria-label.
  - Autoplay every **6000ms**. It stops once the user interacts with a dot or opens a video.
- Per breakpoint: at 1440 and 1280 there are 2 columns of about 463/463 (1440) or 640/640 (1280). At 768 and 375 there is a single column with the form only (carousel hidden).

---

## 7. `/privacy-policy` (legal template)

| # | Section | Notes |
|---|---|---|
| 1 | Legal body (title + sticky TOC + prose) | NEW |
| 2 | Footer | |

- One StackedSection Row with `border-t`. Padding `py-12 md:py-16 px-6 md:px-12` (no lg step).
- Title: `max-w-4xl mx-auto` wrapper holding H1 `font-display text-3xl md:text-4xl font-semibold tracking-tight md:leading-tight mb-8` (Sora 600, 30/36 → 36/45, -0.025em), about 14 chars.
- Layout (CSS):
  ```css
  .post-layout{max-width:56rem;margin:0 auto;display:flex;gap:3rem}   /* 896px total */
  .post-sidebar{width:12rem;flex-shrink:0}  /* 192px, hidden below lg (Tailwind hidden lg:block) */
  .post-content{flex:1;min-width:0}         /* about 656px at lg+ */
  .toc{position:sticky;top:6rem}
  .toc-title{font-family:Sora;font-size:.6875rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#868a97;margin-bottom:.75rem}
  .toc-list{list-style:none;padding:0;margin:0} .toc-list li{margin-bottom:.25rem}
  .toc-list a{display:block;font-size:.75rem;line-height:1.5;color:#868a97;text-decoration:none;transition:color .2s;border-left:2px solid transparent;padding:.25rem 0 .25rem .75rem}
  .toc-list a:hover{color:#0d162f}
  .toc-list a.active{color:#6056ff;border-left-color:#6056ff;font-weight:500}
  .toc-list .toc-h3{padding-left:1.5rem}
  ```
- TOC: title about 8 chars, then **14 links** (one per h2, 8–41 chars, wrapping to 2 lines at 192px).
- **Scrollspy**: an IntersectionObserver on each h2 target with `rootMargin:"-80px 0px -70% 0px", threshold:0`. When a heading intersects, its link gets `.active` and all others lose it.
- Prose `.prose` (shared blog/legal prose; colour #0d162f):
  - h1 Sora 600, 1.75rem (md 2rem), margin 2.5rem 0 1rem.
  - **h2 Sora 600, 1.375rem (md 1.5rem), margin 2rem 0 .75rem**.
  - h3 1.125rem (md 1.25rem), margin 1.5rem 0 .5rem.
  - h4/h5 1rem, margin 1.25rem 0 .5rem.
  - p 1rem/1.75, mb 1.25rem.
  - ul disc / ol decimal with padding-left 1.5rem, mb 1.25rem. li 1rem/1.75, mb .375rem. Nested lists get mt .375rem, mb 0.
  - a #6056ff underline, offset 2px, hover #3b32f9. strong 600.
  - **table**: 100% wide, collapse, margin 1.5rem 0, 15px. th bg #f4f4f5, 600, left-aligned, padding .75rem 1rem, `border-bottom:2px solid #e6e7ea`. td padding .75rem 1rem, `border-bottom:1px solid #e6e7ea`.
  - blockquote: 4px #6056ff left border, pl 1.25rem, italic, inner p #868a97.
  - hr: 1px #e6e7ea, margin 2rem 0. img radius .75rem. code bg #f4f4f5. pre bg #0d162f.
  - iframe 16:9 with radius .75rem.
  - Wrap the table in `overflow-x-auto` on mobile; the original has no wrapper.
- Sampled document shape: 3 intro paragraphs, then 14 h2 sections. These contain 10 ul (up to 11 items each, every item starting with a bold lead-in of 19–43 chars followed by 100–780 chars), 3 ol and 1 table (3 columns, 3 body rows, cells up to 125 chars). Paragraphs run 100–580 chars.
- Motion: none (static Astro).
- Per breakpoint: at 1024 and up, the 192px sidebar sits beside the 656px content. Below 1024 there is no sidebar and the prose is full width (max 896).

---

## 8. `/about-us` (legacy Webflow → rebuild on the new shell)

Live structure (3 visible blocks):
1. **Hero**: section pill (icon plus about 8 chars), H1 (about 32 chars, then an indigo span of about 7 chars, then about 20 chars; 2 lines), then a wide team photo.
2. **Split story section**: centred section pill (about 10 chars), then a 2-column grid. Left is a square image; right is an h2 (about 89 chars, 16 words, 3 lines) and a rich-text block (3 paragraphs of about 110–123 chars, a 3-item bullet list of 12–46 chars, and a closing paragraph with 5 inline investor links).
3. A hidden "values" slider (`.hide`). **Skip it.**

Legacy measurements (relevance-site.css):
- **Container**: `.container-large` `width:90%; max-width:1228px; margin:auto`.
- **Hero**: `.page-hero-header_content-wrapper` `margin-top:100px`. Padding `5rem` top (`.padding-section-large.is-tight-top`), 6rem at ≤991 and 1.5rem at ≤767.
- **Title width**: `max-width:57.1rem`.
- **H1** `.heading-style-h1.is-hero`: 3.9rem (62.4px), weight 600, lh 1.2. 3rem at ≤991, 2.5rem at ≤767, `10vw` with -1px tracking at ≤479.
- **Title gaps**: pill to H1 `margin-bottom: 2rem` (1.5rem at ≤767).
- **Hero image** `.au-hero-image`: `border-radius:16px; margin-top:60px; width:100%`. 40px at ≤991. 8px radius and 20px top margin at ≤767.
- **Section pill** `.pill`:
  - Size and shape: `min-height:36px; padding:6px 16px; border-radius:18px; gap:8px`, weight 500, #0d162f.
  - Fill and border: bg #fff, `border:1px solid #e6e7ea; border-bottom-color:#cfd0d5`.
  - `box-shadow: 0 9px 13px -5px #e6e7ea, 0 2px 2px 0 #0d162f0d, inset 0 -3px 0 0 #f3f3f4`.
  - Icon 18×18.
  - At ≤991: bg #f9f9fb and no shadow.
- **Split section**: `.padding-section-large` 7rem top / 1rem bottom (6rem/6rem at ≤991, 4rem/4rem at ≤767). Pill block `margin-bottom:3rem`.
- **Split grid** `.layout192_content`: `grid 1fr 1fr; column-gap 5rem; row-gap 4rem; align-items:center`. Column gap is 3rem at ≤991; 1 column with row-gap 3rem at ≤767.
- **Split image**: wrapper radius 12px, overflow hidden; image `aspect-ratio:1; object-fit:cover`.
- **Split h2** `.heading-style-h5`: 1.5rem, 600, lh 1.3 (1.25rem at ≤767), `margin-bottom:1.5rem` (`.margin-small`).
- **Rich text**: p #0d162f 16px/1.5. ul `padding-left:1.25rem; margin:1rem 0`, li `padding-left:.5rem; margin:.25rem 0`. Links #0d162f underline.
- **Motion**: the H1 wrapper starts at `opacity:0` and Webflow IX fades it in on load. The exact IX timing lives in the Webflow runtime and is **not in the CSS**, so use EASE (.5s) for the fade.

**Rebuild mapping (new system):**
- Hero → CareersHero pattern (§3.1): page-hero H1 with indigo span, a 30–40 char p is optional, then a full-width `border` team image (square corners for consistency, or `rounded-xl` if you want the legacy feel).
- Section pill → replace with the home "eyebrow" or a glass pill chip. Do not port the legacy pill shadows.
- Split section → StackedSection holding `grid lg:grid-cols-2 gap-10 lg:gap-20 items-center`, with a square image on the left and on the right an h3 `text-2xl` (Sora 400, -0.025em), then the `.prose` body (§7).

## 9. `/contact-support` (legacy Webflow → rebuild)

Live structure:
1. **Split hero with form**: `.book-demo-section` `margin:80px 0 60px` (40/40 at ≤991, 30 top at ≤767, 0 top at ≤479).
   - Row `.function-header-container.book-demo-sec`: `max-width:1268px; padding:0 20px` (24px at ≤767), `display:flex; justify-content:space-between; gap:32px; align-items:flex-start`. At ≤991 it becomes `flex-direction:column-reverse`, so the image goes on top.
   - Left `.bd-hero-content-wrraper`: `flex:1; max-width:592px; margin-right:20px`. It holds:
     - H1 `.heading-style-h1.is-smaller`: 3.5rem/1.2, 600. About 15 chars, 1–2 lines.
     - Lead `.text-size-medium`: 18px/1.5 #868a97 (16px at ≤479), about 132 chars (29 words).
     - Form wrapper with `margin-top:32px`.
   - Right `.bd-hero-image-wrraper`: `flex:1; max-width:592px; border-radius:24px`. It holds an illustration of 494px wide, `border-radius:12px; margin-top:20px`. At ≤991 the wrapper is 400px tall with overflow hidden and the image at 60% width. At ≤767 it is 360px tall with radius 8. At ≤479 it is 320px tall.
2. **Visible form** (`.media-form`): 3 stacked fields and a submit:
   | Field | Label chars | Type | Placeholder chars |
   |---|---|---|---|
   | Name | 4 | text | 15 |
   | Email | 13 | email | 24 |
   | Enquiry details | 15 | text (single-line on the original; **use a textarea, 4 rows, in the clone**) | 70 |
   - Labels `.bd-form-field-label`: #868a97, weight 400.
   - Inputs are Webflow `.w-input` defaults: `height:38px; padding:8px 12px; font-size:14px; border:1px solid #ccc; margin-bottom:10px; background:#fff`, focus `border-color:#3898ec`. This is off-brand, so **in the clone use the book-a-demo field styles (§6)** instead.
   - Submit `.button-primary`:
     - Size and shape: `min-height:48px; padding:12px 24px; border-radius:8px`, bg #6056ff, hover #7281ff, weight 500.
     - `box-shadow: 0 9px 13px -5px #6056ff66, 0 2px 2px 0 <indigo 25%>, inset 0 -2px 0 0 #3b32f980, inset 0 0 0 1px <white 20%>, inset 0 7px 12px 0 <purple>`.
     - In the clone, use the system primary button at `w-full`, large size.
   - States: `.w-form-done` success message (about 45 chars) and `.w-form-fail` error message (about 53 chars) replace or follow the form. Build them as an inline success panel (`border bg-slate-50 p-6`, check icon, 45-char message) and an error line (`text-sm text-red-500`).
   - A second, hidden form (`.book-demo-form`, `display:none`) has a 2-column grid with gap 16px and 6 fields (first, last, email, phone, company, job title). It has a full-width 60px submit (`radius 8, 18px/500`, hover #4338ca) and a consent checkbox row (`flex items-center`; label 14px 500 #868a97, about 59 chars). It is **not shown** live. Only build it if Lumenfold needs a richer contact form; it then reuses the same field styles.
3. **Logo section** `.logo-section` `padding:60px 0`: centred h (`.heading-style-h3`, 2.5rem/1.2, 600, about 37 chars).
   - Grid `.logo6_list`: flex-wrap, centred, gap 1rem, with each cell `width:calc(18% - .5rem); padding:.875rem`. That is 5 per row and 24 logos at 40px high.
   - **Clone: replace with the system LogoGridSection.**
4. **Footer CTA card** `.home_footer-cta_card` `padding:4rem; overflow:hidden`:
   - Centred h2 (3rem/1.2, 600) with an `em` highlight in indigo (about 15 + 5 + 19 + 6 chars, 2 lines).
   - p 18px, about 143 chars.
   - 2 buttons (primary and white alternate) with gap 1rem.
   - A small note row (2 items of 9 and 16 chars, separated by an 8px dot).
   - Background: a stars SVG plus 2 mascot illustrations positioned absolutely (top-right 145px; bottom-left 195px, which becomes 140px at ≤991), and a blurred purple ellipse (`200px` high, `width 90%`, `blur 15px`, opacity .08, bottom -100px).
   - **Clone: replace with EnterpriseCTA (§2.11)**, which has the same role and is on-system.

**Rebuild mapping**: a DemoHero-style 2-column Row (`lg:grid-cols-2 min-h-[600px]`, left `p-6 md:p-12 lg:p-16 border-r`), with H1 `text-4xl md:text-5xl font-medium`, lead `text-lg`, and the 3-field native form. The right column holds a `bg-gradient-to-br from-surface-secondary-light` panel with a product illustration at 12px radius. Below it go LogoGridSection, then EnterpriseCTA, then Footer.

## 10. `/partners` (legacy Webflow → rebuild)

Live structure, top to bottom:
1. **Hero (split)** `.partners_hero-header_content`: `grid 1fr 1.5fr; column-gap 5rem; row-gap 4rem; align-items:center`. 4rem gaps at ≤991, 1 column at ≤991, 3rem gaps at ≤767.
   - Left: section pill (about 16 chars), H1 (indigo span of about 7 chars plus about 17 chars, 4rem/1.2/600; 3.25rem at ≤991, 2.5rem at ≤767), lead `max-width:30rem` 18px (about 83 chars), then one primary button (about 22 chars) linking to `#apply`.
   - Right: hero image `object-fit:cover; height:100%`, roughly 3:2 landscape.
2. **Feature card** `.partners_features-list_card`: `grid 1fr 1fr; border:1px solid #cfd0d5; border-radius:15px; bg #fff`. 1 column at ≤991.
   - Left: image (cover, full width).
   - Right: content `padding:3rem` (2rem at ≤767), centred vertically. It holds an h2 (3rem/600, about 8 chars plus an indigo span of about 23 chars), a lead of about 62 chars, and a button of about 9 chars.
   - Section padding is 3rem/3rem (2rem at ≤767).
3. **Benefits bento** (`.partners_header-2_*`):
   - Header: centred pill (about 16 chars), h2 (about 9 chars plus an indigo span of about 9), lead of about 145 chars, `max-width:48rem`, `margin-bottom` xxlarge.
   - Grid `.partners_header-2_row`: `grid 1fr 1fr 1fr; gap 2rem`. 1 column at ≤991; gap 1.5rem at ≤767.
   - It has **3 columns**, each a vertical stack (gap 2rem) of 1 small card and 1 large card. The order alternates: column 1 is small then large, column 2 is large then small, column 3 is small then large.
   - Small card: `bg #fff; border:1px solid #cfd0d5; border-radius:16px`, content `padding:1.5rem 2rem 1rem` (1.5rem at ≤767). It holds a 48×48 indigo icon (`mb .5rem`), an h3 (1.5rem/600/1.3, 20–32 chars) and body text (1rem, 26–113 chars).
   - Large card: same frame, content `padding:1.5rem 2rem .5rem`. It holds an h3 (25–39 chars) and body (44–68 chars), then a bottom image wrapper (`border-radius:16px; overflow:hidden`, full width, landscape).
4. **FAQ** (legacy accordion):
   - Heading h3 (2.5rem/600, about 16 chars plus an indigo span of about 9).
   - Card `.faqs-wrapper`:
     - Size: `max-width:864px; min-height:300px; padding:0 4px 10px 24px` (16px left at ≤479).
     - Frame: `bg #fff; border:1px solid #e6e7ea; border-bottom-color:#cfd0d5; border-radius:16px`.
     - `box-shadow: inset 0 -3px 0 0 #0d162f1a, 0 2px 2px 0 #0d162f0d, 0 9px 13px -5px #0d162f1a`.
   - Item bar: `flex; justify-content:space-between; padding:8px 0` (4px at ≤767). Question Inter 600, #0d162f, lh 1.33, 20px (18px at ≤767, 16px at ≤479), 15–24 chars. The right side holds a 55×55 transparent circle with a 16px chevron.
   - Answer: `overflow:hidden`, height animated from 0 by Webflow IX. Paragraph 16px/1.6 (14px at ≤767), #868a97, `padding-right:40px`, 44–292 chars.
   - There are 5 items.
   - **Clone: use the system FAQ accordion (§0.3 A)** with 5 items. It keeps the same roles and is on-system.
5. **Certified CTA card** `.partners_faq_card`: `flex column centered; padding:0 4rem 6rem` (3rem 3rem 6rem at ≤991, 2rem at ≤767). It holds a badge illustration (`max-width:30rem`), an h2 (about 8 + 23 chars), a lead of about 62 chars and a button of about 9 chars.
6. **Application form** `section#apply`: container `max-width:64rem`, padding 7rem/1rem. It holds a centred h2 (3rem, about 25 chars), a sub p (18px #868a97, about 46 chars, `margin-top 2rem`) and `div#partner-form`. That div is a **HubSpot form injected client-side (not inspectable)**. Style it with §6 form styles; suggested fields are name, email, company, website, partner type (select) and message (textarea).
- A hidden logo section (`.hide`) and an empty CTA section are present. **Skip both.**

**Rebuild mapping**:
- Hero → EnterpriseHero top grid (§2.1, `lg:grid-cols-12`, 7/5 split), with a rectangular image or a grain panel on the right.
- Feature card → a StackedSection `grid md:grid-cols-2 border` (square), with the image left and content `p-8 md:p-12` right.
- Bento → the hairline grid idiom (`grid lg:grid-cols-3 gap-px bg-border-default border`). Each column is a `flex flex-col gap-px` stack holding a small (icon) cell and a large (image) cell with `bg-surface-light p-6 md:p-8`.
- FAQ → §0.3 A.
- Certified CTA → EnterpriseCTA.
- Apply form → a centred PageSection holding a `max-w-xl` native form (§6 styles), with 2 columns at md for the short fields.

---

## 11. Motion summary (new items only)
| Component | Trigger | Values |
|---|---|---|
| PricingHero card | mount | y 20→0, opacity 0→1, .4s (default ease) |
| FAQ answer | toggle | height 0↔auto, opacity, .2s; icon disc colour via `transition-all` |
| EnterpriseHero | mount | grid y16 (EASE); panel y18 delay .15; chips y10 delay .3+i*.05 |
| StackCollapse | in view .2 | body y18; plates stagger .08; collapse at about 1.74s; list cycles every 1.8s after 2.24s; marquee 80s linear, pauses on hover, off under reduced motion |
| ProductionGap | in view | pathLength 1.1s/.1 and 1.5s/.55, ease [.23,1,.32,1]; labels .55s |
| CompetitorComparison | select | cell cross-fade .15s; chevron rotates 180° |
| EnterpriseCTA | in view | text y16 (EASE); avatars static, rotated |
| CareersHero | mount | text y16; image y18 delay .1 (EASE) |
| CareersAbout | in view .9 | per-word opacity .18→1, .35s, stagger .018s |
| CareersValues | in view .3 | y16, delay (i%2)*.08 (EASE) |
| CustomerShowcase | tab | panel y20→0 / exit y-20 .3s; indicator layoutId spring 500/35; tab content y10/-10 .2s easeOut |
| Story card | hover | bg gray-50/50; arrow translate-x 2px; disc border/bg tint (map to indigo) |
| TasksCTA | IO .3, once | see §5.4 timeline (2.0s / 3.5s / +40ms per item / about 4.96s final) |
| DemoHero carousel | interval | 6000ms autoplay; slide y20/-20 .4s; dot width 8→24 (`transition-all` 150ms) |
| Legal TOC | scroll | IO scrollspy, rootMargin -80px 0 -70% 0; link colour transition .2s |

## 12. Media slots (Lumenfold placeholders)
| Page | Slot | Size / ratio | Fit | Radius | Overlay |
|---|---|---|---|---|---|
| pricing | 6 decor glyphs | 32×32 SVG | contain | none | opacity .5 |
| enterprise | hero chip avatars | 30×30 round | cover | full | 2px white ring |
| enterprise | CTA avatars | 28 in a 44 glass disc | cover | full | glass |
| enterprise | comparison logos | 18px high (16 mobile) | contain | none | none |
| careers | team photo | full column × about 2.4:1 | natural | 0 (1px border) | none |
| careers | 6 value icons | 32×32 SVG, indigo | n/a | n/a | n/a |
| customers | featured media | lg: col-span-4 × 420px; mobile: full width × 200/280px | cover | 0 | indigo/40 gradient + play disc |
| customers | card logos | 24px high, max-w 140 | contain | n/a | n/a |
| story | hero photo | full centre column × padding-driven height (about 300–500px) | cover | 0 | indigo-950/50 + gradient to top /80 |
| story | inline images / video | full prose width; video 16:9 | cover | 12px | none |
| book-a-demo | video thumb | 16:9 within about 380–560px | cover | 12px | black/40 to-top + play disc + white logo |
| book-a-demo | avatar | 40×40 | cover | full | 2px border #e6e7ea |
| about (rebuild) | team photo; square split image | wide; 1:1 | cover | 12–16px legacy / 0 system | none |
| contact (rebuild) | product illustration | about 494px wide | contain | 12px | none |
| partners (rebuild) | hero image about 3:2; feature image; 3 bento images (landscape); badge illustration max 480px | cover | 15–16px legacy / 0 system | none |

## 13. Not inspectable / gaps
- HubSpot forms (book-a-demo, partners): the field list, labels and validation copy are rendered client-side. Only the container styling (§6) is known.
- Ashby jobs list (careers): it is a third-party iframe, so the row design is unknown and a native design is suggested.
- Webflow IX timings on the legacy pages (`data-w-id` interactions): these sit in the Webflow runtime, not in the CSS. EASE is suggested.
- Rendered section heights were not measured because no browser was used. All layout values come from class strings and CSS.
