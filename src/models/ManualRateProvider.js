import { RateProvider } from './RateProvider'
import { ValidationError } from './errors'

// Rate typed in by the user ("po podanym kursie") — works offline.
export class ManualRateProvider extends RateProvider {
  constructor(rate) {
    super('manual')
    if (!Number.isFinite(rate) || rate <= 0) {
      throw new ValidationError('Kurs musi być liczbą większą od zera.')
    }
    this.rate = rate
  }

  // Builds a provider from raw input text; accepts both "4,25" and "4.25".
  static fromInput(text) {
    const trimmed = String(text ?? '').trim()
    if (trimmed === '') {
      throw new ValidationError('Podaj kurs wymiany.')
    }
    return new ManualRateProvider(Number(trimmed.replace(',', '.')))
  }

  async getRate(from, to) {
    const rate = from === to ? 1 : this.rate
    return { rate, date: RateProvider.today(), source: this.name }
  }
}
