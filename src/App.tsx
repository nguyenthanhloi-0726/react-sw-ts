import React from 'react'
import { loadingSelector } from 'store/selectors/rootSelector'
import { useShallowEqualSelector } from 'store/hooks'

import Header from 'layout/Header'
import Main from 'layout/Main'
import Footer from 'layout/Footer'
import Loading from 'components/Loading'

import './App.scss'

const AppLoading: React.FC = () => {
  const loading = useShallowEqualSelector(loadingSelector)

  return <Loading show={loading} />
}

function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />

      <AppLoading />
    </div>
  )
}

export default App
