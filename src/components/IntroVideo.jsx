import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroVideo({ onComplete }) {
  const videoRef = useRef(null)
  const [status, setStatus] = useState('loading') // loading | playing | blocked
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryPlay = () => {
      video.muted = false
      video.play()
        .then(() => { setStatus('playing'); setIsMuted(false) })
        .catch(() => {
          video.muted = true
          video.play()
            .then(() => { setStatus('playing'); setIsMuted(true) })
            .catch(() => setStatus('blocked'))
        })
    }

    if (video.readyState >= 3) {
      tryPlay()
    } else {
      video.addEventListener('canplay', tryPlay, { once: true })
    }
  }, [])

  const handleManualPlay = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play()
      .then(() => { setStatus('playing'); setIsMuted(true) })
      .catch(() => {})
  }

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      <video
        ref={videoRef}
        src="/intro%20site.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        onEnded={onComplete}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}
      />

      {/* Bouton Passer */}
      <AnimatePresence>
        {status === 'playing' && (
          <motion.button
            className="absolute top-6 right-6 font-body text-xs text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-5 py-2 tracking-widest uppercase transition-colors duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.4 }}
            onClick={onComplete}
          >
            Passer
          </motion.button>
        )}
      </AnimatePresence>

      {/* Autoplay bloqué */}
      {status === 'blocked' && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          style={{ background: 'rgba(0,0,0,0.75)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={handleManualPlay}
            className="font-cinematic text-2xl text-white border border-white/25 hover:border-white/65 px-14 py-5 hover:bg-white/5 transition-all duration-300"
          >
            Lancer l'intro
          </button>
          <button
            onClick={onComplete}
            className="font-body text-xs text-white/30 hover:text-white/65 tracking-widest uppercase transition-colors duration-200"
          >
            Passer
          </button>
        </motion.div>
      )}

      {/* Indicateur muet */}
      <AnimatePresence>
        {isMuted && status === 'playing' && (
          <motion.div
            className="absolute bottom-6 left-6 flex items-center gap-2 font-body text-xs"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2 }}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
            Lecture muette
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
