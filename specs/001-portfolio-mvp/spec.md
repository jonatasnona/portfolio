# Spec 001 — Portfolio MVP

## Problem

Jonatas Pedraza needs a public site to present himself to hiring managers and people interested in his services, with resume and career history, in multiple languages, published on GitHub Pages.

## Desired outcome

Static one-page with Hero, About, Experience, and Skills; contact via persistent header icons; i18n pt/en/es; Mandril logo as an asset; layout-version lab for local experiments without shipping every variant to production.

## Scope

### In

- Astro + TypeScript + GitHub Pages deploy
- Content derived from the PT resume
- Language switcher and hreflang
- Resume PDF download
- Header contact icons (email, LinkedIn, GitHub, resume)
- `activeVersion` for production layout
- Layout preview routes (`/v/<version>/`) **DEV-only**
- Docs and `AGENTS.md` in English
- MIT license

### Out

- Blog / CMS
- Dedicated Projects section
- Automatic preview per PR
- Public layout-preview URLs in production
- Custom domain (optional later)

## Acceptance criteria

1. Visitor on `/portfolio/` sees the PT one-page with Hero, About, Experience, Skills
2. `/en/` and `/es/` show the same layout with translated copy
3. Mandril logo appears in header/hero/footer as designed per layout
4. Header icons reach email, LinkedIn, GitHub, and resume download
5. Production build does **not** emit `/v/<version>/` routes; local `npm run dev` still previews them
6. Production uses `siteConfig.activeVersion`
7. `npm run check` and `npm run build` pass
8. Specs and process docs are in English

## Assumptions

- Repo published as project site `jonatasnona.github.io/portfolio`
- Single PT PDF in the MVP for all locales
- Production ships layout `v6` (Wire) with Outfit + Ocean; other versions stay a local lab
