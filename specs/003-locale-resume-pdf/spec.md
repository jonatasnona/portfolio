# Spec 003 — Locale resume PDFs (build-time)

Status: **implemented**

## Problem

The CV download pointed at a single static PT PDF. Hiring managers on EN/ES pages should get a complete curriculum matching the page language, without maintaining hand-edited PDFs.

## Desired outcome

1. One printable A4 resume page per locale, driven by `src/content/`
2. Build generates `public/resume/resume_jonatas_pedraza_{pt,en,es}.pdf`
3. Header CV icon downloads the PDF for the current locale
4. Visual resume template (brand tokens), not a Wire layout screenshot

## Approach

- Route: `/resume/{locale}/`
- Playwright Chromium prints each page to PDF after `astro build`
- CI installs Chromium before `npm run build`

## Acceptance

- [x] PT / EN / ES resume HTML pages
- [x] `npm run generate:resumes` (via `npm run build`) writes three PDFs
- [x] `ContactLinks` + hero CTAs use `siteConfig.resumePath[locale]`
- [x] Deploy workflow installs Playwright Chromium

## Out of scope

- Heatmap in PDF
- Per-layout PDF variants
- Client-side PDF generation
