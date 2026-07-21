# AGENTS.md

Operational guide for AI agents on this portfolio. Read this before long docs.

## Project vision

Static one-page professional site for **Jonatas Pedraza**, published on GitHub Pages.

- Stack: Astro + TypeScript
- Site locales: `pt` (default), `en`, `es`
- MVP sections: Hero, About, Experience, Skills; contact via header icons (+ light closing panel on Poster / Twin / Folio)
- Personal brand in copy; Mandril Solutions logo in `public/brand/`
- Versioned layouts in `src/versions/` — production serves only `siteConfig.activeVersion`

## Artifact languages

- Specs, plans, tasks, checklists, issues, and process docs: **English**
- Code, route IDs, and component names: English (stack convention)
- Site copy: matching locale in `src/content/`

## Docs map

- `docs/architecture.md` — structure, layout versions, i18n, deploy
- `docs/design.md` — UX Design Engineer role, visual system, contact
- `docs/development-workflow.md` — Issue → spec (when needed) → PR
- `docs/github-pages.md` — base path, Actions, URLs
- `docs/layout-versions.md` — create / promote / revert layout versions
- `specs/` — Spec Kit (artifacts in English)
  - `specs/001-portfolio-mvp/` — MVP
  - `specs/002-github-contribution-graph/` — contribution heatmap feasibility
  - `specs/003-locale-resume-pdf/` — build-time locale resume PDFs

## Selective reading

- Copy changes: `src/content/{pt,en,es}.ts`
- Design / UI / contact / typography / palette: `docs/design.md`, `.cursor/rules/portfolio-ux-frontend.mdc`
- New layout version: `docs/layout-versions.md`, then `src/versions/<id>/`
- i18n / routes: `astro.config.mjs`, `src/pages/`, `src/lib/paths.ts`
- Pages deploy: `docs/github-pages.md`, `.github/workflows/deploy.yml`
- Layout preview routes (`/v/<id>/`) are **DEV-only** — not shipped in production builds
- Visual tokens: `src/styles/tokens.css`, `src/styles/palettes.css`, `src/styles/typography.css`

## Commands

```sh
npm run dev
npm run build
npm run generate:resumes
npm run preview
npm run check
```

Local dev with base path: open `http://localhost:4321/portfolio/`.

## Non-negotiables

- Do not edit the active version in place for large experiments — create a new `versions/vN`
- Promote a layout only by changing `activeVersion` in `src/site.config.ts`
- Versions must not import each other
- Content lives in `src/content/`; layouts only consume it
- Run `npm run check` and `npm run build` after relevant changes
- Specs and process docs stay in English
- Do not commit `dist/`, secret-bearing `.env`, or credentials
- Do not include `Co-authored-by: Cursor` (or AI attribution trailers) in commits — see `.cursor/rules/no-cursor-coauthor.mdc`

## Perspectives

- Product / copy changes: product manager — hiring-manager value, clarity, exclusions
- Design / layout / contact / typography / palette: **UX Design Engineer** — see `docs/design.md` and `.cursor/rules/portfolio-ux-frontend.mdc`
- New layout version: UX Design Engineer — one first-viewport composition, brand first, per-version adaptation
- i18n / routing / deploy: software architect — stable contracts, base path, hreflang
- Implementation: engineer — smallest cohesive change, proportional checks
