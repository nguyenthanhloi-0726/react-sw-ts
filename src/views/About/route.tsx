import { lazy } from 'react'
import { TRoute } from 'routes'

const route: TRoute[] = [
  {
    path: '/about',
    name: 'About',
    component: lazy(() => import('.'))
  }
]

export default route
