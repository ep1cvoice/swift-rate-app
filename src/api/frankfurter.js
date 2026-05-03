export async function fetchRate(from, to) {
  const res = await fetch(`/api/frankfurter/latest?base=${from}&symbols=${to}`);
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return { rate: data.rates[to], date: data.date };
}

export async function fetchCurrencies() {
  const res = await fetch('/api/frankfurter/currencies');
  if (!res.ok) throw new Error("API error");
  return res.json();
}