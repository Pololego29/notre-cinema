import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroAnimation from './components/IntroAnimation'
import PasswordGate from './components/PasswordGate'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import { SHOW_INTRO } from './config'

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (!SHOW_INTRO) return false
    return !sessionStorage.getItem('nc_intro_shown')
  })
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem('nc_auth') === 'true'
  })

  const handleIntroComplete = () => {
    sessionStorage.setItem('nc_intro_shown', 'true')
    setShowIntro(false)
  }

  const handleAuthenticated = () => {
    localStorage.setItem('nc_auth', 'true')
    setAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('nc_auth')
    setAuthenticated(false)
  }

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />
  }

  if (!authenticated) {
    return <PasswordGate onAuthenticated={handleAuthenticated} />
  }

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <HomePage />
    </>
  )
}
