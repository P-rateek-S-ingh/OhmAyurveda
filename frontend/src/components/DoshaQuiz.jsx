import { useState } from 'react'
import styles from './DoshaQuiz.module.css'

const QUESTIONS = [
  {
    q: 'My body frame is:',
    opts: [
      { text: 'Thin, light, difficulty gaining weight', v: 'V' },
      { text: 'Medium, muscular, well-proportioned',   v: 'P' },
      { text: 'Large, heavy, gains weight easily',     v: 'K' },
    ],
  },
  {
    q: 'My skin is typically:',
    opts: [
      { text: 'Dry, rough, cool to touch, thin',      v: 'V' },
      { text: 'Warm, oily, prone to redness/acne',    v: 'P' },
      { text: 'Smooth, moist, thick, pale or cool',   v: 'K' },
    ],
  },
  {
    q: 'My hair is:',
    opts: [
      { text: 'Dry, thin, brittle, tends to tangle',  v: 'V' },
      { text: 'Fine, oily, early greying or thinning',v: 'P' },
      { text: 'Thick, lustrous, wavy, slow to grey',  v: 'K' },
    ],
  },
  {
    q: 'My digestion is:',
    opts: [
      { text: 'Irregular — sometimes good, sometimes poor', v: 'V' },
      { text: 'Strong — I get irritable if I skip meals',   v: 'P' },
      { text: 'Slow but steady — I can skip meals easily',  v: 'K' },
    ],
  },
  {
    q: 'My energy and activity level is:',
    opts: [
      { text: 'Bursts of energy followed by exhaustion', v: 'V' },
      { text: 'Intense, competitive, focused, driven',   v: 'P' },
      { text: 'Slow to start but steady and enduring',   v: 'K' },
    ],
  },
  {
    q: 'My sleep pattern is:',
    opts: [
      { text: 'Light, interrupted, difficult to fall asleep', v: 'V' },
      { text: 'Moderate — 6–7 hrs, sharp dreams',             v: 'P' },
      { text: 'Deep, long — I love sleep and need 8+ hrs',    v: 'K' },
    ],
  },
  {
    q: 'Under stress, I tend to:',
    opts: [
      { text: 'Feel anxious, worried, scattered',    v: 'V' },
      { text: 'Become angry, critical, controlling', v: 'P' },
      { text: 'Withdraw, become stubborn, hold on',  v: 'K' },
    ],
  },
  {
    q: 'My mind and memory is:',
    opts: [
      { text: 'Quick to learn, quick to forget',     v: 'V' },
      { text: 'Sharp, precise, good long-term recall',v: 'P' },
      { text: 'Slow to learn but retains very well', v: 'K' },
    ],
  },
  {
    q: 'My speech is:',
    opts: [
      { text: 'Fast, enthusiastic, can trail off',    v: 'V' },
      { text: 'Clear, precise, persuasive, direct',   v: 'P' },
      { text: 'Slow, deliberate, melodious, calming', v: 'K' },
    ],
  },
  {
    q: 'My weather preference is:',
    opts: [
      { text: 'Dislike cold and wind — prefer warm',  v: 'V' },
      { text: 'Dislike heat — prefer cool weather',   v: 'P' },
      { text: 'Dislike cold and damp — prefer warm dry', v: 'K' },
    ],
  },
]

const RESULTS = {
  V: {
    name: 'Vāta', glyph: 'वात', elements: 'Air & Ether',
    color: '#7B9EA8',
    desc: 'You are predominantly Vata — creative, quick-thinking, and enthusiastic. Your challenge is grounding and regularity.',
    balance: [
      'Follow a warm, oily, nourishing diet — favour ghee, sesame oil, dairy',
      'Establish fixed daily routines (Dinacharya) — consistent sleep, mealtimes',
      'Abhyanga (daily oil massage) with warm sesame oil — grounds Vata',
      'Avoid cold, raw, dry foods — favour cooked, warm, moist meals',
      'Herbs: Ashwagandha, Bala, Shatavari, Dashamoola, Triphala at night',
    ],
    avoid: 'Cold climates, erratic schedules, excessive travel, raw vegan diets, stimulants.',
  },
  P: {
    name: 'Pitta', glyph: 'पित्त', elements: 'Fire & Water',
    color: '#C8651B',
    desc: 'You are predominantly Pitta — sharp-minded, driven, and passionate. Your challenge is cooling and surrendering control.',
    balance: [
      'Follow a cool, sweet, bitter, astringent diet — avoid spicy, sour, salty',
      'Practice Sheetali Pranayama (cooling breath) daily',
      'Coconut oil massage — cooling and calming for Pitta',
      'Eat at regular mealtimes — never skip lunch (peak Pitta time)',
      'Herbs: Amalaki, Shatavari, Brahmi, Guduchi, Coriander, Fennel',
    ],
    avoid: 'Excessive heat, competitive environments, alcohol, spicy food, overwork.',
  },
  K: {
    name: 'Kapha', glyph: 'कफ', elements: 'Earth & Water',
    color: '#4A6741',
    desc: 'You are predominantly Kapha — calm, compassionate, and enduring. Your challenge is stimulation and letting go.',
    balance: [
      'Follow a light, warm, spicy, stimulating diet — favour ginger, black pepper',
      'Vigorous exercise daily — Kapha needs it more than any other Dosha',
      'Dry brushing (Garshana) before bathing — stimulates circulation',
      'Avoid daytime sleeping, cold/heavy/oily foods, excessive sweet or dairy',
      'Herbs: Trikatu, Guggulu, Triphala, Punarnava, Ginger, Turmeric',
    ],
    avoid: 'Cold and damp climates, sedentary lifestyle, excessive eating, heavy foods.',
  },
}

export default function DoshaQuiz() {
  const [answers, setAnswers]   = useState({})
  const [current, setCurrent]   = useState(0)
  const [result, setResult]     = useState(null)
  const [started, setStarted]   = useState(false)

  const handleAnswer = (v) => {
    const next = { ...answers, [current]: v }
    setAnswers(next)
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1)
    } else {
      // Tally
      const tally = { V: 0, P: 0, K: 0 }
      Object.values(next).forEach(val => tally[val]++)
      const dominant = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0]
      setResult({ dominant, tally })
    }
  }

  const reset = () => {
    setAnswers({}); setCurrent(0); setResult(null); setStarted(false)
  }

  if (!started) {
    return (
      <section className={styles.section} id="quiz">
        <div className="sec-header">
          <span className="sec-deva">प्रकृति परीक्षण</span>
          <h2 className="sec-title">Discover Your <em>Prakriti</em></h2>
          <div className="sec-rule" />
        </div>
        <div className={styles.intro}>
          <p className={styles.introText}>
            Prakriti is your unique constitutional type — determined at conception and unchanged for life.
            Understanding your Prakriti is the first step to personalised Ayurvedic health.
          </p>
          <button className={styles.startBtn} onClick={() => setStarted(true)}>
            Begin the Assessment · प्रारंभ करें
          </button>
        </div>
      </section>
    )
  }

  if (result) {
    const r = RESULTS[result.dominant]
    const total = QUESTIONS.length
    return (
      <section className={styles.section} id="quiz">
        <div className="sec-header">
          <span className="sec-deva">प्रकृति परीक्षण परिणाम</span>
          <h2 className="sec-title">Your <em>Prakriti</em> Result</h2>
          <div className="sec-rule" />
        </div>
        <div className={styles.resultWrap}>
          <div className={styles.resultCard}>
            <div className={styles.resultGlyph} style={{ color: r.color }}>{r.glyph}</div>
            <div className={styles.resultName}>{r.name} Prakriti</div>
            <div className={styles.resultElements}>{r.elements}</div>

            {/* Score bar */}
            <div className={styles.scoreRow}>
              {Object.entries(result.tally).map(([k, val]) => (
                <div key={k} className={styles.scoreItem}>
                  <div className={styles.scoreLabel}>{RESULTS[k].name}</div>
                  <div className={styles.scoreBar}>
                    <div
                      className={styles.scoreFill}
                      style={{
                        width: `${(val / total) * 100}%`,
                        background: RESULTS[k].color,
                      }}
                    />
                  </div>
                  <div className={styles.scoreNum}>{val}/{total}</div>
                </div>
              ))}
            </div>

            <p className={styles.resultDesc}>{r.desc}</p>

            <div className={styles.resultSection}>
              <p className={styles.resultSubLabel}>✦ How to Balance Your {r.name}</p>
              <ul className={styles.balanceList}>
                {r.balance.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>

            <div className={styles.avoidBox}>
              <span className={styles.avoidLabel}>⚠ Avoid:</span> {r.avoid}
            </div>

            <button className={styles.resetBtn} onClick={reset}>
              Retake the Quiz
            </button>
          </div>
        </div>
      </section>
    )
  }

  const q = QUESTIONS[current]
  const progress = ((current) / QUESTIONS.length) * 100

  return (
    <section className={styles.section} id="quiz">
      <div className="sec-header">
        <span className="sec-deva">प्रकृति परीक्षण</span>
        <h2 className="sec-title">Discover Your <em>Prakriti</em></h2>
        <div className="sec-rule" />
      </div>

      <div className={styles.quizWrap}>
        {/* Progress */}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressLabel}>{current + 1} / {QUESTIONS.length}</span>
        </div>

        <div className={styles.questionCard}>
          <div className={styles.qNum}>Question {current + 1}</div>
          <div className={styles.qText}>{q.q}</div>
          <div className={styles.opts}>
            {q.opts.map((o, i) => (
              <button key={i} className={styles.opt} onClick={() => handleAnswer(o.v)}>
                <span className={styles.optDot}>◈</span>
                {o.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
