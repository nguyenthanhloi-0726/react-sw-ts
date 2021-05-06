import { lazy } from 'react'
import { TRoute } from 'routes'

const route: TRoute[] = [
  {
    path: '/users',
    name: 'Users',
    component: lazy(() => {
      return new Promise(resolve => setTimeout(resolve, 200)).then(
        () => import('.')
      )
    })
  }
]

export default route
