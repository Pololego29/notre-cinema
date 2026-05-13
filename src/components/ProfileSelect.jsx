import { motion } from 'framer-motion'
import { PROFILES, SITE_NAME } from '../config'

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export default function ProfileSelect({ onSelect }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, #111111 100%)' }}
    >
      {/* Logo discret en haut */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <span className="font-cinematic text-lg tracking-widest" style={{ color: 'rgba(212,175,55,0.4)' }}>
          {SITE_NAME}
        </span>
      </motion.div>

      {/* Titre */}
      <motion.h1
        className="font-cinematic text-3xl sm:text-4xl text-white mb-14 font-normal tracking-wide text-center"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
      >
        Qui est-ce ?
      </motion.h1>

      {/* Cartes profils */}
      <div className="flex items-start justify-center gap-8 sm:gap-14">
        {PROFILES.map((profile, i) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onSelect={onSelect}
            delay={0.25 + i * 0.12}
          />
        ))}
      </div>

      {/* Bouton Gérer les profils */}
      <motion.button
        className="mt-16 font-body text-sm tracking-widest uppercase transition-all duration-300"
        style={{ color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.18)', padding: '10px 28px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ color: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.5)' }}
        whileTap={{ scale: 0.97 }}
      >
        Gérer les profils
      </motion.button>
    </div>
  )
}

function ProfileCard({ profile, onSelect, delay }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 cursor-pointer group"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(profile)}
    >
      {/* Avatar carré */}
      <motion.div
        className="relative flex items-center justify-center select-none"
        style={{
          width: 140,
          height: 140,
          borderRadius: 10,
          background: profile.bgGradient,
          border: '3px solid transparent',
          boxShadow: '0 6px 32px rgba(0,0,0,0.5)',
        }}
        whileHover={{
          scale: 1.08,
          borderColor: 'rgba(255,255,255,0.82)',
          boxShadow: '0 12px 48px rgba(0,0,0,0.7)',
          transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
        }}
        whileTap={{ scale: 1.03 }}
      >
        <span
          className="font-cinematic text-6xl text-white select-none"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
        >
          {profile.initial}
        </span>
      </motion.div>

      {/* Nom */}
      <span
        className="font-body text-sm tracking-wide transition-colors duration-200"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        <motion.span
          whileHover={{ color: 'rgba(255,255,255,1)' }}
          className="group-hover:text-white transition-colors duration-200"
          style={{ display: 'inline-block' }}
        >
          {profile.name}
        </motion.span>
      </span>

      {/* Cadenas */}
      <span
        className="transition-colors duration-200"
        style={{ color: 'rgba(255,255,255,0.22)' }}
      >
        <motion.span
          className="block"
          whileHover={{ color: 'rgba(255,255,255,0.55)' }}
          style={{ display: 'inline-block' }}
        >
          <LockIcon />
        </motion.span>
      </span>
    </motion.div>
  )
}
