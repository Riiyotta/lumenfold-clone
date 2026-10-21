Source: https://relevanceai.com/

# PAGES_CONTENT — editorial and content templates (Lumenfold design-system clone)

Scope: this is a design-system clone for the fictional brand **Lumenfold**. Do not copy any article text, titles, author names, competitor names, logos, photos or illustrations. Text slots are given as role, word and character count, and line count. Media slots are given as size, ratio, fit, radius and overlay. List pages are given as columns, cards per page and pagination style.

Reuse, do not redefine: tokens, fonts, type scale, gutter-rail `Row`/`StackedSection`, `Button` (primary/secondary/pill), `PillTabs`, grain gradients and noise, `SectionHeading`, the `LogoGridSection` logo wall, `HowWeWork`/`ExpandTiles`, `EnterpriseSecurity`, `Testimonials`, `AutonomyAndProduct`, Header and Footer. All of these are in `../CLONE_SPEC.md`, cited below as "CS §n". This file only documents what is new.

How this was measured: on 2026-10-21 I curled each route's server-rendered HTML plus its CSS bundles and Astro island JS. I did not open a browser. Values come from Tailwind `tw-` class strings, compiled CSS and the component source. Pixel widths per breakpoint are derived arithmetically from those values together with the CS §1.5 gutter rails (center column 926 at 1440, full width capped at 1300 below that). They are not `getBoundingClientRect` readings. Where a value could only come from a rendered layout, the text says so.

---

## 0. Route map and the distinct templates

The site is served by **four different stacks**. That is why some routes look unrelated.

| Route (sample used) | Stack | Template |
|---|---|---|
| `/blog` | Astro + Tailwind (current DS) | **T1 Blog Index** |
| `/blog/<post>` (`adaptive-context-management-for-production-ai-agents`; also checked an older post) | Astro | **T2 Article** |
| `/posts/<x>` (`0000-00-00-invent-apps`, `…ask-relevance…`) | Raw HTML fragment, 200 `text/html` | **Not a template.** The body is only `<p>/<h2>/<ul>/<li>`, with no `<html>`, head, CSS, nav or footer. It is **not** the same as a blog post. Render it in T2 using the "minimal" variant. |
| `/changelog` | Fumadocs (Next.js docs app, `/docs/changelog`) | **T7 Changelog Feed** |
| `/changelog/<entry>` (`11th-april-2024`) | — | **307 redirect to `/docs/changelog`.** There is no per-entry page. Entries are anchored `h2`s inside the feed. |
| `/events`, `/resources` | Astro | **T3 Hub Index** (same template; only the data differs) |
| `/events/<x>` (`confluent-webinar`) | Astro + page CSS | **T4 Event Detail** |
| `/vs` | Astro | **T5 Comparison Index** |
| `/vs/<x>` (`clay`) | Astro | **T6 Comparison Page** |
| `/learn`, `/topics` | Legacy Webflow | **T8 Legacy Simple List** (2 columns vs 3 columns) |
| `/learn/<x>`, `/prompt-engineering/<x>` | Legacy Webflow | **T9 Legacy TOC Article** (the same template) |
| `/topics/<x>` (`lead-generation`) | Legacy Webflow, **no nav and no footer** | T9 variant "bare" |
| `/frequently-asked-questions` | Legacy Webflow | **T10 FAQ Page** |
| `/relevance-academy/<x>` (`agent-profile`) | Legacy Webflow, dark | **T11 Academy Lesson** |
| `/academy` | **308 redirect to `academy.relevanceai.com`** (Skilljar LMS, third party) | **T12 Academy Catalog** |
| `/resources/<x>` (not requested; seen in passing) | Astro, bespoke whitepaper landing (`wp-hero`, `stats`, `inside`) | Not specced |

**Recommended minimum build set for Lumenfold: 9 templates.** Build everything in the current Astro DS chrome (CS §3.0 header and §3.13 footer). The legacy Webflow chrome (rounded floating navbar, old footer, announcement bar) should not be cloned; see §8.

1. **ListingGrid**: T1. T8 is its "text-only" variant.
2. **Article**: T2. T9, the "bare" topic post and `/posts` are variants: TOC on or off, hero on or off.
3. **HubIndex**: T3, for both events and resources.
4. **EventDetail**: T4.
5. **ComparisonIndex**: T5.
6. **ComparisonPage**: T6.
7. **ChangelogFeed**: T7.
8. **FAQPage**: T10. It reuses the T6 `FAQSection` accordion.
9. **Academy**: T11 lesson (dark) plus a T12 catalog. Build the catalog with HubIndex parts.

---

## 1. Shared new components (used by several templates)

### 1.1 `ContentCard` (hub/event/resource card)
- Class string: `box-border flex flex-col gap-4 p-7 bg-surface-light border border-border-default text-text-primary-light transition-all duration-300 ease-[ease] hover:-translate-y-[5px] hover:bg-brand-indigo/[0.06] hover:border-brand-indigo/20`. Corners are square.
- This is the same hover as LearnMore in CS §3.12: lift 5px, 6% indigo wash, 20% indigo border, 300ms `ease`.
- Slots, top to bottom:
  - Partner-logo row, `h-7`. The logo is `w-auto`, height inline 20–28px, `grayscale` (or `brightness-0` for dark logos), `opacity .65`.
  - On the right of that row, a **kind label**: Sora 12/18 600, uppercase, `tracking-[0.08em]`, #6056ff, 1–3 words. This is the only uppercase eyebrow in the DS.
  - Date: Inter 13px #707287, 4–6 words / 22–31 chars.
  - h3: Sora 20/24 600, -0.01em, `text-wrap:balance`, 4–9 words / 29–54 chars, 2 lines.
  - p: Inter 15/22.5 #707287, `flex-1`, `text-wrap:pretty`, 21–41 words / 123–215 chars, 3–6 lines.
  - CTA: Sora 14/21 600 #6056ff, 2–3 words, then a 16px arrow (line + polyline, stroke 2).

### 1.2 `ContentRow` (wide list row, used for "upcoming" items)
- Class string: `grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_180px] items-center gap-8 p-8`, plus the ContentCard surface and hover.
- Column 1 (`flex-col gap-3`) holds one of two layouts:
  - Events: partner logo, kind label, date (Sora 20/26 600) and time/location (14/21 #707287).
  - Resources: a cover image, `w-full h-auto object-cover border`, `aspect-ratio:1400/992` (1.41:1).
- Column 2 (`flex-col gap-3`): kind label (resources only); h3 Sora 24/28.8 600 -0.01em (5 words / 25 chars); p 16/24 #707287 `max-w-[640px]` (26 words / 151 chars).
- Column 3: CTA, as in 1.1.
- Derived widths (≥900px; 1440 inner 700 / 1280 inner 1054): column 1 is 152 / 291 and column 2 is 304 / 583. Below 900 the row stacks.

### 1.3 `HubSectionHeading`
- h2: Sora **36/43.2 600**, `tracking-[-0.02em]`, #0d162f, 1–2 words.
- This differs from CS SectionHeading, which is 400 weight. It applies on every breakpoint (there is no md step).

### 1.4 `ClosingCTA` (grain panel with floating avatar coins)
- Wrapper: StackedSection (`py-12 md:py-28`, px 24/48/80).
- Panel: `relative overflow-hidden rounded-2xl` (16px) with the violet grain gradient and noise (CS §1.2). Inner padding `px-6 py-16 md:py-24`.
- Coins, `lg` and up only (`hidden lg:block`): six 44px glass circles.
  - Style: `rounded-full border-white/60 bg-white/70 backdrop-blur(8px)`, shadow `glass` (CS §1.1). Each holds a 28px round avatar.
  - Positions (top / side / rotate):
    - 16% / left 4% / -8°
    - 48% / left 10% / 6°
    - 76% / left 5% / -4°
    - 14% / right 4% / 7°
    - 50% / right 10% / -6°
    - 74% / right 5% / 5°
- Content: `max-w-xl` (576px), centred.
  - SectionHeading align center: h2 Sora 400, 30/40.5 below md and 36/48.6 at md+, `tracking-tight`, 4–5 words / 22–29 chars.
  - p `mt-5 max-w-lg`: 16/25.6 rgba(13,22,47,.8), 12 words / 69 chars, 2 lines.
- Buttons: `mt-8 gap-4`, centred.
  - Primary pill (CS Button).
  - Optional secondary pill, `!bg-white hover:!bg-[#f9f9fa]`.
- Motion: the heading block uses CS §4.2 SectionHeading (`opacity 0, y 16` to `1, 0`, inView .4, EASE).

### 1.5 `FAQSection` (the Astro accordion; used by T6, and recommended for T10)
- Wrapper: PageSection. That is StackedSection plus left-aligned SectionHeading `max-w-2xl mb-12 md:mb-14`.
- Description: Inter 16/25.6 (18 at md+) #868a97, with an inline indigo link (`hover:underline`).
- List: `border border-border-default divide-y divide-border-default`. Square corners.
- Item button: `w-full flex items-center gap-4 py-5 px-4 md:px-6 text-left hover:bg-gray-50/50 transition-colors`.
  - Icon circle: 32px, `rounded-full border`.
    - Closed: border #e6e7ea (hover gray-400) with a 12px plus, stroke 2, #868a97.
    - Open: bg and border #6056ff with a white 12px minus.
    - `transition-all` (150ms).
  - Question: Inter 500, 16/26 (18/29.25 at md+), #0d162f, 6–8 words / 31–53 chars, 1 line at md+.
  - Answer: `pb-5 pl-[52px] md:pl-[56px] pr-6`, 16/26 #868a97.
- Behaviour: single-open; all items start closed. Motion: AnimatePresence `height 0↔auto, opacity 0↔1`, **duration .2s**.
- Emits FAQPage JSON-LD.
- 5 items on the sample.

### 1.6 `HeroCarousel` (right column of the T3 hero)
- Status pill: `inline-flex gap-2.5 px-3.5 py-2 rounded bg-white/55 backdrop-blur(10px)`, 13px #0d162f.
  - It holds an 8px #6056ff dot with shadow `grid-glow`, then a Sora 600 label (1–2 words), then a count sentence (1–4 words). Example of the shape: "<Label> <number word> upcoming <noun>".
- Track: `w-full overflow-hidden rounded`. Its inner flex is translated `translateX(-index*100%)`, `transition-transform 500ms cubic-bezier(.4,0,.2,1)`.
- Slide: `flex-[0_0_100%] flex-col gap-4 p-6 rounded bg-white/55 backdrop-blur(10px) hover:bg-white/80`, 300ms ease. Slots:
  - Logo row (`h-7`, logo opacity .75) plus kind label in #3b32f9.
  - h3 Sora **22/26.4 600** -0.01em, 5 words.
  - p 14/21, opacity .85, 21 words / 114 chars.
  - CTA Sora 14 600 #3b32f9.
- **Auto-advance every 2000ms.** It pauses while the pointer is over the track, does not run when `prefers-reduced-motion: reduce`, and does not run with fewer than 2 slides.
- Dots (only when there are 2 or more slides): `flex gap-2 pl-1`, buttons `h-1.5 rounded-full`. Active is `w-6 bg-#3b32f9`; inactive is `w-1.5 bg-#3b32f9/30`. `transition-all 300ms ease`.
- With 0 items, only the pill renders, showing an empty-state sentence of 4 words.

---

## T1. Blog Index — `/blog` (ListingGrid)

Sections: Header (CS) → title band → filter and grid → Footer (CS). Both bands are gutter-rail rows (CS §1.5).

### Title band
- Inner: `py-12 px-6 md:px-12 border-b`.
- h1: Sora 36px 600, `tracking-tight` (-0.9px), #0d162f. Line-height is 40px below md and 45px at md+ (`md:leading-tight`). 1 word / 4 chars.
- p `mt-3`: 18/28 #868a97, `max-w-2xl`, 10 words / 66 chars, 1 line (2 at 375).

### Filter and grid band
- Inner: `px-6 md:px-12 py-12 md:py-16`.
- **Category pills** (`.blog-category-tabs`): `flex flex-wrap gap-2 mb-8`.
  - 6 pills: "all" plus 5 categories, 1–4 words each.
  - Pill: `px-4 py-2 rounded-full` (36px tall), Inter 14/20 500, #868a97, 1px #e6e7ea border, transparent bg, `transition all .2s`.
  - Hover: border and text #6056ff.
  - Active: bg #6056ff, text #fff, border #6056ff.
  - This is not PillTabs; it is a separate, simpler component.
- **Filtering:** client-side only. It toggles `display:none` on cards whose `data-category` does not match. There is no animation, no URL state, no search, **no pagination and no "load more"**. All cards (83 on the live site) are server-rendered on one page.
- **Grid** (`.blog-card-grid`):
  - Below 640: 1 column, gap `40px 32px`.
  - 640 and up: 2 columns, gap `48px 32px`.
  - 1024 and up: 3 columns, gap `56px 32px`.
- **BlogCard** (an anchor, with no box, border or bg):
  - Image: `w-full aspect-[16/10] object-cover mb-4`, **radius 0**. Sources are mixed ratios (1.54:1 and 1.78:1 seen), so the crop comes from the aspect box.
  - Date: 13/19.5 #868a97, `mb-1.5`, 3 words / 11–18 chars.
  - Title: Sora 17/23.8 600 #0d162f, `mb-1.5`, 7–14 words / 32–75 chars, 2–3 lines. It goes #6056ff on card hover (`transition color .2s`).
  - Description: 14/22.4 #868a97, `flex-1`, **clamped to 2 lines** (`-webkit-line-clamp:2`), 8–36 words. It is optional, and some cards omit it.
  - Author row: `flex items-center gap-2 mt-3`. A 20px round avatar (`object-cover`, optional), then the name in 13px 500 #868a97, 2 words.
  - There is no hover lift or shadow.

| Breakpoint | Grid width | Columns | Card width | Image height |
|---|---|---|---|---|
| 1440 | 830 | 3 | 255.3 | 159.6 |
| 1280 | 1184 | 3 | 373.3 | 233.3 |
| 768 | 672 | 2 | 320 | 200 |
| 375 | 327 | 1 | 327 | 204.4 |

**T8 variant "text-only"** (used for `/learn` and `/topics`): same band layout but no image, date or author. Each card is a title link plus a 14–22 word description. Use 2 columns for "learn" (4 items) and 3 columns for "topics" (8 items). See T8 for the legacy values.

Motion: none, apart from the CSS hovers above.

---

## T2. Article — `/blog/<post>` (plus variants)

One gutter-rail row. Inner `px-6 md:px-12 py-12 md:py-16`.

### Post header (`max-w-4xl` = 896px, `mx-auto`)
- Back link: `inline-flex gap-1.5 mb-8`, 14/20 #868a97, hover #6056ff (150ms). A 16px left chevron, then 1 word.
- Meta row (`flex items-center gap-3 mb-4`):
  - **Reading-time pill:** 14/20 500 #6056ff on `bg-#6056ff/10`, `px-3 py-0.5 rounded-full`, "N min read" (3 words / 10 chars).
  - `<time>`: 14/20 #868a97, 3 words / 17 chars.
- h1: Sora 600, `tracking-tight` (-0.025em), #0d162f, `mb-8`. Size is 30/36 below md and 36/45 at md+. 7 words / 52 chars, 2 lines at 1440 and 1 at 1280.
- Author row (`flex items-center gap-3 mb-8`):
  - Avatar: 40px round, `object-cover`.
  - Name: 14/20 600 #0d162f, 2 words.
  - Role: 12/16 #868a97, 2–3 words.
- Cover image: `w-full rounded-xl mb-12` (12px radius), at its natural ratio (sources 1280×832 and 2000×1125; older posts use SVG covers). `loading=eager`. No overlay.

### Body layout (`.blog-post-layout`)
- Container: `max-w-[56rem] mx-auto flex gap-12`.
- Sidebar: `w-48` (192px), `shrink-0`, `hidden lg:block`. Content: `flex-1 min-w-0`.

| Breakpoint | Layout width | Sidebar | Prose column |
|---|---|---|---|
| 1440 | 830 | 192 | 590 |
| 1280 | 896 | 192 | 656 |
| 768 | 672 | hidden | 672 |
| 375 | 327 | hidden | 327 |

- **TOC and Share block** (`.blog-toc`): **`position:sticky; top:96px`**.
  - Section title: Sora 11px 600, uppercase, `letter-spacing .08em`, #868a97, `mb-3`. Used for "Contents" and "Share".
  - TOC list (`mb-8`): one item per h2, plus h3s indented.
    - Link: `block` 12/18 #868a97, `border-left 2px transparent`, padding `4px 0 4px 12px`, `mb-1`. Hover #0d162f.
    - h3 items: `padding-left 24px`.
    - **Active:** #6056ff, `border-left-color #6056ff`, weight 500.
  - TOC length: 15 entries on the sample (6 h2 and 9 h3), 1–10 words each.
  - **Scroll-spy:** an IntersectionObserver on every heading id, `rootMargin "-80px 0px -70% 0px"`, threshold 0. The intersecting heading becomes the single `.active` link. The colour change uses the `.2s` transition.
  - Share row (`flex gap-2`): 3 buttons (copy link, X/Twitter intent, LinkedIn share).
    - `.blog-share-btn`: 36×36, radius 8, 1px #e6e7ea border, icon 16px #868a97.
    - Hover: border and icon #6056ff, `.2s`.
    - **Copy:** writes `location.href` to the clipboard, swaps the icon to a check for **2000ms**, then restores it.
- **Mobile share** (`lg:hidden mt-10 pt-6 border-t`): `flex items-center gap-3`, a "Share" label (14/20 500 #868a97) and the same 3 buttons.

### Prose (`.blog-prose`, measured CSS)

| Element | Spec |
|---|---|
| base | colour #0d162f |
| h1 | Sora 28 (md 32) 600, mt 40, mb 16 |
| h2 | Sora 22 (md 24) 600, mt 32, mb 12 |
| h3 | Sora 18 (md 20) 600, mt 24, mb 8 |
| h4, h5 | Sora 16 600, mt 20, mb 8 |
| p | 16/28 (lh 1.75), mb 20 |
| strong | 600 |
| ul / ol | disc / decimal, `padding-left 24px`, mb 20 |
| li | 16/28, mb 6. Nested lists mt 6, mb 0 |
| a | #6056ff, underline, `underline-offset 2px`. Hover #3b32f9 (.2s) |
| img | `width 100%`, radius 12, my 24 |
| figure | margin 24px 0 |
| figcaption (also `figure + p > em:only-child`) | 14 #868a97, centred, block, mt 8 |
| code (inline) | bg #f4f4f5, padding `2px 6px`, radius 4, 0.875em, mono stack |
| pre | bg #0d162f, text #fff, p 16, radius 12, `overflow-x auto`, my 20. Inner code 14px, transparent bg |
| table | width 100%, collapsed, my 24, 15px |
| th | bg #f4f4f5, 600, left-aligned, padding `12px 16px`, border-bottom 2px #e6e7ea |
| td | padding `12px 16px`, border-bottom 1px #e6e7ea |
| hr | border-top 1px #e6e7ea, my 32 |
| blockquote | border-left 4px #6056ff, pl 20, py 4, my 24, italic. Inner p #868a97 with mb 0 |
| iframe | width 100%, radius 12, my 24, `aspect-ratio 16/9` |
| sub, sup | .75em |

Heading line-height is not set, so it inherits the `html` value of 1.5. Heading `id`s are slugs of the heading text.

Body shape on the sample: about 2,000 words, 6 h2, 9 h3, 2 h4, 9 ul/ol, 2 blockquotes, no table, no pre.

### Related posts (`mt-16 pt-10 border-t`)
- h2: Sora 20/28 600 `mb-6`, 2 words.
- Grid: 1 column below 640, `repeat(3,1fr)` at 640 and up, gap 24. It holds 3 BlogCards (T1 spec). At 1440 each card is (590-48)/3 = 180.7 wide; at 1280 it is 202.7.

### Footer CTA (`.blog-footer-cta`)
- Box: bg #fff, 1px #e6e7ea border, square corners, `padding 48px 32px`, centred, `mt-12`.
- h2: Sora 500, 24/32 (md 30/36), `tracking-tight`, `mb-3`, 5 words / 29 chars.
- p: 16/24 #868a97, `max-w-lg mx-auto mb-6`, 22 words / 138 chars, 3 lines.
- Buttons (`flex justify-center gap-3 flex-wrap`). Both are Sora 14 500, `padding 10px 20px`, **radius 8px**, `.2s`. Note that this differs from CS Button, which is 4.8px.
  - `.blog-cta-btn-primary`: radial indigo gradient, top/bottom borders as in CS, shadow `0 1px 2px #6056ff40`. Hover swaps the gradient to `#7281ff → #3b32f9`.
  - `.blog-cta-btn-secondary`: transparent bg, #0d162f text, 1px #e6e7ea border. Hover bg #eef2ff.

Structured data: `BlogPosting` JSON-LD.

Motion: no framer reveals on this template. Only CSS hovers, scroll-spy and the copy feedback.

### Variants
- **"toc-boxed"** for `/learn/<x>` and `/prompt-engineering/<x>`, where legacy T9 is mapped into T2:
  - Hero band (h1 plus a CTA button with a 2-part label) instead of the post header.
  - TOC built from h2s only.
  - No author, date, share, related posts or reading time.
- **"bare"** for `/topics/<x>`: an h1 plus prose only. No TOC, no meta, no cover.
- **"minimal"** for `/posts/<x>`: prose only. Use the T2 header with no author or cover, or omit the header.

---

## T3. Hub Index — `/events` and `/resources` (HubIndex)

Sections: Header → **GrainHero** → list section A (white) → list section B (`#f9f9f9`) → ClosingCTA (1.4) → Footer.

### GrainHero (`EventsHero` / `ResourcesHero`)
- Background: a full-bleed GrainBand (violet gradient plus noise, CS §1.2) with `border-b`. The rails show through: the gutter cells exist but have no borders inside the band.
- Section: `py-24` (96px), content padding px 24/48/80.
- Grid: `grid-cols-1 items-center gap-16` (64px), switching to **`min-[900px]:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]`**.
- Left column (`flex-col gap-5`, `container-type:inline-size`):
  - h1: Sora 400, **`font-size: clamp(44px, 8.6cqi, 58px)`**, lh 1.2, `tracking-tighter` (-0.05em), `max-w-[720px]`, `text-wrap:balance`. 2–3 lines. The second phrase is wrapped in a #6056ff span. Copy: events 8 words / 48 chars; resources 9 words / 55 chars.
  - p: Inter 20/32, #0d162f, `max-w-[560px]`, `text-wrap:pretty`, 14–20 words / 85–120 chars, 2–3 lines.
- Right column (`flex-col items-start gap-3`): HeroCarousel (1.6).

| Breakpoint | Content width | Left column | Right column | h1 size (derived from cqi) |
|---|---|---|---|---|
| 1440 | 766 | 421 | 281 | 44px (floor) |
| 1280 | 1120 | 634 | 422 | 54.5px |
| 768 | 672 (stacked) | 672 | 672 | 57.8px |
| 375 | 327 | 327 | 327 | 44px |

- Motion: GrainBand content `opacity 0, y 32` to `1, 0`, `.7s [.23,1,.32,1]`, whileInView amount .3 (CS §4.2). On first paint it is above the fold, so this is effectively a load animation.

### List sections (`EventsList` / `ResourcesList`)
- Each section: StackedSection with inner `relative flex flex-col gap-8 py-20 px-6 md:px-12 lg:px-20` (80px vertical, 32px gap).
- Section A (white): HubSectionHeading (1.3), then `flex flex-col gap-5` of ContentRows (1.2).
  - Events: "upcoming", sorted ascending. If empty, shows a p 16/24 #707287 (9 words).
  - Resources: the "featured" row with a cover image.
- Section B (bg `#f9f9f9`, applied to the center column and the outer wrapper): HubSectionHeading, then the grid.
  - Events: `grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5`.
  - Resources: `auto-fill`.
  - Cells are ContentCards (1.1). Events are "past", sorted newest first, with CTA "Watch the recording" or "See the event".
- Event classification: an event is past when `end ?? start` plus 24h is before now. Dates are re-evaluated client-side on mount.

| Breakpoint | Section B grid width | Columns | Card width |
|---|---|---|---|
| 1440 | 766 | 2 | 373 |
| 1280 | 1120 | 3 | 360 |
| 768 | 672 | 2 | 326 |
| 375 | 327 | 1 | 327 |

- Cards per page: all items, with no pagination, filter or search. Live counts are 5 events and 1 resource plus 1 datasheet.
- Card motion: hover only (1.1). No entrance animation.

---

## T4. Event Detail — `/events/<x>` (EventDetail)

Sections: Header → **two-column event row** → `AutonomyAndProduct` (CS §3.7, unchanged) → **AutonomyTimeline** → `LogoGridSection` (CS §3.2) → Footer. There is no ClosingCTA.

### Two-column event row
This row uses page-scoped CSS (`confluent-webinar.css`) inside a gutter-rail row.
- Grid (`.page-grid`): 1 column below 1024, `1fr 1fr` at 1024 and up, `border-bottom 1px #e6e7ea`.
- Columns (`.col`): `padding: 48px clamp(24px,4vw,64px) 56px; flex-col; gap 32px`. The left column has `border-right`.
  - At 1023 and below: padding `36px 24px 40px`, gap 28.
  - The right column at 1024+ uses horizontal padding `clamp(20px,2.2vw,40px)`.
- **Left column is sticky:** `.col-left-sticky { position:sticky; top:96px }` at 1024 and up.
  - `.left-hero` (`max-width 480`, `container-type:inline-size`):
    - Eyebrow: Sora 12 600 uppercase .08em #6056ff, `mb 22`, 7 words / 35 chars.
    - h1: Sora **500**, `clamp(30px,10cqi,44px)`, lh 1.1, -0.025em, `text-wrap:balance`, `mb 22`. 5 words / 40 chars, with the last 2 words in #6056ff.
    - Lead: 16/24.8, `rgba(13,22,47,.75)`, `mt 20`, 31 words / 193 chars.
  - `.event-bar`: `flex wrap gap 12; padding 12px 0; border-top and border-bottom 1px #e6e7ea`, Sora 15 500.
    - It holds an 18px #6056ff calendar icon, a kind word, a "·" in #e6e7ea, and a 2-line date/time stack: date Sora 15 500 (4 words / 27 chars) and time Sora 13.5 500 #868a97 (26 chars).
  - `.form-wrap`: `padding 28px 28px 24px; 1px #e6e7ea border; radius 0; bg #fff; max-width 460`.
    - Eyebrow (as above, 12px), `mb 16`, 3 words.
    - A **HubSpot embed** (`hbspt.forms.create`, region na1). Restyled as follows:
      - Labels: 13 500, `mb 6`.
      - Inputs: `padding 11px 13px`, 1px #e6e7ea, **radius 6**, 15px, bg `#f9f9fb`. Focus: border #6056ff, bg #fff, ring `0 0 0 3px #6056ff1a`, 150ms.
      - Two-column rows: `gap 16`. Field spacing: `mb 14`.
      - Submit: full width, `padding 14px 22px`, **radius 8**, `radial-gradient(circle at 30% 30%, #6056ff, #3b32f9)`, 1px #6056ff border, Sora 15 500, shadow `0 4px 14px rgba(96,86,255,.35), 0 1px 2px rgba(13,22,47,.1)`. Hover `filter: brightness(1.06)` (150ms).
      - Errors: 12px #cc3333.
    - Below the form: a note in 12/16.8 #868a97, centred, `mt 12`, 11 words.
    - For Lumenfold, build a native form with these styles. The fields are inside the third-party embed and were not visible to curl.
- **Right column:**
  - `.speakers-grid`: `repeat(3,minmax(0,1fr)) gap 10`; at 640 and below it becomes 1 column with gap 14.
    - Card: 1px #e6e7ea border, `padding 12` (18 at 640 and below), `flex-col`.
    - Photo: `aspect-ratio 3/4`, **radius 14**, padding 2.5px on `radial-gradient(circle at 32% 26%, #7281ff, #3b32f9)` (a gradient ring), `box-shadow 0 0 0 1px #e6e7ea`, `mb 14`. The img inside is `object-cover`, radius 11.5. Source is 600×800.
    - Name: Sora 16 600 -0.02em, nowrap, `mb 4`, 2 words (19px at 640 and below).
    - Title: 13/17.6 #868a97, `mb 14`, 3–8 words, 2–3 lines.
    - Company logo: height 15–20, `object-contain`, left-aligned, `margin-top:auto`.
    - 3 speakers.
  - `.takeaways`:
    - h2: Sora 500, `clamp(26px,2.8vw,34px)`, lh 1.18, -0.02em, `mb 12`, 5 words.
    - List: rows of `grid 22px 1fr; gap 14; padding 20px 0; border-top 1px #e6e7ea`.
      - Dash glyph: Sora 600 #6056ff.
      - p 16/24.8 #868a97, opening with a `<b>` lead-in (#0d162f 600, 5–11 words), then 17–26 words.
      - 6 rows.

| Breakpoint | Column width | Left padding | Right padding | h1 size | Speaker card |
|---|---|---|---|---|---|
| 1440 | 463 | 57.6 | 31.7 | 34.8px | about 126 wide, photo about 102×137 |
| 1280 | 640 | 51.2 | 28.2 | 44px | — |
| 768 | 768 (stacked, not sticky) | — | 24 | 44px | — |
| 375 | 375 (stacked) | — | 24 | 32.7px | 1 column |

### AutonomyTimeline (new section)
- Wrapper: StackedSection, `overflow-hidden`.
- Inner padding: `py-16 md:py-24 md:pb-32`; left 24 / md 80 / desktop 56; right 0 (desktop 56).
- Caption: Inter 12px #9ca3af, `letter-spacing .03em`, centred, `mb-12`, 3 words.
- Scroller: `overflow-x-auto` with the scrollbar hidden. Inner `min-width 960px; max-width 1060px; mx-auto`. It scrolls horizontally below about 1000px.
  - Rail row (36px tall): a 1px line from `calc(12.5% - 18px)` to `calc(12.5% - 18px)` from the right, `linear-gradient(to right, #e5e7eb 0%, #e5e7eb 33%, #c7d2fe 50%, #a5b4fc 66%, #a5b4fc 100%)`. Over it sit 4 centred 32px circles with labels in Inter 13px .02em:
    - Steps 1–2: bg gray-100, text gray-500, ring `0 0 0 4px #fff`.
    - Steps 3–4: bg #6056ff, white text, ring `0 0 0 4px rgba(96,86,255,.08)`.
  - Hook row: `grid-cols-4 mb-5`, p 14/22.4 #0d162f centred `px-4`, 7–9 words.
  - Card row: `grid-cols-4`. Cards are `h-full border px-5 py-5`, with `border-r-0` on all but the last.
    - Steps 1–2: `bg-gray-50/80 border-gray-200`.
    - Steps 3–4: `border-#6056ff/20`.
    - Each holds an SVG mini-diagram as a placeholder.
- Motion: each card `opacity 0, y 16` to `1, 0`, whileInView once, `margin -40px`, `duration .4`, `delay i*0.1`, `ease [.25,.1,.25,1]`.

---

## T5. Comparison Index — `/vs` (ComparisonIndex)

- One PageSection with no top border. Inner `py-12 md:py-28`, px 24/48/80.
- h1: Sora 400, 36 (md 48), lh 1.12, `tracking-tighter`, 4 words / 28 chars, 1 line (2 at 375).
- p: `mt-5 max-w-2xl`, 16 (md 18), lh 1.6, #868a97, 25 words / 153 chars, 2–3 lines (5 at 375).
- List: `ul mt-10 border-t`, holding 7 rows.
  - Row: `group flex items-center gap-4 py-4 border-b`. Rows are 68px tall (36px tile plus 32 padding).
  - Icon tile: 36×36, `rounded-lg` (8px), 1px border, white bg, shadow `0 1px 2px rgba(13,22,47,.05)`. It holds a 16–20px competitor glyph; use a neutral placeholder.
  - Title: Inter 500, 16 (md 18), `tracking-tight`, #0d162f, 4–6 words / 20–40 chars. It goes #6056ff on hover (150ms).
  - Trailing "→" glyph: `ml-auto`, #868a97, goes #6056ff on hover.
- No hover background. No pagination.

---

## T6. Comparison Page — `/vs/<x>` (ComparisonPage)

Section order:
1. Hero
2. LogoGridSection (CS §3.2; here `desktop:grid-cols-6 wide:grid-cols-7`)
3. Fit
4. Differences
5. Exemplar run
6. Comparison table
7. Switching steps (the CS §3.3 HowWeWork tiles, with labels "Step 1–3" and panels violet/pink/blue)
8. EnterpriseSecurity (CS §3.8)
9. Testimonials (CS §3.10)
10. FAQSection (1.5)
11. ClosingCTA (1.4) with 6 coins

Sections 3–7 and 10 are each a PageSection: StackedSection with px 24/48/80, `py-12 md:py-28`, and a left SectionHeading (`max-w-2xl mb-12 md:mb-14`). Their h2s are Sora 400 30/40.5 → 36/48.6 (4–7 words / 25–47 chars). Their descriptions are 16 (md 18)/1.6 #868a97 (5–31 words).

Content widths are **766 / 1120 / 672 / 327** at 1440 / 1280 / 768 / 375.

### 1. Hero
- Section `pt-10 md:pt-16 pb-16 md:pb-20`. Content `max-w-4xl` (896px), centred column.
- Logo pair: `flex gap-3.5`.
  - Two 44px tiles, `rounded-xl` (12px), 1px border, white, shadow `0 1px 2px rgba(13,22,47,.05), 0 8px 20px -8px rgba(13,22,47,.14)`. Each holds a 24px mark: the Lumenfold mark, and a neutral glyph for the competitor.
  - Between them, "vs" in Inter 16 #868a97.
- h1 `mt-6`: as in T5, 4 words / 20 chars.
- p `mt-5 max-w-xl`: 16 (md 18)/1.6 #868a97, 25 words / 133 chars, 3 lines.
- Motion: on mount, `opacity 0, y 16` to `1, 0`, EASE.

### 3. Fit cards (`grid gap-5 md:grid-cols-2 md:items-stretch`)
- Card A (other platform): `rounded-2xl` (16px), bg `#f6f5f9`, `px-7 pb-7 pt-5 md:px-8 md:pb-8 md:pt-6`.
- Card B (Lumenfold, highlighted): an outer `rounded-2xl` with `padding 1.5px` and `background: conic-gradient(from 140deg, #6056ff, #943bff, #7281ff, #6056ff)` (a gradient border). The inner is `rounded-[15px] bg-white`, same padding.
- Contents:
  - Header (`flex gap-2.5`): a 22px mark, then the name in Inter 18 600 `tracking-tight`.
  - Definition `mt-3`: 14/22.4, #868a97 (A) or #0d162f (B), 16 words / 104 chars.
  - List `mt-6 flex-col gap-3`. Each `li` is `flex items-start gap-3` with a 20px check circle at `mt-0.5`, then p 14/21 (#868a97 for A, #0d162f for B).
    - A check: bg `#ececf1`, 11px tick in #868a97, stroke 3.2.
    - B check: `linear-gradient(135deg, #6056ff, #943bff)`, white tick.
    - 3–5 items of 8–12 words each.
- Card widths: 373 / 550 / 326 / 327 (stacked at 375).

### 4. Differences
- Panel: a grain panel (TintPanel, violet), `rounded-2xl`, inner `px-6 py-10 md:px-10 lg:px-14 md:py-12`.
  - Inside: `grid lg:grid-cols-3 gap-y-10 gap-x-10 items-center`. Each cell is centred, `lg:h-[200px]`, and holds one glass-UI vignette. The glass-pill vocabulary is in CS §3.3 and §3.5:
    - Node graph, 320×140.
    - Eval sparkline, 300 wide: a 2px #059669 line, area fading 12%→0, dashed threshold in #b42318 at .28, and a red dip dot.
    - Model-ranking pills.
    - Orchestration pills.
- Below the panel: `grid lg:grid-cols-3 gap-10 mt-10 md:mt-12`, 3 items.
  - h3: Inter 18/28 500 `tracking-tight`, 3–6 words.
  - p `mt-2.5`: 14.5/23.9 #868a97, 25–35 words.

### 5. Exemplar run (scrolling transcript)
- GrainBand (violet plus noise; content `opacity 0, y 32` to `1, 0`, .7s) with inner `p-6 md:p-14 lg:p-20`.
- Inside it, a white box with 1px border and square corners.
- Scroll viewport: `h-[480px] md:h-[560px] overflow-y-auto p-6 sm:p-8 md:p-10`, with a mask `linear-gradient(to bottom, transparent 0, #000 28px, #000 calc(100% - 28px), transparent 100%)` for top and bottom fades. Content `max-w-2xl mx-auto`.
- **RunScene:**
  - A vertical 1px rail at `left 17px` (top 20 → bottom 16), `linear-gradient(to bottom, rgba(13,22,47,0) 0%, rgba(13,22,47,.11) 8%, … 86%, transparent)`.
  - Trigger pill: `rounded-full bg-white py-1.5 pl-1 pr-4 gap-2.5`, shadow `inset 0 0 0 1px rgba(13,22,47,.08), 0 2px 6px rgba(13,22,47,.05)`.
    - A 26px white circle holding a 14px app icon, with a 15px #6056ff bolt badge at bottom-right (`0 0 0 1.5px #fff` ring).
    - Label 13.5 500, 6 words.
  - Agent row `mt-4 gap-2.5 pl-1`: a 26px avatar with `ring-2 ring-white`, then a 13.5 500 name (2 words).
  - Steps, alternating:
    - Tool rows: `mt-[18px] flex gap-2.5 pl-1`, 13.5 500, -0.01em. A 26px white circle holding a 15px icon, then 6–7 words, then a 12px tabular-nums count in #868a97 at opacity .8.
    - Thought paragraphs: `pl-[42px]`, 13.5/21.6 #868a97, 19–23 words.
    - About 10 steps.
- **Motion:** each line `opacity 0, y 8` to `1, 0`, `.4s [.23,1,.32,1]`, whileInView once, amount .4.
  - Stagger delays: trigger 0, agent .08, step *i* `.16 + i*.08`.
  - The delay only applies within 1s of mount. Lines revealed later by scrolling appear with no delay.

### 6. Comparison table
- Container: `border border-gray-200 (#e5e7eb) bg-white overflow-hidden`, square corners.
- **md and up** (`grid-cols-[220px_1fr_1fr]`, `lg:grid-cols-[260px_1fr_1fr]`):
  - Header row: border-bottom #e5e7eb. Cells `px-5 py-3.5`, with `border-right #f3f4f6` between columns.
    - Column 2: Lumenfold wordmark, height 18.
    - Column 3: a 16px glyph, then the name in Inter 13 600 #374151 -0.01em.
  - **7 body rows**, each with border-bottom #f3f4f6 (none on the last). Cells `px-5 py-4 flex items-start gap-3`:
    - Question: Inter 13/18.2 500 #111827 -0.01em, 4 words / 23–30 chars.
    - Lumenfold cell: bg **#fafafe**, a status icon, then 13/20.15 #374151, about 22 words / 135 chars.
    - Other cell: a status icon, then 13/20.15 #6b7280, about 17 words.
- **Below md:** a 2-column header (`px-4 py-2.5`, logo h16 and 12px 600 name). Each row is:
  - A question label `px-4 pt-3 pb-1`: 11px 600 #9ca3af, .05em, **uppercase**.
  - Then a 2-column grid of cells `px-4 py-3 gap-2`, 12/18. The Lumenfold cell keeps the #fafafe bg.
- **Status icon** (20px circle, `mt-0.5`):

| Status | Circle bg | Mark |
|---|---|---|
| check | #ecfdf3 | 12px tick, #027a48, stroke 3 |
| partial | #fffbeb | 12px dash, #b45309 |
| no | #fef2f2 | 10px ×, #b42318 |

### 11. ClosingCTA
- As in 1.4. Primary href carries a `?vs=<slug>` query, and there is a secondary pill.

---

## T7. Changelog Feed — `/changelog` (served at `/docs/changelog`)

This lives in the **docs app** (Fumadocs on Next.js), not the marketing site. It has its own chrome: a sticky docs header (`h-14`, 56px; Fumadocs sets `--fd-header-height` 56, and 96 at lg) with `backdrop-blur-sm bg-background/80 border-b`, a left nav sidebar, and light and dark themes.

The sidebar and TOC column widths are set at runtime by Fumadocs' notebook layout. They were not measurable from static HTML. For Lumenfold you can render the feed inside the marketing chrome in a gutter-rail row instead.

- Tokens (`--rl-*`, light):

| Token | Value |
|---|---|
| primary | #4f46e5 |
| primary-ink | #4338ca |
| primary-soft | #eef2ff |
| ink | #19181d |
| muted | #404045 |
| faint | #727276 |
| bg | #fff |
| surface | #fafafa |
| line | #e5e5e5 |
| radius | 8 (lg 16) |
| font | Inter |
| mono | "Paper Mono" stack |

- Dark tokens: bg #0a0e1a, primary #8c84ff, ink #eceef4, muted #a2a8ba, line #232b40.
- Article: `px-4 py-6 md:px-6 md:pt-8 xl:px-8 xl:pt-14`, children `max-w-[1285px]`.
  - h1: 28px (`1.75em`) 600, 1 word.
  - Description: 18/28 #404045, 11 words / 64 chars, then 16px before the feed.
- **Entry (`.rl-update`), 33 on one page, no pagination or filter:**
  - Below 1024: `flex-col gap-8 padding 32px 0`.
    - Meta block:
      - Date pill: 14/20 500 #4f46e5 on `#4f46e51a`, radius 8, `padding 4px 8px`, 3 words / 17 chars.
      - Summary: 14/20 #404045, `max-width 160`, `mt 12`, `px 4`, 4 words / 19 chars.
    - Then the body.
  - At 1024 and up: a row, `gap 24px`, `margin-left 48px`.
    - **Timeline:** `::before` is a 2px line `#4f46e559` at `left -24px`, full height. `::after` is a 12px #4f46e5 dot with a `0 0 0 4px #fff` ring at `top 40px; left -29px`.
    - **Meta column is sticky:** `width 160; position:sticky; top: calc(header-height + 24px)`, which is 120px at lg.
  - Body (`.rl-update-body`): 14/24.
    - h2: 20/28, `mb 12`, with a hover-revealed link button. The h2 id is the entry permalink.
    - h3: 18/28, `mt 24 mb 8`.
    - p and li: 14/24. p `margin 16px 0`.
    - Image: `rounded-lg` (8px) at full width, `loading=lazy`, placed in the first p.
    - Each entry is 1 h2 plus an image plus 3–5 paragraphs (40–60 words each).
- Media: one hero image per entry, full body width, ratio varies, radius 8, no overlay.
- Motion: none (CSS only).

---

## T8. Legacy Simple List — `/learn`, `/topics` (map to T1 "text-only")

Measured values from legacy Webflow (`relevance-site.css`). These pages use the old chrome: an indigo announcement bar (`banner8`, padding 12px 0) and a floating rounded navbar (radius 24, white, shadow `0 0 1px #16134a80, 0 -2px #16134a14, 0 2px 2px #16134a14, 0 9px 13px #0d162f1a`, `max-width 90rem`, page padding 5%, `padding-top 20px`). Webflow h1–h4 load the self-hosted **"Inter Display"**.

- Section: `margin-top 60px` (991 and below: 30; 767 and below: 40 top, 60 bottom). Container `max-width 1268px`, padding 20px (32 at 991 and below, 24 at 767 and below).
- h1 (`.header-title`): Inter 700, **66px** (991 and below 48, 767 and below 40, 479 and below 36), lh 1.2, -1px, centred, `margin 32px auto`, `max-width 880`, #0d162f. 1 word.
- Grid: Webflow floats.
  - `/learn` uses `w-col-6` (50%): 2 columns, 4 items.
  - `/topics` uses `w-col-4` (33.3%): 3 columns, 8 items.
  - Gutter 20px. 100% width at 767 and below.
  - Items have `padding 20px 0`.
- Item: an unstyled title `<a>` (browser-default link colour, no decoration, 2–8 words / 12–58 chars), then a `<div>` description (16/24 #868a97, 14–22 words / 71–154 chars).
- Pagination: a Webflow `w-pagination-wrapper`, present but **`display:none`**. In practice there is no pagination.
- Then the legacy footer CTA:
  - `.transform-cta-wrapper`: white, 1px #e6e7ea, radius 16, `padding 40px 0 60px`, centred.
  - Decorative SVGs: a stars background, a blurred #943bff ellipse at 8% opacity (200px tall, 90% wide, bottom -100px, `blur 15px`), and two mascot illustrations about 145px and 195px wide.
  - h2: 48px 600 lh 1.2.
  - p: 18/27.
  - Two buttons, 8px radius.
- **Build:** use T1 "text-only" in the DS chrome and use 1.4 ClosingCTA instead of the legacy CTA. The legacy look (UA-blue links, Inter Display) is pre-redesign and inconsistent with the DS.

---

## T9. Legacy TOC Article — `/learn/<x>`, `/prompt-engineering/<x>`; bare variant `/topics/<x>` (map to T2 variants)

- Hero (`.features-top-banner`): `padding 160px 0` (80 at 767 and below), `linear-gradient(#fff0, #f8f6ff)`, `overflow hidden`.
  - Optional 3–5 absolutely positioned decorative SVGs, 200–240px wide. They are hidden or moved at 479 and below.
  - h1 (`.heading-style-h1`): 600, lh 1.2, #0d162f. Size is 64px (`has-highlights` 62.4) → 52/48 at 991 → 40 at 767 → `10vw` at 479. 5–7 words / 19–56 chars. An `<em>` highlight is used on learn posts.
  - CTA row (`mt 35px`, gap 16):
    - Legacy primary button: #6056ff, 1px #3b32f9, radius 8, `min-height 48`, `padding 12px 24px`, 500. Shadow: `0 9px 13px -5px #6056ff66, 0 2px 2px #6056ff40, inset 0 -2px #3b32f980, inset 0 0 0 1px #fff3, inset 0 7px 12px #943bff`. Hover bg #7281ff.
    - Label below: 14/19.6, two 2–3 word phrases separated by a 10px star glyph (`mx 8`).
- Body section: `radial-gradient(circle closest-corner at 50% 0, #fbf8ff, #fff)`.
  - `.blog-grid`: `max-width 1080; padding-left 282px; position relative`. At 991 and below `padding-left 200`; at 767 and below 0; at 479 and below `padding 0 20px`.
  - **TOC column:** `absolute; left 0; top 0; bottom 0; width 230` (200 at 991 and below; static and full width at 767 and below; 62px gap below it).
    - Title: 18 600 #0d162f, `pb 16`, 3 words.
    - Box (`.auto-toc`): white, 1px #e6e7ea, radius 16, p 16.
    - Items are **generated client-side from h2s only**: slugified id, text truncated at 120 chars. `.toc-item` is `flex`, 11/13.2, #4a6a86, `border-left 1px #dbe2eb`, radius `0 5px 5px 0`, padding `10px 10px 10px 8px`. Hover: `border-left 2px #070e27`, bg `#2962ff1a`, colour #070e27, `pl 7` (`.2s`).
    - **The TOC is not effectively sticky.** `.table-of-contents` has `position:sticky` but no `top`. It has **no scroll-spy** (no script adds `.active`).
  - Content (`.container-default.features`): `max-width 880; padding 20px 0`.
- Rich text (`.text-rich-text`):

| Element | Spec |
|---|---|
| h2 | Inter Display 600, 28.8px (1.8rem), lh 1.2, mt 0, mb 16 |
| h3 | 24px, mt 24, mb 8 |
| h4 | 22.4px, mt 24, mb 16 |
| p | 16/24, #0d162f |
| ul / ol | mt and mb 16. ul pl 20, ol pl 24 |
| li | #0d162f, my 4, pl 8 |
| strong | 600 |
| blockquote | border-left 2px #6056ff, #6056ff text, 20px, padding `8px 16px`, my 24 |
| a | #0d162f underline |

  - Sample bodies: about 1,200–1,600 words, 6–10 h2s.
- No author, date, share, reading time or related posts. Then the legacy footer CTA (T8).
- **Bare variant `/topics/<x>`:** no nav and no footer at all. Only the announcement bar and `main`.
  - `.container-medium`: `max-width 64rem`, centred.
  - `.padding-section-large`: `112px top, 16px bottom` (96 at 991, 64 at 767).
  - Title wrapper `margin 48px` (`.margin-large`; 40 at 991, 32 at 767).
  - h1: `.heading-style-h1`, 7 words / 52 chars.
  - Rich text: the `blog-post_*` classes have **no CSS rules**, so it renders with Webflow base type (body 16/24 #868a97; h2 48px Inter Display 600 → 40 → 32 → 24). It has 5–7 h2s and ul/ol lists, about 900 words.
- **Build:** use T2 "toc-boxed" (TOC built from h2s, using the T2 TOC styling with scroll-spy if you want parity with the blog) and T2 "bare". Do not reproduce the 66px/64px legacy headings.

---

## T10. FAQ Page — `/frequently-asked-questions` (FAQPage)

Measured legacy structure:
- **Hero band** (`.features-top-banner`, T9 values): `padding 160px 0` (80 at 767), gradient `#fff0 → #f8f6ff`.
  - Two absolutely positioned decorative SVG clusters: one 340px wide at bottom-right (`right 10%; bottom -133px`), one at `top 19%; left 2%`. Both are hidden or moved below 991.
  - Title (`.template-section-title`): Inter 700, 60px (991: 40, 767: 36, 479: 32), lh 1.2, **#6056ff**, centred, `max-width 1080`. 2 words, plus a 1-word highlight span: `linear-gradient(90deg, #9ca8ee4d, #f1ebfa)` bg, `border-left 3px #9294ff`, `padding 0 10px`.
  - A tabs block (`.tabs-2`) exists but is **`display:none`**. Do not build it.
- **FAQ section** (`.new-faq-section`): `padding 120px 0` (991: 100, 767: 80), container `max-width 1268`.
  - Subhead: `flex gap 16, centred`. A star icon, then the label (Inter 24/33.6 500 **#7016f6**, 3 words; 20 at 991, 18 at 767), then a star icon.
  - List (`.faq-wrapper`): `margin-top 80` (60 at 767). 10 items.
    - Question bar: `flex items-center; padding 26px 0; border-bottom 1px #e0e3ed`, Inter 20/26 500 #0d162f.
    - Icon: a 55px transparent circle holding a plus icon.
    - Title: 600, `mr 10`, 6–12 words. At 479 and below it is 16px.
    - Answer (`.faq-content`): `overflow hidden; pr 24`. Inner p: Inter 16/25.6 #0d162f, `padding 14px 24px`, 15–60 words. One answer is a list of 6 `<em>` lines.
- **Motion (Webflow IX2, measured from the site JS):**
  - Open on click: content height `0 → auto`, **800ms `ease`**. The plus rotates `0 → 135deg` over 800ms `ease`. The wrapper border colour animates to `rgb(140,84,255)` at alpha 1 over 500ms.
  - Close on second click: height `→ 0`, **300ms `ease`**. The plus rotates back to 0 over 300ms. The border goes to alpha .15 over 350ms `easeIn`.
  - Items toggle independently (multi-open).
- Then the legacy footer CTA.
- **Build:**
  - Hero: a DS StackedSection hero with h1 Sora 400 48/52.8 -2.4px (CS hero type), centred, and one word in #6056ff.
  - FAQ: FAQSection (1.5) with 10 items. To keep the legacy feel, use multi-open and 300ms height.
  - Close with ClosingCTA (1.4).

---

## T11. Academy Lesson — `/relevance-academy/<x>` (Academy, dark)

Legacy Webflow. The body and main carry `background-color-alternative`: **bg #0d162f**, text #f9f9f9. Borders use `#3d4559` (grid-line-dark).

- **Header** (`.section_relevance-academy_header`): `border-bottom 1px #3d4559`, inside `.container-large` (`max-width 1228; width 90%`) and `.padding-section-medium` (`80px 0`; 64 at 991, 48 at 767).
  - Layout: `flex wrap justify-between`, row-gap 32.
  - Left:
    - Breadcrumb (`flex`): the parent link (20px 600, 2 words) as a tagline, a chevron, then the current lesson (1 word). Both are #f9f9f9; 14px at 479.
    - h1 (`.heading-style-h1`): #f9f9f9, 3 words / 26 chars.
  - Right: Prev and Next arrow buttons (each 1–2 words, with a chevron).
    - Next: a filled indigo button, hover #7281ff.
    - Prev: outline; hover is transparent with a #fff border.
- **Content** (`.padding-section-small` `48px 0`; 32 at 767):
  - Grid `21rem 1fr` (336px sidebar), `column-gap 64; row-gap 32; padding-bottom 320px`. At 991 and below it is 1 column with `padding-bottom 0`.
  - **Sidebar** (`hide-tablet`, so hidden at 991 and below):
    - Box: `border 1px #3d4559; radius 16; padding 16px 0; position:sticky; top:136px` (8.5rem).
    - Heading: h6, 20/28 600, 1 word.
    - 5 lesson links: `flex justify-between; padding 12px 24px`, 16px #868a97, hover #cfd0d5, `.2s`. A 16px leading icon (`gap 10`, #9fa4b4), title 2–3 words. The current link (`w--current`) gets a highlighted bg.
  - **Main** (`width 100%`):
    - **Video:** a Wistia responsive embed, 16:9 (`padding-top 56.25%`). Its blurred swatch fades in (opacity, 200ms). `margin-bottom 48`. A YouTube fallback is conditionally hidden.
    - Rich text (`.text-rich-text_darkmode`): h1–h3 #f9f9f9; h3 36px 600; p #9fa4b4 16/24; li `mb 8`. Sample: about 6 p plus 1 ol of 4–6 items, about 400 words.
    - Prev and Next row again (`mt 48`, desktop only).
    - **Lessons list:** a 2-column block (`grid 1fr 1.5fr; gap 32; padding 32px 0 64px; border-bottom #3d4559`), then rows.
      - Row (`.relevance-academy_lessons_item`): `flex; border-bottom 1px #1e253a; padding 0 16px`. Hover `border-bottom-color #868a97` (`.2s`).
      - Link: `flex justify-between; padding 32px 0` (20 at 767, 16 at 479).
      - Content: play/check icon (`gap 12`), then the title (h6, 20/28 600, nowrap ellipsis, `max-width 29rem`), then an optional duration tag.
- **Build:**
  - Use the DS rail row in a **dark surface variant**: bg `surface-dark` #0d162f, rails `#3d4559`, text `text-primary-dark` #f9f9f9, body #9fa4b4 (measured).
  - Sticky sidebar at top 136 → use 96 to match DS sticky offsets (an author decision).
  - Video slot: 16:9, radius 0, no overlay.

## T12. Academy Catalog — `/academy` → `academy.relevanceai.com` (Skilljar)

This is a third-party LMS on a separate domain, with its own header (Skilljar storefront, Font Awesome icons). Measured from the custom theme `<style>` blocks inside the page.

- **Hero** (`.tt1-background`):
  - Background: bg #6056ff plus `radial-gradient(ellipse 70% 90% at 15% 50%, #7c74ff 0%, transparent 55%), radial-gradient(ellipse 50% 70% at 92% 10%, #3b32f9 0%, transparent 50%)`.
  - Wrapper: `width 1260` (at 1213 and up), `padding 56px 0`, `min-height 420`, flex `space-between`, `gap 30`.
  - 5 small absolutely positioned squares (10–22px, `rgba(255,255,255,.1–.15)`).
  - Text (44%):
    - h1: Sora 600, 62px (36 at 900 and below), lh 1.1, -0.5px, white, 8 words / 41 chars.
    - Buttons `mt 40 gap 12`. Both are 48px tall, `padding 0 28px`, radius 8, 15px 600.
      - White button: #6056ff text, shadow `0 1px 4px rgba(0,0,0,.15)`. Hover bg #f0eeff, text #4a3fe0, `translateY(-1px)`.
      - Ghost button: `rgba(255,255,255,.1)` bg, 1px `rgba(255,255,255,.28)` border. Hover bg .18.
      - Transitions 150ms, transform 100ms.
  - Image (52%, hidden at 900 and below): two book-cover images. The main one is 288×397 `contain` with drop-shadow `0 24px 48px rgba(0,0,0,.3)` and `mr -16px`; the secondary is 242×341 with `0 20px 40px rgba(0,0,0,.2)`.
- **Value bar:** bg #f0effe, border-bottom 1px #ddd6fe, `mb 40`. Inner `max-width 1260`, flex with 3 items.
  - Item: `padding 28px 40px; gap 16; border-right 1px #ddd6fe`. At 900 and below the items stack, with `padding 20px 24px` and bottom borders.
  - Icon tile: 44px, radius 8, `rgba(96,86,255,.12)`, holding a 24px icon.
  - Label: Sora 15 700 #111827. Sub: 13px #6b7280, `mt 3`.
- **Catalog grid:** Skilljar `coursebox` tiles, 39 on one page, left-aligned flex wrap. Built-in client-side search and type filters (Plans, Paths, Courses, Lessons).
  - Tile: 1px border, **radius 8**. Hover shadow `0 8px 28px rgba(96,86,255,.12)` and `translateY(-3px)`, `.2s`.
  - Title: 20px bold. Description: 14px 300. A callout with a 1px #bbb top rule.
  - "Separator" tiles act as full-width (87%) section headings: 30px title and 18px subtitle, no box.
- **Build:** Lumenfold has no LMS. Build a HubIndex-style page:
  - GrainHero with a solid indigo variant (the measured gradient above).
  - A value bar (3 cells, hairline dividers).
  - ContentCard grid sections, with separators as HubSectionHeadings.

---

## 2. Motion summary (new only)

| Template | Element | Trigger | Animation |
|---|---|---|---|
| T1 | Category pill | hover / click | `all .2s`. Filtering is an instant `display` toggle |
| T1, T2 | BlogCard title | hover | colour → #6056ff, `.2s` |
| T2 | TOC active link | scroll (IntersectionObserver, rootMargin `-80px 0px -70% 0px`) | colour and border `.2s` |
| T2 | Copy-link button | click | icon becomes a check for 2000ms |
| T3 | GrainHero content | inView .3 (on load) | `opacity 0, y 32` → `1, 0`, .7s out-quint |
| T3 | HeroCarousel | timer | slide every 2000ms, `translateX` 500ms `(.4,0,.2,1)`. Pauses on hover and under reduced motion. Dots width 6↔24, 300ms |
| T3, T6 | ContentCard, ContentRow | hover | `translateY(-5px)`, bg indigo/6, border indigo/20, 300ms ease |
| T3, T6 | ClosingCTA heading | inView .4 | `opacity 0, y 16`, EASE |
| T4 | AutonomyTimeline cards | inView once, margin -40 | `opacity 0, y 16`, .4s `[.25,.1,.25,1]`, stagger .1 |
| T4 | Form inputs | focus | border, bg and 3px ring, 150ms |
| T5 | Row title and arrow | hover | colour → #6056ff, 150ms |
| T6 | Hero | mount | `opacity 0, y 16`, EASE |
| T6 | Exemplar lines | inView .4 once | `opacity 0, y 8`, .4s out-quint, delays 0 / .08 / .16+i*.08 (first second only) |
| T6 | FAQ answer | click | height and opacity, .2s, single-open |
| T10 (legacy) | FAQ answer | click / second click | open 800ms ease (plus icon rotates 135°); close 300ms ease |
| T11 (legacy) | Lesson row, sidebar link | hover | border or colour, .2s |
| T12 (legacy) | Course tile | hover | `translateY(-3px)` and shadow, .2s |

Libraries: T1–T6 need only what CS §4.5 already lists (framer-motion). T1 and T2 are vanilla JS (IntersectionObserver and the clipboard). The legacy pages use Webflow IX2 and jQuery, plus GSAP 3.12.5 only for a hidden promo banner. Do not port those; reimplement with framer-motion or CSS.

## 3. Media placeholder manifest (new slots)

| Template | Slot | Size | Ratio | Fit | Radius | Overlay / shadow |
|---|---|---|---|---|---|---|
| T1, T2 related | Blog card cover | column width × 16:10 (see T1 table) | 16:10 box | cover | 0 | — |
| T1 | Author avatar | 20×20 | 1:1 | cover | full | — |
| T2 | Post author avatar | 40×40 | 1:1 | cover | full | — |
| T2 | Post cover | header width (830 / 896 / 672 / 327) × natural | 1.54–1.78:1 | natural | 12 | — |
| T2 | Inline prose image / iframe | prose width | any / 16:9 | — | 12 | — |
| T3, T4, T5 | Partner or competitor logo | h 20–28 (cards); 16–24 glyph (tiles) | — | contain | 0 | grayscale or brightness-0, opacity .65–.75 |
| T3 | Resource cover (row) | column 1 width | 1400:992 (1.41:1) | cover | 0 | 1px #e6e7ea border |
| T4 | Speaker photo | about 102×137 at 1440 | 3:4 | cover | 11.5 inside a 14 gradient ring | ring `radial(#7281ff→#3b32f9)` 2.5px + 1px border |
| T4 | Speaker company logo | h 15–20 (22–24 at ≤640) | — | contain, left | 0 | — |
| 1.4 | Coin avatars | 28 in a 44 glass circle | 1:1 | — | full | shadow `glass` |
| T6 | Logo tiles (hero) | 24 in a 44 tile | 1:1 | contain | 12 (tile) | tile shadow (see T6 §1) |
| T6 | Exemplar icons and avatars | 14–15 in 26 circles; 26 avatar | 1:1 | — | full | inset 1px ring |
| T7 | Entry hero image | body width | varies | natural | 8 | — |
| T11 | Lesson video | main column width | 16:9 | — | 0 | blurred swatch fade, 200ms |
| T12 | Book covers | 288×397, 242×341 | about 0.72:1 | contain | 0 | drop-shadows (see T12) |
| T12 | Value-bar icons | 24 in a 44 tile | 1:1 | contain | 8 | `rgba(96,86,255,.12)` tile |

## 4. Not measured / caveats
- **No browser render was used**, per the brief. Pixel widths, card sizes and clamp results are computed from CSS rules and the CS §1.5 rail geometry. Line counts at each breakpoint are estimated from character counts and column widths; check them in Playwright before pixel QA.
- T7: Fumadocs sidebar and TOC widths and the mobile nav are runtime-computed and were not captured.
- T4: the HubSpot form fields (count and order) are injected by a third-party script and were not visible.
- T12: the default Skilljar stylesheet returned 403 to curl. Only the site's custom theme blocks were read.
- T6 visuals and T4 diagrams are SVG illustrations. Recreate them as placeholders using the listed sizes; do not trace them.
