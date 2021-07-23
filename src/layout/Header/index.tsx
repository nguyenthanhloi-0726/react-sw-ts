import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { layoutSelector } from 'store/selectors/layout'
import useShallowEqualSelector from 'store/hooks/useShallowEqualSelector'
import LangSwitch from 'components/LanguageSwitcher'

import Logo from 'logo.svg'

import './style.scss'

type Props = {}

const Header: React.FC<Props> = props => {
  const header = useShallowEqualSelector(layoutSelector).header

  return header ? (
    <header className="header__wrap">
      <div className="container">
        <div className="header">
          <Link to={'/'} className="header__logo">
            <img src={Logo} alt="logo" />
            <span>React</span>
          </Link>
          <div className="header__nav">
            <NavLink exact activeClassName="active" to="/">
              Home
            </NavLink>
            <NavLink activeClassName="active" to="/about">
              About
            </NavLink>
            <NavLink activeClassName="active" to="/users">
              Users
            </NavLink>
            <NavLink activeClassName="active" to="/welcome-page">
              Welcome Page
            </NavLink>
            <LangSwitch />
          </div>
        </div>
      </div>
    </header>
  ) : null
}

export default Header
