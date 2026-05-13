import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function CloseIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function Tag({ label }) {
  return (
    <span
      className="text-xs font-body px-2.5 py-1 rounded-full"
      style={{
        background: 'rgba(212,175,55,0.1)',
        border: '1px solid rgba(212,175,55,0.2)',
        color: '#D4AF37',
      }}
    >
      {label}
    </span>
  )
}

export default function VideoModal({ memory, onClose }) {
  const videoRef = useRef(null)

  // Fermer avec Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!memory) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ background: 'rgba(4,4,4,0.96)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Fenêtre modale */}
        <motion.div
          className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden"
          style={{
            background: '#111111',
            border: '1px solid rgba(212,175,55,0.12)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
            maxHeight: '90vh',
          }}
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-colors"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <CloseIcon />
          </button>

          <div className="overflow-y-auto" style={{ maxHeight: '90vh' }}>
            {/* Zone vidéo / image */}
            <div className="relative w-full" style={{ aspectRatio: '16/9', background: '#000' }}>
              {memory.video ? (
                <video
                  ref={videoRef}
                  src={memory.video}
                  poster={memory.thumbnail}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  style={{ outline: 'none' }}
                />
              ) : (
                <>
                  <img
                    src={memory.thumbnail}
                    alt={memory.title}
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.5) saturate(0.7)' }}
                  />
                  {/* Overlay "ajouter une vidéo" */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '2px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      <svg width="28" height="28" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v8M8 12h8" />
                      </svg>
                    </div>
                    <p className="text-white/30 text-xs font-body text-center max-w-xs leading-relaxed">
                      Glisse une vidéo ici ou modifie{' '}
                      <code className="text-gold/50">src/data/mockData.js</code>
                      {' '}pour ajouter le chemin de ta vidéo
                    </p>
                  </div>
                </>
              )}

              {/* Dégradé bas */}
              <div
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #111111, transparent)' }}
              />
            </div>

            {/* Contenu texte */}
            <div className="px-6 pb-8 pt-5">
              {/* Titre */}
              <h2 className="font-cinematic text-2xl sm:text-3xl text-white font-normal mb-2 leading-snug">
                {memory.title}
              </h2>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-5 text-sm text-white/50 font-body">
                {memory.date && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-crimson text-base">📅</span>
                    {memory.date}
                  </span>
                )}
                {memory.location && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-gold text-base">📍</span>
                    {memory.location}
                  </span>
                )}
                {memory.duration && (
                  <>
                    <span className="text-white/20">·</span>
                    <span>{memory.duration}</span>
                  </>
                )}
              </div>

              {/* Ligne dorée */}
              <div
                className="mb-5"
                style={{ height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)' }}
              />

              {/* Description */}
              <p className="text-white/70 text-sm sm:text-base leading-relaxed font-body mb-6">
                {memory.description}
              </p>

              {/* Tags */}
              {memory.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {memory.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
