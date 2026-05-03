import Navbar from '../Navbar/Navbar'
import styles from './HeroSide.module.css'

export default function HeroSide({ currencyCount = 33 }) {
  return (
    <div className={styles.heroSide}>
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />

      <Navbar />

      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <div className={styles.badge}>Oficjalne kursy Europejskiego Banku Centralnego</div>
          <h1 className={styles.headline}>Przeliczaj waluty szybko i wygodnie</h1>
          <p className={styles.subtitle}>
            SwiftRate to kalkulator walutowy oparty na oficjalnych kursach
            Europejskiego Banku Centralnego. Dane aktualizowane każdego dnia roboczego.
          </p>
        </div>
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{currencyCount}</span>
            <span className={styles.statLabel}>Walut</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>24/7</span>
            <span className={styles.statLabel}>Dostępność</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>EBC</span>
            <span className={styles.statLabel}>Źródło danych</span>
          </div>
        </div>
      </div>
    </div>
  )
}
