import { History } from 'lucide-react'
import { POPULAR_PAIRS } from '../../data'
import styles from './HistorySection.module.css'

export default function HistorySection({ history, setHistory }) {
  return (
    <div className={styles.historySection}>
      <div className={styles.histHeader}>
        <div className={styles.histTitle}>
          <History size={14} color="#A78BFA" />
          <span>{history.length ? 'Ostatnie konwersje' : 'Popularne kursy'}</span>
        </div>
        {history.length > 0
          ? <button className={styles.histAction} onClick={() => setHistory([])}>Wyczyść</button>
          : <span className={styles.histAction}>Zobacz wszystkie</span>
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
          : POPULAR_PAIRS.map((pair, i) => (
              <div className={styles.histRow} key={i}>
                <div className={styles.histLeft}>
                  <span className={styles.histConv}>{pair.from} / {pair.to}</span>
                </div>
                <span className={styles.histRate}>{pair.rate.toFixed(4)}</span>
              </div>
            ))
        }
      </div>
    </div>
  )
}
