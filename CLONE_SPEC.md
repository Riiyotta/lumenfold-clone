Source: https://relevanceai.com/

# CLONE_SPEC — Relevance AI homepage (design-system clone)

Scope: this is a **design-system clone**. Copy the layout, tokens, typography, motion and component behaviour. Do **not** copy their copy, logos, customer photos, illustrations or press logos. Every text slot below lists its role, typical word/char count and line count per breakpoint, so you can write same-length placeholder copy. Every media slot lists its size, ratio, fit, radius and overlay, so you can drop in a same-size placeholder.

How this was measured: live Playwright session on 2026-10-21 at 1440, 1280, 768 and 375 px. Values come from `getComputedStyle` / `getBoundingClientRect` plus the site's own JS bundles (Astro islands + React + `motion`/framer-motion). The saved copy (`Specialist AI Agents for Every Task _ Relevance AI.html` and its `_files/agents.CG0qEBST.css`) has the same class names (Tailwind with the `tw-` prefix). Grep it if you need the exact class string for any element.

Stack observed: Astro + React islands (`client:load`), Tailwind (prefix `tw-`), Radix UI (NavigationMenu, Dialog, Tabs, Collapsible, HoverCard), floating-ui, `motion` (framer-motion API: `motion.div`, `whileInView`, `AnimatePresence`, `layoutId`). There is no GSAP, Lottie, Rive, Three/WebGL, canvas or video element on the page. The only video is a YouTube embed inside a modal that opens on click.

---

## 1. Tokens (drop into `tailwind.config.js`)

```js
// tailwind.config.js (theme.extend). Use the default Tailwind palette for gray/indigo/slate/emerald etc. (the site uses stock Tailwind v3 colours for those).
module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      header: '1100px',  // desktop nav appears at >=1100, hamburger below
      xl: '1280px',
      desktop: '1440px', // side "gutter rails" appear at >=1440
      wide: '1800px',
    },
    extend: {
      colors: {
        'surface-light': '#ffffff',
        'surface-secondary-light': '#f9f9f9',
        'surface-dark': '#0d162f',
        'text-primary-light': '#0d162f',   // headings + body-strong (rgb 13 22 47)
        'text-secondary-light': '#868a97', // body copy / muted (rgb 134 138 151)
        'text-tertiary-light': '#707287',  // tertiary / icon muted (rgb 112 114 135)
        'text-primary-dark': '#f9f9f9',
        'border-default': '#e6e7ea',       // every hairline on the page
        'border-dark': '#cfd0d5',
        'grid-line-light': '#e6e7ea',
        'grid-line-dark': '#3d4559',
        'brand-indigo': { DEFAULT: '#6056ff', dark: '#3b32f9', light: '#7281ff', 10: '#6056ff1a' },
        'bg-ghost': '#eef2ff',
        'bg-secondary': '#f9f9f9',
        'tile-base': '#f6f5f9',            // base fill under gradient "grain" panels
        'menu-hover': '#f6f5f9',           // dropdown item hover
        'status-green': '#027a48',         // online dot on avatars
        'eval-teal': '#0e9384',            // positive metric text in table
        'accent-indigo-text': '#4b40d6',   // text inside indigo glass chips (rgb 75 64 214)
        'chip-muted': '#5b6070',           // 10px chip text (rgb 91 96 112)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        button: '0.3rem',   // 4.8px — default buttons
        // stock: rounded 4px, md 6px, lg 8px, xl 12px, [18px] speech bubble, full 9999px
      },
      boxShadow: {
        button: '0 .1rem .4rem rgba(59,50,249,.25)',          // 0 1.6px 6.4px
        'button-hover': '0 .2rem .6rem rgba(59,50,249,.35)',  // 0 3.2px 9.6px
        'grid-glow': '0 0 8px rgba(96,86,255,.4)',
        glass: '0 1px 2px rgba(13,22,47,0.06), 0 6px 18px -4px rgba(13,22,47,0.14), inset 0 1px 0 rgba(255,255,255,0.9)',
        'glass-sm': 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(13,22,47,0.07)',
        'glass-pill': 'inset 0 1px 0 rgba(255,255,255,0.8), 0 4px 14px rgba(13,22,47,0.14)',
        'segmented-track': 'inset 0 0 0 1px rgba(13,22,47,0.06), inset 0 2px 4px rgba(13,22,47,0.05)',
        'mega-menu': '0 24px 56px -12px rgba(13,22,47,0.16)',
        'app-card-top': '0 -6px 16px -8px rgba(13,22,47,0.10), 0 -1px 3px -1px rgba(13,22,47,0.06)',
        'menu-card-hover': '0 2px 10px #0f1a2f14',
        'calendar-active': '0 1px 4px rgba(96,86,255,0.35)',
      },
      backdropBlur: { glass: '8px', 'glass-lg': '10px', nav: '12px' },
      maxWidth: { content: '1300px' },
      transitionTimingFunction: {
        'out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',  // the site's signature ease (all reveals)
        tw: 'cubic-bezier(0.4, 0, 0.2, 1)',              // Tailwind default, used on hovers
      },
    },
  },
};
```

### 1.1 Colours in use (computed)
| Role | Value |
|---|---|
| Page bg (`main`) | `#ffffff` |
| Heading / primary text | `#0d162f` |
| Primary text at 80% (hero subtitle) | `rgba(13,22,47,0.8)` |
| Primary text at 75% (tile body) / 72% (active tile label) / 50% (inactive tile label) | `rgba(13,22,47,.75/.72/.5)` |
| Body / muted text | `#868a97` |
| Tertiary text | `#707287` |
| Tab text (inactive / active) | `#374151` (gray-700) / `#111827` (gray-900) |
| Hairlines (every section border, card border, grid rail) | `#e6e7ea`, 1px solid |
| Brand indigo (links, accents, active tab bar, highlighted word) | `#6056ff` |
| Logo-wall link | `rgba(96,86,255,0.85)` hover `#6056ff` + underline |
| Enterprise card bg | `#f8fafc` (slate-50) |
| Tile base | `#f6f5f9` |
| Positive metric | `#0e9384` |
| Online dot | `#027a48` with `0 0 0 2px #fff` ring |

### 1.2 Gradients (exact)
- **Primary button:** `radial-gradient(circle, #6056ff, #3b32f9)`. On hover framer swaps it to `radial-gradient(circle, #7281ff, #3b32f9)`. Border-top is 1px `#7281ff` and border-bottom is 1px `#3b32f9`. There are no side borders.
- **Grain panel "violet" (default)** (`GrainBand` builder `l({deep,second,warm,base})`):
  `radial-gradient(90% 80% at 12% 0%, rgba(138,105,255,0.55) 0%, rgba(138,105,255,0) 62%), radial-gradient(85% 75% at 92% 10%, rgba(109,74,255,0.55) 0%, rgba(109,74,255,0) 62%), radial-gradient(85% 85% at 82% 100%, rgba(138,105,255,0.50) 0%, rgba(138,105,255,0) 60%), radial-gradient(80% 70% at 22% 100%, rgba(199,207,255,0.60) 0%, rgba(199,207,255,0) 65%), linear-gradient(160deg, #e6e6fb 0%, #e2e3fa 50%, #dfe2fa 100%)`
- **Grain panel "pink":** deep `207,161,251`, second `244,114,182`, warm `125,170,255`, base `#f0ddff → #f6e3fb → #fbe8f5`. Same 5-layer structure.
- **Grain panel "blue":** deep `116,187,224`, second `167,139,250`, warm `110,231,183`, base `#bbe2ff → #cbeaff → #d6f0f5`.
- **Grain noise overlay**, layered on top of every grain panel: an absolute inset-0 div with `opacity:.45; background-size:180px 180px; mix-blend-mode:overlay; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='360'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`.
- **Neutral grain band (unused on home, exported):** `radial-gradient(75% 65% at 6% 0%, rgba(13,22,47,0.021) 0%, transparent 62%), radial-gradient(70% 60% at 100% 14%, rgba(13,22,47,0.017) 0%, transparent 60%), radial-gradient(80% 70% at 94% 100%, rgba(13,22,47,0.021) 0%, transparent 62%), radial-gradient(70% 65% at 2% 96%, rgba(13,22,47,0.016) 0%, transparent 60%), radial-gradient(105% 95% at 48% 42%, #fff 0%, #fefeff 52%, #fbfbfd 100%)`.
- **Hero mascot halo:** `radial-gradient(circle, rgba(99,85,245,0.16) 0%, rgba(99,85,245,0.06) 42%, rgba(99,85,245,0) 68%)` on a span at `inset: -(size*0.85)px`, i.e. -146px for 172px and -119px for 140px.
- **Nav cursor glow** (two layers, follows the mouse): `radial-gradient(600px circle at {x}px {y}px, rgba(96,86,255,0.08), transparent 40%)` plus `radial-gradient(240px circle at {x}px {y}px, rgba(96,86,255,0.12), transparent 50%)`.
- **Image overlays:** case-study image uses `linear-gradient(to bottom right, rgba(96,86,255,.30), transparent)`. The testimonial image uses the same with `.40`.
- **Running-row highlight (CostHero table):** `linear-gradient(90deg, transparent 0%, rgba(96,86,255,0.07) 14%, rgba(96,86,255,0.07) 86%, transparent 100%)` on a span inset `0 -20px`.

### 1.3 Radii
4px (`rounded`, glass mini-cards), 4.8px (`rounded-button`, default buttons), 6px (tabs, calendar cells, small avatars), 8px (segmented track, dropdown items), 12px (`rounded-xl`: Enterprise panel, CostHero app card top corners `12px 12px 0 0`), 18px (hero speech bubble), 9999px (pills, avatars, play buttons, the "rounded-full" CTA variant used in UseCases/CostHero). **Section cards and grid cells are square (0 radius).**

### 1.4 Shadows / blur
See `boxShadow` above. Backdrop blur: nav 12px (`backdrop-blur-md`), glass chips 8px, small glass tags 10px.

### 1.5 Layout system: "gutter rails" (the defining structure)
- Every section is a 3-column flex row: `[left gutter][center column][right gutter]`.
  - Center column is `width:100%; max-width:1300px; margin:0 auto`.
  - Left and right gutters are `flex:1 1 0%` and `display:none` below 1440px (`desktop:block`). They have inline `min-width: 224px` (left) and `290px` (right). The left gutter carries `border-right` and the right gutter carries `border-left`, both 1px `#e6e7ea`.
  - Result: at **1440** the center column is **926px** wide (x = 224 to 1150) with vertical hairlines running the full page height. Below 1440 the center column is full-bleed (`100vw`, capped at 1300) with no rails.
- Sections stack with `margin-top:-1px` and each center column has `border-top:1px #e6e7ea` (the gutter cells also have `border-top`). The result is a continuous ruled grid, like a sheet of graph paper.
- Each section also has an absolutely positioned copy of the rail lines (`absolute inset-0 pointer-events-none hidden desktop:flex`) so the vertical lines continue behind the content.
- **Content padding inside the center column (measured, left padding = content x minus column x):**
  | Breakpoint | Standard sections (`px-6 md:px-12 lg:px-20`) | Logo grid / Section default (`px-6 md:px-20 desktop:px-14`) | Footer (`p-6 md:p-12`) |
  |---|---|---|---|
  | 1440 | 80px (content width 766) | 56px | 48px |
  | 1280 | 80px (content width 1120) | 80px | 48px |
  | 768 | 48px (content width 672) | 80px | 48px |
  | 375 | 24px (content width 327) | 24px | 24px |
- **Vertical rhythm (StackedSection default):** `py-12 md:py-28`, i.e. 48px on mobile and 112px from md up. The section heading block has `mb-10 md:mb-12` (40/48px). The h2 to description gap is `mt-5` (20px).
- Spacing values used: 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 112, 128px (Tailwind 4px scale).

---

## 2. Fonts

Both families are **Google Fonts** (loaded from fonts.googleapis.com / fonts.gstatic.com, woff2). No licensed fonts.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet">
```
- **Inter 400/500/600:** `font-family: Inter, system-ui, sans-serif`. This is the `html` default and is used for body copy, nav, tabs, labels and most UI.
- **Sora 400/500/600/700:** `font-family: Sora, system-ui, sans-serif` (`font-display`). The global base rule is `h1,h2,h3,button,a[role=button]{font-family:Sora}`. Elements that carry `tw-font-sans` (nav triggers, tab buttons, UseCases/LearnMore h3s) override it back to Inter. Watch for this: a bare `<button>` renders in Sora (the hero "primary" button text is Sora 14px), while `<a>` buttons render in Inter.
- **Mono:** system `ui-monospace` stack, used only for tiny 10px labels inside SVG diagrams.
- Base: `html{line-height:1.5; scroll-behavior:smooth}`.

### 2.1 Type scale (computed)
| Role | Family | Size / line-height | Weight | Letter-spacing | Colour |
|---|---|---|---|---|---|
| H1 hero | Sora | 48 / 52.8 (lh 1.1) | 400 | -2.4px (-0.15rem) | #0d162f |
| H2 display (CostHero) | Sora | 48 / 57.6 (lh 1.2), all bps | 400 | -2.4px | #0d162f |
| H2 section (SectionHeading) | Sora | md+ 36 / 48.6 (lh 1.35); mobile 30 / 40.5 | 400 | -0.025em (-0.9 / -0.75px) | #0d162f |
| H2 section (EnterpriseSecurity, Integrations) | Sora | md+ 36 / 45 (lh 1.25); mobile 30 / 37.5; `text-wrap:balance` | 400 | -0.025em | #0d162f |
| H2 section (Autonomy) | Sora | md+ 36 / 49.5 (snug 1.375); mobile 30 / 36 | 400 | -0.025em | #0d162f |
| Hero subtitle | Inter | md+ 24 / 32.4 (lh 1.35); mobile 20 / 27 | 400 | normal | rgba(13,22,47,.8) |
| Section lead (lg variant, Enterprise) | Inter | md+ 18 / 27.9 (lh 1.55); mobile 16 / 24.8 | 400 | normal | #868a97 |
| Body / section description | Inter | 16 / 25.6 (lh 1.6) | 400 | normal | #868a97 |
| Body (Autonomy) | Inter | 16 / 26 | 400 | normal | #868a97 |
| Card title, medium | Inter | 20 / 28 | 500 | normal (tile h4 -0.5px) | #0d162f |
| Card title, LearnMore | Inter | 20 / 25 (lh 1.25) | 500 | -0.2px | #0d162f |
| Card title, UseCases | Inter | 16 / 24 | 400 | normal | #0d162f |
| Level label (Autonomy) | Inter | 18 / 28 | 500 | normal | prefix "Lx." in #9ca3af, active level text #6056ff |
| Quote (testimonial, lg) | Inter | 24 / 39 (lh 1.625) | 400 | normal | #0d162f |
| Quote (mobile) | Inter | 18 / 29.25 | 400 | normal | #0d162f |
| Small body / card desc | Inter | 14 / 21–22.75 (lh 1.5–1.625) | 400 | normal | #868a97 |
| Card desc (LearnMore) | Inter | 15 / 22.5 | 500 | normal | #707287 |
| Nav link / button / tab | Inter | 14 / 20 | 400 | normal | #0d162f (tabs #374151) |
| Stat value (case study) | Sora | 16 / 24 | 600 | normal | #0d162f |
| KPI value (CostHero) | Inter | 24 / 24 | 500 | -0.48px | #0d162f |
| KPI label | Inter | 11.5 / 17.25 | 500 | 0.23px | #868a97 |
| Footer column heading | Inter | 16 / 24 | 600 | normal | #0d162f |
| Footer link | Inter | 14 / 20 | 400 | normal | #868a97, hover #0d162f |
| Eyebrow-ish label ("Featured in") | Inter | 14 / 20 | 500 | normal | #868a97 |
| Logo-wall link | Inter | 12 / 16 | 500 | normal | rgba(96,86,255,.85) |
| Glass chip text | Inter | 12.5 / 18.75 (lg), 13 / 19.5, 10 / 15 (tiny) | 500 | normal | #0d162f |
| Mega-menu heading / item | Inter | 15 / 22.5 | 400 heading (#868a97) / 500 item (#0d162f) | normal | |

No `text-transform` is used anywhere on the page (no uppercase eyebrows).

---

## 3. Sections (top to bottom)

Heights are measured `getBoundingClientRect().height` in px. Total document height: **1440: 9787 · 1280: 9448 · 768: 13738 · 375: 17226**.

| # | Section (component) | 1440 | 1280 | 768 | 375 |
|---|---|---|---|---|---|
| 0 | Header (fixed) | 65 | 65 | 65 | 65 |
| 1 | Hero (`InventLaunchHero`) | 452 | 426 | 693 | 696 |
| 2 | Logo wall (`LogoGridSection`) | 242 | 242 | 338 | 270 |
| 3 | Expanding tiles (`HowWeWork`) | 867 | 867 | 1455 | 1623 |
| 4 | Case-study accordion (`CaseStudies`) | 849 | 803 | 1888 | 2052 |
| 5 | Use-case card grid (`UseCases`) | 1368 | 1326 | 2000 | 3367 |
| 6 | Product mock hero (`CostHero`) | 958 | 932 | 1047 | 1013 |
| 7 | 4-level framework (`AutonomyAndProduct`) | 849 | 827 | 1234 | 1949 |
| 8 | Enterprise / security (`EnterpriseSecurity`) | 984 | 936 | 984 | 1182 |
| 9 | Integrations grid (`IntegrationsShowcase`) | 541 | 647 | 512 | 641 |
| 10 | Testimonial tabs (`Testimonials`) | 550 | 502 | 1164 | 1060 |
| 11 | Press / awards (`FeaturedIn`) | 444 | 424 | 444 | 706 |
| 12 | Resource cards (`LearnMore`) | 842 | 795 | 865 | 1255 |
| 13 | Footer | 789 | 669 | 1061 | 1361 |

`main` has `padding-top:64px` (`pt-16`) to clear the fixed header.

### 3.0 Header / nav
- `header`: `position:fixed; top:0; inset-x:0; z-index:50`, height 65px (64 + 1px border-bottom).
- Bar: `background:rgba(255,255,255,0.8); backdrop-filter:blur(12px); border-bottom:1px solid #e6e7ea`. The bar **does not change on scroll**: no shrink, no shadow, no colour change. It is the same at scrollY 0 and when scrolled.
- **Cursor glow:** the bar wrapper listens to `mousemove`. An absolute overlay (opacity 0 to 1, `transition: opacity 300ms cubic-bezier(.4,0,.2,1)`, 1 while hovered) paints the two radial gradients from section 1.2 at the cursor's local x/y.
- **Desktop (>=1100px, `header:flex`), h-64:** three cells that mirror the gutter rails.
  - Left cell: `flex-1`, `justify-end`, `pr-6`, `border-r`. It holds the logo `img` (h-24, logo aspect 157:27, about 140x24). At 1440 the cell is 224 wide.
  - Center: `px-6`, holds `<nav>`. A `ul` flex row of 4 dropdown triggers and 1 plain link. Each item is `px-4 py-2` (36px tall), Inter 14/20 400, #0d162f, hover/open #6056ff, `transition: color 150ms`. Triggers have a 12px chevron (`ml-0.5`) that rotates 180deg when open (`transition: transform 200ms`). Item widths are about 100–122px.
  - Right cell: `flex-1`, `justify-start`, `pl-6`, `border-l`. It holds a gap-12px pair: secondary button (about 87x42) and primary button (about 122x42).
- **Mega-menu dropdown** (Radix NavigationMenu, opens on hover/pointer-move, `data-state=open` fade-in/fade-out via tailwindcss-animate, default 150ms):
  - Positioned `absolute left-0 top-full` under the nav (x 248 at 1440), `width:max-content`. The panel measured 1002x530.
  - Panel: `background:#fff; border:1px solid #e6e7ea; box-shadow: 0 24px 56px -12px rgba(13,22,47,.16); border-radius:0`.
  - Inner: `flex flex-wrap; gap: 32px 48px; max-width:1000px; padding: 28px 56px 28px 36px`.
  - Column: `min-width:170px`. Heading is 15/22.5 400 #868a97 with `mb-2`. The list holds 4 items. Each item is a link `rounded-lg -mx-3 px-3 py-2` (about 194x39) whose text is 15px 500 #0d162f. Hover: bg `#f6f5f9` and text #6056ff. Under the list sits a "View all" link: 13px #868a97, `rounded-md -mx-2 px-2 py-1 mt-2`, hover bg `#f6f5f9` and colour #6056ff, plus a 13px chevron that translates `x 0 → 2px` on hover.
  - The layout is 4 columns x 2 rows. Other variants exist for other menus: a highlight card (`w-250 rounded-lg border #0d162f1a px-5 py-4`, hover shadow `0 2px 10px #0f1a2f14`, grain-gradient background), logo tiles (`h-16 w-170 rounded-lg border`, hover bg `#f6f5f9`) and a right promo column (`w-320 border-l px-8 py-7`, hover bg `#f9f9fa`, 15px title).
- **Mobile/tablet (<1100px):**
  - Bar: `h-16 flex justify-between pl-6 pr-4`. Logo on the left. On the right is the hamburger button: `p-2 rounded-md` (40x40), hover bg gray-100.
  - Drawer: Radix Dialog. A right-side sheet `fixed top-0 right-0 bottom-0 width:320px`, bg #fff, `shadow-xl` (`0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)`). Overlay is `fixed inset-0 bg-black/20`. **No slide animation was observed** (it appears instantly).
    - Drawer header: `px-5 py-4 border-b` (63px tall) with logo and a close button (`p-1.5 rounded-md`, 30x30, bg gray-100 on hover/focus).
    - Then 4 collapsible sections, each 57px tall with `border-b`: trigger text 16/24 500 #0d162f, expanded content bg `rgba(249,250,251,.5)`.
    - Then 1 plain link `px-5 py-4 border-b`, 16px 500.
    - Footer block: `p-5 flex flex-col gap-3 border-t` with full-width secondary and primary buttons (280x42 each).

### 3.1 Hero
- Section: `pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden` (48/80px top, 64/96px bottom). Standard content padding.
- Grid: `grid-cols-1 lg:grid-cols-12; gap-y:56px; lg:gap-x:40px; items-center`.
  - Left `lg:col-span-7` (430px at 1440, 637px at 1280, full width below lg).
  - Right `lg:col-span-5` (296px at 1440), holding the mascot visual centred (`flex justify-center mb-8 lg:mb-0`).
- Text slots (left):
  | Slot | Role | Typography | Size/length | Lines 1440 / 1280 / 768 / 375 |
  |---|---|---|---|---|
  | h1 | Headline | Sora 48/52.8, -2.4px | 3 words / 15 chars | 1 / 1 / 1 / 2 |
  | p (`mt-5`) | Subtitle | Inter 24/32.4 (20/27 below md), rgba(13,22,47,.8) | 5 words / 31 chars | 1 / 1 / 1 / 1 |
  | p (`mt-5 max-w-xl` 576px) | Body | Inter 16/25.6, #868a97 | 20 words / 132 chars | 3 / 2 / 2 / 4 |
  | CTA row (`mt-8 flex flex-wrap gap-4`) | Primary button (opens video modal) and secondary button | see Buttons below | 3 words; 2 words | 1 line each |
- **Visual slot (right):** an animated **mascot badge**.
  - Size: 172x172 at md and up, 140x140 below md (`md:hidden` swap).
  - The original is the brand's scalloped badge shape with two white pill "eyes". **Replace it with your own placeholder mark**: any 76x76-viewBox blob or squircle filled with a `linear-gradient(135deg,#6355F5,#4D40EC)` base, plus radial tints: cyan `#43E3F5` at 50% top-left, pink `#F06BD8` at 45% bottom-right, and a white sheen at 20%. Give it two white rounded-rect eyes (8.1x18.3, rx 4.05, at x 26.04 and 41.87, y 26.39).
  - Halo span behind it (gradient in section 1.2) at `inset:-146px` (172 size).
  - **Speech bubble** below it: `absolute top-full mt-4`, centred, `w-max max-w-[260px] rounded-[18px] border border-border-default bg-white px-4 py-2.5` (about 226–260 x 44–66). Text is Inter 15px, lh 1.45, centred, #0d162f, 4–10 words (2 lines). It has a tail: an 11x11 white square rotated 45deg at `-top-[6px] left-1/2` with `rounded-tl-[3px]`, `border-l border-t`.
  - Bubble motion is described in the Motion section.
- Video modal (on primary click): portal overlay with a YouTube iframe. Motion: overlay fades `opacity 0→1`; dialog animates `scale .9→1, opacity 0→1`.

#### Buttons (global component)
- Base: `inline-flex items-center justify-center px-5 py-2.5 rounded-button(4.8px) text-sm(14/20) transition-all 200ms cubic-bezier(.4,0,.2,1)`, height 42px.
- **Primary:**
  - Rest: white text, bg `radial-gradient(circle,#6056ff,#3b32f9)`, 1px border-top `#7281ff` and 1px border-bottom `#3b32f9`, `box-shadow: 0 1.6px 6.4px rgba(59,50,249,.25)`.
  - Hover: bg `radial-gradient(circle,#7281ff,#3b32f9)` (framer `whileHover`) and shadow `0 3.2px 9.6px rgba(59,50,249,.35)`.
  - Tap: `scale .98`.
- **Secondary:**
  - Rest: transparent bg, #0d162f text, 1px border `#e6e7ea`.
  - Hover: bg `#6056ff1a`.
  - Tap: `scale .98`.
- **Pill variant:** same with `!rounded-full` (used for the CTAs in UseCases and CostHero).
- Focus: inputs elsewhere use `focus:ring-2 ring-brand-indigo/20 border-brand-indigo`. Buttons show the browser default focus ring (no custom ring was found).

### 3.2 Logo wall
- Section bg #fff, center column has `border-y`. Grid has `padding: 0 56px` (1440) / 80px (1280, 768) / 24px (375), `gap:32px` (375: `20px 16px`), with roughly 48px top and bottom padding (grid at y+49 inside a 242px band).
- Columns: **6 at xl+ (109px each at 1440, 160px at 1280), 5 at lg, 4 at md (128px), 3 at mobile (98px)**. 12 items, so 2 rows at 1440 and 1280, 3 rows at 768, 4 rows at 375.
- Item: `flex flex-col items-center`.
  - Logo box `h-10 flex items-center` holding an img `h-4 sm:h-6 w-auto max-w-[80px] sm:max-w-[140px] object-contain grayscale`, hover `grayscale-0`, `transition all 300ms`.
  - Under it a 16px-tall row (`hidden sm:block`) with an optional 12px/500 indigo link (1–2 words, 10–11 chars). Hover: underline, colour #6056ff, plus a 12px arrow icon at `-right-4` that goes `opacity 0→1, translateX -4px→0` (200ms).
- **Media slots:** 12 monochrome wordmark logos. Placeholder: grey SVG wordmarks 24px tall, 75–140px wide (aspect ratios observed 3.2:1 to 6.5:1). Not every logo has a link (7 of 12 do).

### 3.3 Expanding tiles (`HowWeWork`)
- StackedSection (`py-12 md:py-28`), center bg #fff.
- Heading block (`mb-10 md:mb-12 max-w-2xl` 672px):
  - h2: about 11 words / 54 chars. Lines: 2 at md+, 3 at 375.
  - p `mt-5 max-w-xl` 576px: about 36 words / 218 chars. Lines: 3 at md+, 6 at 375.
- **Tiles row:** `flex flex-col lg:flex-row gap-4 lg:gap-5` (16/20px), 3 tiles.
  - **lg+ (>=1024):**
    - Each tile is `relative overflow-hidden h-[400px] basis-0 min-w-0` with `flex-grow: active ? 2.4 : 1` (`transition: flex-grow .65s cubic-bezier(.23,1,.32,1)`). At 1440 that gives an active tile of 396px and inactive tiles of 165px. At 1280: 589 / about 255.
    - Activation is **hover/focus driven** (`onMouseEnter` / `onFocus`, tabIndex 0). There is no auto-rotate. Tile 0 is active by default.
    - Layers: base `#f6f5f9`, then the grain gradient (violet / pink / blue per tile) at opacity 1 when active and 0 when inactive (`.65s` out-quint), then the noise overlay.
    - Content: `relative h-full flex flex-col justify-end p-6` (24px; padding transitions .65s). From top to bottom:
      - Label: Inter 14/20, colour rgba(13,22,47,.72) active / .50 inactive, transition .65s. 2 words / 7–9 chars.
      - h4: Inter 20/28 500, -0.5px, `mt-1.5`, fixed width 180px. 5–12 words; 2 lines (up to 4 when narrow).
      - p: Inter 14/22.4, rgba(13,22,47,.75), `pt-2 w-[370px] max-w-full`. 16–29 words. Opacity 1 when active and 0 when inactive (`transition: opacity .5s out-quint`, delay .15s on enter and 0 on exit).
    - Top-left illustration: `absolute left-6 top-6`, opacity 1/0 (`.45s` out-quint, delay .2s on enter).
  - **<lg:** tiles stack (672 wide at 768, 327 at 375) with auto height (about 306–339px). All three gradients are always visible. The illustration sits in flow at the top and is followed by the text. Text changes: label 14px rgba(13,22,47,.5), h4 Inter 18/28 500, p 14/22.4, all visible.
- **Illustration slots (make your own, keep the sizes):**
  1. Stack of 3 **glass pills** (`flex-col items-start gap-2.5`). Second pill indented 24px. Pill spec: `rounded-full border border-white/60 bg-white/70 backdrop-blur(8px) px-[14px] py-2 gap-2`, shadow `glass`, text Inter 12.5/18.75 500 #0d162f, about 3–5 words. A leading 16px indigo (#6056ff) circle holds an 8px white check.
  2. **Node graph:** 320x140 SVG of connector lines. 4 glass avatar bubbles (44x44 `rounded-full bg-white/80 blur(8px)`, shadow `glass`, holding a 28px round avatar) sit at (0,24), (118,0), (118,84), (236,42); the last is at opacity .6. Each has an 8px `#027a48` status dot with a 2px white ring at the bottom-right.
  3. Two glass pills (2nd indented 24px), each with an 18px round avatar and a trailing 12.5px #868a97 label ("Wk n").

### 3.4 Case-study accordion (`CaseStudies`)
- Inner: `pt-10 pb-12 px-6 md:px-12 lg:px-20 border-b`.
- **lg+ (accordion, one open):** 3 customers. Index 0 is open by default.
  - **Open item:**
    - Header row: `flex md:flex-row md:items-center gap-4 pt-4 pb-6` (96px tall). It holds a 40x40 square logo (`object-contain`), a title p (`flex-1`, Inter 20/28 500 #0d162f, 11–12 words / 66–78 chars, 2 lines at 1440 and 1 at 1280) and a secondary button (3 words, about 138x42, `hidden md:inline-flex`).
    - **Image button:** full content width x **400px** (766x400 at 1440, 1120x400 at 1280; 300px tall below md). `object-cover` 16:9 source. Overlay `bg-gradient-to-br from-brand-indigo/30 to-transparent`. Centred play button: 56x56 `rounded-full border-2 border-white bg-white/10` holding a 24px white play triangle, `transition all 150ms`.
    - **Stats row:** `grid md:grid-cols-3 gap-3 md:gap-6 pt-6 pb-8` (3 cols of 239px at 1440). Each stat is an inline value (Sora 16/24 600, 3–6 chars) plus a label (Inter 14/20 #868a97, 2–4 words) with about 8px between them.
  - **Collapsed items:** a full-width button `flex items-center gap-4 py-4` (88px tall at 1440, 72 at 1280) that holds:
    - 40px logo, `opacity-60`, group-hover 100.
    - Title, Inter 20/28 500 #868a97, left-aligned, 11–12 words.
    - A 32px circle (white, 1px border) holding a 14px plus icon in #707287 that turns #0d162f on hover.
  - Toggle: click. Content animates `height 0↔auto, opacity 0↔1` over `.35s cubic-bezier(.4,0,.2,1)`. There is no auto-rotation.
- **<lg:** every item is rendered expanded in a `divide-y` list.
  - Header row stacks at 375: `flex-col items-start gap-3`. The button moves under the stats (`md:hidden pt-4 pb-6`).
  - Image is 672x400 at 768 and 327x300 at 375.
  - Stats: 3 cols at md, 1 col (`gap-3`) at 375.
  - Title at 375 is Inter 16/22.4 500.

### 3.5 Use-case card grid (`UseCases`)
- StackedSection, center bg #fff.
- Heading (`max-w-2xl mb-10 md:mb-12`):
  - h2: 9 words / 57 chars. Lines: 2 at md+, 4 at 375.
  - p `max-w-lg` (512px): 17 words / 102 chars. Lines: 2 at md+, 3 at 375.
- **Segmented tabs (PillTabs):**
  - Track: `inline-flex max-w-full p-1 rounded-lg bg-white overflow-auto`, shadow `segmented-track`, 46px tall. Measured widths: 597 (UseCases), 496 (CostHero), 579 (Autonomy).
  - Tab: `px-4 py-2 rounded-md border text-sm` (38px tall), Inter 14/20. Active: bg `#f3f4f6`, border `#e5e7eb`, text `#111827`. Inactive: border transparent, text `#374151`, hover bg `#f9fafb`. `transition colors 150ms`.
  - 4 tabs plus a "+N more" overflow trigger with a 12px chevron (opens a floating-ui dropdown). Labels are 1–2 words.
  - Below sm, labels swap to shorter mobile labels and the track shows 3 compact tabs.
- **Card grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4; gap: 40px 24px`. 8 cards: 2 rows at lg, 4 at sm, 8 at mobile. Column width 173.5 (1440) / 262 (1280) / 324 (768) / 327 (375).
  - Card: `relative flex flex-col h-full`.
    - **Visual tile:** `min-h-[230px] flex-1`, overflow hidden, square corners. Background is the violet grain gradient plus noise. It holds a centred mini-UI mockup (`px-5 py-6 flex flex-col justify-center`). Tile height is 230–251 at 1440 (the row's tallest wins) and about 230 elsewhere.
    - h3: Inter 16/24 400 #0d162f, `mt-4`, 2–3 words / 17–19 chars, 1 line.
    - p: Inter 14/21 #868a97, `mt-1.5`, 6–8 words / about 48 chars. Lines: 2–3 at 1440, 1–2 at 768+.
  - **Hover:**
    - Tile content gets `filter: blur(6px); opacity:.65` (`transition: filter .25s ease, opacity .25s ease`).
    - A centred "Read more" glass pill fades and slides in (`opacity 0→1, translateY 4px→0`, .25s ease). Pill spec: `rounded-full border-white/60 bg-white/90 px-4 py-2`, Inter 13px 500, shadow `glass-pill`, blur 10px, `hover:scale-[1.04] active:scale-95` 150ms.
    - After a **450ms hover delay** a floating popover opens to the right (`w-[372px]`, flips left at the viewport edge, offset 0, padding 16, with an arrow) showing a larger animated scene. Placeholder: a 372px-wide white card.
  - **Mini-UI mockup vocabulary** (build generic versions; content is placeholder):
    - Glass tag: `rounded-full bg-white/55 border-white/60 blur(10px)`, shadow `glass-sm`, `pl-0.5 pr-2 py-0.5`, holding a 17px white icon circle and 10px/15 500 text #5b6070. The indigo variant is `pl-1 pr-3 py-1` with 12px/18 500 text #4b40d6, 32px tall.
    - Bullet list: 6px dots (#6056ff active, rgba(13,22,47,.3) muted) beside 13px/17.9 text, with `gap-2.5`.
    - Timeline: 18px glass numbered circles (10px 600 #4b40d6) joined by 1px rgba(13,22,47,.14) lines.
    - Mini calendar card: `rounded(4px) p-3` glass, grid 5 cols `gap-1.5`, 24px-tall cells (`rounded-md`, 10px #5b6070). The active cell is #6056ff with white 10px 600 text and shadow `calendar-active`.
    - Bar chart: 3 bars `rounded-t(4px)`, 2 of rgba(13,22,47,.12) and 1 of #6056ff, heights 14/28/56px, 11px tabular labels.
    - Stacked cards: 3 offset 120x94 cards at bg white/.32, .44 and .55.
- **CTA bar:**
  - Container: `mt-12 md:mt-14 pt-10 border-t`, `flex flex-col sm:flex-row sm:items-center gap-5`, `justify-between` (CTA sits at the right edge).
  - Text: p Inter 20/28 (18/28 below md), 7 words / 42 chars, 1 line (2 at 375).
  - Button: primary pill, 3 words.

### 3.6 Product mock hero (`CostHero`)
- Center column: `px-6 md:px-12 lg:px-20 pt-20 md:pt-28` (80/112px top), **pb-0**, `overflow-hidden`. The card sits flush on the section's bottom edge.
- Header grid: `grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-y-8 lg:gap-x-10`, `pb-14` (40 at 375).
  - h2 `lg:col-span-7`: **Sora 48/57.6, -2.4px**, 5 words / 32 chars. Lines: 2 at 1440, 1280 and 768; 3 at 375.
  - Right `lg:col-span-5` holds:
    - p, 16/25.6 #868a97, 13 words / 98 chars. Lines: 3 at 1440, 2 at 1280 and 768, 3 at 375.
    - CTA row `mt-6 gap-4`: primary pill (3 words) and secondary pill (3 words).
- Segmented tabs: same component, `hidden md:flex md:mb-6`, 4 tabs of 2 words each.
- **App card:** `relative rounded-t-xl` (12px top corners only), shadow `app-card-top`, **height 560px**, full content width (766 at 1440, 1120 at 1280, 672 at 768, 327 at 375). Inner: `bg-white border border-border-default rounded-t-xl overflow-hidden`, `box-shadow: inset 0 1px 0 rgba(255,255,255,.9)`.
  - **KPI strip:** `grid grid-cols-2 md:grid-cols-4 border-b` (154px tall at md+; 2x2, 307px, at 375). Each cell is `flex flex-col justify-between p-4 border-r` (last child has no border) and holds:
    - Label: 11.5px 500 #868a97, 0.23px tracking, 2–4 words.
    - Value `mt-1.5`: Inter 24/24 500, -0.48px, 4–6 chars.
    - Delta `mt-1`: 11.5px 500, #6056ff or #0e9384, 3–4 words.
    - Sparkline: SVG 132x40. 1.75px stroke line that draws in (`pathLength 0→1`, .9s out-quint); area fill that fades in (`opacity`, .6s, delay .3s) with a noise image mask; end dot r 2.75 that `scale 0→1` (.3s, delay 1s).
  - **Table:** padding about 16px.
    - Header row: `hidden sm:grid`, 11px #868a97, `pb-2.5`.
    - Rows: `grid` `[1fr_160px_150px_80px_60px]` (wide: `[1fr_150px_140px_60px_50px]`), `gap-4` (wide `gap-3`), `py-2.5 border-b` rgba(230,231,234,.6), 41px tall.
    - Cells:
      - Task: 12.5px #0d162f truncate, followed by an overlapping stack of 18px white circular tool icons with 1px border holding 10px logos.
      - Agent: 20px `rounded-md` avatar plus 12px label.
      - Model: 16px model icon plus 12px #868a97 label.
      - Eval: 12px #0e9384 percentage.
      - Cost: 12px #0d162f.
    - Below sm only 2 columns show (`[1fr_auto]`).
- **Live feed motion:** see the Motion section (new row every 3.4s).

### 3.7 Four-level framework (`AutonomyAndProduct`)
- Header block: `pt-20 md:pt-32 pb-10 md:pb-14 border-b` (128/56px at md+, 80/40 at 375). Padding uses the Section default (80px at md through 1440; 24px at 375).
  - h2: 36/49.5 (snug), `max-w` 512, 8 words / 46 chars. Lines: 2 (3 at 375).
  - p `mt-3`: 16/26 #868a97, 18 words / 110 chars. Lines: 2 (3 at 375).
  - Segmented tabs `mt-6`: 4 tabs, 1–3 words each. Hidden on mobile (sm:inline labels).
- **Card grid:** `grid sm:grid-cols-2 lg:grid-cols-4`, edge-to-edge in the center column (no outer padding): 4x231.5 at 1440, 4x320 at 1280, 2x384 at 768, 1x375 at 375. Height 430 (1440) / 408.
  - Cell: `relative bg-white border-r border-b md:border-b-0 last:border-b-0`, `flex flex-col h-full`.
    - Top `p-5 pb-4 border-b` (65px): level label Inter 18/28 500. The "Lx." prefix is #9ca3af; the rest is #111827, and #6056ff when the level is highlighted. 2 words.
    - Diagram area `sm:border-b`, 261px tall (342 at <lg incl. desc), holding a centred SVG flow diagram (about 172–215 x 107–195). Placeholder: an SVG with 10.5px Inter labels and 10px mono counters.
    - Description: p `p-5 pt-4`, 14/22.75 #868a97, 8–11 words / 62–70 chars. Lines: 5 at 1440, 4 elsewhere.
- Motion: sequential level highlight on scroll (see Motion).

### 3.8 Enterprise / security (`EnterpriseSecurity`)
- StackedSection.
- Heading (`max-w-2xl mb-10 md:mb-12`):
  - h2: 36/45 (`text-wrap:balance`), 4 words / 26 chars. Lines: 1 (2 at 375).
  - p `mt-5 max-w-xl`: 18/27.9 (16/24.8 at 375) #868a97, 20 words / 127 chars. Lines: 2 (3 at 375).
- **Badge panel:** `rounded-xl bg-slate-50 (#f8fafc) px-6 py-16 md:py-20` (80px; 64 at 375), height 304 (272 at 375).
  - Inside: `flex items-start justify-center gap-12 md:gap-20` (48/80px) holding 2 badges.
  - Each badge is `flex flex-col items-center gap-4`: a **104x104 SVG seal** (placeholder: circular certification seal, 8.5px/13px Inter labels, star ring) and a caption row (`flex items-center gap-2`) of Inter 16/24 500 text (1–2 words) plus an 18px check icon.
- **Feature columns** `mt` about 64px: `grid md:grid-cols-3 gap-10 md:gap-12` (40/48px).
  - Column header: `flex items-center gap-2.5 mb-5`, a 20px icon plus h3 Inter 15/22.5 400 #868a97 (3–4 words).
  - List: `ul flex-col gap-3`. Each `li` is `flex items-center gap-2.5`, Inter 16/24 (14/20 below md) #0d162f, with an 18px check icon, 2–5 words.
  - Item counts: 4, 6 and 5.

### 3.9 Integrations grid (`IntegrationsShowcase`)
- StackedSection, bg #fff.
- Header row: `flex flex-col md:flex-row md:items-end md:justify-between gap-4`.
  - h2: 36/45 (30/37.5 at 375), 4 words / 22 chars, with one word coloured #6056ff. Lines: 1 (2 at 375).
  - Link: Inter 14/21 #868a97, 3 words, with a 14px chevron (`group-hover:translate-x-0.5`, 150ms) and hover colour change.
- Grid `mt-10` (about 40px): `grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-px bg-border-default border border-border-default`. This makes 1px hairline cells. 30 cells: 3 rows at md+, 6 rows at 375.
  - Cell: `bg-white flex items-center justify-center aspect-square` (75.5 at 1440, 110.9 at 1280, 66.1 at 768, 64.2 at 375).
  - Icon: `w-7 h-7 md:w-8 md:h-8 object-contain` (28/32px). Placeholder: 32px square app-icon glyphs.

### 3.10 Testimonial tabs (`Testimonials`)
- Section bg #fff, `border-b` on inner.
- **lg+:** `grid grid-cols-7` with full center width and no outer padding.
  - **Left `col-span-3`:** `p-16 lg:pl-20` (64px, left 80px), `flex flex-col justify-center border-r min-h-[490px]` (397 wide at 1440, 549 at 1280).
    - blockquote: Inter 24/39 #0d162f, `pr-*`, 18–20 words / about 100–120 chars. Lines: 6 at 1440, 4 at 1280.
    - Name: Inter 16/24 500, 2 words.
    - Role: 16/24 #868a97, 4 words. Lines: 1–2.
    - Secondary button "Read more" with a 14–16px chevron, `gap-2`, about 137x42, `mt` about 40px.
  - Content switches with AnimatePresence `mode="wait"`: `opacity 0, y 20 → 1, 0`, exit `y -20`, `.3s`.
  - **Right `col-span-4`** (529 at 1440, 731 at 1280):
    - Tab row: `grid grid-cols-2`. Each tab is a `relative py-6 flex items-center justify-center border-r last:border-r-0` button, 80px tall, `hover:bg-black/5`, `transition all 150ms`. It holds a logo `h-8 max-w-[140px] object-contain grayscale`. Inactive logo opacity .5, active 1.
    - Active indicator: `absolute bottom-[-1px] inset-x-0 h-1` (4px) `bg-#6056ff`, framer `layoutId` slide with spring (stiffness 500, damping 35).
    - Image: fills the rest, **420px tall**, `object-cover` (16:9 source). Overlay `from-brand-indigo/40` to-br. Centred 64px play circle (`border-2 border-white bg-white/10`, 24px white icon).
  - Tabs are click-only; there is no auto-rotate timer.
- **<lg:** stacked list of the 2 testimonials, each `p-6 md:p-8` (24/32px), separated by `border-t`. Each item holds:
  - Logo, `h-6 max-w-[120px]`, 24px.
  - Image, 704x280 at 768 and 327x200 at 375, with overlay and play button.
  - blockquote, Inter 18/29.25, 2 lines at 768 and 3–4 at 375.
  - Name, 14/20 500.
  - Role, 14/20 #868a97.
  - Secondary button.

### 3.11 Press & awards (`FeaturedIn`)
- Label row: `py-8 px-6 md:px-12` holding "Featured in", Inter 14/20 500 #868a97, 2 words.
- **Row 1 (press):** `border-t`, `grid grid-cols-2 md:grid-cols-4`. Cells are anchors `py-12 md:py-16` (48/64px), 160px tall (121 at 375), with `border-r` and `border-b md:border-b-0`.
  - Content: logo `h-6 md:h-8 max-w-[140px] object-contain grayscale opacity-60`, `transition all 300ms`. Hover: logo `blur-sm` and opacity .2, and an overlay label "Read article →" (Inter 14/20 500 #6056ff, 3 words) goes `opacity 0→1, translateY 8px→0` (300ms).
- **Row 2 (analyst/awards):** `border-t`, same grid. Cells are `flex flex-col items-center justify-center py-14 px-4` (40px py at 375), 196px tall.
  - Logo `h-6 md:h-7 max-w-[120px] grayscale opacity-70`, then a caption row (`flex flex-col sm:flex-row items-center gap-2`) holding a 20px laurel icon (#9ca3af) and centred text Inter 14/20 #868a97 (3–4 words, 15–33 chars, 1–2 lines).
  - One cell shows an 80x16 star-rating image instead of the laurel.
- Bottom `border-t`.

### 3.12 Resource cards (`LearnMore`)
- StackedSection, bg #fff.
- h2: 36/48.6, 4 words / 20 chars, 1 line. `mb-12 md:mb-14`.
- Grid: `grid-cols-1 md:grid-cols-2 gap-6` (371x512 at 1440, 548x465 at 1280, 324x535 at 768, 327x535 at 375).
  - **Card** (anchor):
    - Rest: `flex flex-col bg-white border border-border-default`, square corners, `transition: all .3s ease`.
    - Hover: `translateY(-5px)`, bg `rgba(96,86,255,0.06)`, border `rgba(96,86,255,0.2)`.
    - **Visual (top):** `h-[260px] w-full overflow-hidden` with a grain gradient (card 1 violet, card 2 pink) plus noise.
      - Card 1 visual: a centred report-cover image `h-[210px] w-auto` (1400x992, about 1.41:1, so 296x210) with shadow `glass`.
      - Card 2 visual: centred column `gap-5` holding a glass pill (two small 16px-tall logos with a 13px "×" between, 242x37.5) and a row of three 64px overlapping round avatars (`rounded-full border-[3px] border-white`, shadow `glass`, overlap -14px) plus a 56px glass play circle (`ml-3`, 20px indigo icon).
    - **Body:** `flex-1 flex flex-col gap-3 p-7` (28px):
      - h3: Inter 20/25 500, -0.2px, 5–12 words. Lines: 2–3.
      - p: Inter 15/22.5 500 #707287, 21–22 words. Lines: 3–4.
      - CTA: `mt-auto pt-2 inline-flex items-center gap-1.5`, Inter 14/20 500 #6056ff, 3 words, with a 16px arrow.

### 3.13 Footer
- `footer` is a StackedSection row. Inner `p-6 md:p-12` (24/48px).
- Layout: `flex flex-col lg:flex-row gap-12 lg:gap-16` (48/64px).
  - **Brand column:** `flex flex-col gap-4 lg:max-w-[280px]`. From top to bottom:
    - Logo, h-24, about 140x24.
    - Tagline: 16/24 #868a97, 6 words / 28 chars, 1 line.
    - Social row: `flex gap-3` of 4 icons, each 20x20, `opacity-60 hover:opacity-100` (150ms).
    - Legal text: 14/20 #868a97, 11 words / 62 chars, 2 lines.
    - Certification badges: `flex flex-wrap gap-2.5`, 4 images 56x56. Placeholder: square seals.
  - **Link columns:** `flex-1`, `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4`, `gap: 40px 64px`. 7 groups, so 2 rows at lg.
    - Column widths: 73.5 at 1440 (cramped, so headings wrap to 2 lines), 162 at 1280, 181 at 768, 131.5 at 375.
    - Group: `flex flex-col gap-2`. h4 Inter 16/24 600 #0d162f `mb-2` (1–2 words), then 3–9 links of 14/20 #868a97 with hover #0d162f (150ms), 1–3 words each.

---

## 4. Motion

Library: **`motion` (framer-motion API)** inside React islands. No GSAP, ScrollTrigger, Lottie, Rive, Lenis/smooth-scroll, canvas or WebGL. CSS keyframes present: `tw-pulse`, `tw-shimmer`, `tw-spin`, `inventCaret` (blinking caret, 0/100% opacity 1, 50% .3). `prefers-reduced-motion` is respected for CSS (`html{scroll-behavior:auto}`); `useReducedMotion` in the hero forces the bubble to stay shown.

### 4.1 Shared presets
- `EASE` = `{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }` is the default reveal transition.
- `SPRING` = `{ type: 'spring', stiffness: 190, damping: 22, mass: 0.7 }` (exported; used in widgets).
- Hovers are CSS transitions: colour 150ms, button `all` 200ms, logos `all` 300ms, all on `cubic-bezier(.4,0,.2,1)` unless noted.

### 4.2 Entrance / scroll reveals (all `once: true`)
| Element | Trigger | From → To | Transition |
|---|---|---|---|
| Hero text column | on mount | `opacity 0, y 16` → `1, 0` | EASE |
| Hero visual column | on mount | same | EASE, delay .15s |
| Section heading block (SectionHeading: h2+p wrapper) | `whileInView`, amount .4 | `opacity 0, y 16` → `1, 0` | EASE |
| Enterprise h2 / p / badge panel / columns | `whileInView`, amount .4 (h2, p), .3, .2 | `opacity 0, y 16` → `1, 0` | EASE; p delay .08; column items delay `i*0.06` |
| Integrations cells | `whileInView`, amount .2 | `opacity 0` → `1` | EASE, delay `(i % 10) * 0.03` (column stagger 30ms) |
| UseCases cards | in view of grid | `opacity 0, y 16` → `1, 0` | `{duration .3, ease [.23,1,.32,1]}`, delay `(i % 4) * 0.06` (60ms per column) |
| CostHero tabs / app card | on mount of island | `opacity 0, y 12` (tabs, delay .1) / `opacity 0, y 18` (card, delay .15) → `1, 0` | EASE |
| GrainBand content (generic) | `whileInView`, amount .3 | `opacity 0, y 32` → `1, 0` | `.7s [.23,1,.32,1]` |
| Testimonial / tab content swap | tab change | `opacity 0, y 10` → `1, 0`, exit `y -10` | `.2s easeOut` (generic Tabs); Testimonials panel `.3s`, y ±20 |
| Case-study panel | click | `height 0↔auto, opacity 0↔1` | `.35s [.4,0,.2,1]` |
| Video modal | open | overlay `opacity 0→1`; dialog `scale .9, opacity 0` → `1, 1` | default |

### 4.3 Continuous / timed animations
- **Hero mascot idle loop** (only while the mascot is in the viewport, via IntersectionObserver):
  - Wrapper animates `scale: [1, 1.035, 1]` (`duration 4.2s, repeat ∞, ease easeInOut`) and `rotate: [-1.5deg, 1.5deg, -1.5deg]` (`duration 7.5s, repeat ∞, easeInOut`).
  - Eyes blink: `scaleY: [1, 1, 0.12, 1]`, `times [0, .05, .55, 1]`, `duration .32s`, `repeat ∞`, `repeatDelay 3.8s` (a blink every about 4.1s). `transform-box: fill-box; origin center`.
  - Eye tracking (desktop 172px variant only): a `pointermove` listener on window maps the cursor to eye offset. `x = clamp((clientX/innerWidth - .5)*6, ±2.4)`, `y = clamp((clientY/innerHeight - .5)*5, ±1.8)` in viewBox units, smoothed with `useSpring({stiffness 120, damping 16, mass .4})`.
  - Pointer-enter: the eyes swap to "smile" arcs for 2.6s. The open eyes fade to opacity 0 (.12s); the smile group fades in with `scale .7→1` (spring 320/18).
  - Pointer-down: squash `scale [1, .86, 1.08, 1]`, `times [0, .24, .62, 1]`, `.48s easeOut`, plus the smile.
- **Hero speech bubble cycle** (runs while the hero is >=30% in view):
  - It cycles through 5 messages.
  - The first appears after 900ms.
  - Each message stays visible for `max(4000, 2200 + chars*60) + random(0..700)` ms, then hides for `1400 + random(0..2600)` ms before the next one.
  - The mascot lifts `y: 0 → -26px` while the bubble is shown (`1.1s [.23,1,.32,1]`).
  - Bubble enter: `opacity 0, scale .8, y -6` → `1, 1, 0`, spring (stiffness 380, damping 26), `transform-origin: 50% 0%`. Exit: `opacity 0, scale .9, y -4`, `.22s easeIn`.
  - On the last message the mascot smiles.
- **CostHero live table:** while the card is >=20% in view, every **3400ms** a new row is prepended. The list keeps at most 8 rows. The row enters with `height 0→auto, opacity 0→1` (`.45s [.23,1,.32,1]`, `layout` animation pushes the others down). It is flagged `running` for 1600ms:
  - Its highlight gradient span animates `opacity 0→1` (.8s) and back.
  - The Eval cell shows "Running…" in #6056ff (at `wide` it shows a 14px spinner instead: `border 2px rgba(96,86,255,.25)`, top `#6056ff`, `rotate 360`, `.9s linear ∞`).
  - Then the cell shows the teal percentage.
  - Tab change resets the rows.
- **CostHero sparklines:** when in view, path `pathLength 0→1` (.9s out-quint), fill opacity (.6s, delay .3), end dot `scale 0→1` (.3s, delay 1s).
- **Autonomy levels:** an IntersectionObserver (threshold 0.1) fires once. Levels 0–3 then activate one after another every **400ms** (`setTimeout(i*400)`). Cells animate `opacity .4→1`. The header label colour goes from `rgb(209,213,219)` (inactive) to `#111827` (reached) or `#6056ff` (current), `.3–.4s ease [.25,.1,.25,1]`. Diagram parts fade in (`opacity 0→1`, .3s).
- **Tab auto-rotation:** none. Every tab set on the page (UseCases, CostHero, Autonomy, Testimonials, Case studies) is click-driven.
- **Marquees / carousels:** none. The logo wall and integrations are static grids.

### 4.4 Hover / interaction transitions (summary)
| Component | Property | Duration / easing |
|---|---|---|
| Nav item, footer link, tab button | color / bg | 150ms `cubic-bezier(.4,0,.2,1)` |
| Nav chevron | rotate 180 when open | 200ms |
| Nav cursor glow | opacity | 300ms |
| Mega-menu panel | fade in/out (tailwindcss-animate) | 150ms (Radix hover open with delay) |
| Buttons | all (bg, shadow); tap scale .98 | 200ms |
| HowWeWork tile | flex-grow 1↔2.4, panel opacity, padding, label color | 650ms `cubic-bezier(.23,1,.32,1)` |
| HowWeWork tile body / illustration | opacity | 500ms (delay .15s) / 450ms (delay .2s) |
| UseCases card hover | content blur 6px + opacity .65; "Read more" pill opacity + y 4px; popover after 450ms | 250ms ease |
| Logo wall logo | grayscale 1→0 | 300ms |
| Logo wall link arrow | opacity 0→1, x -4→0 | 200ms |
| Case-study collapsed row | logo opacity .6→1, plus-icon color | 150ms |
| Play buttons | all | 150ms |
| Testimonial tab | bg black/5; indicator spring 500/35 | 150ms |
| FeaturedIn press cell | logo blur-sm + opacity .2; label opacity + y 8→0 | 300ms |
| LearnMore card | translateY -5px, bg indigo/6%, border indigo/20% | 300ms `ease` |
| Arrow chevrons (`group-hover:translate-x-0.5`) | transform | 150ms |
| Footer social icons | opacity .6→1 | 150ms |

### 4.5 JS-lib requirements for the clone
- **framer-motion (or `motion`)** is needed for: `whileInView` reveals, AnimatePresence tab swaps, the `layoutId` tab indicator, the bubble spring, `layout` row insertion in the CostHero table, SVG `pathLength` draw, mascot keyframe loops, and the `useSpring` eye tracking.
- **Radix UI** (or equivalent headless): NavigationMenu (mega menu), Dialog (mobile drawer, video modal), Tabs, Collapsible.
- **floating-ui** (or Radix Popover/HoverCard): the "+N more" tab dropdown and the UseCases hover popover (open delay 450ms).
- Everything else is CSS transitions.

---

## 5. Responsive summary
| Breakpoint | Changes |
|---|---|
| >=1800 (`wide`) | CostHero table columns tighten to `[1fr_150px_140px_60px_50px]` with `gap-3`, and a spinner replaces "Running…". Not measured visually. |
| >=1440 (`desktop`) | Gutter rails appear (224 / 290 min-width) and the center column becomes 926 at 1440. Section-default padding becomes `px-14`. |
| 1280–1439 | No rails. Center column is full-width (max 1300). Content padding 80px, giving 1120 content width. Logo wall is 6 columns. |
| >=1100 (`header`) | Desktop nav and mega menus. Below this: hamburger plus a 320px right drawer. |
| >=1024 (`lg`) | Two-column hero / CostHero header (7/5 of 12); expanding horizontal tiles; case-study accordion; 4-col use cases; 4-col Autonomy; Testimonials 3/4 split with tabs; footer row layout (brand plus 4-col links). |
| 768–1023 (`md`) | Single-column hero (text, then mascot, then bubble). Tiles stack. Every case study is expanded. Use cases are 2 columns; Autonomy 2x2; Enterprise columns 3; integrations 10 columns; press 4 columns; LearnMore 2 columns; footer links 3 columns. Testimonials become a stacked list. Content padding 48px. |
| 640–767 (`sm`) | Same as md for most sections, but integrations are 6 columns and use cases 2 columns. |
| <640 (375 measured) | Content padding 24px. H2 30px; hero subtitle 20px; Enterprise lead 16px. Logo wall 3 columns with smaller logos (h-16, max-w 80) and links hidden. Case-study header and stats stack. CostHero KPI 2x2 and table 2 columns. Integrations 5 columns with 28px icons. Press 2x2 (cells 121px). Footer links 2 columns. The use-case CTA bar stacks. |

---

## 6. Media placeholder manifest (no original assets)
| Section | Slot | Size (1440) | Ratio | Fit | Radius | Overlay / shadow |
|---|---|---|---|---|---|---|
| Header, Footer | Wordmark logo | about 140x24 | 157:27 | — | 0 | — |
| Hero | Mascot SVG | 172x172 (140 mobile) | 1:1 | — | — | halo radial, see 1.2 |
| Logo wall | 12 grayscale logos | h 24 (16 mobile), w <=140 (80) | 3–6.5:1 | contain | 0 | `grayscale(1)` |
| HowWeWork | avatars | 28px, 18px | 1:1 | — | full | inside 44px glass bubble |
| Case studies | square logo | 40x40 | 1:1 | contain | 0 | opacity .6 collapsed |
| Case studies | story image | content-width x 400 (300 <md) | 16:9 source | cover | 0 | indigo/30 to-br + 56px play |
| UseCases | tool icons | 11–13px | 1:1 | — | — | inside 17px white circle |
| CostHero | agent avatar / model icon / tool icon | 20 (rounded-md) / 16 / 10 in 18px circle | 1:1 | contain | 6px / 0 / full | — |
| Integrations | 30 app icons | 32x32 (28 mobile) | 1:1 | contain | 0 | — |
| Testimonials | 2 tab logos | h 32, w <=140 | — | contain | 0 | grayscale, inactive .5 |
| Testimonials | story image | 529x420 (lg), 704x280 (768), 327x200 (375) | 16:9 source | cover | 0 | indigo/40 to-br + 64px play |
| FeaturedIn | 4 press logos | h 32 (24 mobile), w <=140 | — | contain | 0 | grayscale, opacity .6 |
| FeaturedIn | 4 analyst logos | h 28 (24), w <=120 | — | contain | 0 | grayscale, opacity .7 |
| FeaturedIn | rating stars | 80x16 | 5:1 | — | — | — |
| LearnMore | report cover | 296x210 | 1.41:1 | — | 0 | shadow `glass` |
| LearnMore | 3 people avatars | 64x64 | 1:1 (3:4 source) | cover | full | 3px white border, shadow `glass`, overlap |
| LearnMore | partner logos | h 16 | — | — | — | — |
| Footer | 4 social icons | 20x20 | 1:1 | — | — | opacity .6 |
| Footer | 4 cert badges | 56x56 | 1:1 | — | — | — |

What could not be measured directly:
- The 1800px `wide` layout was not loaded. Its values come from class names only.
- Mega menus other than the first ("Solutions") were not opened. Their variants are described from source.
- The UseCases hover popover scene content was not rendered during measurement.
