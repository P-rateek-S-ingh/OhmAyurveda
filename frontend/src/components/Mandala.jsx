import styles from './Mandala.module.css'

export default function Mandala() {
  return (
    <>
      <svg className={styles.mandala} viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#B8860B" strokeWidth="0.55">
        <circle cx="300" cy="300" r="265"/><circle cx="300" cy="300" r="215"/>
        <circle cx="300" cy="300" r="168"/><circle cx="300" cy="300" r="122"/>
        <circle cx="300" cy="300" r="80"/><circle cx="300" cy="300" r="40"/>
        <line x1="300" y1="35" x2="300" y2="565"/>
        <line x1="35" y1="300" x2="565" y2="300"/>
        <line x1="112" y1="112" x2="488" y2="488"/>
        <line x1="488" y1="112" x2="112" y2="488"/>
        <line x1="70" y1="192" x2="530" y2="408"/>
        <line x1="70" y1="408" x2="530" y2="192"/>
        <line x1="192" y1="70" x2="408" y2="530"/>
        <line x1="408" y1="70" x2="192" y2="530"/>
        <polygon points="300,52 334,150 432,118 365,196 428,272 300,242 172,272 235,196 168,118 266,150" opacity="0.55"/>
        <polygon points="300,548 334,450 432,482 365,404 428,328 300,358 172,328 235,404 168,482 266,450" opacity="0.55"/>
        <path d="M300 172 Q328 238 300 268 Q272 238 300 172Z" opacity="0.45"/>
        <path d="M300 428 Q328 362 300 332 Q272 362 300 428Z" opacity="0.45"/>
        <path d="M172 300 Q238 272 268 300 Q238 328 172 300Z" opacity="0.45"/>
        <path d="M428 300 Q362 272 332 300 Q362 328 428 300Z" opacity="0.45"/>
        <circle cx="300" cy="52" r="4.5"/><circle cx="300" cy="548" r="4.5"/>
        <circle cx="52" cy="300" r="4.5"/><circle cx="548" cy="300" r="4.5"/>
      </svg>
      <svg className={styles.mandala2} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#B8860B" strokeWidth="0.5">
        <circle cx="200" cy="200" r="160"/><circle cx="200" cy="200" r="120"/>
        <circle cx="200" cy="200" r="80"/>
        <line x1="200" y1="40" x2="200" y2="360"/>
        <line x1="40" y1="200" x2="360" y2="200"/>
        <line x1="87" y1="87" x2="313" y2="313"/>
        <line x1="313" y1="87" x2="87" y2="313"/>
        <polygon points="200,55 218,108 274,89 238,132 265,180 200,162 135,180 162,132 126,89 182,108" opacity="0.6"/>
      </svg>
    </>
  )
}
