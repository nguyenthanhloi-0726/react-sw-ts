import React, { FC } from 'react'
import { Switch, Route } from 'react-router-dom'
import routes, { _TRoute } from 'routes'
import { useAppDispatch } from 'store/hooks'
import { updateLayoutConfig } from 'store/slices/layoutSlice'
import Loading from 'components/Loading'

import './style.scss'

type Props = {}

const Main: FC<Props> = props => {
  const dispatch = useAppDispatch()

  return (
    <div className="main">
      <React.Suspense fallback={<Loading show={true} />}>
        <Switch>
          {routes.map(({ component: Comp, path, layout, ...rest }: _TRoute) => (
            <Route
              {...rest}
              key={path}
              path={path}
              render={routeProps => {
                //update layout
                setTimeout(() => {
                  dispatch(updateLayoutConfig(layout))
                })

                return <Comp />
              }}
            />
          ))}
        </Switch>
      </React.Suspense>
    </div>
  )
}

export default Main
