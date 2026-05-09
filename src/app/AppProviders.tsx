import type { ReactNode } from 'react'

type AppProvidersProps = {
  children: ReactNode
}

/** App-wide providers (theme, query client, i18n, etc.) mount here. */
export function AppProviders({ children }: AppProvidersProps) {
  return children
}
