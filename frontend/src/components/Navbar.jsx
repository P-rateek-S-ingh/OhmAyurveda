import { useState } from 'react'
import styles from './Navbar.module.css'

const NAV_ITEMS = [
  { label: 'Consult',    id: 'hero' },
  { label: 'Categories', id: 'categories' },
  { label: 'Herbs',      id: 'herbs' },
  { label: 'Prakriti Quiz', id: 'quiz' },
  { label: 'Tridosha',   id: 'doshas' },
  { label: 'Ashtanga',   id: 'principles' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={styles.nav}>
      <a className={styles.logo} href="/">
        <span className={styles.om}>ॐ</span>
        Vaidya
        <span className={styles.deva}>आयुर्वेद</span>
      </a>

      {/* Desktop links */}
      <ul className={styles.links}>
        {NAV_ITEMS.map(item => (
          <li key={item.id}>
            <button onClick={() => scrollTo(item.id)}>{item.label}</button>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? styles.barOpen : styles.bar} />
        <span className={menuOpen ? styles.barOpenMid : styles.bar} />
        <span className={menuOpen ? styles.barOpen : styles.bar} />
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
