const KEY = 'loveflix_memories'

export function getMemories() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export async function uploadMemory(metadata, file, thumbnailFile) {
  const isVideo = file?.type?.startsWith('video/')
  const memory = {
    id: `memory-${Date.now()}`,
    title: metadata.title,
    description: metadata.description || '',
    category: metadata.category,
    date: metadata.date || '',
    location: metadata.location || '',
    type: isVideo ? 'video' : 'image',
    isTemporary: false,
    createdAt: new Date().toISOString(),
    profile_owner: metadata.profile_owner || null,
    thumbnail: null,
    video: null,
    file_url: null,
  }

  if (file) {
    if (isVideo) {
      const url = URL.createObjectURL(file)
      memory.file_url = url
      memory.video = url
      memory.isTemporary = true
    } else {
      const base64 = await fileToBase64(file)
      memory.file_url = base64
      memory.thumbnail = base64
    }
  }

  if (thumbnailFile) {
    try {
      memory.thumbnail = await fileToBase64(thumbnailFile)
    } catch {
      // ignore
    }
  }

  const memories = getMemories()
  memories.unshift(memory)
  try {
    localStorage.setItem(KEY, JSON.stringify(memories))
  } catch {
    memory.isTemporary = true
  }
  return memory
}

export function deleteMemory(id) {
  const updated = getMemories().filter((m) => m.id !== id)
  localStorage.setItem(KEY, JSON.stringify(updated))
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
