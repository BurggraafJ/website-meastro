import { Link } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { paths } from '@/lib/paths'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  useDocumentTitle('Niet gevonden — Maestro')

  return (
    <>
      <main className={styles.wrap}>
        <p className={styles.hint}>Foutmelding · 404</p>
        <h1 className={styles.code}>404</h1>
        <p className={styles.text}>
          Deze pagina bestaat niet — of nog niet.
        </p>
        <Link to={paths.home} className={styles.link}>
          Terug naar home
        </Link>
      </main>
      <Footer variant="compact" />
    </>
  )
}
