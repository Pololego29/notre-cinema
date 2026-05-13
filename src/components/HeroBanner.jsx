import { motion } from 'framer-motion'
import { SITE_NAME, SITE_TAGLINE } from '../config'
import { formatDate } from '../lib/memoriesStorage'

function PlayIcon() {
  return (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export default function HeroBanner({ memory, onPlay, onAddMemory }) {
  if (!memory) {
    return <EmptyHero onAddMemory={onAddMemory} />
  }

  return (
    <section id="hero" className="relative w-full" style={{ minHeight: '88vh' }}>
      {/* Image de fond */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {memory.thumbnail ? (
          <img
            src={memory.thumbnail}
            alt={memory.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4) saturate(0.75)' }}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, #0d0d0d 0%, #1a0a0a 50%, #0d0d0d 100%)',
            }}
          />
        )}
      </motion.div>

      {/* Dégradés */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.3) 55%, transparent 100%),
            linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.35) 28%, transparent 55%),
            linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 18%)
          `,
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 h-full flex items-end pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs tracking-[0.22em] uppercase font-body font-medium px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(212,175,55,0.12)',
                  border: '1px solid rgba(212,175,55,0.28)',
                  color: '#D4AF37',
                }}
              >
                Dernier souvenir
              </span>
            </div>

            {/* Titre */}
            <h2 className="font-cinematic text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight mb-3">
              {memory.title}
            </h2>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5 text-sm text-white/45 font-body">
              {memory.date && <span>{formatDate(memory.date)}</span>}
              {memory.date && memory.location && (
                <span className="text-white/20">·</span>
              )}
              {memory.location && <span>{memory.location}</span>}
            </div>

            {/* Description */}
            {memory.description && (
              <p className="text-white/65 text-sm md:text-base leading-relaxed mb-8 font-body max-w-md line-clamp-3">
                {memory.description}
              </p>
            )}

            {/* Boutons */}
            <div className="flex items-center gap-3 flex-wrap">
              <motion.button
                onClick={onPlay}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-body text-sm font-medium tracking-wide text-white"
                style={{ background: 'linear-gradient(135deg, #8B0000, #C41E3A)' }}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(196,30,58,0.45)' }}
                whileTap={{ scale: 0.97 }}
              >
                <PlayIcon />
                {memory.type === 'video' ? 'Regarder' : 'Voir'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function EmptyHero({ onAddMemory }) {
  return (
    <section
      id="hero"
      className="relative w-full flex items-center justify-center"
      style={{ minHeight: '60vh' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139,0,0,0.06) 0%, rgba(8,8,8,0) 70%)',
        }}
      />
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="mb-8 mx-auto"
          style={{
            height: 1,
            width: 60,
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
          }}
        />
        <h1 className="font-cinematic text-5xl sm:text-6xl md:text-7xl text-white font-normal mb-4 leading-tight">
          {SITE_NAME}
        </h1>
        <p className="font-body text-white/35 text-sm tracking-widest mb-12">
          {SITE_TAGLINE}
        </p>
        <motion.button
          onClick={onAddMemory}
          className="flex items-center gap-2 px-8 py-3.5 rounded-lg font-body text-sm tracking-widest uppercase text-white"
          style={{ background: 'linear-gradient(135deg, #8B0000, #C41E3A)' }}
          whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(196,30,58,0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          <PlusIcon />
          Ajouter un souvenir
        </motion.button>
        <div
          className="mt-10 mx-auto"
          style={{
            height: 1,
            width: 60,
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
