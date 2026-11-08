# Mossab Laribi — The Working Blueprint

An editorial developer portfolio built with React, TypeScript, Vite, GSAP, and locally hosted fonts. Warm ivory, ink, and signal orange connect an interactive software architecture illustration to three original, working project demonstrations.

## Run locally

Use Node.js 22.12+ (tested with Node.js 24) and npm.

```sh
npm ci
npm run dev
```

## Build and verify

```sh
npm run build
npm run preview
npm run test:e2e
```

The production build is written to `dist/`, ready for static hosting. No backend, environment variables, API keys, remote fonts, or analytics are required. The Playwright configuration uses `/usr/bin/chromium` when available; otherwise install Playwright's browser with `npx playwright install chromium`. The test runner starts Vite automatically when needed.

## Content and customization

- `src/content.ts`: name, GitHub, optional email/LinkedIn, project descriptions and technical details.
- `src/components/Practice.tsx`: editable engineering philosophy, technical disciplines, and journey. The journey is explicitly a draft framework, not an employment record.
- `src/styles.css`: palette, typography, layout, responsive states, and project artwork.
- `src/components/SignatureScene.tsx`: interactive Interface → Logic → Data conceptual model.
- `src/components/ProjectDemo.tsx`: lazy-loaded, functional browser demonstrations.
- `src/hooks/useMotion.ts`: scoped introduction, scroll reveals, and parallax with cleanup.
- `index.html`: page title and social/search descriptions. Set deployment-specific canonical/social URLs only when the actual domain is known.

Email and LinkedIn remain `null` until supplied. Their empty states are explicit; the contact CTA leads to the supplied GitHub profile. There are no fictional employers, clients, outcomes, or testimonials.

## Working demonstrations

1. **Still.** — focus/short-break timer with timestamp-based timing, pause/reset, and optional completion sound.
2. **Atlas** — interactive chart with two time ranges and explicitly simulated data. No infrastructure is connected.
3. **Forma** — task creation, editing, completion, filtering, deletion, and browser persistence. Local data stays in this browser and is not sent to a server.

Project previews open keyboard-accessible native dialogs with case studies and working demos. Projects are labeled as demonstrations, not client work. Their source is part of this repository.

## Interaction and accessibility

Native anchor navigation and scrolling, visible focus states, a skip link, keyboard-operable tabs, native dialog focus management, touch layouts, reduced-motion support, and no scroll hijacking. Animation contexts, event listeners, and timers are cleaned up. Expensive interactive demos load on demand. Fonts and artwork are served locally.

The original repository's Pomodoro notes are preserved in `docs/original-pomodoro-notes.md`.
