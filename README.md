# Portfolio — Jonatas Pedraza

Site one-page (Astro + TypeScript) publicado no GitHub Pages.

- Produção: `https://jonatasnona.github.io/portfolio/`
- Idiomas: PT (default), EN, ES
- Layouts versionados: ver [docs/layout-versions.md](docs/layout-versions.md)

## Desenvolvimento

```sh
npm install
npm run dev
```

Abra `http://localhost:4321/portfolio/`.

```sh
npm run check
npm run build
npm run preview
```

## Estrutura rápida

| Caminho | Uso |
|---------|-----|
| `src/content/` | Copy pt/en/es |
| `src/versions/v1/` | Layout ativo |
| `src/site.config.ts` | `activeVersion` e contatos |
| `docs/` | Arquitetura e fluxo |
| `AGENTS.md` | Guia para agentes |

## Deploy

Por enquanto o workflow só roda **manual** (`workflow_dispatch`) — push em `main` não publica.

Actions → Deploy GitHub Pages → Run workflow.

Detalhes: [docs/github-pages.md](docs/github-pages.md).
