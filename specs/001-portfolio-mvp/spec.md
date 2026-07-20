# Spec 001 — Portfolio MVP

## Problem

Jonatas Pedraza needs a public site to present himself to hiring managers and people interested in his services, with resume and career history, in multiple languages, published on GitHub Pages.

## Desired outcome

Static one-page with Hero, About, Experience, Skills, and contact actions; i18n pt/en/es; Mandril logo as an asset; layout-version structure so experiments do not break production.

## Scope

### In

- Astro + TypeScript + GitHub Pages deploy
- Content derived from the PT resume
- Language switcher and hreflang
- Resume PDF download
- `activeVersion` + `/v/<version>/` routes
- Docs and `AGENTS.md` in English

### Out

- Blog / CMS
- Dedicated Projects section
- Automatic preview per PR
- Custom domain

## Acceptance criteria

1. Visitor on `/portfolio/` sees the PT one-page with the core sections
2. `/en/` and `/es/` show the same layout with translated copy
3. Mandril logo appears in header/hero/footer as designed per layout
4. Resume CTA downloads the PDF
5. `/v/v1/` renders a preview with banner; production uses `activeVersion`
6. `npm run check` and `npm run build` pass
7. Specs and process docs are in English

## Assumptions

- Repo published as project site `jonatasnona.github.io/portfolio`
- Single PT PDF in the MVP for all locales
- One layout version (`v1`) at launch
