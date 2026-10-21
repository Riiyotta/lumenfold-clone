Source: https://relevanceai.com/

# PAGES_PRODUCT: product / solution landing pages (Lumenfold design-system clone)

Routes covered (27): `/workforce` `/features` `/multi-agents` `/knowledge` `/tools` `/api` `/ai-ops` `/gtm` `/inbound` `/outbound` `/phone-agent` `/specialist-agents` `/customer-support-agent` `/bdr-agent-waiting-list` `/invent` `/approvals-escalations` `/version-control` `/schedule-work` `/bulk-run` `/collaboration` `/for-customer-experience` `/for-market-research` `/self-driving-gtm` `/seo-agent` `/slack` `/agent-drop` `/agents-at-work`.

**Scope.** This is a design-system clone for the fictional brand **Lumenfold**. Do not reuse their copy, product or agent names, customer names, logos, vendor icons, avatars, screenshots, photos or illustrations. Text slots are recorded as role + words/chars (+ lines where derivable). Media slots are recorded as size / ratio / fit / radius / overlay.

**Read `../CLONE_SPEC.md` first (cited "CS §n").** It defines the tokens, Inter + Sora, gutter rails, StackedSection, SectionHeading, Buttons, GrainBand + noise, glass chips, Header, Footer, LogoGrid (CS 3.2), ExpandTiles/HowWeWork (CS 3.3), CaseStudies (CS 3.4), UseCases (CS 3.5), CostHero (3.6), EnterpriseSecurity (3.8), IntegrationsShowcase (3.9), Testimonials (3.10), FeaturedIn (3.11), LearnMore (3.12). Sibling specs already define some shared pieces: `PAGES_CATALOG.md` (ClosingCTA, FAQAccordion, StackCollapse, TasksCTA, legacy W.CTA, legacy W2 "uc" page) and `PAGES_COMPANY.md`. This file only adds what is new and gives every page's recipe.

**How this was measured (2026-10-21).** The caller asked me not to use the shared Playwright browser, so nothing was rendered. I curled each route's SSR HTML into an isolated scratch directory, along with:
- the compiled CSS (`/_astro/agents.CG0qEBST.css`, `/_astro/qualified-b.BZV40eAE.css`, `/_astro/self-driving-gtm.mWbJafwM.css`, `/_astro/specialist-agents.BZ_wBIee.css`, and the Webflow `/css/relevance-site.css` + `/css/components.css`);
- 40 Astro island / shared-chunk JS files (motion values come from their `initial / whileInView / transition` props);
- the Webflow IX2 interaction table inside `/js/relevance-site.js` (2,371 events and 325 action lists, parsed to JSON and matched to each page's `data-w-id`s).

Limits of this method:
- **Rendered heights, line counts and getBoundingClientRect values were not measured.** Pixel widths are derived as (content width − gaps) / columns, using the CS §1.5 content widths for the Astro shell: **766 at 1440, 1120 at 1280, 672 at 768, 327 at 375**. Legacy container widths are derived from the CSS (shown in §B.0).
- react-flow canvases and scripted demos were read from source, not watched on screen.
- Third-party embeds (Wistia, Embedly/YouTube, HubSpot forms) are not inspectable.

---

## 0. Template clusters (route → template)

There are **two design systems** among these routes. Neither is the other's variant:
- **A = Astro shell (new system).** `tw-` Tailwind, gutter rails, Sora + Inter, CS Header/Footer.
- **B = Legacy Webflow (old system).** `relevance-site.css`, floating pill navbar, old footer, Inter + Inter Display, breakpoints 991/767/479. Recommendation (same as PAGES_CATALOG): rebuild the B pages on the **A tokens/shell**, keeping only their section layouts and slot counts. The B values are recorded so the layouts can be matched.

| Cluster | Template | Routes | Notes |
|---|---|---|---|
| A1 | **FeatureDetail** (data-driven, one component `FeatureDetailPage`) | `/knowledge`, `/approvals-escalations`, `/version-control`, `/collaboration` | Same 8-section recipe. Only the hero mock, copy and slot counts differ. |
| A1v | FeatureDetail, video variant (`PhoneAgentPage`) | `/phone-agent` | Hero media = video; 1 showcase (+CTAs); 6-card 3-col grid; no FAQ/More. |
| A2 | **ProductLanding** (composed from the section library) | `/workforce`, `/invent`, `/gtm`, `/slack` | Each is a different ordered mix of library sections. Mostly reusable sections, plus one bespoke hero each. |
| A3 | FeatureCatalog | `/features` | A text hero + 14 sticky-heading category rows. |
| A-1off | Manifesto / long-form | `/self-driving-gtm` (own stylesheet), `/specialist-agents` (article, no footer) | One-offs, spec'd in §D. |
| B1 | **LegacyAgentLanding** ("lima-agent") | `/customer-support-agent`, `/seo-agent` | Same skeleton. SEO swaps in a sticky-stack card block and 6-item lists. |
| B2 | LegacySDRLanding ("protocol") | `/inbound`, `/outbound` | Identical sections. Only sections 3 and 4 swap order. |
| B3 | LegacyFeaturePage | `/schedule-work` | Dark hero card + layout rows + bento + FAQ + cards. |
| B4 | LegacyUseCase ("uc-") | `/for-customer-experience`, `/for-market-research` | ≈ PAGES_CATALOG W2. MR adds a case-study block. |
| B5 | LegacyHomeClone | `/ai-ops` | The old homepage section set. |
| B6 | LegacyCenteredHero + bento | `/multi-agents`, `/api` | Centred hero, then a bento/tabs block, then the CTA. |
| B-stub | Stub / CMS list | `/bulk-run` (nav + CTA + footer only, no body content), `/tools` (CMS list of 7 items) | |
| B-1off | Waitlist / events | `/bdr-agent-waiting-list` (form page), `/agent-drop` (dark launch event), `/agents-at-work` (event + video hub) | Spec'd in §D. |

---

## A. Astro section library (new sections only)

Shared assumptions for all A sections:
- **Row.** Every section is a gutter-rail Row (CS 1.5). `mt-[-1px]`, center `border-t #e6e7ea`, bg `#fff` (`tw-bg-surface-light`).
- **StackedSection inner.** `py-12 md:py-28` (48/112) and `px-6 md:px-12 lg:px-20`. Content widths: 766 / 1120 / 672 / 327.
- **PageSection.** A StackedSection plus SectionHeading in a `max-w-2xl` (672) block with `mb-12 md:mb-14` (48/56). Left-aligned unless stated.
- **SectionHeading.**
  - h2: Sora 400, `text-3xl md:text-4xl` (30 / 36px), inline lh 1.35 (40.5 / 48.6), `tracking-tight` −0.025em, #0d162f.
  - p: `mt-5`, Inter `text-base md:text-lg` (16 / 18), lh 1.6, #868a97.
  - Reveal: `opacity 0→1, y 16→0`, `whileInView once, amount .4`, EASE `{duration:.5, ease:[.23,1,.32,1]}`.
- **Fonts.** The global rule `h1,h2,h3,button,a[role=button] {font-family: Sora}` applies. An `h3` is Sora unless it has `tw-font-sans`; `h4` is Inter.
- **Tailwind sizes (compiled).** xs 12/16 · sm 14/20 · base 16/24 · lg 18/28 · xl 20/28 · 2xl 24/32 · 3xl 30/36 · 4xl 36/40 · 5xl 48/48 · 6xl 60/60. Inline `line-height` overrides these where noted.

### A.1 FeatureHero (split 5/7 + mock card)
Used by A1 and A1v.
- Section: `pt-10 md:pt-16 pb-16 md:pb-20 overflow-hidden` (40/64 top, 64/80 bottom). Standard content padding.
- Grid: `grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-12 items-center` (row gap 40; column gap 48). Phone uses `gap-y-8` (32).
  - Text `lg:col-span-5`, derived width: **291 @1440, 439 @1280**. Below lg it is full width: 672 @768, 327 @375.
  - Media `lg:col-span-7`, derived width: **427 @1440, 633 @1280**, then 672 / 327.
- Whole grid: on load `opacity 0, y 16 → 1, 0`, EASE, no delay. Media card: on load `y 18`, EASE, **delay .15**.
- Text slots:
  | Slot | Typography | Length |
  |---|---|---|
  | h1 | Sora 400, `text-4xl md:text-5xl` (36/48), inline lh 1.15, ls −0.1rem (−1.6px), `text-wrap: balance`, #0d162f. Phone: `tracking-tighter` (−0.05em) instead of −0.1rem. | 9–12 words / 45–55 chars |
  | p | `mt-5 max-w-xl` (576), Inter 16 → md 18, lh 1.6, #868a97 | 14–15 words / 82–105 chars (phone: 26 words / 164 chars) |
  | CTA row | `mt-8 flex-wrap gap-4`: primary + secondary buttons, both `!rounded-full` (pill) | 3 words / 11 chars + 3 words / 12 chars |
- **Mock card** (wrapper for every variant): `overflow-hidden rounded-xl (12) border #e6e7ea bg-white`, font Inter (`tw-font-sans`). Inner variants:
  1. **Knowledge fan.**
     - Inner `grid md:grid-cols-[1fr_auto_auto] items-center gap-4 md:gap-2 px-5 py-8 md:px-8 md:py-10`.
     - Left: a list of **5 rows**, `divide-y #e6e7ea`, each `flex gap-3 py-3`. Each row has a 17px doc icon (stroke 1.6, #868a97) and a 12.5px #0d162f label (2–3 words / 11–18 chars).
     - Middle: a 72×150 SVG "fan", `hidden md:block`. It holds 4 bezier paths `M0 75 C 34 75, 38 y, 72 y` with stroke 1.4 and a linear gradient `#c8cbd6 → accent #6056ff`. Each path carries a 2.2px accent dot that travels it via `animateMotion` (dur 2.6s, begin `i*0.4s`, infinite) while opacity runs `0;1;1;0` at keyTimes `0;.15;.85;1`.
     - Right: **4 glass coins**, `flex-row md:flex-col gap-3`. Each coin is 44×44, radius full, 1px border #e6e7ea, bg `rgba(255,255,255,.55)`, shadow `inset 0 1px 0 rgba(255,255,255,.8), 0 2px 8px rgba(13,22,47,.07)`, `backdrop-filter: blur(10px)`. Inside sits a 28px avatar (radius 6, bg black/5).
  2. **Approvals table.**
     - Inner `px-4 py-5 md:px-5 md:py-6`. Column grid `minmax(0,1fr) 150px`, gap 12.
     - Header row: 11px #868a97, `pb-2.5`.
     - **3 rows**, each `border-t py-3.5`: a 22px avatar + a 12.5px task label (truncate, 4–5 words).
     - Action cell: either a pair of 11.5px/500 chips, `rounded-md px-2.5 py-1`:
       - Approve: text #027a48, bg #ecfdf3, border `rgba(2,122,72,.18)`.
       - Decline: text #b42318, bg #fff, border `rgba(180,35,24,.18)`.
     - or a muted mode label.
  3. **Version table.**
     - Grid `34px minmax(0,1fr) 50px 76px`, gap 12.
     - **4 rows** `py-3`, each with:
       - version code: 12px #868a97;
       - initials avatar: 20px, bg #f3f3f4, font 8px/600, plus a 12.5px note;
       - score: 12px/600 #027a48, right-aligned;
       - last cell: "current" label 11px #868a97, or a restore control.
  4. **Collaboration lists.** Inner `px-5 py-8 md:px-8 md:py-10`.
     - Group label 11px #868a97 `mb-3`.
     - **4 project rows** `py-2.5 gap-2.5`: a 14px folder icon (stroke = accent), a 12.5px label and a 10.5px right-side meta.
     - Then `mt-6 border-t pt-4`, a second label, and **3 people rows**: a 24px initials avatar, a 12.5px name (truncate), and a right column with role + scope.
  5. **Phone (A1v): video.**
     - `relative aspect-video bg-#0a0a0a`. A thumbnail fills it (`object-cover`) under a `bg-black/30` overlay.
     - Centred play button: 64×64, radius full, `bg-white/20 backdrop-blur-sm border-white/30`, holding a 24px white play glyph. Hover: `bg-white/30 scale-110`.
     - Click swaps in a YouTube iframe inline (`autoplay=1&rel=0`).
     - Media slot: **16:9, cover, radius 12 (from the card), overlay black 30%.**
- Lumenfold: build the mocks as live HTML with your own labels. Accent per page = `#6056ff` (all 4 feature pages use funcId `sales`).

### A.2 ShowcaseRow (alternating text / screenshot)
- StackedSection. Grid `grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center` (40 / 64).
  - Column width: **351 @1440, 528 @1280**. Stacked below: 672 / 327.
- Row index odd → text `lg:order-2`, media `lg:order-1` (it alternates). Below lg the text is always first.
- Text = SectionHeading. h2: 5–7 words / 32–43 chars. p: 30–42 words / 178–264 chars.
- Phone variant: adds a CTA row `mt-8 gap-4` (primary + secondary pill).
- Media: `overflow-hidden rounded-xl border #e6e7ea bg-white` holding an `img block w-full` (natural height, no crop).
  - Placeholder: a product screenshot at **~4:3 (any ratio works; the height follows the image)**, radius 12, no overlay.
  - Reveal: `y 18`, `whileInView once amount .2`, EASE.
- Count: **2 rows** on each A1 page; 1 on phone.

### A.3 IconCardGrid
Two variants, both inside PageSection (left heading: h2 6–11 words / 36–67 chars, no p).
- **(a) Row cards, 2-col** (A1 "grid").
  - Grid `grid-cols-1 md:grid-cols-2 gap-4`. Card width: **375 @1440, 552 @1280, 328 @768, 327 @375**.
  - Card: `flex items-start gap-4 border #e6e7ea bg-white p-6` (**square corners**).
    - Icon tile: 40×40, `rounded-md` (6), 1px border, bg #f3f3f4, holding a 20px line icon (stroke 1.4, #868a97).
    - h3: Sora 16 / lh 1.4, 500, −0.025em, #0d162f. 3–7 words / 25–38 chars.
    - p: `mt-1.5`, Inter 14 / lh 1.6, #868a97. 7–10 words / 45–56 chars.
  - Reveal per card: `y 16`, `whileInView once amount .3`, EASE, **delay `min(i,3) × .05`**.
  - Counts: knowledge 4, approvals 4, version 4, collaboration 6.
- **(b) Stacked cards, 3-col** (phone).
  - Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`. Card width: **242 @1440, 360 @1280, 326 @768 (2-col), 327 @375**.
  - Card: `flex flex-col gap-4 border bg-white p-6`.
    - A 28px line icon.
    - h3: Sora 18/28 500, −0.025em. 1–4 words / 2–30 chars.
    - p: 14 / 1.6, #868a97. 14–19 words / 109–136 chars.
  - Same stagger as (a). **6 cards.**

### A.4 FAQAccordion
Same as PAGES_CATALOG "FAQAccordion". It is `FAQSection` and also used on /workforce.
- PageSection, left-aligned.
  - h2: 1 word.
  - p: 5 words, followed by an inline `#6056ff` link (4 words) with a hover underline.
- List: `border #e6e7ea divide-y` (square corners).
- Question row (button): `w-full flex items-center gap-4 py-5 px-4 md:px-6`, hover `bg-gray-50/50`.
  - Disc: 32×32 round, 1px border (#e6e7ea, hover #9ca3af). When open: bg and border #6056ff.
  - Icon: a 12px "+" (stroke 2, #868a97); when open, a white "−".
  - Question text: Inter 500, 16 → md 18, lh 1.625, #0d162f. 3–9 words / 18–69 chars.
- Answer: `pb-5 pl-[52px] md:pl-[56px] pr-6`, Inter 16 / 1.625, #868a97.
  - Motion: AnimatePresence `height 0→auto, opacity 0→1`, exit the reverse, **duration .2**.
- Single-open: clicking the open item closes it. Nothing is open by default.
- Counts: knowledge 5, approvals 6, version 4, collaboration 5, workforce (see recipe).
- Emits FAQPage JSON-LD.

### A.5 MoreFeatures (3 link cards)
- PageSection. h2: 8 words / 50 chars. p: 9 words / 50 chars.
- Grid `grid-cols-1 sm:grid-cols-3 gap-5`. Card width: **242 @1440, 360 @1280, 211 @768, 327 @375**.
- Card `<a>`: `group flex flex-col gap-4 border bg-white p-6`, square corners. Hover bg `#f9f9f9` (`transition-colors` 150ms).
  - 28px line icon.
  - h3: Sora 18/28 500, −0.025em. 2 words / 8–12 chars.
  - p: 14 / 1.6. 7–10 words / 42–56 chars.
  - "Learn more" row: `mt-auto`, 14/500 #6056ff, gap 6, with a 14px arrow. The arrow does `group-hover: translate-x-0.5` (2px).
- **3 cards.** No reveal motion.

### A.6 ClosingCTA (grain band + floating coins)
Same as PAGES_CATALOG "ClosingCTA". Values for reference:
- StackedSection. Panel `relative overflow-hidden rounded-2xl` (16), bg = GrainBand(funcId) + noise overlay (CS 1.2).
  - Panels in this set: knowledge, approvals, version, collab, phone = `sales` violet. Invent and workforce also use violet.
  - All 7 palettes (deep / second / warm RGB, base 3-stop): sales `138,105,255 / 109,74,255 / 199,207,255 / #e6e6fb #e2e3fa #dfe2fa`; cs `207,161,251 / 244,114,182 / 125,170,255 / #f0ddff #f6e3fb #fbe8f5`; marketing `116,187,224 / 167,139,250 / 110,231,183 / #bbe2ff #cbeaff #d6f0f5`; hr `122,196,187 / 143,231,199 / 255,190,80 / #bfe9d6 #cdeede #d9f2e6`; support `251,146,60 / 253,186,116 / 244,114,182 / #ffe4cf #ffe9d6 #ffe1e6`; operations `52,211,153 / 110,231,183 / 96,165,250 / #c6f0dd #d2f3e4 #d9ecff`; research `167,139,250 / 196,181,253 / 244,114,182 / #e5ddff #ece5ff #f4e3fb`.
- Inner `px-6 py-16 md:py-24` (24; 64 / 96).
- Content `max-w-xl` (576), centred.
  - h2 (SectionHeading, centred): 9 words / 48 chars.
  - p: 16 / 1.6, `max-w-lg` (512), colour **rgba(13,22,47,.8)**. 23 words / 143 chars.
  - CTA row `mt-8 gap-4 justify-center`: a primary pill, plus a secondary pill that overrides `!bg-white hover:!bg-#f9f9fa`.
- **6 coins** (`hidden lg:block`, absolute):
  - Each 44×44, `rounded-full border-white/60 bg-white/70 backdrop-blur(8px)`, shadow `glass` (CS 1.1), holding a 28px avatar or a 20px icon.
  - Positions / rotation:
    - `top 16% left 4%` −8°
    - `top 48% left 10%` +6°
    - `top 76% left 5%` −4°
    - `top 14% right 4%` +7°
    - `top 50% right 10%` −6°
    - `top 74% right 5%` +5°
  - Static: no motion.

### A.7 FeaturesHero (text-only) + FeatureCatalog
- **FeaturesHero**: the Row has no border. `section px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-14 md:pb-20` (80/112 top, 56/80 bottom).
  - Block `max-w-3xl` (768).
  - h1: Sora 36 → md 48, lh 1.3, `tracking-tighter` −0.05em, balance. 7 words / 46 chars.
  - p: `mt-5`, Inter 18 → md 20, lh 1.5, #868a97, balance. 16 words / 100 chars.
  - CTA row `mt-8 gap-4`: primary + secondary at **large size** (`text-base px-6 py-3`, i.e. 16px text, about 48px tall). Square-ish radius 4.8 (not pill).
  - Motion: each of h1 / p / CTA does `opacity 0→1, y 16→0` on load with EASE, delays **0 / .06 / .12**.
- **FeatureCatalog** (one Row, the center column holds 14 `<section>`s):
  - Each section: `px-6 md:px-12 lg:px-20 py-14 md:py-20` (56/80), `border-t` (none on the first).
  - Grid `grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 lg:gap-16`. Right column: **302 @1440, 656 @1280**; stacked below lg.
  - Left column is **`lg:sticky lg:top-24 lg:self-start`** (sticks 96px from the top while its list scrolls).
    - `mb-5`: either a 28px line icon, or an **overlapping logo cluster**: 40px white round coins, 1px border, shadow `0 2px 10px #0f1a2f0f`, a 20px icon each, `margin-left −8.4px` overlap, fanned rotations (e.g. −8/0/+8° or −12/−4/+4/+12°), z-index 2–4. The cluster reveals `y 12`.
    - h2: Sora 24 → md 30, lh 1.5, −0.025em. 1–4 words / 5–36 chars.
  - Right column: a `ul` of rows `py-3.5`, `border-t` except the first, Inter 16 / lh 1.5. Each row is a **bold lead** (#0d162f 500, 2–5 words) followed by a muted tail (#868a97, ": …" or " (…)", 4–12 words).
  - Row counts per category, in order: **6, 6, 7, 9, 5, 11, 7, 5, 9, 8, 10, 4, 6, 3** (96 rows in total).
  - Reveal per category section: `y 18`, `whileInView once amount .15`, EASE, delay `min(i,3) × .05`.

### A.8 SplitTitleHero + workflow canvas (/workforce)
- Section `pt-10 md:pt-16 overflow-hidden`.
- Top grid `grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-y-8 lg:gap-x-10 items-center pb-10 md:pb-14`:
  - h1 `lg:col-span-7`: Sora 48 at **all** breakpoints, lh 1.2, ls −0.15rem (−2.4px), balance. 7 words / 45 chars.
  - Right `lg:col-span-5 lg:pt-4`:
    - p: 16 / 1.6, #868a97, `max-w-xl`. 25 words / 148 chars.
    - CTA row `mt-6 gap-4`: 2 pills.
  - Load motion: `y 16`, EASE.
- Canvas block `pb-6 md:pb-12 lg:pb-20`. Load motion: `y 18`, delay .15.
  - Panel: a GrainBand violet (full content width, **square**), padded `p-3 md:p-6 lg:p-8`. The inner wrapper reveals `y 32`.
  - Canvas: `relative w-full overflow-hidden`, **height 460**, white, 1px border.
  - It holds a **react-flow** graph (fitView, padding .15): 2 trigger nodes, 6 agent nodes, smoothstep edges (#d1d5db; the active edge is #6366f1).
    - Trigger node: `bg-white rounded-xl border shadow-sm px-4 py-3 min-w-[180px]`. Active border is indigo-500. It has an amber badge on top (`-top-3`, 10px/500, amber-100 / amber-700, radius full) and a `trigger-wobble` keyframe while active.
    - Agent node: `rounded-xl border px-2.5 pr-3.5 py-2.5`. It holds a 24px avatar (radius 6) with a 10px indigo dot and white ring, a 14px/500 name, and a 14px tool-icon row.
    - Add node: dashed `border-gray-300 rounded-lg px-3 py-1.5`, 12px #6b7280 text.
  - Overlays:
    - top-left status pill: `bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2`, with an 8px green-600 `animate-pulse` dot and 14/500 text (2 words);
    - bottom-right integration chip: 16px icon + 14/500 text.
  - Script: a timed sequence (`setTimeout` 300 ms / 1 s steps, randomised 1–5 task counts) activates nodes in turn. Values: not measurable; a looped placeholder is fine.
- Lumenfold: render a static node graph or SVG of the same size if react-flow is too heavy.

### A.9 GTMHero (rotating word + tool-card fan) and StatementBand
- **GTMHero**: section `py-8 md:py-12 overflow-hidden`. Content uses LogoGrid padding (`px-6 md:px-20 desktop:px-14`).
  - Block `text-center max-w-5xl` (1024), `pt-8 md:pt-12 pb-10`.
  - Eyebrow line: Inter 500, 20 → md 24, #0d162f, `mb-3`. It is 4 static words followed by a **rotating word slot**:
    - Slot: inline-block, height 1.4em, `overflow-hidden`; its width animates `.4s cubic-bezier(.23,1,.32,1)`.
    - Word: underline 2px #6056ff, offset 4px.
    - Rotation: 11 words, cycled every **2500 ms**. The incoming word goes `y 100%→0, opacity 0→1` and the outgoing goes `→ −100%`, `duration .4, ease [.23,1,.32,1]`.
  - h1: Sora 500 (global h1 rule), `text-[2.25rem] md:text-5xl lg:text-[3.2rem]` (36 / 48 / 51.2), lh 1.15, −0.025em, **colour #6056ff**. 6 words / 33 chars.
  - Tool-card fan (`hidden lg:block pb-6`): a horizontal strip `py-4` with mask `linear-gradient(to right, transparent 0, black 15%, black 85%, transparent)`.
    - **2 rows**. Each row is two clusters of 3 cards on either side of a 40px spacer.
    - The cluster `transform`s are rotate(−2.5°) translate(−12, 6) and rotate(2.5°) translate(12, 6) on row 1, then rotate(∓2°) translate(∓10, 8) on row 2. Origins: right / left centre.
    - Card: 100px wide, `bg-white border rounded-lg p-2.5`, shadow `0 1px 4px rgba(0,0,0,.03)`, holding a 16px icon (radius 4, `mb-2`), a 10px/500 name and an 8px #b6b9c0 sub-label.
    - Reveal: each card `opacity 0, y 12 → 1, 0`, `duration .5, delay .05 + i × .04`, ease out-quint.
    - A 64px white fade sits at the bottom.
  - Hero block: `y 16` on load.
- **StatementBand** (second island): a column centred on the content.
  - 1px vertical hairline, 64 / md 80 tall, gradient transparent → #e6e7ea.
  - Then a p: 18 → md 20, #868a97, `py-4`, **max-width 36ch**, centred. 13 words / 74 chars.
  - Then a mirror hairline (#e6e7ea → transparent).

### A.10 PlatformFraming (orbit of tool bubbles)
- Section `overflow-hidden`, LogoGrid padding.
- Inner `py-16 md:py-24 lg:py-32 mb-16`, **min-height 480**, bleeds to the content edges (`-mx` then `px` re-applied).
- Background: `radial-gradient(ellipse 40% 30% at 50% 50%, rgba(96,86,255,.04), transparent 70%)`.
- Connector SVG (`hidden lg:block`, absolute inset): lines with gradient stops. Fades in `opacity 0→1, 1.5s, delay .5`.
- Centre block `max-w-[680px] text-center`. Reveal `y 16, .6s`.
  - h2: Sora **500**, 30 → md 36, lh 1.3, `max-w-lg`. 9 words / 66 chars, with an 8-char #6056ff span.
  - Below it, `mt-12`: a small sub-component (labels).
- Orbiting bubbles (`hidden lg:flex`, absolutely positioned at x% / y%):
  - Bubble: a white circle (per-item size `s`; icon 0.6·s), 1px border, shadow `0 2px 8px rgba(0,0,0,.04), 0 0 0 1px rgba(0,0,0,.02)`; hover `shadow-md`.
  - Under it, a label pill: `px-2.5 py-1 rounded-full bg-white border shadow-sm` holding 11px/500 text, a 1×12 divider and a 10px/600 #3b32f9 stat.
  - Motion: enter `opacity 0, scale .8 → 1` (`duration .7, delay item.delay + .3`, out-quint). Then an endless `y` float (`duration = item.floatDuration, ease easeInOut, delay i × .4`). whileHover `scale 1.08` (.25s).

### A.11 ValuePropHeading + UseCasePair (GTM, repeated ×4)
- **ValuePropHeading**: center column `border-b`.
  - Inner `pt-16 md:pt-24 lg:pt-32 pb-10 md:pb-12 lg:pb-14 px-8 lg:px-20`.
  - h3: Sora 400, 24 → md 30, lh 1.25 → md 1.625, −0.025em, `max-w-3xl`. 17–21 words / 108–133 chars.
- **UseCasePair**: a 1px top hairline, then grid `grid-cols-1 md:grid-cols-2`. The center column is `border-b`. 2 cells.
  - Cell `group p-8 lg:py-16 lg:px-20`; the first cell gets `border-b md:border-b-0 md:border-r`.
  - Media cluster `mb-6 relative w-fit`: two **128×128 square images** (`aspect-square object-cover rounded-md` (6)), plus a sticker image (128, `object-contain`, absolute `-top-12 -right-14`, rotate 12°, **hover rotate 20°**, `transition-transform 300ms`).
  - h3: Sora 500, 24 → md 30, `mb-3`. 2–3 words / 8–25 chars.
  - p: Inter 16 / 1.625, #868a97, `mb-5`.
  - Checklist `space-y-2.5`: rows with a 20px disc (`bg-#6056FF/10`) holding a 12px #6056ff check, plus 16px #0d162f text. 3 rows per cell.
- Order on /gtm: 4 × (ValuePropHeading → UseCasePair).

### A.12 TabbedCanvasDemo (PlaybookToAgents) and EvalsDemo
Both sit on a Row whose center is `bg-gradient-to-br from-white via-white to-indigo-50/30`, with inner `py-20 md:py-32` (80/128) and standard px.
- Heading: SectionHeading centred `max-w-2xl mx-auto mb-10`. The h2 includes an #6056ff span (11–18 chars).
- **Playbook**:
  - Frame `max-w-5xl` (1024), `rounded-lg (8) border-gray-200 bg-white overflow-hidden`.
  - Tab bar: `flex border-b overflow-x-auto`, hidden scrollbar. Tab `px-5 py-3`, 14/500, #868a97; active #6056ff with a 2px indigo bottom bar (absolute).
  - Stage height **500**: a react-flow canvas of the same node vocabulary as A.8.
  - Footer status bar: absolute bottom, `bg-white/90 backdrop-blur-sm border-t px-4 py-2.5`. It has:
    - a 14px spinner (2px #6056ff, top transparent, `workforceSpin .8s linear infinite`);
    - 12px #4b5563 status text (truncate);
    - a 12px/600 mono score (green #22c55e at ≥90, otherwise #6056ff).
- **Evals**: frame `max-w-5xl rounded-lg border bg-white flex`.
  - Left panel (`hidden lg:flex`, width **420**, `border-r p-6`):
    - title 13/600 #111827 + meta 11px #9ca3af;
    - big number 28/700, −0.02em, plus a 12/500 green delta (fades in);
    - a bar chart: bars `rounded-t-sm`. Heights animate `0→h` (`.4s ease [.25,.1,.25,1]`). Colours: active #6056ff, past #c7d2fe, empty #e5e7eb. A dashed threshold line sits over them, and 9px axis labels sit below.
  - Right list: header row `px-5 py-4 border-b #f3f4f6` (20px logo + 13/600 title).
  - Test rows `px-5 py-4`, each with:
    - a status dot: spring scale-in (stiffness 400, damping 15); green #22c55e or yellow #eab308, or a 12px spinner;
    - a 13px name;
    - a 13/600 mono score.
  - Rows dim to .35 while pending. The active row bg is #f5f3ff (`opacity .3s, background .2s`).

### A.13 TasksCTA
Same as PAGES_CATALOG. Gist: a Row whose gutters carry `border-r / border-l`. Center `min-h-[500px]`, centred.
- Phase 1: a 3-col checklist (`gap-x-12 gap-y-3 max-w-4xl`). Each item is a 16px box that fills #6056ff with a path-drawn check (.2s) as the label strikes through. Item stagger .02s.
- Phase 2: the list blurs (`blur 0→12px, opacity →.3`, .8s).
- Phase 3: h2 (Sora 30 / 36 / 48, `lg:leading-normal`, `max-w-3xl`, 53–56 chars) appears `y 20`, .6–.8s. A large primary button follows (`text-lg px-8 py-4`, 11 chars).
- Loop timer: 3500 ms.

### A.14 InventHero (clouds + mascot + scripted step cards)
- Backdrop (`absolute inset-x-0 top-0`, `lg:h-[820px]`): a white radial `60% 55% at 50% 30%`, plus **7 drifting cloud clusters**.
  - Each cluster is 3 white rounded-full blobs, `filter blur(14px)`, opacity .65–1. Widths 280–700, heights 70–170.
  - Class `invent-cloud-drift` with `--drift` ±25–60px and `animation-duration` 55–80s.
- Centre column `py-10 md:py-20`.
  - 128px mascot with the same halo as CS 3.1 (`inset −109px`), entering from `scale .55, opacity 0`.
  - 3 speech pills around it (`hidden lg:block`, absolute at `calc(50% ± 100–130px)`, top 20 / 100).
    - Pill: `rounded-full bg-white px-6 py-3`, 15/500 text (31–40 chars), with a coloured drop-shadow (`0 10px 22px rgba(96,165,250,.24)`, `(148,59,255,.2)` or `(96,86,255,.22)`) and a tail SVG.
    - Motion: they enter from `opacity 0, blur 8px, y 14, scale ~.9`, then bob (`invent-cloud-bob`, delays 0 / −1.3 / −2.6s).
  - h1: Sora 48, lh 1.25, ls −0.18rem, `max-w-3xl mt-8`. 2 words / 18 chars.
  - p: `mt-6 max-w-2xl`, 16 → 18, lh 1.6, balance. 3 lines joined with md-only `<br>`.
  - CTA row `mt-8 gap-3`. Each element reveals `y 16`.
- **Step strip** below (a Row, no inner padding): a vertical list of step cells, each `px-8 py-12 border-b`, reveal `y 14`. Every cell holds:
  - a `min-h-28` stage with a glow ellipse (240×560, `radial-gradient(rgba(96,86,255,.09)) + (rgba(148,59,255,.05))`, `blur 28px`);
  - a 546px-wide scaled stage holding glass cards (`rounded-xl border-white/60 bg-white/70 px-4 py-3 backdrop-blur`, shadow glass);
  - a status line: 12/500 #868a97 with a pulsing 6px #027a48 dot (`opacity [1,.35,1]`, 2.2s loop);
  - a 15/500 #0d162f caption.
  - Everything is `whileInView once amount .6`, staggered by delays .1 / .2 / .3 / .58.
  - **About 9 steps**, with varied cards: chat bubbles; a form with 4–6 fields; red and green diff chips (`rgba(254,243,242,.7)` with text `rgba(180,35,24,.75)`, and `rgba(236,253,243,.9)` with #027a48); and 3 integration rows.
- Lumenfold: keep the layout and motion. Use your own mascot and copy.

### A.15 InlineVideo band (Invent)
- PageSection with h2 (4 words / 20 chars) and p (21 words / 117 chars).
- Frame `relative aspect-video w-full overflow-hidden border #e6e7ea bg #0d162f` (**square corners**).
- A poster `object-cover`, with a 64px play disc: `border-2 white bg-white/10 backdrop-blur-sm`, hover `bg-white/25`.
- Click swaps in an iframe.

### A.16 Invent demo panels (Signals / Evals / Embed / GetStarted)
- **Signals** and **Evals**: PageSection, then a frame `relative overflow-hidden border-gray-200 bg-white`, height **380 / md 500**, holding a scripted canvas (SpecialistTeamsCanvas / EvalsFloor). A small mascot badge sits absolutely at `right-6 md:right-10, top −30`.
- **Embed**: a frame `mt-10 border` on a grain background.
  - Linked cards: `border-#6056ff/45`, opacity 1. Unlinked cards: opacity .4.
  - Dashed "add" card: `border-dashed border-#6056ff/40 bg-white/50`. Hover goes solid indigo with a white bg.
  - Cards animate out with `scale .94`.
- **GetStarted**: a ClosingCTA-style grain panel (`rounded-2xl`).
  - The mascot drops in: spring `opacity 0, y −18, scale .6 → 1` (stiffness 220, damping 13, `whileInView amount .6`).
  - Then text `mt-6` and one pill CTA `mt-8` (23 chars).

### A.17 StackCollapse (Invent)
Same component as PAGES_CATALOG "StackCollapse".
- h2 lh 1.25, 6 words / 43 chars. p 25 words / 127 chars.
- Grid `lg:grid-cols-2 gap-10 lg:gap-20`.
  - Left: an isometric SVG stack (max-width 460; children stagger .08, delay .05).
  - Right: `bg-slate-50 rounded-2xl p-2` list of **5 rows** `py-3 px-3.5 rounded-lg gap-3`.
    - Active row: bg #fff, shadow `inset 0 0 0 1px rgba(13,22,47,.05), inset 0 2px 6px …`, label #6056ff.
    - Label 14/500 (18–34 chars). The right meta is 12.5px #868a97 (hidden < sm).
    - Transitions 300 ms.

### A.18 SlackHero + ChatDemo
- Main has 6 decorative SVGs (`hidden lg:block`, opacity .5) at fixed offsets: top 80 left 4%, top 200 right 3%, top 500 right 6%, top 400 left 6%, top 700 right 10%, top 900 left 8%. Lumenfold: your own shapes.
- Hero (LogoGrid padding) `py-16 md:py-24`, grid `lg:grid-cols-2 gap-12 lg:gap-16 items-center`.
  - Label row: a 32px icon + 14/500 #868a97 (3 words), `mb-6`.
  - h1: Sora **500**, 36 / 48 / **60** (lg), `leading-tight` 1.25, `mb-6`. 6 words / 32 chars.
  - p: 18 → 20, lh 1.625, #868a97, `mb-8`. 20 words / 115 chars.
  - Buttons `gap-3`: primary + secondary (radius 4.8, **not** pill).
- ChatDemo (right, `min-height 525`): a chat-app frame.
  - Tab bar `border-b`, tabs `px-4 py-3` 14/500, divided by `border-r`. Active: bg white, #0d162f. Inactive: bg #f9f9f9, #868a97.
  - Messages `px-4 py-2 gap-3`, each entering `opacity 0, y 12` (.3s) in sequence. A message has:
    - a 36px avatar (radius 8);
    - a 14/500 name, an "APP" badge (10/500, bg #6056ff1a, #6056ff, `px-1.5 py-0.5 rounded`) and a 12px time;
    - a body (14 / 1.625, pre-line);
    - tool-action rows that slide in `x −8`, plus a thread reply that expands `height 0→auto` (.4s, delayed).
  - Script steps are spaced at +400 / +1200 ms.

### A.19 HairlineGrid sections (Slack)
The "gap-px" trick: grid `gap-px bg-#e6e7ea border`, with cells `bg-white` (which draws 1px rules between cells).
- **Two-up feature**: `lg:grid-cols-2`.
  - Left: a stacked 1-col sub-grid of cells `p-6 md:p-8`. Each cell has a 1-char numeral, an h3 (Sora 16/500 `mb-2`, 2 words) and a p (14 / 1.625, #868a97, 28 words / 156–176 chars). ×2.
  - Right: a media cell.
- **Use-case grid**: `md:grid-cols-2`, bleeding to the center edges. **10 cells** `p-6 md:p-8`, each an h3 14/500 (3–5 words) + a p 14 / 1.625 (22–30 words / 143–172 chars).
- **Split explainer**: `lg:grid-cols-2`.
  - Left cell `p-8 md:p-10`: h2 Sora 500, 24 → 30, `mb-6`; p ×2 (24 words / 178 chars, 41 words / 268 chars).
  - Right: a 1-col stack of 3 cells `px-8 md:px-10 py-6`, each a big value (1–7 chars) + a label (3–5 words).
- Section heads here: h2 Sora 500, 30 → 36, `mb-4` + a p 18 (12 words). Section inner `py-16 md:py-20`.
- **Icon wall**: `grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-px` hairline grid of **30 square cells** (`aspect-square`, centred icon). Cells start at opacity 0 and stagger in (IntegrationsShowcase vocabulary, CS 3.9).
- **ProgrammaticCTA**:
  - Center bg `from-white via-white to-indigo-50/30`, inner `py-20 md:py-32`, `max-w-3xl` centred heading with an indigo span.
  - Then a chip link `mt-10 pl-2 pr-5 py-2.5 rounded-lg border-black/10 bg-white`, hover `border-black/20`. It holds overlapping 28px avatar circles (`-ml-2`), 16/500 text and an arrow.
- **Final CTA**: `py-20 md:py-28 text-center`.
  - h2: Sora 500, 30 / 36 / 48, `max-w-2xl mb-4`. 7 words / 38 chars.
  - p: 18, `max-w-xl mb-8`. 11 words.
  - 2 buttons, gap 3.

---

## B. Legacy Webflow section library

### B.0 Legacy shell and tokens
- **Breakpoints:** desktop base ≥992; `≤991`, `≤767`, `≤479`; plus `≥1440` tweaks. So 1440 = base + 1440 rules, 1280 = base, 768 = the ≤991 rules, 375 = ≤767 + ≤479.
- **Body:** bg **#f9f9f9** (`--background-color--backgound-primary` = neutral-white #f9f9f9), Inter 16/150%, #868a97.
- **Fonts actually loaded:**
  - WebFont: Inter 400–800, Noto Sans, Epilogue, Inconsolata.
  - Self-hosted **Inter Display** 100–900 (`/fonts/InterDisplay-*.woff2`, HTTP 200). This corrects PAGES_CATALOG, which says it is not loaded.
  - **Reckless Neue** 600 (woff).
  - Headings `.heading-style-*` set no family, so they render in Inter. Inter Display is used by ROI / before-after / team-player text. Lumenfold: map all of it to Inter + Sora.
- **Containers:**
  - `.container-large` max 1228, width 90% → **1228 @1440, 1152 @1280, 691 @768, 338 @375** (padding-left 0 at ≤767).
  - `.container-medium` 64rem (1024). `.container-small` 48rem (768). `.container-xlarge` 90rem.
  - `.wide-container` max 1268, padding `48 20 48 50`; at ≤991 width 95% and padding-top 80; at ≤767 padding-top 60.
  - `.function-header-container` max 1268, padding 0 20.
- **Section padding:**
  - `.padding-section-large`: **7rem top / 1rem bottom** (≤991 6rem/6rem; ≤767 4rem/4rem).
  - `.padding-section-medium`: 5rem/5rem (≤991 4rem). Note its `border-radius 16`.
  - `.padding-section-small`: 3rem/3rem.
  - `.margin-bottom.margin-*` utility steps: xxsmall .5 · xsmall 1 · small 1.5 · medium 2 · large 3 · xlarge 4 (6rem on `.margin-bottom.margin-xlarge`) · xxlarge 5 · xxhuge 10rem (5rem on `.margin-bottom`) (rem).
- **Type:**
  | Class | Base | ≤991 | ≤767 | ≤479 |
  |---|---|---|---|---|
  | `.heading-style-h1` (600, lh 1.2, #0d162f) | 64 | 52 | 40 | — |
  | `.heading-style-h1.is-hero` | 62.4 | 48 | 48 | **10vw**, −1px |
  | `.heading-style-h2` (600, lh 1.2, mb 40 + pb 10) | 48 | 44 | 36 | 30 |
  | `.heading-style-h3` (600, lh 1.2) | 40 | 36 | 32 | — |
  | `.heading-style-h4` (600, lh 1.1, **#6056ff**) | 32 | 28 | 24 / lh 1.4 | 20 / 1.3 |
  | `.heading-style-h5` (Inter Display 600, lh 1.3) | 24 | — | 20 | — |
  | `.text-size-large` | 20 | | | |
  | `.text-size-medium` (#868a97, lh 150%) | 18 | | | 16 |
  | `.text-size-small` (lh 133%) | 14 | | | |
- **Buttons:**
  - `.button`: see PAGES_CATALOG Part C (radius 8, min-h 48, #6056ff with an inset purple glow, hover #7281ff, 16/500).
  - `.button.is-secondary` / `.is-alternate`: white, border #e6e7ea, shadow `0 9px 13px -5px #0d162f1a, inset 0 -3px 0 #0d162f0d`.
  - `.button.is-small`: padding .3rem 1rem (36px max at ≤479).
  - `.button.is-link.is-icon.is-purple`: text link #6056ff with an icon, gap .25rem.
  - `.button-secondary`: as `.is-alternate`, padding 12/24.
- **Section pill** (`.pill.section-pill`):
  - white, border #e6e7ea with bottom #cfd0d5, **radius 18**, min-h 36, padding 6/16, gap 8, 500 #0d162f, 18px icon;
  - shadow `0 9px 13px -5px #e6e7ea, 0 2px 2px #0d162f0d, inset 0 -3px 0 #0d162f0d`;
  - ≤991: bg #f9f9fb, no shadow.
- **Navbar** (replace with the CS Header for Lumenfold; recorded for parity):
  - `.rel-navbar_wrapper` sticky top 0, z 1999.
  - Component padding `1.25rem 5% 0`.
  - Container: a white pill, **radius 24**, max 90rem, min-h 72, padding 0 1.25rem, shadow `0 0 1px #16134a80, 0 -2px #16134a14, 0 2px 2px #16134a14, 0 9px 13px #0d162f1a`.
  - Desktop above 1200px, mobile at ≤1200.
  - Optional top banner `.banner8_component` (bg #6056ff, white, py .75rem, closable).
- **Footer** (replace with CS Footer): bg #fcfaff, py 60 (30 at ≤991). Left column max 300 with `mr-100`. Right grid 3-col, gap 70/16 (2-col at ≤991). Links Inter 400 #868a97.
- **Legacy motion vocabulary (IX2, read from the interaction table):**
  - **FADE**: `opacity 0→1`, **1000 ms outQuart**, on scroll-into-view (offset 0–30%). Used on almost every heading block, button group and image.
  - **SLIDE up**: `opacity 0→1 + translateY 100px→0`, 1000 ms outQuart.
  - **SLIDE right→left** (compare small card): `x 100px→0`, 1000 ms outQuart.
  - **SHRINK** (dark hero image): `scale 1.25→1 + fade`, 1000 ms outQuart.
  - **Hero cursors** (`.avatar-cursor-box`, two of them, a 24px cursor glyph + a 48px avatar):
    - they wander on a loop of `translate(%)` keyframes, 1000 ms inOutQuart, holding 2–4 s between moves (e.g. 50/50 → 0/0 → 95/7 → 47/16 → 82/50);
    - hover scales them to 1.1 (500 ms outQuart);
    - hidden at ≤991.
  - **Logo marquee** (`.logo3`): translateX **−300vw over 38 s** linear loop (desktop). At ≤991 / landscape it is −500vw over 18 s; at portrait −800vw over 28 s.
  - **Press marquee**: −135rem over 30 s.
  - **Footer CTA mascots**: mouse-parallax ±5% x/y in opposite directions.
  - **Sticky stacked cards** (SEO / ai-ops `home_*-features`): scroll-linked scale per card, 1 → .8 across 25% steps of section progress, with a bg tint change at 20% → 55%.
  - **FAQ (lima)**: click opens to height auto (800 ms ease) and rotates the plus 135°; the second click closes (300 ms).
  - **Tabs accordion (uc)**: on activate the body goes `height 0→auto, scale .96→1, y 20→0, opacity 0→1` (200–500 ms inOutQuad).
  - **Dark next-step card hover**: a gradient overlay goes opacity 0 → .2 (500 ms outQuart).

### B.1 CenteredHero ("page-hero-header", B1/B2/B6)
- `.page-hero-header_content-wrapper` margin-top 100. Inner `.padding-section-large.is-tight-top` (top 5rem; 1.5rem at ≤767). Bottom margin before the video is 5rem.
- Backdrop: a hero-lines SVG (`.hero-lines-wrapper.is-sub-page`), absolute, height 400, max-width 85rem, bg-size 72.1rem (1013px at ≤991). It fades in.
- Text block `max-width 55rem` (880), centred.
  - Pill (`mb 2rem`, 2 words / 11 chars).
  - h1 `.heading-style-h1.is-hero`, with 1 span coloured #6056ff. 3–6 words / 12–36 chars.
  - p `.text-size-medium` inside `max-width 35rem` (560). 11 words / 86 chars.
  - One `.button`, centred (3 words).
- 2 wandering cursor avatars (B.0 motion). `.is-new` at left 2%, top 2%; `.bottom-right` at right 1%, top 28%, mt 220.
- Video: `.container-medium` (1024), `.hero-video` **16:9, radius 20, overflow hidden**, an autoplaying muted Wistia embed. B2 and B6 use an Embedly iframe instead.
  - Media slot: 16:9 video poster, radius 20.

### B.2 LogoGrid (legacy) and LogoMarquee
- **Grid** (`.awards-container`, pt 40 / pb 100; 20/60 at ≤767):
  - label `.sub-header` 20px (18 / 16) #868a97, centred, max 780 (840 at ≥1440), 4 words / 30 chars;
  - grid **7 columns** gap 40/50 → 5 cols at ≤991 → 3 at ≤767 → 2 at ≤479;
  - 13 logos, max-height 22.
- **Marquee** (`.section_logo3`): 3 duplicated rows of 65 logos. Logo max-height 3.5rem (3rem at ≤767); column 12.5rem (10rem at ≤767). Motion per B.0.
- Lumenfold: reuse CS 3.2 for the grid, and a CSS marquee for logo3.

### B.3 FeatureIconRow + CompareCards (B1 "features-list-1")
- Section top backdrop: a 500px-tall wrapper (400 at ≤991) with a 2,500px-wide decorative SVG, side gradients `#f9f9f9 → transparent` (25vw), a top gradient of 100px and a base gradient of 200px.
- Header: pill + h2 (5 words / 37 chars) + p (9 words / 57 chars), `max-width 48rem`, `mb 3rem`.
- Icon row:
  - `display:flex; gap 2rem; max-width 70rem; justify-content: space-around`. **5 items** at ≥992 → grid 3-col at ≤991 → 2-col at ≤767 (gap 1rem at ≤479).
  - Item: `flex-col gap .5rem`, a 32px #6056ff icon and an h3 `.text-size-large` 600 (20px, #0d162f). 2–4 words / 12–20 chars.
  - Margin below 6rem.
- **CompareCards** (`max-width 63.6rem`):
  - grid row `.6fr 1fr`, aligned centre, with no gap (the cards touch);
  - small card: no right border or right radius;
  - large card: border `#3b32f966`, shadow `0 0 1px #26238c66, 0 16px 40px -8px #26238c0d, 0 8px 16px #26238c0d`, z 1;
  - card: bg #fcfcfd, border #e6e7ea, radius 12;
  - image top: full width, opacity .5 on the small card;
  - content `padding 1.5rem 1rem`, then a title row (16px icon + h3 20/600 on the small card, `.heading-style-h5` 24 on the large);
  - list of **4 rows** `py .5rem`, divided by `border-bottom #cfd0d5` (none on the last):
    - small card: 14px text with a 16px icon;
    - large card: a 32px icon and 16px text with a 600 lead. 3–6 words / 31–44 chars.
  - ≤767: stacked; the small card sits at 90% width, centred, above the large card.
  - Motion: the row slides up 100px; the small card slides from x 100px (B.0).
- SEO variant (`/seo-agent`): inserts a **StickyStackCards** block before the icon row:
  - `.home_workforce-features_component`, sticky top 6rem, margin 20;
  - **6 cards**, each a grid of 1.75fr / 1fr (stacked at ≤991), radius 24, bg `#ececf9e6` with `backdrop-blur 5px`, border #e6e7ea, shadow `0 12px 20px -4px #0000000d, 0 4px 8px -2px #0000001a`;
  - content padding 3rem (2rem at ≤991);
  - image: radius 10, 1px border;
  - h3 `.heading-style-h4` (#6056ff, 32) with a span, plus a list of 2 `.text-size-regular` bullets, plus an icon-card row and a button.
  - Its items show 6 h4s of "1w/2c" (step numerals). Motion: scroll-scaled (B.0).

### B.4 BentoCards ("layout361", B1/B6)
- Section `.padding-section-large`.
  - Header (`mb 5rem`, centred, max 48rem): pill + h2 (6–11 words / 53–59 chars) + p (10 words / 58 chars).
- Grid: rows of 2 cards (`gap 2.5rem`), then a full-width card (`.is-1col`, internally 2-col text | image).
  - **3 cards** (multi-agents: 5).
  - Card: bg **#f6f5f9**, border #e6e7ea, **radius 16**, overflow hidden.
    - Content `padding 1rem 3rem 3rem` (2rem at ≤991, 1.5rem at ≤767).
    - h3 `.heading-style-h4` (indigo 32px), 2–4 words / 12–30 chars.
    - p `.text-size-medium`, 8–11 words / 74–109 chars.
    - Image: full width, natural ratio (fills the remaining height).
  - One card puts its image on top (`content.is-bottom`).
  - The 1-col card adds a 3-col logo list and a purple link button.
  - ≤991: everything goes 1 column; gap 1.5rem at ≤767.
- Images fade in on scroll (offset 20–30%).

### B.5 WhatItDoes + BenefitCards (B1)
- Backdrop: a 40rem-tall absolute wrapper with a large SVG (`top −11.7vw`, scaled; −23.2vw at ≤991, −39.6vw at ≤767). It scales `.95→1` over 2000 ms outQuart while fading in (500 ms) at 30% offset.
- Centred `.container-small` (768): h2 with 2 indigo spans and a `<br>` (≈4 + 4 words), then one `.button` `mt 2rem`.
- Cards: grid 3-col (2 at ≤991, 1 at ≤767), gap 1.5rem, margin-top **10vw**.
  - Card: white, border #e6e7ea, radius 16, overflow hidden.
  - Image on top (full width, `object-cover`, pb 10).
  - Content `padding 0 1.25rem 1.5rem`: h3 `.text-size-large` 600 (2–7 words / 14–48 chars) + p `.text-size-small` (6–10 words / 48–73 chars).
  - 4 cards on both B1 pages (3 have images on cs-agent).

### B.6 TestimonialGrid ("testimonials-simple", B1/B5/B6)
- White section. Header: pill + h2 (6 words / 41 chars + a 3-word gradient span `linear-gradient(135deg, #4d65ff, #7c3aed)` clipped to text + 3 words).
- Grid `repeat(3, 1fr)` gap 24 (2-col at ≤991, 1 at ≤767). **7 cards.**
- Card `<a>`: white, border #e6e7ea with bottom #cfd0d5, **radius 16**, padding 28, shadow `0 2px 2px #0d162f0d`. Hover shadow `0 4px 12px #0d162f0d` and `translateY(−2px)` (.2s ease).
  - Quote: 16 / 1.5, #0d162f, `flex-grow`, mb 24. 17–26 words / 132–156 chars.
  - Footer `flex gap 12`: a **48px round avatar** (cover), name 14/600, role 13px (2–4 words) with a 500 company.
  - Optional metric chip `mt 16`: `linear-gradient(135deg, #6056ff, #8b5cf6)`, white 13/600, radius 6, padding 6/12 (3–4 words / 21–23 chars). Present on 3 of 7.

### B.7 LegacyFooterCTA
Same as PAGES_CATALOG "W.CTA".
- Two markup variants: `.transform-cta-wrapper` (B1/B4/stub) and `.home_footer-cta_card` (padding 4rem / 3 / 2; B3/B5/B6/B-1off). Both: white card, border, radius 16, stars SVG, purple glow ellipse, 2 mascots.
  - Prism mascot: 145px at top 40 / right 40 (100px at ≤991, 70px at ≤479).
  - World mascot: 195px at bottom −16 / left 20 (140px at ≤991, 90px at ≤479).
  - Mascots get mouse parallax ±5%.
- h (`.heading-style-h2`, balance): 3 words + br + 1 word + a 4-word indigo span + 1 word.
- p 23 words / 143 chars.
- 2 small buttons `mt 24`, plus a fine-print row (2 words · icon · 3 words, 14px #868a97).

### B.8 SDR sections (B2)
- **ROI stats.**
  - Wireframe SVG backdrop. Wrapper py 4rem.
  - Row: a 205px portrait image + a text column (max 80ch), gap 2.2rem (stacked and centred at ≤767).
  - h2 (letter-spacing −.01em, max 600 / 800 at ≥1440; 36 at ≤991, 24 at ≤767): 3 words + a 1-word indigo span + 6 words.
  - p 18px (6 words / 60 chars).
  - Stats grid: 3-col (flex with gap 48 at ≥1440; 6-col at ≤991; 2-col at ≤767), mt 40, **5 stats**.
    - Number: Inter Display 32/600 #6056ff, animated by **counterUp (2000 ms, 100 ms steps)**.
    - Label: Inter Display 18/500, −.01em (16/400 at ≤767). 3–4 words / 16–25 chars.
  - Media slot: 205×~260 portrait, contain.
- **Before → After.** Grid `1fr 30px 1fr`, gap 20, **3 pairs** (before | arrow | after).
  - Entry: radius 16, padding 24, shadow `0 2px 2px #16134a0d, 0 0 1px #16134a80`, an icon + Inter Display 20 / 133% #0d162f text. Before: 7–8 words / 43–51 chars. After: 4–5 words / 31–40 chars.
  - ≤767: a single column, before above after, arrows hidden.
- **FeaturedCaseStudy.**
  - Box aspect **1225/462**, grid 2-col, gap 7rem, padding `3rem 3.5rem 3rem 2rem`, white fill (radius 5), decorative corner rivets and lines (hidden ≤991).
  - h3 `font-size 2.875vw` (40 at ≥1440, 30 at ≤991, 24 at ≤479), 600, −1px, lh 130%: 8 words + an indigo 4-word span + a 1-word span.
  - Secondary button, radius 18, gap 16 (4 words).
  - Image radius 16, `object-cover`, filling the cell.
  - ≤991: block layout.
- **OutboundFeatures.** Header (pill + h2 1 word + a 1-word indigo span + p 13 words / 81 chars, max 730, centred).
  - Grid 2×2, gap 16/24, mt 32.
  - Item max 400 (280 at ≤991), padding 24: a 28px icon in a 32 box (mb 16), an h4 (`mb 4`, 1–4 words), and 14px text (9–13 words / 61–85 chars).
- **HowItWorks (steps).** Stars bg. Standard heading (pill 3 words + h2 4 words / 25 chars + subtitle 18px, 6 words).
  - Steps: a vertical list, gap 40. Each step is a 36px icon tile (white, radius 8, shadow `0 0 1px #0d162f66, inset 0 -2px #ededf1`) beside a description card (white, radius 12, padding 12, **width 560**, shadow `0 8px 16px #26238c0d, 0 16px 40px -8px #26238c0d, 0 0 1px #26238c66`).
  - Each card has a status badge (`radius full`, bg #0d162f0a, padding 0/8, gap 8; 8px #b0b2bb dot; 14/500 #828794 label).
  - 4 steps (9–22 words).
  - GSAP loop (≤991 matchMedia; desktop uses a static SVG graphic): badge bg → `#EA9F161A`, text → #B3560A, a spinner rotates 2160° over 1.5 s, then the dot turns green #29BC5F. Steps run in sequence, `repeat −1`, `repeatDelay .5`, power4.out .3 s.
- **TeamPlayer.** Standard heading (h2 5 words / 21 chars + subtitle 13 words). Grid 2-col gap 20 (a column at ≤991), mt 60.
  - Card: radius 16, shadow `0 2px 2px #16134a0d, 0 0 1px #16134a80`.
  - Heading: Inter Display 32/600, −.32px, centred, padding 24/16. 6–8 words.
  - A graphic slot (min-h 320, px 60).
  - **4 points**: a 16px gap, padding 16/24, an icon + Inter Display 20 / 133% text (18 at ≤767, 14 at ≤479). 5–8 words / 31–55 chars. They form a 2×2 grid at ≤991.
- **TimelineCTA** (inside the CTA wrapper `.is-bdr`):
  - header pill + h2 (4 words + a 2-word indigo span) + p;
  - then `.timeline10`: a centred column with a **1.8rem-wide gradient progress bar** `linear-gradient(#6056ff, #943bff 87%, #f1e5ff 102%)` and a sticky inner line (3px, 50vh);
  - **4 rows** in a `1fr max-content 1fr` grid (2-col at ≤767). Items alternate sides, each with a 42px circle icon, a 2-word title (400) and a subtitle #868a97;
  - glassy item cards: `blur 5px`, shadow `0 0 10px #26238c0d, 0 9px 5px #26238c0d`, padding 1.1rem 1rem.

### B.9 LegacyFeaturePage sections (B3, /schedule-work)
- **DarkHeroCard.** `.container-xlarge` (90rem), `.padding-section-medium`.
  - Card: grid `1.1fr 1.25fr`, radius 16, overflow hidden. Background (inline style): `radial-gradient(2344% 141% at 0 0, rgba(0,240,255,.10), transparent), linear-gradient(180deg, rgba(173,0,255,0) −47.79%, rgba(173,0,255,.09) 100%), radial-gradient(129% 129% at 113% 83%, #47464F 24.66%, #1B1B23 89.26%)`, plus an inner shadow layer `inset 0 0 74.3px 24px #00000080`.
  - Left content `padding 3rem 0 3rem 3.5rem` (2rem at ≤767):
    - page pill: white, radius 100, 14/500, padding .25rem 1rem, 8px dot icon. 2 words.
    - h1 `.heading-style-h2` white (lh 1.1), 10 words / 52 chars.
    - p 16 white, 16 words / 109 chars.
    - buttons: primary + secondary, `mt 1.5rem`.
  - Right: an image (`object-contain`, aligned bottom-right). It SHRINK-reveals (scale 1.25 → 1).
  - ≤991: 1 column.
- **LayoutRow 1 / 2.** Grid `1.25fr 1fr` (row 2: `1fr 1.25fr`), gap 5rem / 4rem, centred (1 column at ≤991, gap 3rem).
  - Image radius 16, cover.
  - Text: page pill (row 1 only) + h2 `.heading-style-h3` (40px; 7–9 words / 42–64 chars) + p `.text-size-medium` (18–20 words / 120–149 chars).
  - Fades in.
- **FeatureBento.**
  - Intro: pill + h2 with a 3-word indigo span. A decorative grate SVG (936px wide) sits behind it.
  - Grid 3-col (`.is-4col` keeps 3-col) gap 16 (.8rem at ≥1440), mt 60. At ≤991: `repeat(auto-fit, minmax(300px, 1fr))`.
  - **6 tiles.** Tile: white, border #e6e7ea / bottom #cfd0d5, radius 16, shadow `0 2px 2px #0d162f0d`.
    - Image box min-h 14.5rem (170 at ≤991), the image covering it. Optional dot-grid and white fade overlays (hidden on desktop).
    - Text box `padding 12px 20px 16px`, 13.5px / 150%, −.25px: an h4 `mb 4` (2 words / 9–19 chars) + body (19–26 words / 123–156 chars).
- **FAQ (legacy).** A decorative lines SVG (1440 wide, hidden at ≤991).
  - Header: h2 1 word + p 5 words + an indigo underlined link.
  - List card: white, border, radius 16, padding 1.75rem (1rem at ≤479), shadow `0 9px 13px -5px #0d162f1a, 0 2px 2px #0d162f0d, inset 0 -3px #0d162f1a`.
  - Item: question row `padding 1rem 1.25rem`, 18/600 #0d162f (6–9 words / 39–69 chars), a chevron rotating 180° when active (.2s). Answer `px 1.25rem pb 1rem` (26–35 words / 160–228 chars).
  - **4 items**; the first is open.
  - Lumenfold: use A.4 FAQAccordion instead.
- **ProductCards** (dark).
  - `.container-medium`. Header: pill + h2 (1 word + a 2-word indigo span + 5 words) + p 9 words.
  - Grid 3-col gap 2rem (1 column at ≤991).
  - Card `<a>`: radius 10, the DarkHero gradient + inset shadow, content padding 1.25rem centred: a 128px icon illustration + an h3 `.heading-style-h5` white (2 words) + a small secondary button (2 words).
  - Hover: an overlay gradient `linear-gradient(303deg, …)` goes opacity 0 → .2 (500 ms). Tints per card: workforce `#3eddbe → #00ff4c`, teams `#fee17b → #00f0ff`, agents `#3eddbe → #00f0ff`.
- **NextSteps.** h2 `.heading-style-h3` (8 words / 43 chars). Grid 3-col gap 2rem of white cards: radius 10, border, padding 1.25rem, an h3 `.heading-style-h5` (3–4 words) + a button. Slides up.
- **CustomerCards** (`.home_customers-grid`).
  - Section bg: two line SVGs top and bottom, size 107% (97rem at ≥1440).
  - Header: pill + h2 2 words / 14 chars.
  - Grid 3-col gap 2rem/4rem (1 column at ≤991). Card: border #e6e7ea, **radius 20**.
    - Image wrapper radius 8, **16:9** (`padding-top 56.25%`), image cover, overlay `#00000080`, logo at top-left (1rem inset, h 1.8rem, max 10rem).
    - Title wrapper pt 1rem; button mt 1rem.
  - 3 cards, then the legacy logo grid (13).

### B.10 LegacyUseCase sections (B4)
Same layout as PAGES_CATALOG W2. Deltas measured here:
- **Hero:** text column 490 (mr 40) + image column 600 (radius 16).
  - Tag 16/500 #0d162f (3 words).
  - h1 `.heading-1._58px-font._32px-bottom`: **72px / 112%, 600, −1px, mb 32**. 5–6 words / 29–42 chars.
  - p 18 / 160% #313a53, mb 32. 31 words / 207 chars.
  - CTAs (row height 60, mt 20):
    - gradient pill 227×60, `linear-gradient(90deg, #4325fa, #8325fa)`, radius 48, 18px white, with an arrow;
    - outline pill 174×60, 1px #0d162f, radius 48; hover bg #eef2ff, border and text #4f46e5.
  - Media: image ~600 wide, natural ratio.
- **Logo row:** label 18px centred (11 words / 67 chars); 6-col grid, gap 16/52; 12 logos; section margin 120/120.
- **Values:** a 1.5fr/1fr row (h2 64px/120% 600 −1px with a 2-word accent span; p 18, 16 words) + a centred h2 that IX2-scales `.92 → 1` (300 ms outCirc, delay 200) + a 3-col grid (gap 32, mt 60) of **3 cards**.
  - Card: white, border #eaedf2, **radius 32**, shadow `0 2px 10px #0f1a2f0f`.
  - Image radius 6, full width, mb 20.
  - h3 20/500, lh 1.4em (5–7 words / 42–48 chars).
- **Vertical tabs:** h2 (3 words). Then `.tabs-wrapper.tabs-left`: image pane (max 640, 60% at ≥1440) + a menu of **3 accordion cards** (max-width 480, gap 12; the menu renders on the left via `order −1`).
  - Card title 26/600, lh 1.3em (4–6 words).
  - Body: p 18 (20–31 words) + **2 check rows** (20px check + 15px text, 4–8 words).
- **Testimonial:** bg #f3f2ff, radius 12, padding 60. At ≥1440: white, radius 16, shadow `0 4px 20px #0c0b2c12`, text centred max 880.
  - Quote: Reckless Neue 600 32 / 44.8 (Inter at ≥1440). 26 words / 145 chars.
  - 48px avatar + name/role.
  - A decorative cube at bottom-right.
- **AllFeatures:** h3 (2 words / 26 chars) + p (18 words). Grid **4-col** gap 24 (2-col at ≤991), py 80/100.
  - **8 cards**: white, border #eef2ff, radius 12, shadow `0 4px 20px #0d162f12`, padding 32/24.
  - Each: a 40px icon + title 20/500 (1–2 words) + 16px grey text (7–11 words).
- **Team:** a split row: image (radius 12) + text (h3 52px; 3 + 5 words) + 3 check rows + 5 plus-icon items. Padding-top 120.
- **For-market-research only:** a CaseStudy block (h2 4 words / 29 chars, 2 logos, image) between the tabs and the testimonial.
- **Book-demo popup:** a hidden HubSpot meetings modal opened by CTA; the close button fades it out (700 ms). Not inspectable.

### B.11 LegacyHomeClone sections (B5, /ai-ops)
Recipe only (rebuild each with A sections):
1. **Hero** `.section_home_hero-header`: centred hero + 2 buttons + a Wistia 16:9 embed + 2 wandering cursors. h1 3 words / 14 chars.
2. **CustomerCards** (B.9, 3) + **LogoMarquee** (B.2).
3. **StickyStackCards** (B.3 SEO variant), **3 cards**. h2 5 words / 41 chars.
4. **TemplateSlider** (Swiper, `slidesPerView 1`, spaceBetween 4%, centred, mousewheel + keyboard, speed 300; 4 slides).
   - Card: pastel bg (#cec1ff / pink #e8ddff / orange #ffe4c5 / blue #dbe5ff / lilac #ecdcff), 2px border, radius 11, padding 1.75rem.
   - Prev/next buttons: 3.25em round outline, hover bg #c8dd5e.
5. **KeyFeatures:** **4 sticky cards** (top 6rem; white 95%, blur 5, radius 24, grid `1fr 1.x fr`), each with a looping video (`.key-features_video`: border, radius `14 6 6 14`, min-width 900, absolutely bleeding right). Scroll-scaled like B.3. h3 2–4 words.
6. **ScaleYourTeam:** h2 2 words + h2 8 words (typed.js rotating text) + a hero image (slides up) + a 3-col list of **6 items** (h3 3–5 words) + 2 buttons.
7. **PressMarquee:** **8 cards**, 25rem wide, white, radius 16, padding 2rem, mr 2rem. Each has an image + button. Marquee −135rem over 30 s.
8. **FAQ** (B.9 legacy FAQ; 4 items; all open-state classes set).
9. **Awards:** h2 `.heading-style-h4` (6 words / 37 chars) + a 4-col grid (2 at ≤991) of **4 white cards** (radius 16, border), each a logo + a 14px h3 (3–4 words).
10. **TestimonialGrid** (B.6).
11. **Layout484:** a centred statement (h2 4 words / 20 chars) with a pill.
12. **LegacyFooterCTA** (B.7).

### B.12 CenteredHero + bento variants (B6)
- **/api:** CenteredHero (B.1 without cursors or video; 2 buttons; h1 4 words / 21 chars).
  - Then **ApiBento**: section header (pill + h2 4 words / 23 chars), then a row of 2 + 2 cards (`grid 1fr 1fr`, gap 1.5rem; 1 column at ≤991). **4 cards.**
    - Card: white, border #e6e7ea, radius 16, overflow hidden.
    - Image on top (cover, pb 10), then h3 `.text-size-large` (2–6 words / 15–30 chars) + text.
  - Then an empty security wrapper, then B.7.
- **/multi-agents:**
  - Enterprise banner: pill + h1 (2 words + a 3-word indigo span) + `.sub-header` (17 words / 96 chars) + 2 buttons (`.button-primary`, `.button-secondary`; pt 40).
  - Embedly video in a radius-24 frame (max 900) with a pulse embed.
  - **Template tabs** (`w-tabs`, 4 category tabs). Each pane is a horizontal row of **6 template cards** (name 3 words, description 14 words / 84 chars, creator chip with a logo, 2-word tag).
  - Then a second tabs block plus **BentoCards** (B.4) with 5 cards (h2 3 words / 12 chars, h3s 3–5 words).
  - Then B.6 and B.7.

---

## C. Page recipes (ordered sections and slot counts)

Notation: `Section(n)` means n repeated items. "CS x" = CLONE_SPEC section.

### A1: FeatureDetail
| # | /knowledge | /approvals-escalations | /version-control | /collaboration |
|---|---|---|---|---|
| 1 | A.1 FeatureHero, mock = Knowledge fan (5 docs, 4 coins) | A.1, mock = Approvals table (3 rows) | A.1, mock = Version table (4 rows) | A.1, mock = Collaboration lists (4 projects + 3 people) |
| 2 | LogoGrid CS 3.2 (12) | same | same | same |
| 3 | A.2 ShowcaseRow ×2 (text-left, then text-right) | ×2 | ×2 | ×2 |
| 4 | A.3a IconCardGrid (4) | (4) | (4) | (6) |
| 5 | A.4 FAQ (5) | (6) | (4) | (5) |
| 6 | A.5 MoreFeatures (3) | (3) | (3) | (3) |
| 7 | A.6 ClosingCTA (6 coins, violet) | same | same | same |
| 8 | CS Footer | | | |

### A1v: /phone-agent
1. A.1 FeatureHero with **video** media (16:9, overlay black/30, 64px play disc).
2. LogoGrid CS 3.2 (12).
3. A.2 ShowcaseRow ×1 (text-left; adds a 2-button CTA row; body 42 words / 264 chars).
4. A.3b IconCardGrid, 3-col (6). h2 2 words.
5. A.6 ClosingCTA (coins: avatar, calendar, avatar, chat, avatar, CRM icon).
6. Footer.

### A2: /workforce
1. A.8 SplitTitleHero + workflow canvas (460px).
2. LogoGrid CS 3.2 (12; 7 linked).
3. ExpandTiles CS 3.3, "how it works" (**3 tiles**: violet / blue / green-ops palettes). Label 1 word, h4 4–5 words / 25–27 chars, p 15–20 words. Illustration slots: 3 node/pill diagrams of 300×140–148.
4. ExpandTiles CS 3.3, "deploy paths" (**3 tiles**: violet / pink / blue). Same layout; header p `max-w-lg`. Illustrations: a node graph with a dashed placeholder node (`border 1.5px dashed rgba(13,22,47,.35)`), a typing-input pill with a #6056ff caret (1.5×14) and a 28px send disc, a stack of model chips.
5. IntegrationsShowcase CS 3.9.
6. Testimonials CS 3.10.
7. A.4 FAQ (WorkforcesFAQ, same component).
8. A.6 ClosingCTA.
9. Footer.

### A2: /gtm
1. A.9 GTMHero (rotating word: 11 options, 2.5 s; 2×6 tool cards).
2. A.9 StatementBand.
3. A.10 PlatformFraming.
4. CaseStudies CS 3.4.
5. LogoGrid CS 3.2.
6. { A.11 ValuePropHeading → A.11 UseCasePair (2 cells × 3 checks) } **×4**.
7. A.12 TabbedCanvasDemo (Playbook).
8. A.12 EvalsDemo.
9. Testimonials CS 3.10.
10. A.13 TasksCTA.
11. Footer.

### A2: /invent
1. A.14 InventHero (7 clouds, mascot, 3 bubbles, ~9 scripted step cells).
2. A.15 InlineVideo.
3. UseCases CS 3.5 (segmented tabs: 7 categories; grid `sm:2 lg:4`, gap-x 24, gap-y 40).
4. A.16 Signals.
5. A.16 Evals.
6. A.16 Embed.
7. A.17 StackCollapse (5 rows).
8. LearnMore CS 3.12.
9. A.16 GetStarted.
10. Footer.

### A2: /slack
1. A.18 SlackHero + ChatDemo.
2. LogoGrid CS 3.2.
3. A.19 Two-up feature (2 numbered cells + media).
4. IntegrationsShowcase CS 3.9 (h2 split into 3 lines), with the 30-cell icon wall.
5. A.19 Use-case hairline grid (10).
6. A.19 Split explainer (2 paragraphs + 3 stat cells).
7. EnterpriseSecurity CS 3.8.
8. A.19 ProgrammaticCTA.
9. FeaturedIn CS 3.11.
10. A.19 Final CTA.
11. Footer.

### A3: /features
1. A.7 FeaturesHero.
2. A.7 FeatureCatalog: **14 category sections** (96 rows in total; 3 sections carry a logo cluster instead of an icon).
3. LogoGrid CS 3.2.
4. Footer.

### B1: /customer-support-agent, /seo-agent
| # | cs-agent | seo-agent |
|---|---|---|
| 1 | B.1 CenteredHero (Wistia autoplay) | same (another video) |
| 2 | B.2 LogoGrid (13) | same |
| 3 | B.3 header + IconRow (5) + CompareCards (4 + 4 rows) | B.3 header + **StickyStackCards (6)** + IconRow (6) + CompareCards (4 + 4) |
| 4 | B.4 BentoCards (2 + 1) | B.4 (2 + 1) |
| 5 | B.5 WhatItDoes + BenefitCards (4) | same (4) |
| 6 | (empty benefits and security wrappers: render nothing) | same |
| 7 | B.6 TestimonialGrid (7) | same |
| 8 | B.7 LegacyFooterCTA | same |

### B2: /inbound, /outbound
1. B.1 CenteredHero (Embedly video, 2 cursors; h1 1 word + span).
2. B.2 LogoMarquee (65 × 3).
3. B.8 ROI stats (5 counters). On /outbound this comes after item 4.
4. B.8 Before→After (3 pairs). On /outbound this comes before item 3.
5. B.8 FeaturedCaseStudy.
6. B.8 OutboundFeatures (2×2).
7. B.8 HowItWorks (4 steps).
8. B.8 TeamPlayer (2 cards × 4 points).
9. B.8 TimelineCTA (4 rows) + footer CTA mascots.
10. Legacy footer.

### B3: /schedule-work
B.9 DarkHeroCard → LayoutRow 1 → LayoutRow 2 → FeatureBento (6) → FAQ (4) → ProductCards (3 dark) → NextSteps (3) → CustomerCards (3) + LogoGrid (13) → B.7 → footer.

### B4: /for-customer-experience, /for-market-research
B.10 Hero → Logo row (12) → Values (3 cards) → Vertical tabs (3) → [MR only: CaseStudy] → Testimonial → AllFeatures (8) → Team → B.7 → footer.

### B5: /ai-ops
See B.11 (12 sections).

### B6: /api, /multi-agents
See B.12.

### Stubs
- **/bulk-run**: banner + legacy navbar → **B.7 LegacyFooterCTA only** → footer. There is no hero or body content in the HTML; the title implies a "bulk enrichment" feature page that was never filled. Lumenfold: either skip it or rebuild it as an A1 FeatureDetail.
- **/tools**: `.blog-list-grid-section` (mt 60; 30 at ≤991).
  - h1 `.header-title`: Inter 700, **66px** (48 at ≤991), −1px, lh 1.2, centred, max 880, margin 32 auto. 1 word.
  - Then a Webflow CMS list `w-row` of **2-col items** (`w-col-6`, `py 20`). **7 items**, each a title link (3–12 words / 15–85 chars) + a description (38–45 words / 270–292 chars).
  - No images or filters. Then B.7 and the footer.
  - Lumenfold: render it as the PAGES_CATALOG W1-style text card list.

---

## D. One-off pages

### D1. /self-driving-gtm (Astro shell; own stylesheet)
- **Tokens** (`:root`):
  - surface #fff, surface-2 #FAFAFB, surface-dark #0D162F, text #0D162F, text-2 #868A97, text-3 #B5B7BD;
  - indigo #6056FF, indigo-dark #3B32F9, indigo-soft `rgba(96,86,255,.08)`, indigo-line `rgba(96,86,255,.2)`;
  - border #E6E7EA, border-strong #D7D8DC;
  - **radius-card 0** (everything square);
  - shadow-btn `0 4px 14px rgba(96,86,255,.35), 0 1px 2px rgba(13,22,47,.1)`.
- `.container`: max 1300, padding 0 60 (24 at ≤860). `.section`: padding 96 0, border-top (64 at ≤860). Single breakpoint: **860px**.
- **Type:**
  - `.h1`: Sora 500, `clamp(40px, 5.5vw, 76px)`, lh 1.05, −.035em, max 18ch;
  - `.h2`: Sora 500, `clamp(32px, 3.6vw, 52px)`, lh 1.08, −.025em;
  - `.h3`: Sora 500 22 / 1.2;
  - `.lead`: 18 / 1.65, `#0d162fb3`, max 65ch;
  - `.body`: 16 / 1.7, `#0d162fc7`;
  - `.mono-label`: mono 11px, uppercase, .12em, `#0d162f66`;
  - `.eyebrow`: 13/500 #6056ff.
- **Buttons** `.btn`: padding 12/22, radius 8, Sora 500 14, 1px border; hover bg `#6056ff14`.
  - Primary: `radial-gradient(circle at 30% 30%, #6056ff, #3b32f9)`; hover `(#6e64ff, #4a40ff)`.
  - `.btn-lg` 16/30 padding 16; `.btn-sm` 8/14, 13px.
- **Sections:**
  1. **Road hero.**
     - Centred h1 (11 words / 60 chars) + lead (20px).
     - Stage: margin-top 60, padding 60 30 40, gradient `surface → surface-2`, 1px border. It holds a 900px-max SVG road with clickable markers (halo `#6056ff26` when active).
     - Readout box below (max 540, 1px indigo-line, padding 20/24):
       - level tag: indigo pill, mono 11px;
       - h4 Sora 24;
       - p 14.5 #868a97;
       - note: dashed top rule, italic 12.5.
     - Use-case switcher: mono pills 11px uppercase, radius 999, 1px indigo-line; active = indigo fill.
     - CTA row (gap 12). Then a trust strip: mono label + a logo strip of **12 logos** (h 28, grayscale, opacity .6 → hover 1; h 22 at ≤860).
  2. **Framework.**
     - Header grid 1fr 1fr, gap 60, `align-end`: h2 3 words / 21 chars + lead.
     - **Highway**: a track of 4 cells, 80px tall, 1px #0D162F border, dashed centre line (16px dash pattern). Markers are 56px round pins (mono 13); the current pin is filled dark with a shadow.
     - Then **4 cards** (gap 16; 1 column at ≤860): border, padding 0 22 22, hover border indigo, current border dark. Each card has:
       - a 1:1 illustration header (bg `linear-gradient(135deg, #6056ff0d, #6056ff03)`, border-bottom);
       - a level row (mono 12) + a "where" chip (mono 9.5);
       - h3 Sora 24;
       - a mono sub-label;
       - p 14 / 1.55;
       - an unlock block (border-top, mono key 10 indigo + 13 italic value) and an example box (surface-2, padding 12/14).
     - Below them, an **AutonomyTimeline** island (Astro):
       - a 4-col grid with min-width 960 / max 1060, scrolled horizontally on small screens;
       - a gradient connector `#e5e7eb → #c7d2fe → #a5b4fc`;
       - 32px step discs (accent = indigo fill);
       - 14px captions;
       - cards with 1px border (grey `bg-gray-50/80` vs indigo/20), padding 20;
       - reveal `y 16`, .4 s, stagger .1, `margin −40px`.
  3. **Dimensions.** Header 1fr 1fr. A grid of 3 columns of square-bordered cards (padding 32/28; hover bg indigo-soft) with:
     - a 40px icon tile (radius 6, indigo-soft);
     - h3 20;
     - sub 14.5 (max 30ch);
     - an L1 | L4 compare grid (mono labels 10, values 13.5);
     - a red cost strip (bg #fdf2f0, border #FBE0DB, mono pill #b8453a on #fbe0db).
  4. **Industry.**
     - 2-col header.
     - Benchmark track: 4 segments, 80px, with an indigo band covering 50% (`linear-gradient(to right, #6056ff2e, #6056ff1a)`, 2px indigo right edge) and a caption with an 8px indigo dot.
     - Stats strip: 3 cells with 1px **dark** borders, padding 36/30/28, min-h 240 (180 at ≤860). Each cell: number Sora 300 `clamp(48px, 6vw, 88px)` −.04em, desc 16 (max 30ch), source link 12 underlined.
  5. **Customer.**
     - 2-col: h2 + body 17 (max 52ch) + a pull quote (4px indigo left border, Sora italic 24 / 1.35, cite 14/500 #868a97) + an arrow link 15/500 indigo underline.
     - Right: a radar SVG in a box (indigo-soft gradient, indigo-line border, padding 32) with a legend (14×4 swatches: before #868a97, after indigo).
  6. **Final CTA** (`padding 140 0 120`; 80/64 at ≤860).
     - h2 centred `clamp(36px, 4.5vw, 64px)`.
     - A single column box (max 440; surface-2, border, padding 24) with a mono label and a list of rows (15 / 1.55, border-top dividers, a 12px indigo dash bullet).
     - Button block mt 48 + clarifier + trust strip.
  - Footer (CS).
- **Motion:** only the timeline reveal and the road-marker hover/active transitions (fill .2 s). There is no scroll animation in the stylesheet.

### D2. /specialist-agents (long-form article; Astro header, no footer)
- `main`: `max-w-[860px] mx-auto mt-[120px] mb-20 px-[88px] bg-white text-#0d162f`. At ≤md: mt 76, mx 16, mb 40, px 8. Content width: **684 @≥860**; about 327 on mobile.
- Header `mb-14`:
  - a hero-mark SVG figure (max 520, mb 32);
    - boxes: white with #d7d8de stroke 1.5 (accent #6056ff);
    - dashed "harness" path `stroke-dasharray 5 4` animating `hmDrift 6s linear infinite` (dashoffset −36);
    - spec lines settling `hmSettle .5s` (opacity 0 → 1, y 6 → 0);
    - all respect `prefers-reduced-motion`.
  - h1: **Sora 500 44 / 1.25**, −0.01em, mb 24 (32px at ≤md). 8 words / 51 chars.
  - Lede: 20 / 1.6, #4a4f5c (18 at ≤md). 33 words / 206 chars.
- **10 `<section class="mb-14">`** (56px apart). Each:
  - h2: Sora 500 28 / 1.25, −0.01em, mb 20 (24 at ≤md). 3–8 words / 23–37 chars.
  - p: 18 / 1.65, #2b3140, mb 18 (17 at ≤md).
  - Inline links: #6056ff 500 underline offset 2, hover #7281ff.
- **Inline components:**
  - Quote cards: 2-col grid gap 16, mt 28, mb 32 (1 column at ≤md). Each figure `py-5 px-[22px]`, 1px #e6e7ea, white: a 16/1.5/500 statement (13–19 words) + a 13px #868a97 figcaption with an underlined source link. **4 cards.**
  - Stat row: 3-col gap 32, py 28 (1 column at ≤md, gap 24). Each stat: Sora 500 40, lh 1, −0.02em, #6056ff (3 chars), a 14 / 1.45 #2b3140 label (6–16 words) and a 12px #868a97 underlined source.
  - **14 diagram figures** `.fig`:
    - margin 40 0 8, padding 32 28 20, border #e6e7ea, bg #fcfcfd with a 1px grid of `#0d162f08` lines;
    - figcaption 14px #707287 centred;
    - SVG vocabulary: stroke 1.6 indigo / ink #1c2336 / alert #b42318; node white boxes; dashed boxes `6 5`; bars (up: fill `#6056ff1f`; down: fill `#b4231814`).
  - Lists: `list-none mb-18 p-0`.

### D3. /bdr-agent-waiting-list (form page, legacy)
1. `.book-demo-section` (mt 80, mb 60; 40/40 at ≤991): a container (1268 / 20px) and a left column max 592 (mr 20).
   - h1 `.heading-1._44px-font`: Inter **700 44 / 120%**. 7 words / 46 chars.
   - p 16 (pt 10). 16 words / 89 chars.
   - Bullet list: **4 items** (6–12 words), pt 5.
   - Form (mt 32): grid 2-col gap 16. **6 labelled inputs**: label #868a97 400; input 1px #e0e7ff, radius 8, #0d162f 500. Then a submit button (`.bd-cta`) and a consent checkbox (11 words). Success (7 words) and error (8 words) states.
   - **Note:** `.book-demo-form` is `display:none` in CSS. A `w-embed` script injects the live form (HubSpot), so the rendered fields are **not inspectable**.
2. Logo row (12, 6-col) with a label of 11 words.
3. B.7 LegacyFooterCTA; legacy footer.
- Lumenfold: rebuild it as a 2-col form page on the A shell: left = copy + 4 bullets, right = a form card using the CS input focus ring.

### D4. /agent-drop (dark launch event, legacy)
- Body bg **#404040**. The whole page scrolls through **luxy.js** smooth scroll (`velocity .075, inertia .5`, wrapper `#luxy`).
- **Hero** (min-h 48.7rem; layered stage 64rem tall):
  - Background: #120432 + gradient, dots and stars SVG layers.
  - Land: 8 stacked full-bleed `object-cover` illustration layers (base, trees, 4 people, 2 steps).
  - Centre: logo + a title **image** (35svw, min 30rem) with a blurred duplicate behind it (`blur 97px`), then p 20px white (11 words / 81 chars) and a secondary button (`.is-agent-drop`, indigo glow shadow).
  - **GSAP intro timeline:**
    - texture gradient fades in 1.5 s power2.out;
    - dots and stars fade in .5 s, then flicker (30 ms opacity steps at +0.5 to +0.74 s);
    - the title flickers with `brightness / contrast 0 → 3 → … → 1` from +0.09 s, then a scale pulse 1.05 → 1 (80 ms each);
    - then the blur glow, logo and text (y 20 → 0);
    - land layers reveal in reverse order.
- **Launches** (folder sections that overlap with an edge-shadow SVG; the intro wrapper starts at `translateY(6%)`):
  - Section bg #404040, white text.
  - Pill: #5f5d67, radius 100, padding .5/1rem.
  - h2 white (10 words / 52 chars) + p (28 words / 180 chars).
  - **Swiper** of **4 launch cards**: slidesPerView 1, spaceBetween 4%, centred, speed 300.
    - Card: grid `.8fr 1fr`, **radius 30**, shadow `0 14px 20px 9px #0000004f`, white.
    - Text: pill + h3 (5–8 words / 40–52 chars) + p (26 words / 169 chars) + a link button.
    - Image bleeds from the left (absolute, auto width).
- **Folder scroll:** **8 stacked "folder" sections**, each topped by an edge-shadow SVG:
  - a teaser 2-col image;
  - 5 video blocks (iframe + cover image; click hides the cover, radius 30);
  - an Invent-style input demo with 4 query chips and a bobbing character (`y +5% / −2%`, 3 s bouncePast);
  - a testimonial;
  - a logo marquee;
  - the B.7 CTA.
- Lumenfold: treat it as an **event microsite**. Keep the dark palette (#120432 hero, #404040 sections), the folder-edge stacking and the swiper card, and replace all art.

### D5. /agents-at-work (event / video hub, legacy)
1. **Header6.** pb 10rem (12rem at ≥1440, 6rem at ≤991). A full-bleed background image (`object-cover`, position 0 100%). A centred h2 `.text-size-large` (9 words / 54 chars), a button, an autoplay muted background video element, and a logo row (4 logos, max-h 3.5rem, gap 2rem).
2. **Watch now** (`.section_agent-drop-content.is-agentswork`): h2 (2 words / 17 chars) + a featured video (3 iframes, 2 cover images, radius 30, click to play) + pixel-decoration accents.
3. **Speaker / session hub** (one long `.section_lima-agent_layout-2`):
   - **14 speaker cards** (radius 20, 33.33% width, image + name);
   - **3 Swiper sliders** (17 slides in total; `.show-tablet` variants);
   - **12 session videos** (iframe + cover) in 2–3-col wrappers (gap 2.5rem);
   - a protocol FAQ (5 items; plus icon rotates 180°; open 800 ms ease);
   - 2 cursor avatars;
   - a NextSteps grid (B.9; 5 cards incl. 2 large icons);
   - a duplicated next-steps block and a CTA button.
4. Legacy footer.
- Lumenfold: an event hub. Hero with a background video, then a video grid with click-to-play covers (radius 30 on the legacy; use radius 12 on Lumenfold), a speaker card grid (3 / 2 / 1 cols), and sliders.

---

## E. Motion summary (new items only; Astro values use EASE = `{duration:.5, ease:[.23,1,.32,1]}`)

| Item | Trigger | Values |
|---|---|---|
| FeatureHero grid / media | load | `y 16 / 18 → 0`, EASE, media delay .15 |
| ShowcaseRow media | inView once .2 | `y 18`, EASE |
| IconCardGrid cards | inView once .3 | `y 16`, EASE, delay `min(i,3)×.05` |
| FAQ answer | click | height/opacity 0 ↔ auto, .2 s |
| Knowledge fan dots | loop | animateMotion 2.6 s, stagger .4 s, opacity `0;1;1;0` |
| FeaturesHero | load | `y 16`, delays 0 / .06 / .12 |
| FeatureCatalog section | inView once .15 | `y 18`, stagger `min(i,3)×.05`; left column `position: sticky; top: 96px` (lg+) |
| GTM rotating word | interval 2500 ms | `y ±100%`, .4 s out-quint; width .4 s |
| GTM tool cards | load | `y 12`, .5 s, delay .05 + i×.04 |
| PlatformFraming bubbles | load + loop | enter `scale .8`, .7 s (delay +.3); infinite y float easeInOut; hover 1.08 |
| Evals bars | step | height 0 → h, .4 s `[.25,.1,.25,1]`; status dots spring 400/15 |
| TasksCTA | scripted loop | check .2 s; blur 12 px .8 s; h2 `y 20` .6–.8 s; loop 3.5 s |
| InventHero clouds | CSS loop | drift ±25–60 px, 55–80 s; bubbles bob; step cells inView .6 |
| Invent GetStarted mascot | inView .6 | spring 220/13 from `y −18, scale .6` |
| Slack chat | scripted | messages `y 12` .3 s; actions `x −8`; reply height auto .4 s |
| AutonomyTimeline cards | inView, margin −40 px | `y 16`, .4 s, stagger .1 |
| specialist hero-mark | CSS | dash drift 6 s linear loop; settle .5 s; reduced-motion off |
| Legacy (B) | see B.0 | fade/slide 1000 ms outQuart; marquees 38 s / 30 s; counters 2 s; GSAP badge loop |

Libraries: framer-motion/`motion` (A); react-flow / @xyflow (A.8, A.12); Webflow IX2 + jQuery, GSAP 3.12 + ScrollTrigger, Swiper 8/11, luxy.js, typed.js, counterUp, Wistia, Embedly (B). Lumenfold: `motion` + CSS keyframes cover everything. Swiper (or a CSS scroll-snap carousel) is optional for B-derived sliders.

## F. Media placeholder slots (no original assets)

| Slot | Size / ratio | Fit | Radius | Overlay |
|---|---|---|---|---|
| A.2 showcase screenshot | col width (351 / 528 / 672 / 327) × natural (≈4:3) | none (block) | 12 + 1px border | none |
| A.1v / B.1 / A.15 video poster | 16:9 | cover | 12 (A.1v) / 0 (A.15) / 20 (B.1) | black 30% (A.1v) |
| Avatars in coins / mocks | 28, 24, 22, 20 px | contain | 6 or full | none |
| A.11 use-case images | 128×128 ×2 + 128 sticker | cover / contain | 6 / none | sticker rotated 12° |
| A.18 chat avatars | 36 / 28 px | cover | 8 | none |
| B.4 bento images | card width × natural | none | inherits 16 | none |
| B.5 benefit images | card width × natural | cover | inherits 16 | none |
| B.6 testimonial avatar | 48 round | cover | full | none |
| B.8 ROI portrait | 205 × ~260 | contain | none | none |
| B.8 case study image | half of 1225:462 box | cover | 16 | none |
| B.9 customer card image | 16:9 | cover | 8 | black 50% + top-left logo |
| B.9 dark hero art | right col, bottom-right | contain | inherits 16 | inner shadow 74px |
| D4 launch card art | ~55% of card | auto, bleeds left | 30 → use 16 | none |
| D5 speaker card | 1/3 width, ~4:5 | cover | 20 | none |
| Logos (all walls) | h 22–28 (legacy) / 24 (A) | contain, grayscale | — | — |

## G. Not inspectable / gaps
- Rendered heights and line counts for every section (no browser). Widths are derived.
- react-flow layouts (A.8, A.12), InventHero step scripts, the Signals / Evals canvases and the Slack chat script timings beyond the `setTimeout` offsets noted.
- Wistia, Embedly and YouTube media; the HubSpot forms (/bdr-agent-waiting-list, the uc book-demo popup).
- /bulk-run has no body content in the HTML (CTA only).
- The Webflow IX2 values above come from the site's interaction table, not from watching the animations run.
