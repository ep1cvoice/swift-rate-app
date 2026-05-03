import { useState, useEffect } from 'react';
import HeroSide from './components/HeroSide/HeroSide';
import Converter from './components/Converter/Converter';
import HistorySection from './components/HistorySection/HistorySection';
import styles from './App.module.css';
import { useRates } from './hooks/useRates';
import { fetchRate, fetchCurrencies } from './api/frankfurter';
import { convert } from './services/currencyService';
import { formatDate } from './utils/format';

function App() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('PLN');
  const [to, setTo] = useState('USD');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [convertError, setConvertError] = useState(null);
  const [currencies, setCurrencies] = useState({});

  const { rate: liveRate, error: rateError } = useRates(from, to);

  useEffect(() => {
    fetchCurrencies().then(setCurrencies).catch(console.error);
  }, []);

  async function handleConvert() {
    const num = parseFloat(amount);
    if (!num || !from || !to) return;
    setLoading(true);
    setConvertError(null);
    try {
      const { rate, date } = await fetchRate(from, to);
      const res = convert(num, rate);
      const newResult = { amount: num, from, to, res, unitRate: rate, date };
      setResult(newResult);
      setHistory(prev => [
        {
          label: `${num} ${from} → ${res.toFixed(2)} ${to}`,
          date: formatDate(date),
          rate: `1 ${from} = ${rate.toFixed(4)} ${to}`,
        },
        ...prev.slice(0, 9),
      ]);
    } catch {
      setConvertError('Nie udało się pobrać kursu. Sprawdź połączenie i spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  }

  function handleSwap() {
    setFrom(to);
    setTo(from);
    setResult(null);
    setConvertError(null);
  }

  function handleClear() {
    setResult(null);
    setConvertError(null);
  }

  return (
    <div className={styles.app}>
      <HeroSide currencyCount={Object.keys(currencies).length || 33} />

      <aside className={styles.rightPanel}>
        <Converter
          amount={amount}
          setAmount={setAmount}
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          result={result}
          setResult={setResult}
          handleConvert={handleConvert}
          handleSwap={handleSwap}
          handleClear={handleClear}
          unitRate={liveRate ?? result?.unitRate ?? null}
          rateError={rateError}
          convertError={convertError}
          loading={loading}
          currencies={currencies}
        />

        <div className={styles.panelDivider} />

        <HistorySection history={history} setHistory={setHistory} />
      </aside>
    </div>
  );
}

export default App;
