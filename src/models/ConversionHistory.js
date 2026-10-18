// Last N conversions, newest first. Methods return a new instance instead of
// mutating, so React sees a new object and re-renders.
export class ConversionHistory {
  #items

  constructor(maxSize = 10, items = []) {
    this.maxSize = maxSize
    this.#items = items.slice(0, maxSize)
  }

  add(conversion) {
    return new ConversionHistory(this.maxSize, [conversion, ...this.#items])
  }

  clear() {
    return new ConversionHistory(this.maxSize)
  }

  get items() {
    return this.#items
  }

  get isEmpty() {
    return this.#items.length === 0
  }
}
