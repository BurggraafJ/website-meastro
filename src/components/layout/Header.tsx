import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { paths } from '@/lib/paths'
import { BrandMark } from './BrandMark'
import styles from './Header.module.css'

type SolutionItem = {
  to: string
  title: string
  desc: string
  icon: ReactNode
}

const solutions: SolutionItem[] = [
  {
    to: paths.mailAutomatisering,
    title: 'Mail-automatisering',
    desc: 'Postvak triagen, concepten in jouw stijl',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x={3} y={5} width={18} height={14} rx={2} />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    to: paths.administratie,
    title: 'Administratie',
    desc: 'CRM, urenregistratie, exports',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
    ),
  },
  {
    to: paths.agendaBeheer,
    title: 'Agenda-beheer',
    desc: 'Plannen, herplannen, voorbereiden',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x={3} y={4} width={18} height={18} rx={2} />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    to: paths.taken,
    title: 'Taken',
    desc: 'Acties uit threads, opvolging op tijd',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 11l3 3 8-8" />
        <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
      </svg>
    ),
  },
]

const SOLUTION_PATHS = solutions.map((s) => s.to)

export function Header() {
  const [stuck, setStuck] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solutionsActive = SOLUTION_PATHS.some((p) => location.pathname.startsWith(p))

  return (
    <header className={`${styles.nav} ${stuck ? styles.isStuck : ''}`} id="nav">
      <div className={`wrap ${styles.inner}`}>
        <BrandMark />

        <nav className={styles.links} aria-label="Hoofdnavigatie">
          <div className={styles.drop}>
            <button
              type="button"
              className={`${styles.link} ${styles.linkBtn} ${
                solutionsActive ? styles.isActive : ''
              }`}
              aria-haspopup="true"
              aria-expanded={false}
            >
              Oplossingen
              <svg
                viewBox="0 0 24 24"
                width={14}
                height={14}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: 4 }}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className={styles.menu} role="menu">
              {solutions.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  role="menuitem"
                  className={styles.menuItem}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span>
                    <span className={styles.menuTitle}>{item.title}</span>
                    <span className={styles.menuDesc}>{item.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <NavLink
            to={paths.koppelingen}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.isActive : ''}`
            }
          >
            Koppelingen
          </NavLink>
          <NavLink
            to={paths.prijzen}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.isActive : ''}`
            }
          >
            Prijzen
          </NavLink>
        </nav>

        <div className={styles.cta}>
          <Link to={paths.login} className={`${styles.btn} ${styles.btnGhost}`}>
            Inloggen
          </Link>
          <Link to={paths.prijzen} className={`${styles.btn} ${styles.btnPrimary}`}>
            Early access
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}
