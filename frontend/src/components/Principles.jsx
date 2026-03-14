import styles from './Principles.module.css'

const PRINCIPLES = [
  { n: 'I',    deva: 'काय चिकित्सा',     name: 'Kāya Chikitsā',  text: 'Internal medicine — treating the entire body through herbs, formulations, diet, and detoxification protocols.' },
  { n: 'II',   deva: 'बाल चिकित्सा',     name: 'Bāla Chikitsā',  text: 'Pediatric Ayurveda — the health of children from conception through all stages of development.' },
  { n: 'III',  deva: 'ग्रह चिकित्सा',    name: 'Graha Chikitsā', text: 'Psycho-spiritual medicine — diseases of the mind, mental disorders, and vitiations of consciousness.' },
  { n: 'IV',   deva: 'ऊर्ध्वांग',         name: 'Ūrdhvānga',      text: 'Treatment of organs above the clavicle — eyes, ears, nose, throat, and the noble faculties of the head.' },
  { n: 'V',    deva: 'शल्य चिकित्सा',    name: 'Shalya Tantra',  text: 'Surgery — pioneered by Sushruta, the father of surgery, with 125 classical instruments and 300 procedures.' },
  { n: 'VI',   deva: 'दंष्ट्र चिकित्सा', name: 'Agada Tantra',   text: 'Toxicology — classification and antidotes for all poisons: mineral, plant, animal, and environmental.' },
  { n: 'VII',  deva: 'जरा चिकित्सा',     name: 'Rasāyana',       text: 'Anti-ageing and rejuvenation — Rasayana protocols to rebuild Dhatus, strengthen Ojas, and extend healthy lifespan.' },
  { n: 'VIII', deva: 'वृष्य चिकित्सा',   name: 'Vājīkarana',     text: 'Reproductive medicine — virility, fertility, the potency of seed and field, and the health of future progeny.' },
]

export default function Principles() {
  return (
    <section className={styles.section} id="principles">
      <div className="sec-header">
        <span className="sec-deva">अष्टांग आयुर्वेद — आठ शाखाएँ</span>
        <h2 className="sec-title">The Eight <em>Branches</em></h2>
        <div className="sec-rule" />
      </div>

      <div className={styles.grid}>
        {PRINCIPLES.map(p => (
          <div key={p.n} className={styles.card} data-n={p.n}>
            <div className={styles.deva}>{p.deva}</div>
            <div className={styles.name}>{p.n}. {p.name}</div>
            <p className={styles.text}>{p.text}</p>
            <span className={styles.bgNum}>{p.n}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
