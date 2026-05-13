import { motion } from 'framer-motion'

function PlayIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="8" strokeLinecap="round" strokeWidth="3" />
      <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

export default function HeroBanner({ featured, onPlay, onDetails }) {
  return (
    <section
      id="hero"
      className="relative w-full"
      style={{ minHeight: '95vh' }}
    >
      {/* Image de fond */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={featured.thumbnail}
          alt={featured.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.45) saturate(0.8)' }}
        />
      </motion.div>

      {/* Dégradés */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.3) 60%, transparent 100%),
            linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.4) 30%, transparent 60%),
            linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, transparent 20%)
          `,
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 h-full flex items-end pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs tracking-[0.25em] uppercase font-body font-medium px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  color: '#D4AF37',
                }}
              >
                À la une
              </span>
              {featured.location && (
                <span className="text-white/40 text-xs font-body">
                  📍 {featured.location}
                </span>
              )}
            </div>

            {/* Titre */}
            <h2 className="font-cinematic text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight mb-3">
              {featured.title}
            </h2>

            {/* Sous-titre */}
            {featured.subtitle && (
              <p className="font-cinematic italic text-gold text-lg mb-4 opacity-90">
                {featured.subtitle}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-3 mb-5 text-sm text-white/50 font-body">
              {featured.date && <span>📅 {featured.date}</span>}
              {featured.duration && (
                <>
                  <span className="text-white/20">·</span>
                  <span>{featured.duration}</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8 font-body max-w-md line-clamp-3">
              {featured.description}
            </p>

            {/* Boutons */}
            <div className="flex items-center gap-3 flex-wrap">
              <motion.button
                onClick={onPlay}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-body text-sm font-medium tracking-wide text-white transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #8B0000, #C41E3A)',
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 8px 30px rgba(196,30,58,0.5)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                <PlayIcon />
                Regarder
              </motion.button>

              <motion.button
                onClick={onDetails}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-body text-sm font-medium tracking-wide text-white transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={{
                  scale: 1.04,
                  background: 'rgba(255,255,255,0.2)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                <InfoIcon />
                Détails
              </motion.button>
            </div>

            {/* Tags */}
            {featured.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-white/40 font-body tracking-wide"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
