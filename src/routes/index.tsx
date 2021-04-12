import { FC } from 'react'
import About from 'views/About/route'
import Home from 'views/Home/route'
import Users from 'views/Users/route'
import WelcomePage from 'views/WelcomePage/route'
import NotFound from 'views/NotFound'

export type TLayout = {
  header?: boolean
  sidebar?: boolean
  footer?: boolean
}

export type _TRoute = {
  exact: boolean
  auth: boolean
  name: string
  path: string
  layout: TLayout
  component: FC
}

export type TRoute = {
  exact?: boolean
  auth?: boolean
  name?: string
  path?: string
  layout?: TLayout
  component: FC
}

const defaultConfig: _TRoute = {
  exact: true,
  auth: true,
  path: '',
  name: '',
  layout: {
    header: true,
    sidebar: true,
    footer: true
  },
  component: NotFound
}

function mergeRoute(modules: TRoute[][]): _TRoute[] {
  return modules.reduce<_TRoute[]>((routes, module) => {
    for (const route of module) {
      if (!(route.name && route.path)) {
        throw new Error(
          `Route name and path is required.\n${JSON.stringify(route, null, 2)}`
        )
      }

      const duplicate = routes.some(
        r => r.name === route.name || r.path === route.path
      )

      if (duplicate) {
        throw new Error(`Duplicate route.\n${JSON.stringify(route, null, 2)}`)
      }

      routes.push({
        ...defaultConfig,
        ...route
      })
    }
    // console.log(JSON.stringify(routes.map(el => ({ url: el.path, title: { vi: el.label || el.path.replace('/', ''), en: el.label || el.path.replace('/', '') } })), null, 2))
    return routes
  }, [])
}

export default [
  ...mergeRoute([About, Home, Users, WelcomePage]),

  // last route handle 404 error
  {
    exact: false,
    auth: false,
    path: '*',
    name: '*',
    layout: {
      header: false,
      sidebar: false,
      footer: false
    },
    component: NotFound
  }
]
