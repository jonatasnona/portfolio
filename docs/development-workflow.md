# Development workflow

Inspired by FluentPage: Issues as operational truth, selective Spec Kit, PRs with checks.

## Source of truth

- GitHub Issues: tasks
- Pull requests: review and merge
- `specs/`: intent and requirements for features that deserve a spec
- `docs/`: architecture and operations

## When to write a full spec

Use Spec Kit (in **English**) when:

- adding a new layout version (`versions/vN`)
- changing i18n routing or the `site.config` contract
- changing something that crosses content + routes + deploy

Go Issue → PR directly for:

- copy tweaks
- small visual polish on the already-active version
- mechanical docs
- dependency bumps

## Standard sequence

1. Create or pick an Issue (English)
2. If it qualifies: `specs/<feature>/spec.md` (+ plan/tasks when needed)
3. Branch from `main`
4. Implement (new layout version for large experiments)
5. `npm run check` and `npm run build`
6. PR linked to the Issue; description in English
7. Merge to `main` publishes via Actions (push deploy)

## Agent rules

- Read `AGENTS.md` first
- UI / layout / contact / typography / palette: **UX Design Engineer** role (`docs/design.md`)
- Specs and process docs in English
- Do not break the active version without an explicit `activeVersion` promotion
