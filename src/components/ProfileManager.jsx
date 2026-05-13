import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getProfiles,
  addProfile,
  updateProfile,
  deleteProfile,
} from '../lib/profilesStorage'

const AVATAR_COLORS = [
  'linear-gradient(135deg, #1a3a6b, #3a6bc4)',
  'linear-gradient(135deg, #1a5c2a, #2ea64a)',
  'linear-gradient(135deg, #6b1a4a, #c43a8a)',
  'linear-gradient(135deg, #4a2a1a, #c46a3a)',
  'linear-gradient(135deg, #3a1a6b, #8a3ac4)',
]

export function getProfileColor(profile) {
  if (profile.id === 'paul')
    return 'linear-gradient(135deg, #6B0F1A 0%, #C41E3A 50%, #8B0000 100%)'
  if (profile.id === 'marie-lou')
    return 'linear-gradient(135deg, #5C4400 0%, #D4AF37 50%, #8B7420 100%)'
  const idx =
    profile.createdAt
      ? new Date(profile.createdAt).getSeconds() % AVATAR_COLORS.length
      : 0
  return AVATAR_COLORS[idx]
}

export function ProfileAvatar({ profile, size = 48 }) {
  if (profile.avatarUrl) {
    return (
      <img
        src={profile.avatarUrl}
        alt={profile.name}
        className="object-cover rounded-lg"
        style={{ width: size, height: size, flexShrink: 0 }}
      />
    )
  }
  return (
    <div
      className="flex items-center justify-center rounded-lg font-cinematic text-white select-none"
      style={{
        width: size,
        height: size,
        background: getProfileColor(profile),
        fontSize: size * 0.42,
        flexShrink: 0,
      }}
    >
      {profile.name[0]?.toUpperCase()}
    </div>
  )
}

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function CloseIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
function BackIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}
function EditIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}

export default function ProfileManager({ onClose, initialMode = 'list' }) {
  const [profiles, setProfiles] = useState(getProfiles)
  const [view, setView] = useState(initialMode === 'add' ? 'add' : 'list')
  const [editing, setEditing] = useState(null)
  const [formName, setFormName] = useState('')
  const [formAvatarPreview, setFormAvatarPreview] = useState(null)
  const [formAvatarBase64, setFormAvatarBase64] = useState(null)
  const [error, setError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)
  const fileInputRef = useRef(null)

  const reload = () => setProfiles(getProfiles())

  const openAdd = () => {
    setFormName('')
    setFormAvatarPreview(null)
    setFormAvatarBase64(null)
    setError('')
    setView('add')
  }

  const openEdit = (profile) => {
    setEditing(profile)
    setFormName(profile.name)
    setFormAvatarPreview(profile.avatarUrl)
    setFormAvatarBase64(null)
    setError('')
    setView('edit')
  }

  const handleAvatarFile = async (file) => {
    if (!file) return
    const base64 = await fileToBase64(file)
    setFormAvatarBase64(base64)
    setFormAvatarPreview(base64)
  }

  const handleSaveAdd = () => {
    if (!formName.trim()) { setError('Le nom est requis.'); return }
    try {
      addProfile({ name: formName, avatarUrl: formAvatarBase64 })
      reload()
      setView('list')
    } catch (e) {
      setError(e.message)
    }
  }

  const handleSaveEdit = () => {
    if (!formName.trim()) { setError('Le nom est requis.'); return }
    const changes = { name: formName }
    if (formAvatarBase64) changes.avatarUrl = formAvatarBase64
    updateProfile(editing.id, changes)
    reload()
    setView('list')
  }

  const handleDelete = (id) => {
    deleteProfile(id)
    setConfirmDelete(null)
    reload()
  }

  const goBack = () => {
    setView('list')
    setError('')
    setEditing(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(4,4,4,0.88)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: '#151515',
          border: '1px solid rgba(212,175,55,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.85)',
          maxHeight: '88vh',
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
          <div className="flex items-center gap-3">
            {view !== 'list' && (
              <button
                onClick={goBack}
                className="text-white/40 hover:text-white transition-colors"
              >
                <BackIcon />
              </button>
            )}
            <h2 className="font-cinematic text-lg text-white font-normal">
              {view === 'list' ? 'Gérer les profils' : view === 'add' ? 'Nouveau profil' : 'Modifier'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(88vh - 65px)' }}>
          <AnimatePresence mode="wait">
            {view === 'list' && (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 flex flex-col gap-1"
              >
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <ProfileAvatar profile={profile} size={44} />
                    <span className="font-body text-white text-sm flex-1 truncate">
                      {profile.name}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(profile)}
                        className="text-white/40 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <EditIcon />
                      </button>
                      {profiles.length > 1 && (
                        <button
                          onClick={() => setConfirmDelete(profile.id)}
                          className="text-white/40 hover:text-crimson p-2 rounded-lg hover:bg-crimson/10 transition-colors"
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {profiles.length < 56 && (
                  <button
                    onClick={openAdd}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors mt-1 border border-dashed"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                    >
                      <svg width="18" height="18" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                    <span className="font-body text-sm text-white/40 hover:text-white transition-colors">
                      Ajouter un profil
                    </span>
                    <span className="ml-auto font-body text-xs text-white/20">
                      {profiles.length}/56
                    </span>
                  </button>
                )}

                <AnimatePresence>
                  {confirmDelete && (
                    <motion.div
                      className="mt-3 p-4 rounded-xl"
                      style={{
                        background: 'rgba(196,30,58,0.08)',
                        border: '1px solid rgba(196,30,58,0.2)',
                      }}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <p className="font-body text-sm text-white/70 mb-3">
                        Supprimer ce profil définitivement ?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(confirmDelete)}
                          className="flex-1 py-2 font-body text-xs tracking-widest uppercase text-white rounded-lg"
                          style={{ background: 'linear-gradient(135deg,#8B0000,#C41E3A)' }}
                        >
                          Supprimer
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="flex-1 py-2 font-body text-xs tracking-widest uppercase text-white/50 hover:text-white rounded-lg border transition-colors"
                          style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                        >
                          Annuler
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {(view === 'add' || view === 'edit') && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 flex flex-col gap-6"
              >
                {/* Avatar */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="relative cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {formAvatarPreview ? (
                      <img
                        src={formAvatarPreview}
                        alt=""
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                    ) : (
                      <div
                        className="w-20 h-20 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1.5px dashed rgba(255,255,255,0.15)',
                        }}
                      >
                        <svg width="24" height="24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                    )}
                    <div
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: '#C41E3A' }}
                    >
                      <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </div>
                  <p className="font-body text-xs text-white/30">Photo de profil</p>
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
                    value={formName}
                    onChange={(e) => { setFormName(e.target.value); setError('') }}
                    placeholder="Nom du profil..."
                    autoFocus
                    className="w-full bg-transparent border-b font-body text-sm text-white placeholder-white/20 outline-none py-2 transition-colors duration-200 focus:border-gold/60"
                    style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') view === 'add' ? handleSaveAdd() : handleSaveEdit()
                    }}
                  />
                  {error && (
                    <p className="font-body text-xs text-crimson mt-1.5">{error}</p>
                  )}
                </div>

                <button
                  onClick={view === 'add' ? handleSaveAdd : handleSaveEdit}
                  className="w-full py-3 font-body text-sm tracking-widest uppercase text-white rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #8B0000, #C41E3A)' }}
                >
                  Sauvegarder
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
