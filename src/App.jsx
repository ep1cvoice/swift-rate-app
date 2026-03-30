import { useState } from 'react'
import { convertAmount, formatDate } from './data'
import HeroSide from './components/HeroSide/HeroSide'
import Converter from './components/Converter/Converter'
import HistorySection from './components/HistorySection/HistorySection'
import styles from './App.module.css'

function App() {
  const [amount, setAmount] = useState('')
  const [from, setFrom] = useState('PLN')
  const [to, setTo] = useState('USD')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  function handleConvert() {
    const num = parseFloat(amount)
    if (isNaN(num) || num <= 0) return
    const res = convertAmount(num, from, to)
    const unitRate = convertAmount(1, from, to)
    const entry = {
      label: `${num} ${from} → ${res.toFixed(2)} ${to}`,
      date: formatDate(new Date()),
      rate: unitRate.toFixed(4),
    }
    setResult({ amount: num, from, to, res, unitRate, date: new Date() })
    setHistory(prev => [entry, ...prev].slice(0, 5))
  }

  function handleSwap() {
    setFrom(to)
    setTo(from)
    setResult(null)
  }

  function handleClear() {
    setResult(null)
    setAmount('')
  }

  const unitRate = convertAmount(1, from, to)

  return (
    <div className={styles.app}>
      <HeroSide />

      <aside className={styles.rightPanel}>
        <Converter
          amount={amount} setAmount={setAmount}
          from={from} setFrom={setFrom}
          to={to} setTo={setTo}
          result={result} setResult={setResult}
          handleConvert={handleConvert}
          handleSwap={handleSwap}
          handleClear={handleClear}
          unitRate={unitRate}
        />

        <div className={styles.panelDivider} />

        <HistorySection
          history={history}
          setHistory={setHistory}
        />
      </aside>
    </div>
  )
}

export default App
