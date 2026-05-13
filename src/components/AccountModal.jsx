import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { updateProfile } from '../lib/profilesStorage'
import { getProfileColor, ProfileAvatar } from './ProfileManager'

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function AccountModal({ profile, onClose, onChangeProfile, onProfileUpdated }) {
  const [name, setName] = useState(profile.name)
  const [avatarPreview, setAvatarPreview] = useState(profile.avatarUrl)
  const [avatarBase64, setAvatarBase64] = useState(null)
  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef(null)

  const handleAvatarFile = async (file) => {
    if (!file) return
    const base64 = await fileToBase64(file)
    setAvatarBase64(base64)
    setAvatarPreview(base64)
    setSaved(false)
  }

  const handleSave = () => {
    const changes = { name: name.trim() || profile.name }
    if (avatarBase64) changes.avatarUrl = avatarBase64
    const updated = updateProfile(profile.id, changes)
    onProfileUpdated?.(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(4,4,4,0.88)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: '#151515',
          border: '1px solid rgba(212,175,55,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.85)',
        }}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h2 className="font-cinematic text-lg text-white font-normal">Mon compte</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="relative cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
              ) : (
                <div
                  className="w-24 h-24 rounded-xl flex items-center justify-center font-cinematic text-4xl text-white select-none"
                  style={{ background: getProfileColor(profile) }}
                >
                  {(name[0] || profile.name[0])?.toUpperCase()}
                </div>
              )}
              <div
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: '#C41E3A' }}
              >
                <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            </div>
            <p className="font-body text-xs text-white/30">Changer la photo</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleAvatarFile(e.target.files[0])}
            />
          </div>

          {/* Nom */}
          <div>
            <label className="font-body text-xs text-white/40 tracking-wider uppercase block mb-2">
              Nom
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setSaved(false) }}
              className="w-full bg-transparent border-b font-body text-sm text-white placeholder-white/20 outline-none py-2 transition-colors duration-200 focus:border-gold/60"
              style={{ borderColor: 'rgba(255,255,255,0.12)' }}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>

          {/* Sauvegarder */}
          <motion.button
            onClick={handleSave}
            className="w-full py-3 font-body text-sm tracking-widest uppercase text-white rounded-lg transition-colors duration-300"
            style={{
              background: saved
                ? 'rgba(46,160,67,0.75)'
                : 'linear-gradient(135deg, #8B0000, #C41E3A)',
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {saved ? 'Sauvegardé' : 'Sauvegarder'}
          </motion.button>

          <div
            style={{
              height: 1,
              background: 'linear-gradient(90deg, rgba(212,175,55,0.12), transparent)',
            }}
          />

          {/* Changer de profil */}
          <button
            onClick={onChangeProfile}
            className="w-full py-2.5 font-body text-xs tracking-widest uppercase text-white/40 hover:text-white border rounded-lg transition-all duration-200"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            Changer de profil
          </button>
        </div>
      </motion.div>
    </div>
  )
}
