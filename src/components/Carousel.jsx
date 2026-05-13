import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VideoCard from './VideoCard'

function ChevronLeft() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export default function Carousel({ category, onSelect }) {
  const scrollRef = useRef(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)
  const [sectionHovered, setSectionHovered] = useState(false)

  const SCROLL_AMOUNT = 820

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 10)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
  }, [])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: 'smooth' })
    setTimeout(updateArrows, 400)
  }

  return (
    <section
      className="relative mb-10"
      onMouseEnter={() => setSectionHovered(true)}
      onMouseLeave={() => setSectionHovered(false)}
    >
      {/* En-tête */}
      <div className="flex items-baseline justify-between px-4 sm:px-6 mb-4 max-w-7xl mx-auto">
        <h2 className="font-cinematic text-xl sm:text-2xl text-white font-normal">
          <span className="mr-2">{category.emoji}</span>
          {category.title}
        </h2>
        <button className="text-gold text-xs tracking-widest uppercase font-body hover:text-gold-light transition-colors">
          Voir tout
        </button>
      </div>

      {/* Zone de défilement */}
      <div className="relative">
        {/* Fondu gauche */}
        <AnimatePresence>
          {canLeft && (
            <motion.div
              className="absolute left-0 top-0 bottom-8 w-16 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #080808, transparent)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        {/* Fondu droit */}
        <motion.div
          className="absolute right-0 top-0 bottom-8 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #080808 30%, transparent)' }}
        />

        {/* Flèche gauche */}
        <AnimatePresence>
          {sectionHovered && canLeft && (
            <motion.button
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 -mt-4 w-10 h-10 flex items-center justify-center rounded-full text-white transition-colors"
              style={{
                background: 'rgba(17,17,17,0.9)',
                border: '1px solid rgba(212,175,55,0.3)',
              }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              onClick={() => scroll(-1)}
              whileHover={{ background: 'rgba(212,175,55,0.15)', borderColor: 'rgba(212,175,55,0.6)' }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Flèche droite */}
        <AnimatePresence>
          {sectionHovered && canRight && (
            <motion.button
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 -mt-4 w-10 h-10 flex items-center justify-center rounded-full text-white transition-colors"
              style={{
                background: 'rgba(17,17,17,0.9)',
                border: '1px solid rgba(212,175,55,0.3)',
              }}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              onClick={() => scroll(1)}
              whileHover={{ background: 'rgba(212,175,55,0.15)', borderColor: 'rgba(212,175,55,0.6)' }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Cartes */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
          onScroll={updateArrows}
        >
          {category.memories.map((memory, i) => (
            <motion.div
              key={memory.id}
              style={{ scrollSnapAlign: 'start' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <VideoCard memory={memory} onSelect={onSelect} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ligne séparatrice */}
      <div
        className="mx-4 sm:mx-6 mt-2 max-w-7xl"
        style={{ height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.08), transparent)' }}
      />
    </section>
  )
}
