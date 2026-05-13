import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { uploadMemory } from '../lib/memoriesStorage'
import { CATEGORIES } from '../config'

const INPUT_CLASS =
  'w-full bg-transparent border-b font-body text-sm text-white placeholder-white/20 outline-none py-2 transition-colors duration-200 focus:border-gold/60'
const INPUT_STYLE = { borderColor: 'rgba(255,255,255,0.12)' }

function CloseIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export default function MemoryUploadModal({ onClose, onUploaded, profile }) {
  const [form, setForm] = useState({
    title: '',
    category: CATEGORIES[0].id,
    date: '',
    location: '',
    description: '',
  })
  const [file, setFile] = useState(null)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [phase, setPhase] = useState('form') // form | uploading | success
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  const fileInputRef = useRef(null)
  const thumbInputRef = useRef(null)
  const isVideo = file?.type?.startsWith('video/')

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleFile = useCallback((f) => {
    if (!f) return
    const ok = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime', 'video/webm']
    if (!ok.includes(f.type)) {
      setError('Format non supporté — JPG, PNG, WEBP, GIF, MP4, MOV, WEBM.')
      return
    }
    setError('')
    setFile(f)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(URL.createObjectURL(f))
  }, [previewUrl])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files[0])
  }, [handleFile])

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Le titre est requis.'); return }
    if (!file) { setError('Ajoute un fichier image ou vidéo.'); return }

    setPhase('uploading')
    setProgress(0)

    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 88) { clearInterval(tick); return 88 }
        return p + Math.random() * 14
      })
    }, 75)

    try {
      const memory = await uploadMemory(
        { ...form, profile_owner: profile?.id },
        file,
        thumbnailFile,
      )
      clearInterval(tick)
      setProgress(100)
      setTimeout(() => {
        setPhase('success')
        setTimeout(() => onUploaded(memory), 1100)
      }, 280)
    } catch {
      clearInterval(tick)
      setPhase('form')
      setError('Une erreur est survenue. Réessaie.')
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(4,4,4,0.88)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <motion.div
        className="relative z-10 w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{
          background: '#151515',
          border: '1px solid rgba(212,175,55,0.09)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.85)',
          maxHeight: '92vh',
        }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="wait">
          {phase === 'success' ? (
            <SuccessState key="success" />
          ) : phase === 'uploading' ? (
            <UploadingState key="uploading" progress={progress} />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-y-auto"
              style={{ maxHeight: '92vh' }}
            >
              {/* Header */}
              <div
                className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
                style={{ background: '#151515', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div>
                  <h2 className="font-cinematic text-lg text-white font-normal">Ajouter un souvenir</h2>
                  <p className="font-body text-xs text-white/28 mt-0.5">Capture un moment pour toujours</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <CloseIcon />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5">
                {/* Zone de dépôt */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={onDrop}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  className="relative cursor-pointer rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    minHeight: 150,
                    border: `1.5px dashed ${isDragging ? 'rgba(212,175,55,0.55)' : 'rgba(255,255,255,0.11)'}`,
                    background: isDragging ? 'rgba(212,175,55,0.04)' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  {previewUrl ? (
                    <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                      {isVideo ? (
                        <video src={previewUrl} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
                      )}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
                        style={{ background: 'rgba(0,0,0,0.5)' }}
                      >
                        <span className="font-body text-white text-xs tracking-widest uppercase">Changer</span>
                      </div>
                      {isVideo && (
                        <div
                          className="absolute top-2 right-2 font-body text-xs px-2 py-0.5 rounded"
                          style={{ background: 'rgba(196,30,58,0.8)', color: '#fff' }}
                        >
                          Vidéo · session uniquement
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 py-10 text-white/22">
                      <UploadIcon />
                      <div className="text-center">
                        <p className="font-body text-sm">Glisse un fichier ici</p>
                        <p className="font-body text-xs mt-1 opacity-55">ou clique pour parcourir</p>
                        <p className="font-body text-xs mt-2 opacity-35">JPG · PNG · WEBP · MP4 · MOV</p>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {/* Miniature pour vidéos */}
                {isVideo && (
                  <div>
                    <label className="font-body text-xs text-white/35 tracking-wider uppercase block mb-2">
                      Miniature optionnelle
                    </label>
                    <button
                      type="button"
                      onClick={() => thumbInputRef.current?.click()}
                      className="font-body text-xs text-white/38 hover:text-white/70 border rounded px-3 py-1.5 transition-colors duration-200"
                      style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                    >
                      Choisir une image
                    </button>
                    <input
                      ref={thumbInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setThumbnailFile(e.target.files[0])}
                    />
                  </div>
                )}

                {/* Champs */}
                <div>
                  <label className="font-body text-xs text-white/35 tracking-wider uppercase block mb-1.5">
                    Titre <span className="text-crimson">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setField('title', e.target.value)}
                    placeholder="Notre souvenir..."
                    className={INPUT_CLASS}
                    style={INPUT_STYLE}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs text-white/35 tracking-wider uppercase block mb-1.5">
                      Catégorie
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setField('category', e.target.value)}
                      className={INPUT_CLASS}
                      style={{ ...INPUT_STYLE, background: 'transparent' }}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id} style={{ background: '#1a1a1a' }}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-body text-xs text-white/35 tracking-wider uppercase block mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setField('date', e.target.value)}
                      className={INPUT_CLASS}
                      style={{ ...INPUT_STYLE, colorScheme: 'dark' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs text-white/35 tracking-wider uppercase block mb-1.5">
                    Lieu
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setField('location', e.target.value)}
                    placeholder="Paris, France..."
                    className={INPUT_CLASS}
                    style={INPUT_STYLE}
                  />
                </div>

                <div>
                  <label className="font-body text-xs text-white/35 tracking-wider uppercase block mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setField('description', e.target.value)}
                    placeholder="Ce jour-là..."
                    rows={3}
                    className={`${INPUT_CLASS} resize-none`}
                    style={INPUT_STYLE}
                  />
                </div>

                {error && (
                  <motion.p
                    className="font-body text-xs text-crimson"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}

                <div
                  style={{
                    height: 1,
                    background: 'linear-gradient(90deg, rgba(212,175,55,0.14), transparent)',
                  }}
                />

                <motion.button
                  type="submit"
                  className="w-full py-3 font-body text-sm tracking-widest uppercase text-white rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #8B0000, #C41E3A)' }}
                  whileHover={{ scale: 1.01, filter: 'brightness(1.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enregistrer le souvenir
                </motion.button>

                <div className="pb-1" />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

function UploadingState({ progress }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center px-8 py-16 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className="font-cinematic text-white text-lg font-normal">Sauvegarde en cours...</p>
      <div className="w-full rounded-full overflow-hidden" style={{ height: 2, background: 'rgba(255,255,255,0.07)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #8B0000, #D4AF37)' }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.12 }}
        />
      </div>
      <p className="font-body text-xs text-white/28">{Math.round(Math.min(progress, 100))} %</p>
    </motion.div>
  )
}

function SuccessState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center px-8 py-16 gap-5"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="w-16 h-16 rounded-full flex items-center justify-center text-gold"
        style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.28)' }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        <CheckIcon />
      </motion.div>
      <div className="text-center">
        <p className="font-cinematic text-xl text-white font-normal">Souvenir ajouté</p>
        <p className="font-body text-xs text-white/30 mt-1">Il apparaît dans la bonne catégorie</p>
      </div>
    </motion.div>
  )
}
