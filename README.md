# Maestro — marketing site

Marketing site voor [Maestro](https://maestro.example) — één agent voor je hele werkplek. Vite + React 19 + TypeScript, klaar om te deployen op Vercel.

## Stack

- **Vite 8** + **React 19** + **TypeScript ~6**
- **React Router 7** voor client-side routing
- **CSS** via globale tokens in `src/index.css` + per-pagina CSS-bestanden
- Path-alias `@` → `src` (zie `vite.config.ts`)

## Lokaal draaien

```bash
npm install     # eerste keer of na dependency-changes
npm run dev     # dev-server op http://localhost:5173
npm run build   # tsc -b && vite build → dist/
npm run preview # bekijk de prod-build lokaal
npm run lint    # eslint
```

## Routes

| Path | Pagina |
|---|---|
| `/` | Home (splash + hero + features + demo + story + CTA) |
| `/mail-automatisering` | Mail-automatisering oplossing |
| `/oplossingen/administratie` | Administratie oplossing |
| `/oplossingen/agenda-beheer` | Agenda-beheer oplossing |
| `/oplossingen/taken` | Taken oplossing |
| `/koppelingen` | MCP-connectors (live / soon / op aanvraag) |
| `/prijzen` | Early-access aanmeldformulier |
| `*` | 404 |

## Mappenstructuur

```
src/
  app/           # router + providers
  components/
    layout/      # Header, Footer (3 varianten), MainLayout, BrandMark
  hooks/
  lib/
    paths.ts     # alle route-constanten
  pages/         # één .tsx + één .css per pagina
  index.css      # design tokens + globale utilities
  main.tsx
public/
  favicon.svg    # Maestro mark
index.html       # NL lang, Google Fonts preconnect
vercel.json      # SPA-rewrites naar /index.html
```

## Deploy

Push naar `main` → Vercel build automatisch (`npm run build` → `dist/`). De SPA-rewrite in `vercel.json` zorgt dat client-side routes (`/prijzen`, `/oplossingen/*`) een fresh page-load overleven.

## Design-tokens

Alle kleuren, fonts, spacing en shadows leven in `src/index.css` als CSS custom properties. Pagina's stylen via `var(--orange)` etc., niet via hardcoded hex.

## Skills

Een Claude Code skill `website-manager` (`~/.claude/skills/website-manager/SKILL.md`) bevat het complete handboek voor onderhoud — pagina toevoegen, scoping-conventie, deploy-flow, footer-varianten.
