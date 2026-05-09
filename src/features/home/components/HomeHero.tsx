import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.svg'
import styles from './HomeHero.module.css'

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.logos}>
        <img src={viteLogo} className={styles.logo} alt="" width={64} height={64} />
        <img src={reactLogo} className={styles.logoSpin} alt="" width={64} height={64} />
      </div>
      <h1 id="home-hero-title" className={styles.title}>
        website-meastro
      </h1>
      <p className={styles.lead}>
        Feature-based React-architectuur met duidelijke mappen: <code>app</code>,{' '}
        <code>pages</code>, <code>components</code>, <code>features</code>,{' '}
        <code>hooks</code> en <code>lib</code>.
      </p>
    </section>
  )
}
