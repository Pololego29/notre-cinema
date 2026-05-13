const KEY = 'loveflix_profiles'

const DEFAULTS = [
  { id: 'paul', name: 'Paul', avatarUrl: null, createdAt: '2024-01-01T00:00:00.000Z' },
  { id: 'marie-lou', name: 'Marie-Lou', avatarUrl: null, createdAt: '2024-01-01T00:00:00.000Z' },
]

export function getProfiles() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(DEFAULTS))
      return [...DEFAULTS]
    }
    return JSON.parse(raw)
  } catch {
    return [...DEFAULTS]
  }
}

export function saveProfiles(profiles) {
  localStorage.setItem(KEY, JSON.stringify(profiles))
}

export function addProfile({ name, avatarUrl }) {
  const profiles = getProfiles()
  if (profiles.length >= 56) throw new Error('Maximum 56 profils atteint')
  const profile = {
    id: `profile-${Date.now()}`,
    name: name.trim(),
    avatarUrl: avatarUrl || null,
    createdAt: new Date().toISOString(),
  }
  saveProfiles([...profiles, profile])
  return profile
}

export function updateProfile(id, changes) {
  const updated = getProfiles().map((p) => (p.id === id ? { ...p, ...changes } : p))
  saveProfiles(updated)
  return updated.find((p) => p.id === id)
}

export function deleteProfile(id) {
  saveProfiles(getProfiles().filter((p) => p.id !== id))
}
