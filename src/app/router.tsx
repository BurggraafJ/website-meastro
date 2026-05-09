import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { KoppelingenPage } from '@/pages/KoppelingenPage'
import { MailAutomatiseringPage } from '@/pages/MailAutomatiseringPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { OplossingAdministratiePage } from '@/pages/OplossingAdministratiePage'
import { OplossingAgendaBeheerPage } from '@/pages/OplossingAgendaBeheerPage'
import { OplossingTakenPage } from '@/pages/OplossingTakenPage'
import { PrijzenPage } from '@/pages/PrijzenPage'
import { paths } from '@/lib/paths'

export const router = createBrowserRouter([
  {
    path: paths.home,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: paths.mailAutomatisering.slice(1), element: <MailAutomatiseringPage /> },
      { path: 'oplossingen/administratie', element: <OplossingAdministratiePage /> },
      { path: 'oplossingen/agenda-beheer', element: <OplossingAgendaBeheerPage /> },
      { path: 'oplossingen/taken', element: <OplossingTakenPage /> },
      { path: paths.koppelingen.slice(1), element: <KoppelingenPage /> },
      { path: paths.prijzen.slice(1), element: <PrijzenPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
