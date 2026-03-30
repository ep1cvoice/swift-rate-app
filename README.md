# SwiftRate — Currency Converter

A learning project — built to practice working with external APIs and to get hands-on experience with React. Also intended for personal daily use.

## About

SwiftRate is a currency converter for quick conversions between currencies. The UI was designed in Pencil, built with React + Vite.

> **Current state:** exchange rates are hardcoded for now (test data). API integration is planned for a later stage.

![Desktop App Preview](./public//assets/preview1.png)

## What's been built

### UI & components
- Full interface split into components with CSS Modules:
  - `Navbar` — logo + navigation links
  - `HeroSide` — left section with headline and stats
  - `Converter` — converter form (amount, currencies, result)
  - `HistorySection` — recent conversions / popular currency pairs

### Functionality
- Conversion between 9 currencies (PLN, USD, EUR, GBP, CHF, JPY, CZK, NOK, SEK)
- Swap currencies button
- History of last 5 conversions
- Live unit rate displayed below the form
- Enter key support in the amount field

### Responsive layout
- **Desktop** (≥ 1200px) — two-column: hero on the left, converter panel on the right
- **Tablet** (769px – 1199px) — stacked: hero on top with text and stats side by side, converter centered as a card, currency selects in a single row
- **Mobile** (≤ 768px) — full width, simplified hero, adjusted spacing

## Planned

- Integration with an external exchange rate API (e.g. NBP API or exchangerate-api)
- Automatic rate refresh
- Extended currency list
- Network error handling and loading states

## Stack

- **React 19** + **Vite 8**
- **CSS Modules** — each component has its own `.module.css` file
- **lucide-react** — icons
- No state management library, router, or HTTP client (for now)

## Getting started

```bash
git clone
npm install
npm run dev
```

## Project structure

```
src/
  data.js                        # exchange rates (temporary, hardcoded test data)
  App.jsx                        # app state + main layout
  App.module.css
  components/
    Navbar/
    HeroSide/
    Converter/
    HistorySection/
```
