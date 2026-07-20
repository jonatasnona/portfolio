# GitHub Pages

## Configuração Astro

- `site`: `https://jonatasnona.github.io`
- `base`: `/portfolio` (project site do repo `portfolio`)
- `trailingSlash`: `always`

Se o site virar user site (`jonatasnona.github.io`), mudar `base` para `/` e ajustar workflow/paths.

## Workflow

Arquivo: `.github/workflows/deploy.yml`

**Deploy está só em `workflow_dispatch`** (manual) até a revisão fechar. Push em `main` **não** publica.

Para publicar: Actions → “Deploy GitHub Pages” → Run workflow.

Quando quiser auto-deploy, reative no YAML:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

Passos do job:

1. Checkout
2. Setup Node
3. `npm ci`
4. `npm run check` + `npm run build`
5. Upload de `dist/` como Pages artifact
6. Deploy com `actions/deploy-pages`

No GitHub: Settings → Pages → Source = **GitHub Actions**.

## URLs locais

```sh
npm run dev
# http://localhost:4321/portfolio/
```

```sh
npm run build && npm run preview
```

## Checklist pós-deploy

- [ ] Home PT carrega com assets (logo + PDF)
- [ ] `/en/` e `/es/` ok
- [ ] Seletor de idioma troca locale
- [ ] `/v/v1/` mostra banner de preview
- [ ] Âncoras do menu funcionam com base path
