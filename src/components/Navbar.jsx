import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_NAME, CATEGORIES } from '../config'
import { ProfileAvatar } from './ProfileManager'

function PlusIcon() {
  return (
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

const NAV_SECTIONS = [
  { label: 'Accueil', id: 'hero' },
  ...CATEGORIES.map((c) => ({ label: c.label, id: c.id })),
  { label: 'Par années', id: 'par-annees' },
]

export default function Navbar({ onLogout, onAddMemory, onAccount, profile }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(8,8,8,0.96)'
            : 'linear-gradient(to bottom, rgba(8,8,8,0.8) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.07)' : 'none',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-1.5 group flex-shrink-0"
          >
            <span className="font-cinematic text-lg text-white group-hover:text-gold transition-colors duration-300">
              Love
            </span>
            <span className="text-crimson text-sm group-hover:scale-125 transition-transform duration-300 inline-block">
              ♥
            </span>
            <span className="font-cinematic text-lg text-gold group-hover:text-white transition-colors duration-300">
              Flix
            </span>
          </button>

          {/* Liens catégories (desktop large) */}
          <div className="hidden lg:flex items-center gap-5 flex-1 justify-center">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="text-white/50 hover:text-white font-body text-xs tracking-wide transition-colors duration-200 relative group whitespace-nowrap"
              >
                {section.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Actions droite */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onAddMemory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs tracking-widest uppercase text-white transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #8B0000, #C41E3A)' }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = '')}
            >
              <PlusIcon />
              <span className="hidden sm:inline">Souvenir</span>
            </button>

            {profile && (
              <button
                onClick={onAccount}
                className="transition-transform hover:scale-105"
                title={profile.name}
              >
                <ProfileAvatar profile={profile} size={30} />
              </button>
            )}

            <button
              onClick={onLogout}
              className="text-white/25 hover:text-crimson text-lg leading-none transition-colors duration-200"
              title="Quitter"
            >
              ×
            </button>
          </div>

          {/* Hamburger mobile */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <motion.div className="flex flex-col gap-1.5 w-6" animate={menuOpen ? 'open' : 'closed'}>
              <motion.span
                className="block h-px bg-current origin-center"
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-px bg-current"
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px bg-current origin-center"
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-bg/97 backdrop-blur-lg"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute top-14 left-0 right-0 px-6 py-6 flex flex-col gap-5 overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 56px)' }}
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              {NAV_SECTIONS.map((section, i) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className="font-cinematic text-xl text-left text-white/80 hover:text-white transition-colors"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {section.label}
                </motion.button>
              ))}

              <div
                style={{
                  height: 1,
                  background: 'linear-gradient(90deg, rgba(212,175,55,0.25), transparent)',
                }}
              />

              <button
                onClick={() => { setMenuOpen(false); onAddMemory() }}
                className="flex items-center gap-2 font-body text-sm text-crimson hover:text-white transition-colors text-left"
              >
                <PlusIcon />
                Ajouter un souvenir
              </button>

              <button
                onClick={() => { setMenuOpen(false); onAccount() }}
                className="flex items-center gap-3 font-body text-sm text-white/50 hover:text-white transition-colors text-left"
              >
                {profile && <ProfileAvatar profile={profile} size={28} />}
                Mon compte
              </button>

              <button
                onClick={onLogout}
                className="font-body text-sm text-white/25 hover:text-crimson transition-colors text-left"
              >
                Quitter le site
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
