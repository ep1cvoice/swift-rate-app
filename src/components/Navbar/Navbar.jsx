import { Zap } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Zap size={24} className={styles.logoIcon} strokeWidth={2.5} />
        <span className={styles.logoText}>SwiftRate</span>
      </div>
      <div className={styles.navRight}>
        <a href="#" className={styles.navLink}>Kursy walut</a>
        <a href="#" className={styles.navLink}>O nas</a>
        <a href="#" className={styles.navLink}>Kontakt</a>
        <button className={styles.loginBtn}>Zaloguj się</button>
      </div>
    </nav>
  )
}
