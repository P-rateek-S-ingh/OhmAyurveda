import { useEffect, useState } from 'react'
import styles from './CategoryModal.module.css'

export default function CategoryModal({ name, onClose }) {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(false)

  useEffect(() => {
    setLoading(true); setError(false); setData(null)
    fetch('/api/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [name])

  // Close on overlay click
  const handleOverlay = e => { if (e.target === e.currentTarget) onClose() }

  // Close on Escape
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={handleOverlay}>
      <div className={styles.dialog}>
        <button className={styles.close} onClick={onClose}>✕</button>

        {loading && (
          <div className={styles.loading}>
            <div className="spinner" style={{ borderTopColor: 'var(--copper)', borderColor: 'rgba(160,82,45,0.2)' }} />
            <p>Consulting {name}…</p>
          </div>
        )}

        {error && (
          <p className={styles.error}>Unable to load. Please try again.</p>
        )}

        {data && !loading && (
          <>
            <p className={styles.eyebrow}>Ayurvedic Knowledge · Classical Tradition</p>
            <h2 className={styles.title}>{data.title}</h2>
            <p className={styles.intro}>{data.intro}</p>
            <div className={styles.doshaBox}>{data.dosha_link}</div>

            <div className={styles.twoCol}>
              <div>
                <p className={`${styles.sub} ${styles.green}`}>🌿 Key Herbs (Dravya)</p>
                {data.key_herbs.map((h, i) => (
                  <div key={i} className={styles.herbRow}>
                    <span className={styles.herbName}>{h.name}</span>
                    <span className={styles.herbSans}> · {h.sanskrit}</span>
                    <div className={styles.herbUse}>{h.use}</div>
                  </div>
                ))}
              </div>
              <div>
                <p className={`${styles.sub} ${styles.amber}`}>📜 Classical Formulas</p>
                {data.key_formulas.map((f, i) => (
                  <div key={i} className={styles.herbRow}>
                    <span className={styles.herbName}>{f.name}</span>
                    <div className={styles.herbSource}>{f.source}</div>
                    <div className={styles.herbUse}>{f.use}</div>
                  </div>
                ))}
              </div>
            </div>

            <p className={`${styles.sub} ${styles.amber}`}>☀️ Daily Routine (Dinacharya)</p>
            <ul className={styles.list}>
              {data.lifestyle.map((l, i) => <li key={i}>{l}</li>)}
            </ul>

            <div className={styles.twoCol} style={{ marginTop: '1.1rem' }}>
              <div>
                <p className={`${styles.sub} ${styles.green}`}>✓ Pathya (Favour)</p>
                <ul className={styles.list}>
                  {data.diet.favour.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
              <div>
                <p className={`${styles.sub} ${styles.rust}`}>✗ Apathya (Avoid)</p>
                <ul className={styles.list}>
                  {data.diet.avoid.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            </div>

            <p className={`${styles.sub} ${styles.amber}`}>🧘 Yoga & Pranayama</p>
            <ul className={styles.list}>
              {data.yoga.map((y, i) => <li key={i}>{y}</li>)}
            </ul>

            <div className={styles.season}>🌿 <em>{data.seasonal_tips}</em></div>
          </>
        )}
      </div>
    </div>
  )
}
