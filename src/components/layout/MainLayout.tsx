import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'

/**
 * Wraps every route with the sticky nav. Pages own their own footer because the
 * homepage uses a "light" footer with intro-replay while sub-solution pages use
 * a "dark" footer.
 */
export function MainLayout() {
  const { pathname, hash } = useLocation()

  /* Scroll to top on navigation; honour explicit hashes. */
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
