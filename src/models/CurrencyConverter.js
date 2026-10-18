import { Conversion } from './Conversion'
import { ValidationError } from './errors'

const MAX_AMOUNT = 1e12

// Validates input and turns it into a Conversion using whichever RateProvider
// it was given — it doesn't know or care whether the rate is live or manual.
export class CurrencyConverter {
  constructor(rateProvider) {
    this.rateProvider = rateProvider
  }

  async convert(amountInput, from, to) {
    const amount = CurrencyConverter.parseAmount(amountInput)
    if (!from || !to) {
      throw new ValidationError('Wybierz walutę źródłową i docelową.')
    }
    const { rate, date, source } = await this.rateProvider.getRate(from, to)
    return new Conversion({ amount, from, to, rate, date, source })
  }

  static parseAmount(text) {
    const trimmed = String(text ?? '').trim()
    if (trimmed === '') {
      throw new ValidationError('Podaj kwotę do przeliczenia.')
    }
    const amount = Number(trimmed.replace(',', '.'))
    if (!Number.isFinite(amount)) {
      throw new ValidationError('Kwota musi być liczbą.')
    }
    if (amount <= 0) {
      throw new ValidationError('Kwota musi być większa od zera.')
    }
    if (amount > MAX_AMOUNT) {
      throw new ValidationError('Kwota jest zbyt duża.')
    }
    return amount
  }
}
