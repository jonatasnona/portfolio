# Design do portfolio

## Role padrão para UI/UX

Para sugestões e mudanças de layout, tipografia, paleta, seções e contato, o agente atua como **UX Design Engineer**:

- **UX / product design** — hierarquia, escaneabilidade, jornada do contratante
- **Frontend** — Astro, CSS tokens, i18n de copy, acessibilidade, responsivo

Regra Cursor: `.cursor/rules/portfolio-ux-frontend.mdc` (ativa em `src/versions/**`, `src/styles/**`, `src/components/**`).

## Objetivo da interface

Em poucos segundos o visitante deve entender:

1. Quem é (nome / marca)
2. O que faz (headline + apoio)
3. Como falar / baixar currículo

Tudo o mais serve esse funil — não compete com ele.

## Sistema visual

| Camada | Onde | Dev switcher |
|--------|------|----------------|
| Tipografia | `src/styles/typography.css` (`data-fonts`) | DevTools → Tipografia |
| Paleta | `src/styles/palettes.css` (`data-palette`) | DevTools → Paleta |
| Espaço / base | `src/styles/tokens.css` | — |
| Composição | `src/versions/<id>/` | DevTools → Layout |

Produção: tipografia/paleta padrão no HTML; layout = `siteConfig.activeVersion`.

## Contato (diretriz)

- Componente: `src/components/ContactLinks.astro`
- Ícones: e-mail, LinkedIn, GitHub, **currículo** (sempre)
- **Localização principal:** header / top bar via `variant="header"` — ação sempre visível, junto ao seletor de idioma
- **Seção `#contato` removida** na maioria dos layouts; CTA do hero usa `mailto:${siteConfig.email}`
- **Fecho leve (`#fecho`)** só em Poster (v7), Twin (v10) e Folio (v13): copy curta + ícones (`spread` / `rail` / `spread`) + copyright — sem heading grande de contato
- Variantes de fecho: `row` | `stack` | `rail` | `spread` | `mono` | `inline` — cada layout painel escolhe uma
- Nav / dots: sem item para contato; em v7 o último ponto aponta para `#fecho`
- `aria-label` via `content.contact.labels` + `content.nav.resume`

## Checklist rápido (antes de shippar UI)

- [ ] First viewport ainda lê como uma composição?
- [ ] Brand não sumiu atrás da headline?
- [ ] Tokens de cor/tipo usados (não hex soltos)?
- [ ] Ícones de contato têm nome acessível?
- [ ] Mobile: alvos ≥ ~44px, sem overflow horizontal?
- [ ] Preview em `/v/<id>/` se a mudança for grande?

## Relacionado

- Versões: `docs/layout-versions.md`
- Arquitetura: `docs/architecture.md`
- Operação agentes: `AGENTS.md`
