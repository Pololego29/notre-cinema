import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroAnimation from './components/IntroAnimation'
import PasswordGate from './components/PasswordGate'
import ProfileSelect from './components/ProfileSelect'
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
  const [profile, setProfile] = useState(() => {
    try {
      const saved = sessionStorage.getItem('loveflix_profile')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [uploadOpen, setUploadOpen] = useState(false)

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
    sessionStorage.removeItem('loveflix_profile')
    setAuthenticated(false)
    setProfile(null)
  }

  const handleSelectProfile = (prof) => {
    sessionStorage.setItem('loveflix_profile', JSON.stringify(prof))
    setProfile(prof)
  }

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />
  }

  if (!authenticated) {
    return <PasswordGate onAuthenticated={handleAuthenticated} />
  }

  if (!profile) {
    return <ProfileSelect onSelect={handleSelectProfile} />
  }

  return (
    <>
      <Navbar
        onLogout={handleLogout}
        onAddMemory={() => setUploadOpen(true)}
        profile={profile}
      />
      <HomePage
        uploadOpen={uploadOpen}
        setUploadOpen={setUploadOpen}
        profile={profile}
      />
    </>
  )
}
