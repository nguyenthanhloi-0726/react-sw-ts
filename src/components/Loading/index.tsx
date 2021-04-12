import React from 'react'

import Logo from 'logo.svg'

import './style.scss'

type Props = {
  show: boolean
}

const Main: React.FC<Props> = props => {
  const { show } = props

  return show ? (
    <div className="loading">
      <img src={Logo} alt="logo" />
    </div>
  ) : null
}

export default Main
