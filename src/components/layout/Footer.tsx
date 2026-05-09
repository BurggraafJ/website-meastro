import { Link } from 'react-router-dom'
import { paths } from '@/lib/paths'
import { BrandMark } from './BrandMark'
import styles from './Footer.module.css'

type FooterProps = {
  /**
   * - "light"   = homepage footer (4-col grid on paper bg)
   * - "dark"    = solution-detail / mail-automatisering footer (4-col grid on ink bg)
   * - "compact" = Koppelingen / Prijzen footer (single row)
   */
  variant?: 'light' | 'dark' | 'compact'
  /** Optional replay-intro hook used on the homepage. */
  onReplayIntro?: () => void
}

export function Footer({ variant = 'light', onReplayIntro }: FooterProps) {
  if (variant === 'compact') {
    return (
      <footer className={`${styles.foot} ${styles.compact}`}>
        <div className={`wrap ${styles.compactInner}`}>
          <BrandMark />
          <span className={styles.compactSmall}>© 2026 Maestro · gebouwd in NL</span>
          <div className={styles.compactLinks}>
            <Link to={paths.home}>Home</Link>
            <Link to={paths.koppelingen}>Koppelingen</Link>
            <Link to={paths.prijzen}>Prijzen</Link>
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    )
  }

  if (variant === 'dark') {
    return (
      <footer className={`${styles.foot} ${styles.dark}`}>
        <div className="wrap">
          <div className={styles.top}>
            <div>
              <BrandMark />
              <p className={styles.about}>
                Eén agent die je werkplek dirigeert. Gebouwd in Nederland — voor teams
                die schaalbaarheid en procesmatigheid in hun werkdag terug willen.
              </p>
            </div>
            <div className={styles.col}>
              <h5>Oplossingen</h5>
              <ul>
                <li>
                  <Link to={paths.mailAutomatisering}>Mail-automatisering</Link>
                </li>
                <li>
                  <Link to={paths.administratie}>Administratie</Link>
                </li>
                <li>
                  <Link to={paths.agendaBeheer}>Agenda-beheer</Link>
                </li>
                <li>
                  <Link to={paths.taken}>Taken</Link>
                </li>
              </ul>
            </div>
            <div className={styles.col}>
              <h5>Product</h5>
              <ul>
                <li>
                  <Link to={paths.koppelingen}>Koppelingen</Link>
                </li>
                <li>
                  <Link to={paths.prijzen}>Prijzen</Link>
                </li>
                <li>
                  <Link to={paths.login}>Inloggen</Link>
                </li>
              </ul>
            </div>
            <div className={styles.col}>
              <h5>Bedrijf</h5>
              <ul>
                <li>
                  <Link to={paths.home}>Home</Link>
                </li>
                <li>
                  <Link to={`${paths.prijzen}#cta`}>Early access</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.bottom}>
            <span>© 2026 Maestro · gebouwd in NL</span>
            <span>v1.0 · early access</span>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className={styles.foot}>
      <div className="wrap">
        <div className={styles.top}>
          <div className={styles.col}>
            <BrandMark />
            <p className={styles.about}>
              Eén agent die je werkplek dirigeert. Gebouwd in Nederland — voor teams
              die schaal&shy;baarheid en procesmatigheid in hun werkdag terug willen.
            </p>
          </div>
          <div className={styles.col}>
            <h5>Product</h5>
            <ul>
              <li>
                <Link to={`${paths.home}#features`}>Wat het doet</Link>
              </li>
              <li>
                <Link to={paths.mailAutomatisering}>Mail-automatisering</Link>
              </li>
              <li>
                <Link to={paths.koppelingen}>Koppelingen</Link>
              </li>
              <li>
                <Link to={paths.prijzen}>Prijzen</Link>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <h5>Bedrijf</h5>
            <ul>
              <li>
                <Link to={`${paths.home}#story`}>Waarom gebouwd</Link>
              </li>
              <li>
                <a href="#">Vacatures</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <Link to={`${paths.prijzen}#cta`}>Early access</Link>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <h5>Vertrouwen</h5>
            <ul>
              <li>
                <a href="#">Privacy &amp; AVG</a>
              </li>
              <li>
                <a href="#">Beveiliging</a>
              </li>
              <li>
                <a href="#">Verwerkers&shy;overeen&shy;komst</a>
              </li>
              <li>
                <a href="#">
                  Status <span className="dot-live" style={{ marginLeft: 3, verticalAlign: 'middle' }} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>
            © 2026 Maestro · gebouwd in NL · <span className="kbd">v 0.4</span>
          </span>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            {onReplayIntro && (
              <button
                type="button"
                className={styles.replay}
                onClick={onReplayIntro}
                aria-label="Speel intro opnieuw af"
              >
                <svg
                  className="lc"
                  viewBox="0 0 24 24"
                  width={13}
                  height={13}
                >
                  <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Speel intro opnieuw
              </button>
            )}
            <a href="#">Privacy</a>
            <a href="#">Voorwaarden</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
