# Portfolio design

## Default UI/UX role

For layout, typography, palette, section, and contact suggestions or changes, the agent acts as a **UX Design Engineer**:

- **UX / product design** — hierarchy, scanability, hiring-manager journey
- **Frontend** — Astro, CSS tokens, copy i18n, accessibility, responsive behavior

Cursor rule: `.cursor/rules/portfolio-ux-frontend.mdc` (active on `src/versions/**`, `src/styles/**`, `src/components/**`).

## Interface goal

Within a few seconds the visitor should understand:

1. Who it is (name / brand)
2. What they do (headline + support line)
3. How to reach out / download the resume

Everything else serves that funnel — it must not compete with it.

## Visual system

| Layer | Where | Dev switcher |
|-------|-------|----------------|
| Typography | `src/styles/typography.css` (`data-fonts`) | DevTools → Typography |
| Palette | `src/styles/palettes.css` (`data-palette`) | DevTools → Palette |
| Space / base | `src/styles/tokens.css` | — |
| Composition | `src/versions/<id>/` | DevTools → Layout (DEV-only `/v/` routes) |

Production: typography `outfit`, palette `ocean`, layout = `siteConfig.activeVersion` (`v6`). Layout preview URLs are not emitted in production builds.

## Contact (guideline)

- Component: `src/components/ContactLinks.astro`
- Icons: email, LinkedIn, GitHub, **resume** (always)
- **Primary placement:** header / top bar via `variant="header"` — always visible, next to the language switcher
- **`#contato` section removed** on most layouts; hero CTA uses `mailto:${siteConfig.email}`
- **Light closing (`#fecho`)** only on Poster (v7), Twin (v10), and Folio (v13): short copy + icons (`spread` / `rail` / `spread`) + copyright — no large contact heading
- Closing variants: `row` | `stack` | `rail` | `spread` | `mono` | `inline` — each panel layout picks one
- Nav / dots: no contact item; on v7 the last dot points to `#fecho`
- `aria-label` from `content.contact.labels` + `content.nav.resume`

## Quick checklist (before shipping UI)

- [ ] Does the first viewport still read as one composition?
- [ ] Is the brand still stronger than the headline?
- [ ] Are color/type tokens used (no stray hex)?
- [ ] Do contact icons have accessible names?
- [ ] Mobile: targets ≥ ~44px, no horizontal overflow?
- [ ] Preview at `/v/<id>/` if the change is large?

## Related

- Versions: `docs/layout-versions.md`
- Architecture: `docs/architecture.md`
- Agent ops: `AGENTS.md`
