# Architecture

## Goal

Static one-page portfolio to present Jonatas Pedraza to hiring managers and people interested in his work, with i18n and experimentable layouts that do not break production.

## Layers

1. **Content** (`src/content/`) — typed copy per locale
2. **Configuration** (`src/site.config.ts`) — active version, contacts, asset paths
3. **Presentation** (`src/versions/<id>/`) — layout + sections isolated per version
4. **Routes** (`src/pages/`) — production and preview

## Routes

| URL | Role |
|-----|------|
| `/portfolio/` | Production PT (`activeVersion`) |
| `/portfolio/en/` | Production EN |
| `/portfolio/es/` | Production ES |
| `/portfolio/v/<version>/` | Version preview (PT) — **DEV builds only** |
| `/portfolio/v/<version>/en/` | Version preview (EN) — **DEV builds only** |
| `/portfolio/v/<version>/es/` | Version preview (ES) — **DEV builds only** |

## Render flow

```text
page → loadVersionLayout(active|param) → Layout.astro + sections
     → getContent(locale)
```

Layouts load via `import.meta.glob` in `src/versions/registry.ts`.

## Assets

- Mandril logo (transparent PNG, Ubuntu poly-art): `public/brand/mandril-logo.png`
- Resume PDFs (generated at build): `public/resume/resume_jonatas_pedraza_{pt,en,es}.pdf`
- Printable HTML source: `/portfolio/resume/{pt,en,es}/` → Playwright → PDF (`scripts/generate-resumes.mjs`)
- Public paths go through `src/lib/paths.ts` (`withBase`) because of `base: '/portfolio'`
- `siteConfig.resumePath` is per-locale; `ContactLinks` receives `locale`
## Design / UI

Interface role and guidelines: `docs/design.md`.  
Cursor rule (UX Design Engineer): `.cursor/rules/portfolio-ux-frontend.mdc`.

Tokens: `src/styles/tokens.css` + `palettes.css` + `typography.css`.

## Deploy

SSG build (`astro build`) → artifact → GitHub Pages (`actions/deploy-pages`). Details in `docs/github-pages.md`.
