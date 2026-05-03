import { Zap } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Zap size={24} className={styles.logoIcon} strokeWidth={2.5} />
        <span className={styles.logoText}>SwiftRate</span>
      </div>
    </nav>
  )
}
