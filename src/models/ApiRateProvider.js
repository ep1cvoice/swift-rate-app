import { RateProvider } from './RateProvider'
import { fetchRate, fetchCurrencies } from '../api/frankfurter'

const CACHE_TTL_MS = 5 * 60 * 1000

// Live ECB rates from the Frankfurter API, with a short in-memory cache.
export class ApiRateProvider extends RateProvider {
  #cache = new Map()
  #pending = new Set()

  constructor(cacheTtlMs = CACHE_TTL_MS) {
    super('api')
    this.cacheTtlMs = cacheTtlMs
  }

  async getRate(from, to) {
    if (from === to) {
      return { rate: 1, date: RateProvider.today(), source: this.name }
    }

    const key = `${from}/${to}`
    const cached = this.#cache.get(key)
    if (cached && Date.now() - cached.fetchedAt < this.cacheTtlMs) {
      return cached.value
    }

    const { rate, date } = await this.#request(signal => fetchRate(from, to, signal))
    const value = { rate, date, source: this.name }
    this.#cache.set(key, { value, fetchedAt: Date.now() })
    return value
  }

  getCurrencies() {
    return this.#request(signal => fetchCurrencies(signal))
  }

  // Aborts in-flight requests and drops the cache. Called from React's effect
  // cleanup when the app unmounts. The object stays usable afterwards, because
  // StrictMode mounts → cleans up → mounts again in dev.
  dispose() {
    this.#pending.forEach(controller => controller.abort())
    this.#pending.clear()
    this.#cache.clear()
  }

  async #request(send) {
    const controller = new AbortController()
    this.#pending.add(controller)
    try {
      return await send(controller.signal)
    } finally {
      this.#pending.delete(controller)
    }
  }
}
