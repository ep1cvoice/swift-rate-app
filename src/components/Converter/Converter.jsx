import { ArrowRight, ArrowUpDown, ChevronDown, TrendingUp, CircleCheck, X } from 'lucide-react'
import { CURRENCIES, formatDate } from '../../data'
import styles from './Converter.module.css'

export default function Converter({
  amount, setAmount,
  from, setFrom,
  to, setTo,
  result, setResult,
  handleConvert, handleSwap, handleClear,
  unitRate,
}) {
  return (
    <div className={styles.converterArea}>
      <div className={styles.convHeader}>
        <h2 className={styles.convTitle}>Przelicznik walut</h2>
        <p className={styles.convSubtitle}>Szybka konwersja walut w czasie rzeczywistym</p>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Kwota</label>
        <input
          className={styles.fieldInput}
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleConvert()}
        />
      </div>

      <div className={styles.currencyRow}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Waluta źródłowa</label>
          <div className={styles.selectWrapper}>
            <select
              className={styles.selectInput}
              value={from}
              onChange={e => { setFrom(e.target.value); setResult(null) }}
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className={styles.selectChev} />
          </div>
        </div>

        <div className={styles.swapRow}>
          <button className={styles.swapBtn} onClick={handleSwap} title="Zamień waluty">
            <ArrowUpDown size={20} color="white" />
          </button>
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>Waluta docelowa</label>
          <div className={styles.selectWrapper}>
            <select
              className={styles.selectInput}
              value={to}
              onChange={e => { setTo(e.target.value); setResult(null) }}
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className={styles.selectChev} />
          </div>
        </div>
      </div>

      <div className={styles.btnRow}>
        <button className={styles.convBtn} onClick={handleConvert}>
          <span>Konwertuj</span>
          <ArrowRight size={18} />
        </button>
        {result && (
          <button className={styles.clearBtn} onClick={handleClear}>
            <X size={18} />
          </button>
        )}
      </div>

      {result ? (
        <div className={`${styles.resultBox} ${styles.resultFilled}`}>
          <div className={styles.resultMain}>
            {result.amount} {result.from} = {result.res.toFixed(2)} {result.to}
          </div>
          <div className={styles.resultSub}>
            1 {result.from} = {result.unitRate.toFixed(4)} {result.to}
          </div>
          <div className={styles.resultDate}>
            <CircleCheck size={12} color="#22C55E" />
            <span>Kurs z {formatDate(result.date)}</span>
          </div>
        </div>
      ) : (
        <>
          <div className={`${styles.resultBox} ${styles.resultEmpty}`}>
            <span className={styles.resultPlaceholderText}>Wynik pojawi się tutaj</span>
          </div>
          <div className={styles.rateHint}>
            <TrendingUp size={14} color="#A78BFA" />
            <span>1 {from} = {unitRate.toFixed(4)} {to}</span>
          </div>
        </>
      )}
    </div>
  )
}
