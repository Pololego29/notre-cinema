import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_NAME } from '../config'

const links = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Nos souvenirs', href: '#memories' },
  { label: 'À propos', href: '#about' },
]

function PlusIcon() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export default function Navbar({ onLogout, onAddMemory, profile }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(8,8,8,0.95)'
            : 'linear-gradient(to bottom, rgba(8,8,8,0.85) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.08)' : 'none',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-2 group"
          >
            <span className="font-cinematic text-xl text-white group-hover:text-gold transition-colors duration-300">
              {SITE_NAME.split(' ')[0]}
            </span>
            <span className="text-crimson text-base transition-transform duration-300 group-hover:scale-125">
              ♥
            </span>
            <span className="font-cinematic text-xl text-gold group-hover:text-white transition-colors duration-300">
              {SITE_NAME.split(' ')[1] || ''}
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/60 hover:text-white text-sm font-body tracking-wide transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            {/* Bouton Ajouter */}
            <button
              onClick={onAddMemory}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-body text-xs tracking-widest uppercase text-white transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #8B0000, #C41E3A)' }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = '')}
            >
              <PlusIcon />
              Souvenir
            </button>

            {/* Avatar profil */}
            {profile && (
              <div
                className="w-7 h-7 rounded flex items-center justify-center font-cinematic text-sm text-white select-none"
                style={{ background: profile.bgGradient, flexShrink: 0 }}
                title={profile.name}
              >
                {profile.initial}
              </div>
            )}

            {/* Déconnexion */}
            <button
              onClick={onLogout}
              className="text-white/30 hover:text-crimson text-xs tracking-widest uppercase transition-colors duration-200"
              title="Quitter"
            >
              ×
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <motion.div
              className="flex flex-col gap-1.5 w-6"
              animate={menuOpen ? 'open' : 'closed'}
            >
              <motion.span
                className="block h-px bg-current origin-center"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-px bg-current"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px bg-current origin-center"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 },
                }}
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
              className="absolute inset-0 bg-bg/95 backdrop-blur-lg"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute top-16 left-0 right-0 px-6 py-8 flex flex-col gap-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-white text-2xl font-cinematic text-left hover:text-gold transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                onClick={() => { setMenuOpen(false); onAddMemory() }}
                className="flex items-center gap-2 font-body text-sm tracking-widest uppercase text-crimson hover:text-white transition-colors text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <PlusIcon />
                Ajouter un souvenir
              </motion.button>

              <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)' }} />

              {profile && (
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center font-cinematic text-base text-white"
                    style={{ background: profile.bgGradient }}
                  >
                    {profile.initial}
                  </div>
                  <span className="font-body text-white/50 text-sm">{profile.name}</span>
                </div>
              )}

              <button
                onClick={onLogout}
                className="text-white/30 text-sm text-left hover:text-crimson transition-colors"
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
