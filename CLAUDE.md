# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Vite HMR)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint (v9 flat config)
```

No test framework is configured.

## Stack

- **React 19** + **Vite 8** (JSX, no TypeScript)
- Plain CSS with custom properties for theming (light/dark via `prefers-color-scheme`)
- No routing, no state management library, no HTTP client

## Architecture

Single-page app with a flat component structure:

- `index.html` → `src/main.jsx` (React root) → `src/App.jsx` (entire UI)
- Global styles in `src/index.css` (CSS variables, typography, layout)
- Component styles in `src/App.css`
- Static assets in `src/assets/` and `public/`

All state is local (`useState`). No external API calls are implemented yet — the "currency rate" functionality is not built out.

## ESLint Notes

Uses ESLint v9 flat config (`eslint.config.js`). Unused variable warnings are suppressed for uppercase identifiers (e.g., component names). Run `npm run lint` before committing.
