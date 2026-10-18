# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Vite HMR)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint (v9 flat config)
```

npm only (`package-lock.json`) — don't add a bun/yarn lockfile. No test framework is configured.

## Stack

- **React 19** + **Vite 8** (JSX, no TypeScript)
- **CSS Modules** — one `Component.module.css` next to each component; global reset in `src/index.css`. Dark theme only, colors hardcoded (no CSS variables).
- **lucide-react** for icons
- **Frankfurter API** (ECB rates, no API key) via native `fetch`
- Deployed on **Vercel** — https://swift-rate-app.vercel.app/

## Architecture

`index.html` → `src/main.jsx` → `src/App.jsx` (owns all state, passes props down)

```
src/api/frankfurter.js        fetchRate(from, to, signal), fetchCurrencies(signal) — the only network layer, throws ApiError
src/models/                   OOP domain layer (required by the university assignment — keep it class-based):
  errors.js                   AppError → ValidationError (soft, user input) / ApiError (hard, network)
  RateProvider.js             abstract base; getRate(from, to), dispose()
  ApiRateProvider.js          live ECB rates via api/, cache + AbortController; dispose() = "destructor"
  ManualRateProvider.js       user-entered rate (fromInput parses "4,25" / "4.25")
  Conversion.js               immutable result (converted, rateLabel, toString)
  ConversionHistory.js        last N conversions; add()/clear() return a new instance (React-friendly)
  CurrencyConverter.js        validates amount, asks its RateProvider, returns a Conversion
src/hooks/useRates.js         live unit rate for the selected pair (re-fetches on from/to change)
src/utils/                    formatDate (YYYY-MM-DD → DD.MM.YYYY), Polish currency names
src/components/<Name>/        Converter, HistorySection, HeroSide, Navbar
src/store/currencyStore.js    empty placeholder — no global store yet
```

- All state is `useState` in `App.jsx`; children get values + setters as props. History is a `ConversionHistory` in state, in-memory only.
- One `ApiRateProvider` instance lives in `App.jsx` state and is passed down; its `dispose()` runs in an effect cleanup. Under StrictMode that cleanup fires in dev too, so effects that use it need a `cancelled` flag.
- Rate mode: `'api'` uses the shared `ApiRateProvider`, `'manual'` builds a `ManualRateProvider` per conversion.
- `HistorySection` fetches 4 popular pairs itself on mount (via the provider).

## API proxy (important)

The browser never calls Frankfurter directly (CORS). Code fetches `/api/frankfurter/*`, which is rewritten to `https://api.frankfurter.app/*` by:
- `vite.config.js` → `server.proxy` (dev and `vite preview`)
- `vercel.json` → `rewrites` (production)

Change both together.

## Conventions

- UI text is **Polish**; code identifiers in English.
- Components: PascalCase folder + file, default export. Hooks/utils: camelCase, named exports.
- Errors: throw `AppError` subclasses (`ValidationError` / `ApiError`) carrying a Polish `userMessage`; callers catch, show `err.userMessage` for `AppError`, log anything else (`convertError`, `rateError`, `popularError`).
- Commits: short lowercase descriptions so far; prefer Conventional Commits (`feat:`, `fix:`…) going forward.

## ESLint Notes

ESLint v9 flat config (`eslint.config.js`) with react-hooks + react-refresh. `no-unused-vars` ignores identifiers starting with an uppercase letter or `_`. Run `npm run lint` before committing.
