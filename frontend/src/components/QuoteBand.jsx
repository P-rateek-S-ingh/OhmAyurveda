import styles from './QuoteBand.module.css'

export default function QuoteBand() {
  return (
    <div className={styles.band}>
      <div className={styles.bigOm} aria-hidden="true">ॐ</div>
      <p className={styles.deva}>आयुः कामयमानेन धर्मार्थसुखसाधनम्</p>
      <blockquote className={styles.quote}>
        "He who desires <em>long life</em> for the sake of Dharma, wealth,
        and happiness — let him practise Ayurveda."
      </blockquote>
      <p className={styles.attr}>— Ashtanga Hridayam · Sutrasthana</p>
    </div>
  )
}
