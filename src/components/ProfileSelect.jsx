import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProfiles } from '../lib/profilesStorage'
import { getProfileColor, ProfileAvatar } from './ProfileManager'
import ProfileManager from './ProfileManager'
import { SITE_NAME } from '../config'

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export default function ProfileSelect({ onSelect }) {
  const [profiles, setProfiles] = useState([])
  const [managerOpen, setManagerOpen] = useState(false)
  const [initialMode, setInitialMode] = useState('list')

  const loadProfiles = () => setProfiles(getProfiles())

  useEffect(() => { loadProfiles() }, [])

  const openAdd = () => {
    setInitialMode('add')
    setManagerOpen(true)
  }

  const openManage = () => {
    setInitialMode('list')
    setManagerOpen(true)
  }

  const handleManagerClose = () => {
    setManagerOpen(false)
    loadProfiles()
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, #111111 100%)' }}
    >
      {/* Logo */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <span
          className="font-cinematic text-base tracking-widest"
          style={{ color: 'rgba(212,175,55,0.35)' }}
        >
          {SITE_NAME}
        </span>
      </motion.div>

      {/* Titre */}
      <motion.h1
        className="font-cinematic text-3xl sm:text-4xl text-white font-normal tracking-wide text-center mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
      >
        Qui est-ce ?
      </motion.h1>

      {/* Grille de profils */}
      <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10 max-w-2xl">
        {profiles.map((profile, i) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onSelect={onSelect}
            delay={0.2 + i * 0.1}
          />
        ))}

        {/* Bouton ajouter un profil */}
        {profiles.length < 56 && (
          <motion.div
            className="flex flex-col items-center gap-3 cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + profiles.length * 0.1 }}
            onClick={openAdd}
          >
            <motion.div
              className="flex items-center justify-center"
              style={{
                width: 140,
                height: 140,
                borderRadius: 10,
                border: '2px dashed rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.02)',
              }}
              whileHover={{
                borderColor: 'rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.04)',
                scale: 1.04,
                transition: { duration: 0.2 },
              }}
            >
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </motion.div>
            <span
              className="font-body text-xs tracking-wide transition-colors duration-200 group-hover:text-white"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Ajouter
            </span>
          </motion.div>
        )}
      </div>

      {/* Gérer les profils */}
      <motion.button
        className="mt-14 font-body text-xs tracking-widest uppercase border px-6 py-2.5 transition-all duration-300"
        style={{ color: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.15)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        whileHover={{ color: 'rgba(255,255,255,0.85)', borderColor: 'rgba(255,255,255,0.45)' }}
        whileTap={{ scale: 0.97 }}
        onClick={openManage}
      >
        Gérer les profils
      </motion.button>

      {/* Modal gestionnaire */}
      <AnimatePresence>
        {managerOpen && (
          <ProfileManager onClose={handleManagerClose} initialMode={initialMode} />
        )}
      </AnimatePresence>
    </div>
  )
}

function ProfileCard({ profile, onSelect, delay }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(profile)}
    >
      {/* Avatar */}
      <motion.div
        style={{
          borderRadius: 10,
          border: '3px solid transparent',
          overflow: 'hidden',
        }}
        whileHover={{
          scale: 1.08,
          borderColor: 'rgba(255,255,255,0.82)',
          boxShadow: '0 12px 48px rgba(0,0,0,0.65)',
          transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
        }}
        whileTap={{ scale: 1.03 }}
      >
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            style={{ width: 140, height: 140, objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div
            className="flex items-center justify-center font-cinematic text-white select-none"
            style={{
              width: 140,
              height: 140,
              background: getProfileColor(profile),
              fontSize: 56,
              textShadow: '0 2px 16px rgba(0,0,0,0.4)',
            }}
          >
            {profile.name[0]?.toUpperCase()}
          </div>
        )}
      </motion.div>

      {/* Nom */}
      <span
        className="font-body text-sm tracking-wide transition-colors duration-200 group-hover:text-white"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        {profile.name}
      </span>

      {/* Cadenas */}
      <span
        className="transition-colors duration-200 group-hover:opacity-50"
        style={{ color: 'rgba(255,255,255,0.2)' }}
      >
        <LockIcon />
      </span>
    </motion.div>
  )
}
