import { lazy } from 'react'
import { TRoute } from 'routes'

const route: TRoute[] = [
  {
    path: '/welcome-page',
    name: 'Welcome page',
    component: lazy(() => import('.')),
    layout: {
      header: false,
      sidebar: false,
      footer: false
    }
  }
]

export default route
