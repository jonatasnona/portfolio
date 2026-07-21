# GitHub Pages

## Astro config

- `site`: `https://jonatasnona.github.io`
- `base`: `/` (user site for the `jonatasnona.github.io` repo)
- `trailingSlash`: `always`

## Workflow

File: `.github/workflows/deploy.yml`

Triggers:

- `push` to `main` (auto-deploy)
- `workflow_dispatch` (manual)

Job steps:

1. Checkout
2. Setup Node
3. `npm ci`
4. `npm run check` + `npm run build`
5. Upload `dist/` as a Pages artifact
6. Deploy with `actions/deploy-pages`

On GitHub: Settings → Pages → Source = **GitHub Actions**.

## Local URLs

```sh
npm run dev
# http://localhost:4321/
```

```sh
npm run build && npm run preview
```

## Post-deploy checklist

- [ ] PT home loads with assets (logo + PDF)
- [ ] `/en/` and `/es/` work
- [ ] Language switcher changes locale
- [ ] `/v/v1/` shows the preview banner
- [ ] Menu anchors work with the base path
