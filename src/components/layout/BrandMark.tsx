import { Link } from 'react-router-dom'
import { paths } from '@/lib/paths'

type BrandMarkProps = {
  to?: string
  className?: string
}

/** Maestro brand: black mark with white "M" + orange dot, italic wordmark. */
export function BrandMark({ to = paths.home, className }: BrandMarkProps) {
  return (
    <Link to={to} className={`brand ${className ?? ''}`.trim()} aria-label="Maestro">
      <span className="brand__mark">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 19V6" />
          <path d="M19 19V6" />
          <path d="M5 6l7 8 7-8" />
          <circle cx={12} cy={14} r={1.5} fill="#dc6f3f" stroke="none" />
        </svg>
      </span>
      <span className="brand__text">
        M<em>aestro</em>
      </span>
    </Link>
  )
}
