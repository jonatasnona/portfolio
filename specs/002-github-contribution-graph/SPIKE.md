# Spike 002 — GitHub contribution graph

Date: 2026-07-21  
Status: **complete — recommend GO (effort M)**

## What was built

| Piece | Path |
|-------|------|
| Fetch script | `scripts/fetch-github-contributions.mjs` |
| npm script | `npm run fetch:contributions` |
| Data | `public/data/github-contributions.json` (shared by all locales) |
| Loader | `src/lib/github-contributions.ts` (soft-fail → hide section) |
| UI | `src/components/ContributionGraph.astro` |
| Wired layout | `src/versions/v6/Layout.astro` (after About) |
| Copy | `src/content/{pt,en,es}.ts` → `contributions.*` |
| Workflow | `.github/workflows/github-contributions.yml` (`0 18 * * *` UTC + `workflow_dispatch`) |
| Local secret template | `.env.example` |

## Token notes

- Verified GraphQL `contributionCalendar` works with a user-scoped token (`gh auth token` for local spike).
- Production must use repo secret **`GH_CONTRIBUTIONS_GRAPH_TOKEN`**:
  - Prefer **fine-grained**: Account permissions → Profile (read) only
  - Or classic **`read:user` only**
- Do **not** rely on default Actions `GITHUB_TOKEN` as primary.
- Query only calendar fields — never per-repo contribution lists (private repo/org names).

## Acceptance criteria

1. Script writes typed JSON — **pass**
2. Token scopes documented — **pass** (above)
3. Workflow `schedule` + `workflow_dispatch` — **pass** (needs secret in repo to run green)
4. Component + Ocean tokens via CSS variables; mid-page on v6 — **pass**
5. Layout inventory — **pass** (below)
6. Mobile last ~26 weeks / desktop full year — **pass** (CSS breakpoint `48rem`)
7. A11y: summary + caveat for SR; visual grid `aria-hidden` + cell `title`; legend — **pass** (good enough for v1; optional later: data table)
8. Missing/invalid JSON → section omitted, build OK — **pass** (`import.meta.glob` soft-fail)
9. Go/no-go — **GO**, effort **M**

## Layout inventory

All **v1–v15** can host the shared component after About / before Experience (or equivalent early mid-page slot).

| Version | Feasible? | Notes |
|---------|-----------|--------|
| v1 Classic | yes | Insert between About and Experience sections |
| v2 Split | yes | Content column after `#sobre` |
| v3 Ledger | yes | After about block |
| v4 Cover | yes | After `#sobre` (below full-viewport hero — good) |
| v5 Stack | yes | After `#sobre` |
| v6 Wire | **done (spike)** | After About |
| v7 Poster | yes | New panel between about/experience; keep one-job panel |
| v8 Accordion | yes | After `#sobre` |
| v9 Masthead | yes | After lead / before columns |
| v10 Twin | yes | Own `split` panel; avoid crowding hero twin |
| v11 Mosaic | yes | New tile after about |
| v12 Pulse | yes | After `#sobre` |
| v13 Folio | yes | Own spread after about |
| v14 Ingress | yes | After lead about |
| v15 Lattice | yes | Cell after about |

None blocked. Rollout cost is mostly mechanical mount + light local spacing (hence **M**, not S).

## Go / no-go

**Recommend GO** for production rollout.

### Done after spike

- Design locked: **heatmap-led** (stat-led deferred)
- Mounted on **`activeVersion` only (`v6` Wire)** — not other layout versions for now
- Secret `GH_CONTRIBUTIONS_GRAPH_TOKEN` configured in repo

### Remaining before live cron

1. Commit + push (workflow file is local until then)
2. Confirm workflow via `workflow_dispatch`
3. Optional later: curated rollout to other layouts; overflow polish; richer a11y

### Effort

- Spike + redesign A/B: **S–M** (done)
- v6-only ship: **S** (in progress)
- Push + verify cron: **S**
