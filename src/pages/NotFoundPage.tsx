import { Link } from 'react-router-dom'
import { paths } from '@/lib/paths'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  useDocumentTitle('Niet gevonden — website-meastro')

  return (
    <div className={styles.wrap}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.text}>Deze pagina bestaat niet.</p>
      <Link to={paths.home} className={styles.link}>
        Terug naar home
      </Link>
    </div>
  )
}
