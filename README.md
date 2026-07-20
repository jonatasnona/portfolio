# Portfolio — Jonatas Pedraza

One-page personal site (Astro + TypeScript) for GitHub Pages.

- Production: `https://jonatasnona.github.io/portfolio/`
- Locales: PT (default), EN, ES
- Versioned layouts: see [docs/layout-versions.md](docs/layout-versions.md)

## Development

```sh
npm install
npm run dev
```

Open `http://localhost:4321/portfolio/`.

```sh
npm run check
npm run build
npm run preview
```

In `npm run dev`, use the bottom-right DevTools panel to switch typography, color palette, and layout previews (`/v/<id>/`).

## Quick structure

| Path | Purpose |
|------|---------|
| `src/content/` | Copy for pt / en / es |
| `src/versions/` | Layout versions (`v1`–`v15`) |
| `src/site.config.ts` | `activeVersion`, contacts, assets |
| `src/components/` | Shared UI (`ContactLinks`, `DevTools`, …) |
| `docs/` | Architecture & process |
| `AGENTS.md` | Guidance for AI agents |

## Deploy

The GitHub Actions workflow is **manual only** (`workflow_dispatch`) for now — pushes to `main` do not publish.

Actions → **Deploy GitHub Pages** → Run workflow.

Details: [docs/github-pages.md](docs/github-pages.md).
