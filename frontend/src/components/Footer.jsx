import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.om}>ॐ</span>
      <div className={styles.logo}>Vaidya · आयुर्वेद</div>
      <div className={styles.rule} />
      <p className={styles.text}>
        All knowledge herein is drawn from the three great classical texts: Charaka Samhita,
        Sushruta Samhita, and Ashtanga Hridayam — composed between 600 BCE and 700 CE.
        Always consult a qualified Vaidya before undertaking any treatment.
        Ayurveda is not a substitute for emergency medical care.
      </p>
    </footer>
  )
}
