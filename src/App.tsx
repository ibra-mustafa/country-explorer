import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './ui/components/Header'
import HomePage from './ui/pages/HomePage'
import LoginPage from './ui/pages/LoginPage'
import RegisterPage from './ui/pages/RegisterPage'

const getRoute = () => {
  const hash = window.location.hash.replace('#', '') || '/'
  return hash
}

function App() {
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  let Page = <HomePage />
  if (route === '/login') Page = <LoginPage />
  else if (route === '/register') Page = <RegisterPage />

  return (
    <>
      <Header />
      {Page}
    </>
  )
}

export default App
