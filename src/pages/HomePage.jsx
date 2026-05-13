import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroBanner from '../components/HeroBanner'
import Carousel from '../components/Carousel'
import VideoModal from '../components/VideoModal'
import { featured, categories } from '../data/mockData'
import { SITE_NAME, SITE_TAGLINE } from '../config'

export default function HomePage() {
  const [selectedMemory, setSelectedMemory] = useState(null)

  const openMemory = (memory) => setSelectedMemory(memory)
  const closeMemory = () => setSelectedMemory(null)

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <HeroBanner
        featured={featured}
        onPlay={() => openMemory(featured)}
        onDetails={() => openMemory(featured)}
      />

      {/* Carousels */}
      <main id="memories" className="pt-8 pb-16">
        {categories.map((category, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Carousel category={category} onSelect={openMemory} />
          </motion.div>
        ))}
      </main>

      {/* Section À propos */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 flex flex-col items-center text-center"
        style={{
          background:
            'radial-gradient(ellipse at center bottom, rgba(139,0,0,0.08) 0%, transparent 70%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-md"
        >
          <div
            className="mb-6 mx-auto"
            style={{ height: 1, width: 80, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          />
          <span className="text-crimson text-4xl mb-4 block animate-float">♥</span>
          <h3 className="font-cinematic text-2xl text-white mb-3 font-normal">
            {SITE_NAME}
          </h3>
          <p className="text-white/40 text-sm font-body leading-relaxed mb-6">
            {SITE_TAGLINE}
          </p>
          <p className="text-white/30 text-xs font-body leading-relaxed">
            Ce site est notre espace privé — un cinéma pour deux, où chaque
            souvenir devient un film, chaque moment un chef-d'œuvre à garder
            pour toujours.
          </p>
          <div
            className="mt-8 mx-auto"
            style={{ height: 1, width: 80, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          />
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <VideoModal memory={selectedMemory} onClose={closeMemory} />
        )}
      </AnimatePresence>
    </div>
  )
}
