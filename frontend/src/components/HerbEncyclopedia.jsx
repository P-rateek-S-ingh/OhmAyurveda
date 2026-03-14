import { useState } from 'react'
import styles from './HerbEncyclopedia.module.css'

const HERBS = [
  { name:'Ashwagandha', skt:'अश्वगन्धा', latin:'Withania somnifera',    dosha:'VK↓ P↑', rasa:'Bitter, Astringent, Sweet', virya:'Hot',  vipaka:'Sweet', karma:'Rasayana, Balya, Vajikara',         use:'Adaptogen, nerve tonic, rejuvenator. Classical Rasayana for Vata disorders, fatigue, anxiety, male reproductive health.',              caution:'Avoid in high Pitta, pregnancy (in large doses).' },
  { name:'Shatavari',   skt:'शतावरी',    latin:'Asparagus racemosus',   dosha:'VP↓ K+',  rasa:'Sweet, Bitter',           virya:'Cool', vipaka:'Sweet', karma:'Rasayana, Balya, Stanya, Vajikara',  use:'Premier female Rasayana. Nourishes Shukra and Artava Dhatu, supports fertility, lactation, hormonal balance, and Pitta conditions.',    caution:'May increase Kapha and Ama if digestion is weak.' },
  { name:'Triphala',    skt:'त्रिफला',   latin:'Three-fruit compound',  dosha:'VPK=',    rasa:'All six (except salty)',  virya:'Mild', vipaka:'Sweet', karma:'Deepana, Pachana, Rasayana, Anulomana',use:'The most celebrated Ayurvedic formula. Trifala (Amalaki, Bibhitaki, Haritaki) gently cleanses and rejuvenates all tissues (Dhatus).', caution:'Large doses may cause loose stools. Take cautiously in pregnancy.' },
  { name:'Brahmi',      skt:'ब्राह्मी',  latin:'Bacopa monnieri',       dosha:'VPK↓',    rasa:'Bitter, Astringent',      virya:'Cool', vipaka:'Sweet', karma:'Medhya, Rasayana, Nervine',          use:'Supreme brain tonic (Medhya Rasayana). Enhances memory, intellect, concentration. Classical treatment for epilepsy, anxiety, insomnia.', caution:'Excess may cause heaviness and slow digestion.' },
  { name:'Guduchi',     skt:'गुडूची',    latin:'Tinospora cordifolia',  dosha:'VPK↓',    rasa:'Bitter, Astringent, Sweet',virya:'Hot', vipaka:'Sweet', karma:'Rasayana, Jwaraghna, Deepana',       use:'"Divine nectar" (Amrita). Strongest immunomodulator. Treats chronic fever, diabetes, gout, liver disease, autoimmune conditions.',        caution:'Generally very safe. Use cautiously in pregnancy.' },
  { name:'Turmeric',    skt:'हरिद्रा',   latin:'Curcuma longa',         dosha:'VK↓ P+',  rasa:'Bitter, Pungent',         virya:'Hot',  vipaka:'Pungent',karma:'Deepana, Shothaghna, Varnya',       use:'Queen of spices. Anti-inflammatory, blood purifier, skin brightener, liver tonic. Used in virtually every Ayurvedic tradition.',         caution:'Excess aggravates Pitta and Vata. Avoid in high doses during pregnancy.' },
  { name:'Ginger',      skt:'आर्द्रक / शुण्ठी', latin:'Zingiber officinale', dosha:'VK↓ P+', rasa:'Pungent',            virya:'Hot',  vipaka:'Sweet', karma:'Deepana, Pachana, Shothaghna',       use:'"Universal medicine" (Vishwabheshaja). Kindling Agni, treating nausea, cough, rheumatism. Fresh (Ardraka) vs dry (Shunti) forms differ.', caution:'Avoid in excess Pitta, bleeding disorders, pregnancy (large amounts).' },
  { name:'Amalaki',     skt:'आमलकी',    latin:'Emblica officinalis',    dosha:'VPK↓',    rasa:'All except salty',        virya:'Cool', vipaka:'Sweet', karma:'Rasayana, Chakshushya, Vrishya',     use:'Highest natural source of Vitamin C. Central to Chyawanprash and Triphala. Rejuvenates all tissues, supports Pitta, strengthens eyes.',   caution:'Very safe. One of the safest Rasayana herbs.' },
  { name:'Neem',        skt:'निम्ब',     latin:'Azadirachta indica',    dosha:'PK↓ V+',  rasa:'Bitter, Astringent',      virya:'Cool', vipaka:'Pungent',karma:'Krimighna, Kushthaghna, Jwaraghna',  use:'Bitter purifier. Premier herb for skin diseases (Kushtha), infections, fever, diabetes, parasites. Clears Ama and excess Pitta from blood.', caution:'Excess depletes Ojas and aggravates Vata. Avoid long-term use.' },
  { name:'Haritaki',    skt:'हरीतकी',   latin:'Terminalia chebula',    dosha:'VPK↓',    rasa:'All five except salty',   virya:'Hot',  vipaka:'Sweet', karma:'Rasayana, Anulomana, Medhya',        use:'"King of medicines." Balances all three Doshas. Rejuvenates, improves digestion, sharpens intellect, promotes longevity.',                caution:'Avoid during pregnancy, emaciation, extreme fatigue.' },
  { name:'Bibhitaki',   skt:'विभीतकी',  latin:'Terminalia bellirica',  dosha:'KP↓ V+',  rasa:'Astringent',              virya:'Hot',  vipaka:'Sweet', karma:'Kaphahara, Krimighna, Netrya',       use:'The Kapha-clearing component of Triphala. Treats respiratory conditions, excess mucus, parasites, eye diseases.',                         caution:'Excess may aggravate Vata. Use in formulation for balance.' },
  { name:'Licorice',    skt:'यष्टिमधु', latin:'Glycyrrhiza glabra',    dosha:'VP↓ K+',  rasa:'Sweet',                   virya:'Cool', vipaka:'Sweet', karma:'Rasayana, Balya, Kanthya, Medhya',   use:'Harmoniser of formulas. Soothes Vata and Pitta, heals ulcers, supports voice, adrenals, and the nervous system.',                       caution:'Avoid in oedema, hypertension, or Kapha excess.' },
  { name:'Cardamom',    skt:'एला',       latin:'Elettaria cardamomum',  dosha:'VK↓ P+',  rasa:'Sweet, Pungent',          virya:'Cool', vipaka:'Sweet', karma:'Deepana, Hridya, Chhardighna',       use:'Aromatic digestive and cardiac tonic. Treats nausea, bad breath, urinary disorders. Reduces Vata and Kapha without much Pitta increase.',  caution:'Excess may aggravate Pitta.' },
  { name:'Shankhapushpi',skt:'शंखपुष्पी', latin:'Convolvulus pluricaulis',dosha:'VPK↓',  rasa:'Astringent, Sweet',       virya:'Cool', vipaka:'Sweet', karma:'Medhya, Rasayana, Nidrajanana',      use:'Brain and nervous system tonic. Improves memory and learning. Classical treatment for anxiety, epilepsy, insomnia.',                     caution:'Generally very safe. Avoid concurrent use with phenytoin.' },
  { name:'Punarnava',   skt:'पुनर्नवा',  latin:'Boerhavia diffusa',     dosha:'KVP↓',    rasa:'Bitter, Sweet, Astringent',virya:'Cool',vipaka:'Sweet', karma:'Sothahara, Mutrakrichhrahara, Rasayana',use:'The "one that renews." Premier herb for oedema, kidney disease, liver disorders, and anaemia.',                                        caution:'Very safe. One of the most widely used Ayurvedic herbs.' },
  { name:'Guggulu',     skt:'गुग्गुलु',  latin:'Commiphora mukul',      dosha:'VKP↓',    rasa:'Bitter, Pungent, Astringent',virya:'Hot',vipaka:'Pungent',karma:'Shothaghna, Lekhana, Rasayana',   use:'Resin used in Kanchanar Guggulu, Triphala Guggulu, Yogaraja Guggulu. Treats arthritis, obesity, skin disease, and thyroid.',              caution:'Avoid in acute inflammation, liver disease, pregnancy.' },
  { name:'Trikatu',     skt:'त्रिकटु',   latin:'Three-pungent compound',dosha:'VK↓ P+',  rasa:'Pungent',                 virya:'Hot',  vipaka:'Pungent',karma:'Deepana, Pachana, Kapha-Vata hara', use:'The three pungents: dry ginger, black pepper, long pepper. Master digestive stimulant. Treats cold, cough, obesity, and poor Agni.',      caution:'Avoid in excess Pitta, ulcers, pregnancy.' },
  { name:'Manjistha',   skt:'मञ्जिष्ठा', latin:'Rubia cordifolia',      dosha:'PK↓ V+',  rasa:'Sweet, Bitter, Astringent',virya:'Hot', vipaka:'Pungent',karma:'Varnya, Raktashodhana, Stambhana',  use:'Premier blood-purifying herb. Treats skin disorders, tumours, urinary conditions, wounds. Brightens complexion (Varnya).',                 caution:'Excess may aggravate Vata. Avoid in constipation.' },
  { name:'Bala',        skt:'बला',        latin:'Sida cordifolia',       dosha:'VP↓ K+',  rasa:'Sweet',                   virya:'Cool', vipaka:'Sweet', karma:'Balya, Rasayana, Vajikara, Vata hara',use:'Strength and nerve tonic. Classical Vata Rasayana for paralysis, neuromuscular disorders, debility. Used in Bala Taila for Abhyanga.',  caution:'May increase Kapha. Use with Trikatu to counter Kapha effect.' },
  { name:'Dashamool',   skt:'दशमूल',     latin:'Ten-root compound',     dosha:'VK↓ P+',  rasa:'Bitter, Pungent',         virya:'Hot',  vipaka:'Pungent',karma:'Deepana, Balya, Shothaghna, Vata hara',use:'Classical ten-root formula. Premier Vata pacifier. Used in Dashamoolarishta for post-partum care, fever, respiratory, and neurological conditions.', caution:'Use in formulation. Avoid in excess Pitta.' },
  { name:'Kutki',       skt:'कटुकी',     latin:'Picrorhiza kurroa',     dosha:'PK↓ V+',  rasa:'Bitter',                  virya:'Cold', vipaka:'Pungent',karma:'Deepana, Jwaraghna, Yakrituttejaka', use:'Classical liver herb. One of the most potent Pitta-reducing botanicals. Treats hepatitis, fever, skin diseases, asthma.',                caution:'Excess aggravates Vata. Avoid in emaciation, Vata excess.' },
  { name:'Vacha',       skt:'वचा',       latin:'Acorus calamus',        dosha:'VK↓ P+',  rasa:'Bitter, Pungent',         virya:'Hot',  vipaka:'Pungent',karma:'Medhya, Krimighna, Deepana',         use:'Voice, brain, and digestive tonic. Classical Medhya herb for speech disorders, epilepsy, memory. Used in Saraswatarishta.',              caution:'Use in small doses. Avoid in pregnancy, bleeding disorders.' },
  { name:'Jatamansi',   skt:'जटामांसी',  latin:'Nardostachys jatamansi',dosha:'VPK↓',    rasa:'Sweet, Bitter, Astringent',virya:'Cool',vipaka:'Sweet', karma:'Medhya, Nidrajanana, Hridya',        use:'Classical nervine and cardiac tonic. Treats insomnia, anxiety, epilepsy, hair loss, and palpitations.',                                   caution:'Very safe. Avoid excess in very low Pitta states.' },
  { name:'Chyawanprash',skt:'च्यवनप्राश', latin:'Multi-herb jam formula',dosha:'VPK↓',   rasa:'All six',                 virya:'Mild', vipaka:'Sweet', karma:'Rasayana, Balya, Ojas-vardhaka',     use:'Greatest classical Rasayana formula (49 ingredients, Charaka Samhita). Builds Ojas, immunity, Prana. Suitable for all ages, all seasons.',  caution:'Use in moderation in high Kapha or diabetes (contains sugar/honey).' },
]

const DOSHA_COLORS = { 'VK↓ P↑':'#7B9EA8', 'VP↓ K+':'#C8651B', 'VPK=':'#B8860B', 'VPK↓':'#4A6741', 'PK↓ V+':'#C8651B', 'KP↓ V+':'#4A6741', 'VK↓ P+':'#7B9EA8', 'KVP↓':'#4A6741', 'VKP↓':'#B8860B', 'PK↓ V+':'#C8651B' }

export default function HerbEncyclopedia() {
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState(null)
  const [filterDosha, setFilter]= useState('All')

  const filtered = HERBS.filter(h => {
    const matchSearch = search === '' ||
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.skt.includes(search) ||
      h.use.toLowerCase().includes(search.toLowerCase())
    const matchDosha = filterDosha === 'All' ||
      h.dosha.startsWith(filterDosha)
    return matchSearch && matchDosha
  })

  return (
    <section className={styles.section} id="herbs">
      <div className="sec-header">
        <span className="sec-deva">द्रव्यगुण विज्ञान — औषधि कोश</span>
        <h2 className="sec-title">Classical <em>Herb Encyclopedia</em></h2>
        <div className="sec-rule" />
      </div>

      {/* Filter bar */}
      <div className={styles.filterBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search herbs — name, use, Sanskrit…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles.doshaFilters}>
          {['All','V','P','K'].map(d => (
            <button
              key={d}
              className={`${styles.dFilter} ${filterDosha === d ? styles.dFilterActive : ''}`}
              onClick={() => setFilter(d)}
            >
              {d === 'All' ? 'All Doshas' : d === 'V' ? 'Vāta' : d === 'P' ? 'Pitta' : 'Kapha'}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.map(h => (
          <div key={h.name} className={styles.card} onClick={() => setSelected(h)}>
            <div className={styles.cardTop}>
              <div>
                <div className={styles.hName}>{h.name}</div>
                <div className={styles.hSkt}>{h.skt}</div>
              </div>
              <div className={styles.doshaTag}>{h.dosha}</div>
            </div>
            <div className={styles.hLatin}>{h.latin}</div>
            <p className={styles.hUse}>{h.use.slice(0, 110)}…</p>
            <div className={styles.hKarma}>{h.karma}</div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className={styles.overlay} onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className={styles.detail}>
            <button className={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
            <div className={styles.detailTop}>
              <div>
                <div className={styles.detailName}>{selected.name}</div>
                <div className={styles.detailSkt}>{selected.skt}</div>
                <div className={styles.detailLatin}>{selected.latin}</div>
              </div>
              <div className={styles.detailDosha}>{selected.dosha}</div>
            </div>

            <div className={styles.propGrid}>
              {[
                { label: 'Rasa (Taste)',   val: selected.rasa },
                { label: 'Vīrya (Potency)',val: selected.virya },
                { label: 'Vipāka (Post-digestive)', val: selected.vipaka },
                { label: 'Karma (Actions)',val: selected.karma },
              ].map(p => (
                <div key={p.label} className={styles.propItem}>
                  <span className={styles.propLabel}>{p.label}</span>
                  <span className={styles.propVal}>{p.val}</span>
                </div>
              ))}
            </div>

            <div className={styles.detailUse}>
              <p className={styles.detailSubLabel}>Classical Uses</p>
              <p>{selected.use}</p>
            </div>
            <div className={styles.detailCaution}>
              <span className={styles.cautionLabel}>⚠ Caution:</span> {selected.caution}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
