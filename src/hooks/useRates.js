import { useState, useEffect } from 'react'
import { fetchRate } from '../api/frankfurter'

export function useRates(from, to) {
  const [rate, setRate] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!from || !to || from === to) return
    let cancelled = false
    fetchRate(from, to)
      .then(({ rate }) => { if (!cancelled) setRate(rate) })
      .catch(err => { if (!cancelled) setError(err) })
    return () => { cancelled = true }
  }, [from, to])

  return { rate, error }
}
