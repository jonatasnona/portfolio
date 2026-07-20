# Layout versions

## Current layouts

| ID | Name | Idea |
|----|------|------|
| `v1` | Classic | Sticky header, split hero, timeline |
| `v2` | Split | Brand panel + content column |
| `v3` | Ledger | Resume / technical document look |
| `v4` | Cover | Full-viewport hero, then scroll content |
| `v5` | Stack | Stacked experience cards |
| `v6` | Wire | Blueprint / technical grid |
| `v7` | Poster | Vertical full-height section panels |
| `v8` | Accordion | Expandable experience rows |
| `v9` | Masthead | Newspaper masthead + columns |
| `v10` | Twin | Full-bleed 50/50 section splits |
| `v11` | Mosaic | Variable-height masonry blocks |
| `v12` | Pulse | Year/company scrubber + detail below |
| `v13` | Folio | Magazine spreads (odd/even compositions) |
| `v14` | Ingress | Letter / long lead, then structured sections |
| `v15` | Lattice | Dense multi-column broadsheet |

## Dev: live switching

In `npm run dev`, bottom-right panel:

- **Typography** — instant CSS (`data-fonts`)
- **Palette** — instant CSS (`data-palette`)
- **Layout** — navigates to `/v/<id>/`

Production: `activeVersion` in `src/site.config.ts`.

## Design

Composition, contact, and visual hierarchy changes: follow `docs/design.md` (**UX Design Engineer** role).
Contact icons live in the header; panel layouts may keep a light `#fecho` closing — not a generic contact block cloned everywhere.
