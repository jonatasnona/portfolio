# Fluxo de desenvolvimento

Inspirado no FluentPage: Issues como verdade operacional, Spec Kit seletivo, PRs com checks.

## Fonte da verdade

- GitHub Issues: tarefas
- Pull requests: revisão e merge
- `specs/`: intenção e requisitos de features que merecem spec
- `docs/`: arquitetura e operação

## Quando escrever spec completa

Usar Spec Kit (em **pt-BR**) quando:

- nova versão de layout (`versions/vN`)
- mudança de i18n routing ou contrato de `site.config`
- mudança que cruza conteúdo + rotas + deploy

Fluxo direto Issue → PR para:

- ajuste de copy
- polish visual pequeno na versão já ativa
- docs mecânicas
- dependências

## Sequência padrão

1. Criar ou escolher Issue (pt-BR)
2. Se qualificar: `specs/<feature>/spec.md` (+ plan/tasks quando necessário)
3. Branch a partir de `main`
4. Implementar (nova versão de layout se for experimento grande)
5. `npm run check` e `npm run build`
6. PR ligando Issue; descrição em pt-BR
7. Merge em `main` publica via Actions

## Regras para agentes

- Ler `AGENTS.md` primeiro
- UI/layout/contato/tipografia/paleta: role **UX Design Engineer** (`docs/design.md`)
- Specs e docs de processo em pt-BR
- Não quebrar a versão ativa sem promoção explícita via `activeVersion`
