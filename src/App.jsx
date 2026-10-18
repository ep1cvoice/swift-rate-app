import { useState, useEffect } from 'react';
import HeroSide from './components/HeroSide/HeroSide';
import Converter from './components/Converter/Converter';
import HistorySection from './components/HistorySection/HistorySection';
import styles from './App.module.css';
import { useRates } from './hooks/useRates';
import { ApiRateProvider } from './models/ApiRateProvider';
import { ManualRateProvider } from './models/ManualRateProvider';
import { CurrencyConverter } from './models/CurrencyConverter';
import { ConversionHistory } from './models/ConversionHistory';
import { AppError } from './models/errors';

function App() {
  const [apiProvider] = useState(() => new ApiRateProvider());
  const [rateMode, setRateMode] = useState('api');
  const [manualRate, setManualRate] = useState('');
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('PLN');
  const [to, setTo] = useState('USD');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => new ConversionHistory(10));
  const [loading, setLoading] = useState(false);
  const [convertError, setConvertError] = useState(null);
  const [currencies, setCurrencies] = useState({});

  const { rate: liveRate, error: rateError } = useRates(apiProvider, from, to);

  // "Destructor": release the provider's resources when the app unmounts.
  useEffect(() => () => apiProvider.dispose(), [apiProvider]);

  useEffect(() => {
    let cancelled = false;
    apiProvider.getCurrencies()
      .then(data => { if (!cancelled) setCurrencies(data); })
      .catch(err => { if (!cancelled) console.error(err); });
    return () => { cancelled = true; };
  }, [apiProvider]);

  async function handleConvert() {
    setLoading(true);
    setConvertError(null);
    try {
      const provider = rateMode === 'manual'
        ? ManualRateProvider.fromInput(manualRate)
        : apiProvider;
      const conversion = await new CurrencyConverter(provider).convert(amount, from, to);
      setResult(conversion);
      setHistory(prev => prev.add(conversion));
    } catch (err) {
      if (err instanceof AppError) {
        setConvertError(err.userMessage);
      } else {
        console.error(err);
        setConvertError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie.');
      }
      setResult(null);
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

  function handleRateModeChange(mode) {
    setRateMode(mode);
    setResult(null);
    setConvertError(null);
  }

  const parsedManualRate = Number(manualRate.replace(',', '.'));
  const unitRate = rateMode === 'manual'
    ? (manualRate.trim() !== '' && parsedManualRate > 0 ? parsedManualRate : null)
    : liveRate ?? result?.rate ?? null;

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
          rateMode={rateMode}
          onRateModeChange={handleRateModeChange}
          manualRate={manualRate}
          setManualRate={setManualRate}
          handleConvert={handleConvert}
          handleSwap={handleSwap}
          handleClear={handleClear}
          unitRate={unitRate}
          rateError={rateMode === 'api' ? rateError : null}
          convertError={convertError}
          loading={loading}
          currencies={currencies}
        />

        <div className={styles.panelDivider} />

        <HistorySection
          history={history}
          onClearHistory={() => setHistory(prev => prev.clear())}
          rateProvider={apiProvider}
        />
      </aside>
    </div>
  );
}

export default App;
