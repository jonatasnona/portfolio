# Spec 002 — GitHub contribution graph (feasibility)

Status: **implementing — heatmap-led on activeVersion (v6) only**

## Problem

Hiring managers often open a candidate’s GitHub. Embedding a contribution heatmap (“green squares” / activity calendar) on the portfolio could reinforce consistency and craft **without** sending them away from the site — if it stays accurate, accessible, and on-brand.

This spec evaluates **whether and how** to add that graph to this Astro + GitHub Pages portfolio.

## Desired outcome (if we proceed)

A contribution heatmap for `jonatasnona` that:

1. Looks intentional under the active visual system (Outfit + Ocean / tokens), not a pasted GitHub screenshot
2. Stays reasonably fresh via **daily GitHub Actions cron + `workflow_dispatch`**
3. Works on a **static** Pages site (no server runtime)
4. Never exposes a GitHub token to the browser
5. Meets a11y basics (not color-only meaning; usable on mobile)
6. Fits UX Design Engineer rules (one job per section; no hero clutter)

## Context constraints

| Constraint | Implication |
|------------|-------------|
| Astro SSG → GitHub Pages | No Node server at request time; no secrets in client JS |
| Auto-deploy on `push` to `main` | Build can fetch data **or** consume a prebuilt data file |
| Production layout = `v6` Wire (+ others in DEV lab) | UI must integrate per layout or as a shared section consumed by active layout |
| Public repo | Token only via Actions secrets / local `.env` (gitignored) |
| Brand tokens | Prefer mapping contribution levels to CSS variables, not GitHub-green defaults |

## Options (feasibility)

### A — Fetch GraphQL at build time

- Build step calls `https://api.github.com/graphql` → `user.contributionsCollection.contributionCalendar`
- Needs `GITHUB_TOKEN` / PAT with `read:user` as Actions secret (and local `.env` for `npm run build`)
- Data baked into HTML or a generated JSON in `dist/`

| Pros | Cons |
|------|------|
| Simple mental model | Stale until next deploy |
| No third-party host | Build fails or degrades if API/token broken |
| Full control of markup | Token required in CI |

**Verdict:** Fallback / local helper only — **not** the primary freshness model (stakeholder chose cron + `workflow_dispatch`).

### B — Scheduled Action materializes JSON (recommended for Pages) — **chosen freshness model**

- **Triggers (locked):**
  - `schedule` cron — **`0 18 * * *`** (daily at **18:00 UTC**)
  - `workflow_dispatch` — manual “refresh now” from Actions UI
- Runs on **GitHub-hosted runners** (`ubuntu-latest`) in this repo — not a personal machine or always-on server
- Example shape:

```yaml
# .github/workflows/github-contributions.yml (spike / future)
on:
  schedule:
    - cron: '0 18 * * *' # daily 18:00 UTC
  workflow_dispatch:

jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
      - run: node scripts/fetch-github-contributions.mjs
        env:
          GH_CONTRIBUTIONS_GRAPH_TOKEN: ${{ secrets.GH_CONTRIBUTIONS_GRAPH_TOKEN }}
      # commit public/data/github-contributions.json only if changed → push → Pages deploy
```

- Writes `public/data/github-contributions.json`
- Site reads static JSON at build or as a public asset
- After JSON update: commit **only if** contents changed → push to `main` triggers existing Pages deploy

| Pros | Cons |
|------|------|
| Fresh without waiting for content deploys | Extra workflow + possible commit noise (mitigate: commit only on change) |
| Token never on client | Scheduler may delay slightly on idle repos |
| Manual refresh via `workflow_dispatch` | Need clear failure/fallback UX |
| Matches common static-portfolio practice | |
**Verdict:** Best fit for this stack. Freshness = cron + `workflow_dispatch` (stakeholder decision).

### C — Third-party image / embed (`ghchart`, streak stats hosts, etc.)

- `<img src="https://…/jonatasnona">` or iframe

| Pros | Cons |
|------|------|
| Fast to try | Dependency on external uptime, caching, styling |
| No GraphQL work | Harder a11y; often wrong brand colors |
| | Looks less “owned”; weaker hiring signal |

**Verdict:** Acceptable for a **spike screenshot**, not preferred for production.

### D — Scrape profile HTML

| Pros | Cons |
|------|------|
| No official token | Fragile, against ToS risk, breaks often |

**Verdict:** Out.

## API notes (for spike)

Official path is GraphQL (REST does not expose the calendar):

```graphql
query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}
```

- Auth: `Authorization: Bearer <token>`
- **Token (locked for safety margin):** dedicated repo secret **`GH_CONTRIBUTIONS_GRAPH_TOKEN`** — prefer **fine-grained PAT** (Account permissions: read access to profile / public account information only; **no** repo contents, **no** org admin). Classic PAT with **`read:user` only** is acceptable fallback
- **Do not** rely on default Actions `GITHUB_TOKEN` as primary: it is repo-scoped / bot-identity, not a stable contract for user GraphQL calendars, and fails the “same token works in local spike + Actions” path. Spike may smoke-test `GITHUB_TOKEN` for curiosity; production path uses the dedicated secret
- Query only `contributionCalendar` fields (levels/counts/dates). Never request or render `commitContributionsByRepository` (or similar) in a way that could surface private repo/org names
- Token never in client / `PUBLIC_*` env
## UX / design (validation)

- **Placement (locked):** mid-page on **`activeVersion` (v6 Wire)** — after About / before Experience. Not hero; not footer
- **Layouts (locked for now):** shared `ContributionGraph` mounted **only on v6**. Other versions remain without the section until a later curated pass
- **Design (locked):** **heatmap-led** (`design="heatmap"`) — grid as focus; total as caption; Ocean tokens via `--contrib-cell`
- **One section job:** title + heatmap + caption with total + profile link
- **Private data:** never reveal private repo/org names; no private-contribution caveat in UI (removed by stakeholder)
- **Mobile:** last **6 months** only (locked). Desktop: full ~365-day grid. Prefer truncating weeks over horizontal scroll of the full year
- **A11y:** summary text with `totalContributions`; cells need accessible names or a data table alternative; do not rely on color alone (level + count in `title`/`aria-label`)
- **Theming:** map `NONE | FIRST_QUARTILE | … | FOURTH_QUARTILE` (or count buckets) to Ocean token steps, not default GitHub green; layout-local wrappers may adapt spacing/type to each composition

## Risks

| Risk | Mitigation |
|------|------------|
| Secret leak | Never `PUBLIC_*` token; only `GH_CONTRIBUTIONS_GRAPH_TOKEN` Actions secret / local `.env`; minimal scopes; rotate if exposed |
| Empty / private year looks “inactive” | Caveat copy (locked); totals from public calendar only; never list private repos/orgs |
| Build flake | Soft-fail: ship last known JSON or hide section with console/CI warning |
| Commit spam from cron | Commit only on data change; or write artifact without commit + rebuild |
| Amateur look | Custom CSS grid/SVG; avoid iframe widgets |
| Over-signaling vanity metrics | Prominent but mid-page; never hero; keep copy short |

## Recommendation (pending spike)

1. Run a **spike** with option **B** (script + GraphQL → JSON) + workflow `schedule` **and** `workflow_dispatch`, and a minimal Astro component styled with Ocean tokens  
2. Keep option **A** only as emergency fallback (e.g. one-off build without cron), not the primary freshness model  
3. Reject **C/D** for production unless spike proves branding/a11y acceptable (unlikely)

Do **not** roll out to all layouts until secret `GH_CONTRIBUTIONS_GRAPH_TOKEN` is configured and a manual workflow run succeeds. Spike artifacts live in-repo; see `SPIKE.md`.

## Decisions

| Topic | Decision |
|-------|----------|
| Freshness | Daily **cron** on GitHub Actions + **`workflow_dispatch`** for manual runs |
| Where cron runs | This repo’s Actions (`ubuntu-latest`); secret for GraphQL; no always-on host |
| Window | **Desktop:** full ~365-day calendar. **Mobile:** last **6 months** only (same JSON; CSS/JS or Astro slices weeks for narrow viewports) |
| Component + layouts | Shared **`ContributionGraph`**; **production = `activeVersion` only (`v6`)** for now. Other layouts later if needed |
| Design | **heatmap-led** (grid as focus; total as caption). Stat-led deferred |
| Placement | **Evident mid-page** on v6 (after About / before Experience). Not hero; not footer dump |
| Private contributions | **No caveat in UI.** Never list, link, or otherwise surface private repos or private orgs |
| Locales | **Shared JSON** for all locales (`pt` / `en` / `es`); only section strings (title, body, caveat) are translated |
| Token | Dedicated **`GH_CONTRIBUTIONS_GRAPH_TOKEN`** (fine-grained read profile / classic `read:user`). Not default `GITHUB_TOKEN` |
| Cron | Daily **`0 18 * * *`** (**18:00 UTC**) + `workflow_dispatch` |

## Open questions (validate with stakeholder)

1. ~~Freshness: daily cron vs deploy-only?~~ → **Decided:** cron + `workflow_dispatch`
2. ~~Window: full ~365 vs last 6 months on mobile?~~ → **Decided:** full on desktop; last 6 months on mobile
3. ~~Section placement / which layouts?~~ → **Revised:** heatmap on **`activeVersion` (v6) only**; other layouts out of scope for now
4. ~~Private-contribution caveat?~~ → **Revised:** no caveat in UI; still never expose private repos/orgs
5. ~~Locales / shared data?~~ → **Decided:** one JSON; translated copy only
6. ~~Token: `GITHUB_TOKEN` vs PAT?~~ → **Decided:** dedicated `GH_CONTRIBUTIONS_GRAPH_TOKEN` (minimal read); safety over Actions default token
7. ~~Cron hour?~~ → **Decided:** `0 18 * * *` (18:00 UTC)
8. ~~Visual design?~~ → **Decided:** **heatmap-led** (A/B vs stat-led)

**Stakeholder review of open questions: complete.** Next gate = spike go/no-go.
## Spike acceptance criteria

1. Script (Node 22) fetches calendar for `jonatasnona` and writes typed JSON locally via **`GH_CONTRIBUTIONS_GRAPH_TOKEN`**  
2. Document fine-grained vs classic scopes that work; confirm production uses dedicated secret (not default `GITHUB_TOKEN`)  
3. Draft workflow YAML with `on.schedule: '0 18 * * *'` (18:00 UTC) + `on.workflow_dispatch`; no need to enable in production until go  
4. Shared Astro `ContributionGraph` from JSON; Ocean CSS variables; demo in at least one layout in an early/evident mid-page slot  
5. Inventory: which of v1–v15 can host the section; note any that cannot  
6. Mobile strategy demoed: last 6 months on narrow viewports; full calendar on desktop (same JSON source)  
7. Keyboard/screen-reader path documented (summary + per-cell or equivalent)  
8. Failure mode demoed (missing JSON → graceful hide or placeholder, build still succeeds)  
9. Written go/no-go with effort estimate (S/M/L) for multi-layout rollout — primary path remains B (cron + dispatch)

## Out of scope (this spec)

- Streak counters, language pies, or other GitHub stats cards  
- Listing or linking private repositories or private organizations  
- Replacing header GitHub icon  
- Changing `activeVersion`  
- Third-party paid analytics  
- Pixel-perfect restyle of every layout’s full page (only mount + light local adaptation of the shared graph)
## Assumptions

- Username remains `jonatasnona` (from `siteConfig.github`)  
- Contribution graph ships across feasible layouts once go; still gated on spike + remaining questions  
- Spec language: English (repo convention)

## Related

- Design role: `docs/design.md`, `.cursor/rules/portfolio-ux-frontend.mdc`  
- Deploy: `docs/github-pages.md`  
- Site config: `src/site.config.ts`
