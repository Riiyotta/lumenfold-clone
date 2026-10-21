# Changelog

## 1.0.0 — 2026-10-21 (initial build, Situation A: from scratch)

- Built the repo bottom-up: tokens → primitives (14) → components (14) → sections (169) → templates (53) → routes (296) → compatibility graph (22 rules) → Draft-07 schema → example → semantic validator → adversarial suite → manifest, allowlist and docs.
- Mined the existing groundwork: `ia.json`, `CLONE_SPEC.md`, `specs/PAGES_*.md`, `tailwind.config.js`, `src/index.css` and `src/`. Before building on that groundwork, a sample of it was spot-checked against source:
  - The template order for home, enterprise and partners matches `src/pages/*`.
  - The 120 integration, 56 use-case and 8 academy-lesson slugs were re-enumerated from `src/content/*.js`.
- **Correction to ia.json:** `template.specialist-agents` has no `shell.footer`, because `src/App.jsx` NO_FOOTER omits it. The ia.json note that says the clone mounts a footer on every route is stale.
- **Measured corrections from the Playwright animation audit** supersede CLONE_SPEC for these:
  - mega-menu: no fade; 200ms open delay and 150ms close delay
  - CostHero: entrance runs on mount
  - Autonomy: tabs do not change the level; purple marks L3/L4
  - UseCases: one IntersectionObserver at 0.15, 0.5s EASE, (i%4)·0.06s stagger
  - primary button: ~300ms gradient-stop tween
- **Parallel copies:** the 13 sections with parallel copies are modelled as one contract each. Nine have variants that genuinely differ. Four are identical copies with a single `default` variant.
- **Asset roles:** a closed `assetRole` enum of 13 roles, built from real JSX usage, with a pinned `generationPolicy` per role. Pins are enforced in three places: the schema (`if/then const`), the validator (`ASSET_POLICY_PINNED`), and `verify_all` (an independent `PINNED` table). A real-brand denylist comes from the saved original page's asset filenames.
- **verify_all.py** runs ten checks: self-containment, schema, allowlist parity, manifest/README counts, citation validity (range plus quote-in-range), routes↔templates, graph↔validator rule-id parity, asset roles (pinned), tokens and contracts. The parity, citation and count checks were each proven to fail on injected drift in a scratch copy.
