import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function PlayIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="8" strokeLinecap="round" strokeWidth="3" />
      <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

export default function VideoCard({ memory, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <motion.article
      className="relative flex-shrink-0 cursor-pointer select-none"
      style={{ width: 260 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? 'hover' : 'idle'}
      onClick={() => onSelect(memory)}
    >
      {/* Conteneur image */}
      <motion.div
        className="relative w-full rounded-lg overflow-hidden"
        style={{ aspectRatio: '16/9' }}
        variants={{
          idle: { scale: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.4)' },
          hover: { scale: 1.06, boxShadow: '0 20px 50px rgba(0,0,0,0.8)' },
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Thumbnail */}
        {!imgError ? (
          <img
            src={memory.thumbnail}
            alt={memory.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, hsl(${memory.id.length * 37 % 360},40%,15%), hsl(${(memory.id.length * 37 + 60) % 360},30%,10%))`,
            }}
          >
            <span className="text-4xl opacity-30">🎬</span>
          </div>
        )}

        {/* Overlay au hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-3"
              style={{
                background:
                  'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 50%, rgba(8,8,8,0.1) 100%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Boutons d'action */}
              <motion.div
                className="flex items-center gap-2 mb-2"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
              >
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-body font-medium text-white transition-colors"
                  style={{ background: 'linear-gradient(135deg, #8B0000, #C41E3A)' }}
                  onClick={(e) => { e.stopPropagation(); onSelect(memory) }}
                >
                  <PlayIcon />
                  Regarder
                </button>
                <button
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-body text-white/80 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
                  onClick={(e) => { e.stopPropagation(); onSelect(memory) }}
                >
                  <InfoIcon />
                </button>
              </motion.div>

              {/* Titre et date au hover */}
              <motion.p
                className="text-white text-xs font-cinematic italic opacity-80 leading-snug"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.08 }}
              >
                📍 {memory.location}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Durée */}
        {memory.duration && (
          <div
            className="absolute bottom-2 right-2 text-xs text-white/70 font-body px-1.5 py-0.5 rounded"
            style={{
              background: 'rgba(0,0,0,0.7)',
              display: hovered ? 'none' : 'block',
            }}
          >
            {memory.duration}
          </div>
        )}
      </motion.div>

      {/* Infos sous la carte */}
      <motion.div
        className="mt-2.5 px-0.5"
        variants={{
          idle: { opacity: 1 },
          hover: { opacity: 0.7 },
        }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="font-cinematic text-sm text-white leading-tight line-clamp-1 font-normal">
          {memory.title}
        </h3>
        <p className="text-white/40 text-xs font-body mt-0.5">
          {memory.date}
          {memory.location && ` · ${memory.location}`}
        </p>
      </motion.div>
    </motion.article>
  )
}
