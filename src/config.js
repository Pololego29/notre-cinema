// ─── Configuration du site ────────────────────────────────────────────────────
// Modifie ces valeurs pour personnaliser ton site

export const PASSWORD = 'amour'          // Mot de passe d'accès au site
export const SITE_NAME = 'LoveFlix'      // Nom du site (affiché dans le logo)
export const SITE_TAGLINE = 'Notre histoire · Notre écran'
export const COUPLE_NAMES = 'Nous deux'  // Affiché dans le hero

// Activer l'animation d'intro à chaque nouvelle session
export const SHOW_INTRO = true

// ─── Profils ──────────────────────────────────────────────────────────────────
export const PROFILES = [
  {
    id: 'paul',
    name: 'Paul',
    initial: 'P',
    bgGradient: 'linear-gradient(135deg, #6B0F1A 0%, #C41E3A 50%, #8B0000 100%)',
  },
  {
    id: 'marie-lou',
    name: 'Marie-Lou',
    initial: 'M',
    bgGradient: 'linear-gradient(135deg, #5C4400 0%, #D4AF37 50%, #8B7420 100%)',
  },
]

// ─── Catégories d'upload ──────────────────────────────────────────────────────
export const UPLOAD_CATEGORIES = [
  { id: 'meilleurs-moments', label: 'Nos meilleurs moments' },
  { id: 'voyages', label: 'Nos voyages' },
  { id: 'dates', label: 'Nos dates' },
  { id: 'classiques', label: 'Nos classiques' },
  { id: 'anniversaires', label: 'Anniversaires' },
  { id: 'moments-droles', label: 'Moments drôles' },
]
