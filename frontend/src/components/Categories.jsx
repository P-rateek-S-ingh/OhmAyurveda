import { useState } from 'react'
import CategoryModal from './CategoryModal'
import styles from './Categories.module.css'

export const CATS = [
  { icon: '🌿', name: 'Koshtha — Digestive System',   deva: 'पाचन तन्त्र',   desc: 'Agni (digestive fire) is the root of all health. All disease begins where Agni fails.',           tags: ['Constipation', 'Acidity', 'IBS', 'Agni'] },
  { icon: '🧠', name: 'Manas — Mind & Psyche',         deva: 'मानस रोग',      desc: 'Charaka devotes entire chapters to the mind. Sattvic clarity is the prerequisite to healing.',  tags: ['Anxiety', 'Unmada', 'Apasmara', 'Nidra'] },
  { icon: '❤️', name: 'Hridaya — Heart & Blood',       deva: 'हृदय रोग',      desc: 'The heart is the seat of Ojas, Tejas, and Prana — the three pillars of vital force.',          tags: ['Hridroga', 'Rakta', 'Hypertension', 'Shosha'] },
  { icon: '🫁', name: 'Pranavaha — Respiratory',       deva: 'श्वास रोग',     desc: 'The Pranavahasrotas governs all upward breath. Shwasa and Kasa have classical classification.', tags: ['Shwasa', 'Kasa', 'Pratishyaya', 'Nasya'] },
  { icon: '🦴', name: 'Asthi — Bones & Joints',        deva: 'अस्थि रोग',     desc: 'Vatavyadhi governs bone and joint disease. Amavata and Sandhigata Vata are fully described.',  tags: ['Amavata', 'Sandhivata', 'Gout', 'Asthi Kshaya'] },
  { icon: '✨', name: 'Tvak — Skin & Radiance',         deva: 'त्वक् रोग',     desc: 'The skin reflects the state of liver and blood. Kushtha has eighteen classical subtypes.',      tags: ['Kushtha', 'Vicharchika', 'Raktaja', 'Twak'] },
  { icon: '⚡', name: 'Ojas — Vitality & Immunity',    deva: 'ओज तेजस्',      desc: 'Ojas is the supreme essence of all seven Dhatus. Full Ojas means immunity to all disease.',     tags: ['Rasayana', 'Chyawanprash', 'Bala', 'Immunity'] },
  { icon: '🌸', name: "Stri Roga — Women's Health",    deva: 'स्त्री रोग',    desc: 'Artava Dhatu is governed by Apana Vata and Pitta. Classical texts cover the full lifecycle.',  tags: ['Yonivyapat', 'Artava', 'Pradara', 'Garbhini'] },
  { icon: '💧', name: 'Panchakarma — Purification',    deva: 'पञ्चकर्म',      desc: 'Five royal cleansings — Vamana, Virechana, Basti, Nasya, Raktamokshana — purify at root.',    tags: ['Vamana', 'Virechana', 'Basti', 'Nasya'] },
  { icon: '🌙', name: 'Nidra — Sleep & Rhythms',       deva: 'निद्रा विज्ञान', desc: 'Ahara, Nidra, Brahmacharya — the three pillars of life. Nidra science aligns with cosmos.',   tags: ['Anidra', 'Atinidra', 'Svapna', 'Nidranasha'] },
  { icon: '👶', name: 'Kaumara Bhritya — Pediatrics',  deva: 'कौमार भृत्य',   desc: 'One of the eight Ashtanga branches. Balachikitsa covers child health from conception onward.', tags: ['Bala', 'Graha', 'Jataharani', 'Ksheerada'] },
  { icon: '🧬', name: 'Madhumeha — Metabolic Health',  deva: 'मधुमेह प्रमेह',  desc: 'Madhumeha is one of twenty Prameha disorders described in extensive classical chapters.',     tags: ['Prameha', 'Sthaulya', 'Medoroga', 'Dosha'] },
]

export default function Categories() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <section className={styles.section} id="categories">
        <div className={`${styles.header} sec-header`}>
          <span className="sec-deva">रोग कोष — ज्ञान शाखाएँ</span>
          <h2 className="sec-title">Explore by <em>Tradition</em></h2>
          <div className="sec-rule" />
        </div>

        <div className={styles.grid}>
          {CATS.map(c => (
            <div key={c.name} className={styles.card} onClick={() => setSelected(c.name)}>
              <div className={styles.iconWrap}>{c.icon}</div>
              <div className={styles.name}>{c.name}</div>
              <span className={styles.deva}>{c.deva}</span>
              <p className={styles.desc}>{c.desc}</p>
              <div className={styles.tags}>
                {c.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {selected && (
        <CategoryModal name={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
