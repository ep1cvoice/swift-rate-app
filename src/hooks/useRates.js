import { useState, useEffect } from 'react'

export function useRates(rateProvider, from, to) {
  const [rate, setRate] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!from || !to || from === to) return
    let cancelled = false
    rateProvider.getRate(from, to)
      .then(({ rate }) => { if (!cancelled) setRate(rate) })
      .catch(err => { if (!cancelled) setError(err) })
    return () => { cancelled = true }
  }, [rateProvider, from, to])

  return { rate, error }
}
