# Spec 001 — Portfolio MVP

## Problema

Jonatas Pedraza precisa de um site público para se apresentar a contratantes e interessados em serviços, com currículo e trajetória profissional, em múltiplos idiomas, publicado no GitHub Pages.

## Resultado desejado

One-page estático com Hero, Sobre, Experiência, Competências e Contato; i18n pt/en/es; logo Mandril como asset; estrutura de versões de layout para experimentar sem quebrar produção.

## Escopo

### Inclui

- Astro + TypeScript + deploy GitHub Pages
- Conteúdo derivado do resume PT
- Seletor de idioma e hreflang
- Download do PDF do currículo
- `activeVersion` + rotas `/v/<version>/`
- Docs e AGENTS.md em pt-BR

### Fora

- Blog / CMS
- Seção Projetos dedicada
- Preview automático por PR
- Domínio custom

## Critérios de aceite

1. Visitante em `/portfolio/` vê one-page PT com as 5 seções
2. `/en/` e `/es/` mostram o mesmo layout com copy traduzida
3. Logo Mandril aparece no header/hero/footer
4. CTA de currículo baixa o PDF
5. `/v/v1/` renderiza preview com banner; produção usa `activeVersion`
6. `npm run check` e `npm run build` passam
7. Specs/docs de processo em pt-BR

## Assumptions

- Repo publicado como project site `jonatasnona.github.io/portfolio`
- PDF único em PT no MVP para todos os locales
- Uma versão de layout (`v1`) no lançamento
