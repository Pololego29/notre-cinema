import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SITE_NAME, SITE_TAGLINE } from '../config'

// Particule dorée flottante
function Particle({ index }) {
  const left = (index * 37 + 13) % 100
  const size = (index % 3) + 1.5
  const delay = (index * 0.3) % 4
  const duration = 3 + (index % 3)

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${left}%`,
        bottom: '-10px',
        width: size,
        height: size,
        background: index % 3 === 0 ? '#D4AF37' : index % 3 === 1 ? '#C41E3A' : '#ffffff',
        opacity: 0.6,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: -(500 + (index * 50) % 400),
        opacity: [0, 0.8, 0],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        repeatDelay: (index * 0.5) % 3,
        ease: 'easeOut',
      }}
    />
  )
}

// Animation de la ligne dorée qui s'étend
const Line = ({ animate }) => (
  <motion.div
    style={{
      height: 1,
      background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
    }}
    initial={{ width: 0, opacity: 0 }}
    animate={animate ? { width: 320, opacity: 1 } : {}}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
  />
)

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1300),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setLeaving(true), 3600),
      setTimeout(() => onComplete(), 4400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  const [before, after] = SITE_NAME.split(' ')

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex items-center justify-center overflow-hidden"
      animate={leaving ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeIn' }}
    >
      {/* Particules */}
      {Array.from({ length: 18 }, (_, i) => (
        <Particle key={i} index={i} />
      ))}

      {/* Contenu central */}
      <div className="relative flex flex-col items-center gap-5 z-10">
        {/* Ligne haute */}
        <Line animate={phase >= 1} />

        {/* "Notre" en petites majuscules */}
        <motion.span
          className="tracking-[0.5em] text-xs uppercase font-body text-gold-dim"
          initial={{ opacity: 0, y: 8 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {before || 'Notre'}
        </motion.span>

        {/* Titre principal */}
        <motion.h1
          className="font-cinematic text-6xl sm:text-7xl md:text-8xl font-normal leading-none"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="text-white">{after || 'Cinéma'}</span>
        </motion.h1>

        {/* Séparateur avec cœur */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <div style={{ height: 1, width: 48, background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
          <span className="text-crimson text-2xl" style={{ textShadow: '0 0 20px rgba(196,30,58,0.6)' }}>
            ♥
          </span>
          <div style={{ height: 1, width: 48, background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
        </motion.div>

        {/* Ligne basse */}
        <Line animate={phase >= 1} />

        {/* Tagline */}
        <motion.p
          className="text-white/40 text-xs tracking-[0.25em] uppercase font-body mt-2"
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {SITE_TAGLINE}
        </motion.p>
      </div>

      {/* Vignette radiale */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(8,8,8,0.6) 100%)',
        }}
      />
    </motion.div>
  )
}
