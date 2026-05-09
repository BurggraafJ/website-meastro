import { HomeHero } from '@/features/home/components/HomeHero'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function HomePage() {
  useDocumentTitle('website-meastro')

  return <HomeHero />
}
