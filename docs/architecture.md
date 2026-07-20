# Arquitetura

## Objetivo

Portfolio estático one-page para apresentar Jonatas Pedraza a contratantes e interessados em serviços, com i18n e layouts experimentáveis sem quebrar produção.

## Camadas

1. **Conteúdo** (`src/content/`) — textos tipados por locale
2. **Configuração** (`src/site.config.ts`) — versão ativa, contatos, paths de assets
3. **Apresentação** (`src/versions/<id>/`) — Layout + seções isoladas por versão
4. **Rotas** (`src/pages/`) — produção e preview

## Rotas

| URL | Função |
|-----|--------|
| `/portfolio/` | Produção PT (`activeVersion`) |
| `/portfolio/en/` | Produção EN |
| `/portfolio/es/` | Produção ES |
| `/portfolio/v/<version>/` | Preview PT da versão |
| `/portfolio/v/<version>/en/` | Preview EN |
| `/portfolio/v/<version>/es/` | Preview ES |

## Fluxo de render

```text
page → loadVersionLayout(active|param) → Layout.astro + sections
     → getContent(locale)
```

Layouts carregados via `import.meta.glob` em `src/versions/registry.ts`.

## Assets

- Logo Mandril (PNG transparente, poly-art Ubuntu): `public/brand/mandril-logo.png`
- Currículo PDF: `public/resume/resume_jonatas_pedraza_pt.pdf`
- Paths públicos passam por `src/lib/paths.ts` (`withBase`) por causa do `base: '/portfolio'`

## Design / UI

Role e diretrizes de interface: `docs/design.md`.  
Regra Cursor (UX Design Engineer): `.cursor/rules/portfolio-ux-frontend.mdc`.

Tokens: `src/styles/tokens.css` + `palettes.css` + `typography.css`.

## Deploy

Build SSG (`astro build`) → artifact → GitHub Pages (`actions/deploy-pages`). Detalhes em `docs/github-pages.md`.
