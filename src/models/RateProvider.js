// Abstract source of exchange rates. Subclasses decide where the rate comes from;
// CurrencyConverter only depends on this interface (polymorphism).
export class RateProvider {
  constructor(name) {
    if (new.target === RateProvider) {
      throw new TypeError('RateProvider is abstract — use a subclass')
    }
    this.name = name
  }

  // getRate(from, to) resolves to { rate: number, date: 'YYYY-MM-DD', source: string }.
  async getRate() {
    throw new Error(`${this.constructor.name} must implement getRate()`)
  }

  // JS has no destructors (memory is garbage-collected), so subclasses that hold
  // resources release them here explicitly. Default: nothing to release.
  dispose() {}

  static today() {
    return new Date().toISOString().slice(0, 10)
  }
}
