# Versões de layout

## Layouts atuais

| ID | Nome | Ideia |
|----|------|--------|
| `v1` | Classic | Header sticky, hero split, timeline |
| `v2` | Split | Painel de marca + coluna de conteúdo |
| `v3` | Ledger | Currículo/documento técnico |
| `v4` | Cover | Hero full-viewport + conteúdo após scroll |
| `v5` | Stack | Experiência em cards empilhados |
| `v6` | Wire | Blueprint / grid técnico |
| `v7` | Poster | Seções como painéis verticais |
| `v8` | Accordion | Experiência em linhas expansíveis |
| `v9` | Masthead | Jornal: cabeçalho + colunas |
| `v10` | Twin | Seções 50/50 tela cheia |
| `v11` | Mosaic | Blocos masonry de altura variável |
| `v12` | Pulse | Faixa de anos + detalhe abaixo |
| `v13` | Folio | Spreads de revista ímpares/pares |
| `v14` | Ingress | Carta/longo lead + seções |
| `v15` | Lattice | Multi-coluna densa broadsheet |

## Dev: troca ao vivo

Em `npm run dev`, painel canto inferior direito:

- **Tipografia** — CSS imediato (`data-fonts`)
- **Paleta** — CSS imediato (`data-palette`)
- **Layout** — navega para `/v/<id>/`

Produção: `activeVersion` em `src/site.config.ts`.

## Design

Mudanças de composição, contato e hierarquia visual: seguir `docs/design.md` (role **UX Design Engineer**).
Contato por ícones deve adaptar a disposição à linguagem de cada versão — não um único bloco genérico.
