import React from 'react'
import { Link } from 'react-router-dom'

import Logo from 'logo.svg'

import './style.scss'

type Props = {}

const WelcomePage: React.FC<Props> = props => {
  return (
    <div className="WelcomePage">
      <img src={Logo} className="WelcomePage-logo" alt="logo" />
      <Link to={'/'}>Home</Link>
    </div>
  )
}

export default WelcomePage
