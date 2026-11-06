// src/hooks/usePreloadAssets.ts
import { useState, useEffect } from 'react'

export interface PreloadState {
  progress: number // 0 to 100
  isLoaded: boolean
  loadedCount: number
  totalCount: number
}

const ASSETS_TO_PRELOAD = [
  { url: '/assets/portrait.webp', type: 'image' },
  { url: '/assets/portrait-depth.webp', type: 'image' },
  { url: '/assets/switch-click.wav', type: 'audio' },
  { url: '/profile.png', type: 'image' },
]

export function usePreloadAssets(): PreloadState {
  const [loadedCount, setLoadedCount] = useState(0)
  const totalCount = ASSETS_TO_PRELOAD.length + 1 // +1 for document.fonts.ready

  useEffect(() => {
    let mounted = true
    let count = 0

    const increment = () => {
      if (!mounted) return
      count++
      setLoadedCount(count)
    }

    // 1. Preload image & audio assets
    ASSETS_TO_PRELOAD.forEach((item) => {
      if (item.type === 'image') {
        const img = new Image()
        img.src = item.url
        img.onload = increment
        img.onerror = increment
      } else if (item.type === 'audio') {
        const audio = new Audio()
        audio.src = item.url
        audio.oncanplaythrough = increment
        audio.onerror = increment
        audio.load()
      }
    })

    // 2. Preload fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(increment).catch(increment)
    } else {
      increment()
    }

    return () => {
      mounted = false
    }
  }, [totalCount])

  const progress = Math.min(100, Math.round((loadedCount / totalCount) * 100))
  const isLoaded = loadedCount >= totalCount

  return {
    progress,
    isLoaded,
    loadedCount,
    totalCount,
  }
}
