import { lazy } from 'react'
import { TRoute } from 'routes'

const route: TRoute[] = [
  {
    path: '/',
    name: 'Home',
    component: lazy(() => import('.'))
  }
]

export default route
