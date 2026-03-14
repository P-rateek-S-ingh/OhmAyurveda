import styles from './Doshas.module.css'

const DOSHAS = [
  {
    glyph: 'वात', name: 'Vāta', elements: 'Vāyu · Ākāsha — Air & Ether',
    desc: '"Vata is the master of all Doshas." It governs all movement — breath, circulation, nerve impulses, speech, creativity, and subtle consciousness.',
    traits: [
      'Qualities: Light, dry, cold, mobile, rough, subtle',
      'Seat: Colon, pelvic region, bones, skin, ears',
      'Imbalance: Anxiety, constipation, dry skin, pain',
      'Pacified by: Warm, oily, sweet, grounding diet',
      'Season: Late autumn & early winter',
    ],
  },
  {
    glyph: 'पित्त', name: 'Pitta', elements: 'Agni · Jala — Fire & Water',
    desc: '"Pitta is the agent of all transformation." It governs digestion, metabolism, body heat, vision, intelligence, courage, and discrimination.',
    traits: [
      'Qualities: Hot, sharp, oily, light, spreading',
      'Seat: Small intestine, liver, blood, eyes, skin',
      'Imbalance: Inflammation, anger, acid reflux',
      'Pacified by: Cool, bitter, sweet, astringent foods',
      'Season: Summer & early autumn',
    ],
  },
  {
    glyph: 'कफ', name: 'Kapha', elements: 'Pṛthvī · Jala — Earth & Water',
    desc: '"Kapha bestows stability and endurance." It governs structure, lubrication, immunity, memory, compassion, and all anabolic processes.',
    traits: [
      'Qualities: Heavy, cold, moist, slow, stable, smooth',
      'Seat: Chest, lungs, stomach, joints, tongue',
      'Imbalance: Weight gain, congestion, lethargy',
      'Pacified by: Light, warm, spicy, pungent foods',
      'Season: Late winter & spring',
    ],
  },
]

export default function Doshas() {
  return (
    <section className={styles.section} id="doshas">
      <div className={styles.inner}>
        <div className="sec-header">
          <span className="sec-deva">त्रिदोष सिद्धान्त</span>
          <h2 className="sec-title">The <em>Tridosha</em> System</h2>
          <div className="sec-rule" />
        </div>

        <div className={styles.grid}>
          {DOSHAS.map(d => (
            <div key={d.name} className={styles.card}>
              <div className={styles.glyph}>{d.glyph}</div>
              <div className={styles.name}>{d.name}</div>
              <div className={styles.elements}>{d.elements}</div>
              <p className={styles.desc}>{d.desc}</p>
              <ul className={styles.list}>
                {d.traits.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
              <div className={styles.bottomLine} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
