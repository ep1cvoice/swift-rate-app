import { useState, useEffect } from 'react'
import { History } from 'lucide-react'
import { formatDate } from '../../utils/format'
import styles from './HistorySection.module.css'

const POPULAR_PAIRS = [
  { from: 'USD', to: 'PLN' },
  { from: 'EUR', to: 'PLN' },
  { from: 'GBP', to: 'PLN' },
  { from: 'USD', to: 'EUR' },
]

export default function HistorySection({ history, onClearHistory, rateProvider }) {
  const [popularRates, setPopularRates] = useState({})
  const [popularError, setPopularError] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.all(
      POPULAR_PAIRS.map(({ from, to }) =>
        rateProvider.getRate(from, to)
          .then(({ rate }) => ({ key: `${from}/${to}`, rate }))
          .catch(() => ({ key: `${from}/${to}`, rate: null }))
      )
    ).then(results => {
      if (cancelled) return
      const map = {}
      results.forEach(({ key, rate }) => { map[key] = rate })
      const allFailed = results.every(r => r.rate === null)
      if (allFailed) {
        setPopularError(true)
      } else {
        setPopularRates(map)
      }
    })
    return () => { cancelled = true }
  }, [rateProvider])

  return (
    <div className={styles.historySection}>
      <div className={styles.histHeader}>
        <div className={styles.histTitle}>
          <History size={14} color="#A78BFA" />
          <span>{history.isEmpty ? 'Popularne kursy' : 'Ostatnie konwersje'}</span>
        </div>
        {!history.isEmpty
          ? <button className={styles.histAction} onClick={onClearHistory}>Wyczyść</button>
          : <span className={styles.histAction}>Aktualne</span>
        }
      </div>

      <div className={styles.histList}>
        {!history.isEmpty
          ? history.items.map((item, i) => (
              <div className={styles.histRow} key={i}>
                <div className={styles.histLeft}>
                  <span className={styles.histConv}>{item.toString()}</span>
                  <span className={styles.histDate}>
                    {item.isManual ? 'Kurs ręczny' : formatDate(item.date)}
                  </span>
                </div>
                <span className={styles.histRate}>{item.rateLabel}</span>
              </div>
            ))
          : popularError
            ? (
              <div className={styles.histError}>
                Nie udało się pobrać kursów. Sprawdź połączenie.
              </div>
            )
            : POPULAR_PAIRS.map((pair, i) => (
              <div className={styles.histRow} key={i}>
                <div className={styles.histLeft}>
                  <span className={styles.histConv}>{pair.from} / {pair.to}</span>
                </div>
                <span className={styles.histRate}>
                  {popularRates[`${pair.from}/${pair.to}`] != null
                    ? popularRates[`${pair.from}/${pair.to}`].toFixed(4)
                    : '…'}
                </span>
              </div>
            ))
        }
      </div>
    </div>
  )
}
