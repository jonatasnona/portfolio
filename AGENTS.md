# AGENTS.md

Guia operacional para agentes de IA neste portfolio. Ler antes de abrir docs longos.

## Visão do projeto

Site estático one-page de apresentação profissional de **Jonatas Pedraza**, publicado no GitHub Pages.

- Stack: Astro + TypeScript
- Idiomas do site: `pt` (default), `en`, `es`
- Seções MVP: Hero, Sobre, Experiência, Competências; contato via ícones no header (+ fecho leve em Poster/Twin/Folio)
- Marca pessoal no conteúdo; logo Mandril Solutions em `public/brand/`
- Layouts versionados em `src/versions/` — produção usa só `siteConfig.activeVersion`

## Idioma dos artefatos

- Specs, plans, tasks, checklists, issues e docs de processo: **pt-BR**
- Código, IDs de rota e nomes de componente: inglês (convenção do stack)
- Copy do site: locale correspondente em `src/content/`

## Mapa de docs

- `docs/architecture.md` — estrutura, versões de layout, i18n, deploy
- `docs/design.md` — role UX Design Engineer, sistema visual, contato
- `docs/development-workflow.md` — fluxo Issue → spec (quando couber) → PR
- `docs/github-pages.md` — base path, Actions, URLs
- `docs/layout-versions.md` — como criar/promover/reverter versões de layout
- `specs/` — Spec Kit (artefatos em pt-BR)

## Leitura seletiva

- Mudança de copy: `src/content/{pt,en,es}.ts`
- Design / UI / contato / tipografia / paleta: `docs/design.md`, `.cursor/rules/portfolio-ux-frontend.mdc`
- Nova versão de layout: `docs/layout-versions.md`, depois `src/versions/<id>/`
- i18n / rotas: `astro.config.mjs`, `src/pages/`, `src/lib/paths.ts`
- Deploy Pages: `docs/github-pages.md`, `.github/workflows/deploy.yml`
- Tokens visuais: `src/styles/tokens.css`, `src/styles/palettes.css`, `src/styles/typography.css`

## Comandos

```sh
npm run dev
npm run build
npm run preview
npm run check
```

Dev local com base path: abrir `http://localhost:4321/portfolio/`.

## Não negociáveis

- Não editar a versão ativa “no lugar” para experimentos grandes — criar `versions/vN` nova
- Promover layout só alterando `activeVersion` em `src/site.config.ts`
- Versões não importam umas às outras
- Conteúdo fica em `src/content/`; layouts só consomem
- Rodar `npm run check` e `npm run build` após mudanças relevantes
- Specs e docs de processo em pt-BR
- Não commitar `dist/`, `.env` com segredos, nem credenciais

## Perspectivas

- Mudança de produto/copy: product manager — valor para contratante, clareza, exclusões
- Design / layout / contato / tipografia / paleta: **UX Design Engineer** — ver `docs/design.md` e `.cursor/rules/portfolio-ux-frontend.mdc`
- Nova versão de layout: UX Design Engineer — uma composição no first viewport, brand first, adaptação por versão
- i18n/routing/deploy: software architect — contratos estáveis, base path, hreflang
- Implementação: engineer — menor mudança coesa, testes/checks proporcionais
