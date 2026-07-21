# Portfolio

One-page personal site (Astro + TypeScript) for GitHub Pages.

- Live site: `https://jonatasnona.github.io/`
- Locales: PT (default), EN, ES
- Versioned layouts (local lab): see [docs/layout-versions.md](docs/layout-versions.md)

Agent-assisted workflow docs (`AGENTS.md`, `.cursor/rules/`) are intentional — they encode review and design standards for this repo.

## Development

Requires Node **22** (see `.nvmrc`).

```sh
npm install
npm run dev
```

Open `http://localhost:4321/`.

```sh
npm run check
npm run build
npm run preview
```

In `npm run dev`, use the bottom-right DevTools panel to switch typography, color palette, and layout previews (`/v/<id>/`). Preview routes are **not** included in production builds.

## Quick structure

| Path | Purpose |
|------|---------|
| `src/content/` | Copy for pt / en / es |
| `src/versions/` | Layout versions (`v1`–`v15`) |
| `src/site.config.ts` | `activeVersion`, contacts, assets |
| `src/components/` | Shared UI (`ContactLinks`, `DevTools`, …) |
| `docs/` | Architecture & process |
| `AGENTS.md` | Guidance for AI agents |

## License

MIT — see [LICENSE](LICENSE).

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml` (also available as manual `workflow_dispatch`).

Details: [docs/github-pages.md](docs/github-pages.md).
