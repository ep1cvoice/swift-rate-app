export const CURRENCIES = [
  { code: 'PLN', name: 'Polski złoty' },
  { code: 'USD', name: 'Dolar amerykański' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'Funt brytyjski' },
  { code: 'CHF', name: 'Frank szwajcarski' },
  { code: 'JPY', name: 'Jen japoński' },
  { code: 'CZK', name: 'Korona czeska' },
  { code: 'NOK', name: 'Korona norweska' },
  { code: 'SEK', name: 'Korona szwedzka' },
]

// Rates relative to PLN
export const RATES = {
  PLN: 1,
  USD: 0.2469,
  EUR: 0.2315,
  GBP: 0.1967,
  CHF: 0.2218,
  JPY: 38.20,
  CZK: 5.84,
  NOK: 2.61,
  SEK: 2.56,
}

export const POPULAR_PAIRS = [
  { from: 'USD', to: 'PLN', rate: 4.0500 },
  { from: 'EUR', to: 'PLN', rate: 4.3200 },
  { from: 'GBP', to: 'PLN', rate: 5.0850 },
  { from: 'CHF', to: 'PLN', rate: 4.5100 },
]

export function convertAmount(amount, from, to) {
  const inPLN = amount / RATES[from]
  return inPLN * RATES[to]
}

export function formatDate(date) {
  return date.toLocaleString('pl-PL', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
