import { Link } from 'react-router-dom'
import { paths } from '@/lib/paths'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <Link to={paths.home} className={styles.brand}>
        website-meastro
      </Link>
    </header>
  )
}
