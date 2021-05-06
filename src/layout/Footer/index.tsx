import React from 'react'
import { useShallowEqualSelector } from 'store/hooks'
import { layoutSelector } from 'store/selectors/layout'

type Props = {}

const Footer: React.FC<Props> = props => {
  const { footer } = useShallowEqualSelector(layoutSelector)

  return footer ? <div className="footer">Footer</div> : null
}

export default Footer
