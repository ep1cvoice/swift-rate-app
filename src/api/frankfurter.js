import { ApiError } from '../models/errors';

async function request(path, signal) {
  let res;
  try {
    res = await fetch(`/api/frankfurter${path}`, { signal });
  } catch (err) {
    // Aborts are intentional (ApiRateProvider.dispose) — let the caller ignore them.
    if (err.name === 'AbortError') throw err;
    throw new ApiError(null);
  }
  if (!res.ok) throw new ApiError(res.status);
  return res.json();
}

export async function fetchRate(from, to, signal) {
  const data = await request(`/latest?base=${from}&symbols=${to}`, signal);
  const rate = data.rates?.[to];
  if (typeof rate !== 'number') throw new ApiError(200);
  return { rate, date: data.date };
}

export function fetchCurrencies(signal) {
  return request('/currencies', signal);
}
