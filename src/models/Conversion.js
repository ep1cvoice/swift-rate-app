// One finished conversion. Immutable, so it's safe to keep in React state.
export class Conversion {
  constructor({ amount, from, to, rate, date, source }) {
    if (!Number.isFinite(amount) || !Number.isFinite(rate)) {
      throw new TypeError('Conversion needs numeric amount and rate')
    }
    this.amount = amount
    this.from = from
    this.to = to
    this.rate = rate
    this.date = date
    this.source = source
    Object.freeze(this)
  }

  get converted() {
    return this.amount * this.rate
  }

  get isManual() {
    return this.source === 'manual'
  }

  get rateLabel() {
    return `1 ${this.from} = ${this.rate.toFixed(4)} ${this.to}`
  }

  toString() {
    return `${this.amount} ${this.from} → ${this.converted.toFixed(2)} ${this.to}`
  }
}
