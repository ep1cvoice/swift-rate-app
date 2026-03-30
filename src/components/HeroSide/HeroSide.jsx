import Navbar from '../Navbar/Navbar'
import styles from './HeroSide.module.css'

export default function HeroSide() {
  return (
    <div className={styles.heroSide}>
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />

      <Navbar />

      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <div className={styles.badge}>Nowy! Kursy w czasie rzeczywistym</div>
          <h1 className={styles.headline}>Przeliczaj waluty szybko i wygodnie</h1>
          <p className={styles.subtitle}>
            SwiftRate to nowoczesny kalkulator walutowy, który pozwala na szybką
            konwersję między walutami. Intuicyjny interfejs i aktualne kursy.
          </p>
        </div>
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statNum}>150+</span>
            <span className={styles.statLabel}>Walut</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>24/7</span>
            <span className={styles.statLabel}>Dostępność</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>0.01s</span>
            <span className={styles.statLabel}>Czas konwersji</span>
          </div>
        </div>
      </div>
    </div>
  )
}
