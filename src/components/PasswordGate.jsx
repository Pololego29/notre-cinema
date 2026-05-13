import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PASSWORD, SITE_NAME, SITE_TAGLINE } from '../config'

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

export default function PasswordGate({ onAuthenticated }) {
  const [value, setValue] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef(null)

  const attempt = () => {
    if (value.toLowerCase().trim() === PASSWORD.toLowerCase()) {
      onAuthenticated()
    } else {
      setError(true)
      setShaking(true)
      setValue('')
      setTimeout(() => setShaking(false), 600)
      setTimeout(() => setError(false), 3000)
      inputRef.current?.focus()
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter') attempt()
    if (error) setError(false)
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Fond ambiance */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 60%, rgba(139,0,0,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(212,175,55,0.08) 0%, transparent 60%)',
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-cinematic text-3xl text-white font-normal">
              Notre
            </span>
            <span className="text-crimson text-2xl">♥</span>
            <span className="font-cinematic text-3xl text-gold font-normal">
              Cinéma
            </span>
          </div>
          <p className="text-white/30 text-xs tracking-[0.2em] uppercase font-body">
            {SITE_TAGLINE}
          </p>
        </div>

        {/* Ligne décorative */}
        <div
          className="mb-8 mx-auto"
          style={{
            height: 1,
            width: 200,
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          }}
        />

        {/* Texte d'invite */}
        <p className="text-white/60 text-sm text-center mb-6 font-body tracking-wide">
          Ce site est privé — entrez votre code d'accès
        </p>

        {/* Champ mot de passe */}
        <motion.div
          animate={shaking ? { x: [-10, 10, -8, 8, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="relative flex items-center rounded-lg overflow-hidden transition-all duration-300"
            style={{
              border: `1px solid ${error ? 'rgba(196,30,58,0.7)' : 'rgba(212,175,55,0.3)'}`,
              background: 'rgba(255,255,255,0.04)',
              boxShadow: error
                ? '0 0 20px rgba(196,30,58,0.2)'
                : 'none',
            }}
          >
            <input
              ref={inputRef}
              type={showPwd ? 'text' : 'password'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKey}
              placeholder="Mot de passe"
              autoFocus
              className="flex-1 bg-transparent px-4 py-4 text-white placeholder-white/25 outline-none text-sm font-body tracking-widest"
              style={{ letterSpacing: showPwd ? '0.05em' : '0.25em' }}
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="px-4 text-white/30 hover:text-white/70 transition-colors"
            >
              <EyeIcon open={showPwd} />
            </button>
          </div>

          {/* Message d'erreur */}
          <AnimatePresence>
            {error && (
              <motion.p
                className="text-crimson text-xs text-center mt-3 font-body"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Code incorrect — réessayez
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bouton */}
        <motion.button
          type="button"
          onClick={attempt}
          className="mt-5 w-full py-4 rounded-lg font-body text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #8B0000, #C41E3A)',
            color: '#fff',
          }}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(196,30,58,0.4)' }}
          whileTap={{ scale: 0.98 }}
        >
          Entrer
        </motion.button>

        {/* Discrétion */}
        <p className="text-white/15 text-xs text-center mt-8 font-body">
          Site privé — accès réservé
        </p>
      </motion.div>
    </div>
  )
}
