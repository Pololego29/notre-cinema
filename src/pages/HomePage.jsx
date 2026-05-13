import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroBanner from '../components/HeroBanner'
import Carousel from '../components/Carousel'
import VideoModal from '../components/VideoModal'
import MemoryUploadModal from '../components/MemoryUploadModal'
import AccountModal from '../components/AccountModal'
import { CATEGORIES, SITE_NAME, SITE_TAGLINE } from '../config'
import { getMemories } from '../lib/memoriesStorage'

function getYear(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (!isNaN(d.getTime())) return d.getFullYear()
  const match = dateStr.match(/\b(20\d{2}|19\d{2})\b/)
  return match ? parseInt(match[1]) : null
}

function groupByYear(memories) {
  const map = {}
  memories.forEach((m) => {
    const y = getYear(m.date)
    if (!y) return
    if (!map[y]) map[y] = []
    map[y].push(m)
  })
  return Object.entries(map)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, mems]) => ({ year: Number(year), memories: mems }))
}

export default function HomePage({
  profile,
  uploadOpen,
  setUploadOpen,
  accountOpen,
  setAccountOpen,
  onChangeProfile,
  onProfileUpdated,
}) {
  const [memories, setMemories] = useState([])
  const [selectedMemory, setSelectedMemory] = useState(null)

  const loadMemories = () => setMemories(getMemories())

  useEffect(() => { loadMemories() }, [])

  const handleUploaded = (newMemory) => {
    loadMemories()
    setUploadOpen(false)
  }

  const featured = memories[0] || null

  const filledCategories = CATEGORIES.map((cat) => ({
    ...cat,
    memories: memories.filter((m) => m.category === cat.id),
  })).filter((cat) => cat.memories.length > 0)

  const yearGroups = groupByYear(memories)
  const hasContent = memories.length > 0

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <HeroBanner
        memory={featured}
        onPlay={() => featured && setSelectedMemory(featured)}
        onAddMemory={() => setUploadOpen(true)}
      />

      {/* Contenu principal */}
      {hasContent ? (
        <main className="pt-10 pb-20">
          {/* Catégories */}
          {filledCategories.map((category, i) => (
            <motion.section
              key={category.id}
              id={category.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Carousel category={category} onSelect={setSelectedMemory} />
            </motion.section>
          ))}

          {/* Par années */}
          {yearGroups.length > 0 && (
            <section id="par-annees" className="mt-4">
              <div
                className="px-4 sm:px-6 mb-2 max-w-7xl mx-auto"
                style={{
                  height: 1,
                  background: 'linear-gradient(90deg, rgba(212,175,55,0.12), transparent)',
                  marginBottom: 32,
                }}
              />
              <div className="px-4 sm:px-6 mb-6 max-w-7xl mx-auto">
                <h2 className="font-cinematic text-xl sm:text-2xl text-white font-normal">
                  Par années
                </h2>
              </div>
              {yearGroups.map((group, i) => (
                <motion.div
                  key={group.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <Carousel
                    category={{
                      id: `year-${group.year}`,
                      title: String(group.year),
                      memories: group.memories,
                    }}
                    onSelect={setSelectedMemory}
                  />
                </motion.div>
              ))}
            </section>
          )}
        </main>
      ) : (
        <EmptyState onAddMemory={() => setUploadOpen(true)} />
      )}

      {/* Pied de page */}
      <footer
        className="py-16 flex flex-col items-center text-center px-4"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(139,0,0,0.06) 0%, transparent 70%)',
        }}
      >
        <div
          className="mb-6"
          style={{ height: 1, width: 60, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)' }}
        />
        <p className="font-cinematic text-xl text-white/80 font-normal mb-2">{SITE_NAME}</p>
        <p className="font-body text-xs text-white/25 tracking-widest">{SITE_TAGLINE}</p>
        <div
          className="mt-6"
          style={{ height: 1, width: 60, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)' }}
        />
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedMemory && (
          <VideoModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {uploadOpen && (
          <MemoryUploadModal
            onClose={() => setUploadOpen(false)}
            onUploaded={handleUploaded}
            profile={profile}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {accountOpen && (
          <AccountModal
            profile={profile}
            onClose={() => setAccountOpen(false)}
            onChangeProfile={onChangeProfile}
            onProfileUpdated={onProfileUpdated}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function EmptyState({ onAddMemory }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-24 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: 'rgba(196,30,58,0.08)', border: '1px solid rgba(196,30,58,0.15)' }}
      >
        <svg width="24" height="24" fill="none" stroke="rgba(196,30,58,0.6)" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      </div>
      <h3 className="font-cinematic text-2xl text-white font-normal mb-3">
        Votre histoire commence ici
      </h3>
      <p className="font-body text-sm text-white/35 max-w-xs leading-relaxed mb-8">
        Ajoutez vos premiers souvenirs — photos et vidéos — pour construire votre cinéma privé.
      </p>
      <motion.button
        onClick={onAddMemory}
        className="px-8 py-3 font-body text-sm tracking-widest uppercase text-white rounded-lg"
        style={{ background: 'linear-gradient(135deg, #8B0000, #C41E3A)' }}
        whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(196,30,58,0.4)' }}
        whileTap={{ scale: 0.97 }}
      >
        Ajouter un souvenir
      </motion.button>
    </motion.div>
  )
}
