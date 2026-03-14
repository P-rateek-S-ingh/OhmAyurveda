import styles from './ConsultResult.module.css'

export default function ConsultResult({ data, loading, error }) {
  if (!loading && !data && !error) return null

  return (
    <div className={styles.section}>
      <div className={styles.card}>
        <span className={`${styles.corner} ${styles.tl}`}>༺</span>
        <span className={`${styles.corner} ${styles.tr}`}>༺</span>
        <span className={`${styles.corner} ${styles.bl}`}>༺</span>
        <span className={`${styles.corner} ${styles.br}`}>༺</span>

        {loading && (
          <div className={styles.loading}>
            <div className="spinner" />
            <p className={styles.loadTitle}>Consulting the ancient texts…</p>
            <p className={styles.loadSub}>Charaka Samhita · Sushruta Samhita · Ashtanga Hridayam</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>Unable to consult. Please try again.</p>
          </div>
        )}

        {data && !loading && (
          <div className={styles.content}>
            <div className={styles.title}>
              {data.title}
              {data.sanskrit && <em> ({data.sanskrit})</em>}
            </div>
            <div className={styles.meta}>
              Dosha: {data.dosha} &nbsp;·&nbsp; Charaka Samhita · Sushruta Samhita · Ashtanga Hridayam
            </div>
            <div className={styles.overview}>{data.overview}</div>

            <div className={styles.divider}>◈ Chikitsā — Classical Treatment ◈</div>

            <div className={styles.grid}>
              {/* Cures */}
              <div className={`${styles.block} ${styles.cure}`}>
                <div className={styles.blockTitle}><span>🌿</span> Dravya & Yoga</div>
                <p className={styles.subLabel}>Herbs (Dravya)</p>
                <ul>{data.cures.herbs.map((h, i) => <li key={i}>{h}</li>)}</ul>
                <p className={styles.subLabel}>Classical Formulas</p>
                <ul>{data.cures.formulas.map((f, i) => <li key={i}>{f}</li>)}</ul>
                <p className={styles.subLabel}>Therapies (Karma)</p>
                <ul>{data.cures.therapies.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>

              {/* Diet + Precautions */}
              <div className={`${styles.block} ${styles.diet}`}>
                <div className={styles.blockTitle}><span>🍶</span> Pathya — Dietary Guidance</div>
                <ul>{data.cures.diet.map((d, i) => <li key={i}>{d}</li>)}</ul>
                <div className={styles.blockTitle} style={{ marginTop: '1.1rem' }}>
                  <span>⚠️</span> Precautions
                </div>
                <ul>{data.precautions.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>

              {/* Avoid */}
              <div className={`${styles.block} ${styles.avoid}`}>
                <div className={styles.blockTitle}><span>✗</span> Apathya — What to Avoid</div>
                <p className={styles.subLabel}>Foods</p>
                <ul>{data.avoid.foods.map((f, i) => <li key={i}>{f}</li>)}</ul>
                <p className={styles.subLabel}>Habits</p>
                <ul>{data.avoid.habits.map((h, i) => <li key={i}>{h}</li>)}</ul>
                <p className={styles.subLabel}>Substances</p>
                <ul>{data.avoid.substances.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>

              {/* Travel */}
              <div className={`${styles.block} ${styles.travel}`}>
                <div className={styles.blockTitle}><span>✈️</span> Yātrā Advisory</div>
                <p className={styles.subLabel}>Climates to Avoid</p>
                <ul>{data.travel.avoid_climates.map((c, i) => <li key={i}>{c}</li>)}</ul>
                <p className={styles.subLabel}>Places to Avoid</p>
                <ul>{data.travel.avoid_places.map((p, i) => <li key={i}>{p}</li>)}</ul>
                <p className={styles.subLabel}>Travel Precautions</p>
                <ul>{data.travel.travel_tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
            </div>

            <p className={styles.disclaimer}>⚕ {data.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  )
}
