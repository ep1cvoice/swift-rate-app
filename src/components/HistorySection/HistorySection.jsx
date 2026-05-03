import { useState, useEffect } from 'react'
import { History } from 'lucide-react'
import { fetchRate } from '../../api/frankfurter'
import styles from './HistorySection.module.css'

const POPULAR_PAIRS = [
  { from: 'USD', to: 'PLN' },
  { from: 'EUR', to: 'PLN' },
  { from: 'GBP', to: 'PLN' },
  { from: 'USD', to: 'EUR' },
]

export default function HistorySection({ history, setHistory }) {
  const [popularRates, setPopularRates] = useState({})
  const [popularError, setPopularError] = useState(false)

  useEffect(() => {
    Promise.all(
      POPULAR_PAIRS.map(({ from, to }) =>
        fetchRate(from, to)
          .then(({ rate }) => ({ key: `${from}/${to}`, rate }))
          .catch(() => ({ key: `${from}/${to}`, rate: null }))
      )
    ).then(results => {
      const map = {}
      results.forEach(({ key, rate }) => { map[key] = rate })
      const allFailed = results.every(r => r.rate === null)
      if (allFailed) {
        setPopularError(true)
      } else {
        setPopularRates(map)
      }
    })
  }, [])

  return (
    <div className={styles.historySection}>
      <div className={styles.histHeader}>
        <div className={styles.histTitle}>
          <History size={14} color="#A78BFA" />
          <span>{history.length ? 'Ostatnie konwersje' : 'Popularne kursy'}</span>
        </div>
        {history.length > 0
          ? <button className={styles.histAction} onClick={() => setHistory([])}>Wyczyść</button>
          : <span className={styles.histAction}>Aktualne</span>
        }
      </div>

      <div className={styles.histList}>
        {history.length > 0
          ? history.map((item, i) => (
              <div className={styles.histRow} key={i}>
                <div className={styles.histLeft}>
                  <span className={styles.histConv}>{item.label}</span>
                  <span className={styles.histDate}>{item.date}</span>
                </div>
                <span className={styles.histRate}>{item.rate}</span>
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
