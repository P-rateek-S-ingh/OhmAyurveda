import { useState } from 'react'
import Mandala from './Mandala'
import styles from './Hero.module.css'

const QUICK_TAGS = [
  { label: 'Weak Agni',      query: 'digestive problems and weak agni' },
  { label: 'Vata Anxiety',   query: 'anxiety and vata imbalance' },
  { label: 'Joint Pain',     query: 'joint pain and arthritis' },
  { label: 'Skin Disorders', query: 'skin rash and eczema' },
  { label: 'Anidra',         query: 'insomnia poor sleep' },
  { label: 'Low Immunity',   query: 'low immunity and recurrent fever' },
  { label: 'Hair & Scalp',   query: 'hair fall scalp problems' },
  { label: 'Madhumeha',      query: 'diabetes madhumeha blood sugar' },
]

export default function Hero({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = () => {
    if (query.trim()) onSearch(query.trim())
  }

  const handleTag = (q) => {
    setQuery(q)
    onSearch(q)
  }

  return (
    <section className={styles.hero} id="hero">
      <Mandala />

      {/* Sanskrit watermarks */}
      <div className={`${styles.swm} ${styles.swmLeft}`}>आयुर्वेद</div>
      <div className={`${styles.swm} ${styles.swmRight}`}>स्वास्थ्य</div>

      <p className={`${styles.devaTop} fade-up-1`}>
        ॐ सर्वे भवन्तु सुखिनः · May all beings be well
      </p>

      <div className={`${styles.ruleWrap} fade-up-1`}>
        <span className={styles.ruleDot}>◆</span>
      </div>

      <h1 className={`${styles.title} fade-up-2`}>
        The Ancient Science<br />of Life
        <span className={styles.titleDeva}>आयुर्वेद विज्ञान</span>
      </h1>

      <p className={`${styles.shloka} fade-up-3`}>
        "हिताहितं सुखं दुःखमायुस्तस्य हिताहितम् ।<br />
        मानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते ॥"
      </p>
      <p className={`${styles.shlokaSource} fade-up-3`}>
        — Charaka Samhita · Sutrasthana I.41 ·
        That which illuminates the beneficial and harmful aspects of life — that is Ayurveda
      </p>

      {/* Search */}
      <div className={`${styles.searchWrap} fade-up-4`}>
        <div className={styles.labelRow}>
          <div className={styles.labelLine} />
          <span className={styles.label}>✦ Seek the Vaidya's Counsel ✦</span>
          <div className={`${styles.labelLine} ${styles.labelLineR}`} />
        </div>

        <div className={styles.searchBox}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Describe your ailment — indigestion, troubled sleep, anxious mind, joint pain…"
          />
          <button onClick={handleSubmit}>परामर्श · Consult</button>
        </div>

        <div className={styles.tags}>
          {QUICK_TAGS.map(t => (
            <button key={t.label} className={styles.tag} onClick={() => handleTag(t.query)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
