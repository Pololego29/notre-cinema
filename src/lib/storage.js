const STORAGE_KEY = 'loveflix_memories'

export function getMemories() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export async function uploadMemory(metadata, file, thumbnailFile) {
  const isVideo = file?.type?.startsWith('video/')
  const memory = {
    id: `user-${Date.now()}`,
    title: metadata.title,
    description: metadata.description || '',
    category: metadata.category,
    date: metadata.memory_date || '',
    location: metadata.location || '',
    tags: metadata.tags || [],
    duration: '',
    isUserUploaded: true,
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
      // Videos are too large for localStorage — object URL is session-only
      const objectUrl = URL.createObjectURL(file)
      memory.file_url = objectUrl
      memory.video = objectUrl
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
      // ignore thumbnail error
    }
  }

  if (!memory.thumbnail && !isVideo) {
    memory.thumbnail = memory.file_url
  }

  const memories = getMemories()
  memories.unshift(memory)

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories))
  } catch {
    // localStorage quota exceeded — only available this session
    memory.isTemporary = true
  }

  return memory
}

export function deleteMemory(id) {
  const updated = getMemories().filter((m) => m.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
