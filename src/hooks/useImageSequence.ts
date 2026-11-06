// src/hooks/useImageSequence.ts
import { useEffect, useRef, useState, useCallback } from 'react'

export interface ImageSequenceConfig {
  frameCount: number
  framePath: (index: number) => string
  windowSize?: number // Sliding window cache size (default: 24 frames)
}

export function useImageSequence({
  frameCount,
  framePath,
  windowSize = 24
}: ImageSequenceConfig) {
  const [currentFrame, setCurrentFrame] = useState(1)
  const [isInitialLoaded, setIsInitialLoaded] = useState(false)
  const imageCacheRef = useRef<Map<number, HTMLImageElement>>(new Map())
  const loadingQueueRef = useRef<Set<number>>(new Set())

  // Helper to load a single frame
  const loadFrame = useCallback((index: number): Promise<HTMLImageElement> => {
    if (imageCacheRef.current.has(index)) {
      return Promise.resolve(imageCacheRef.current.get(index)!)
    }

    if (loadingQueueRef.current.has(index)) {
      return new Promise((resolve) => {
        const check = setInterval(() => {
          if (imageCacheRef.current.has(index)) {
            clearInterval(check)
            resolve(imageCacheRef.current.get(index)!)
          }
        }, 30)
      })
    }

    loadingQueueRef.current.add(index)
    return new Promise((resolve) => {
      const img = new Image()
      img.src = framePath(index)
      img.onload = () => {
        imageCacheRef.current.set(index, img)
        loadingQueueRef.current.delete(index)
        resolve(img)
      }
      img.onerror = () => {
        loadingQueueRef.current.delete(index)
      }
    })
  }, [framePath])

  // Initial load: Load the first 12 frames immediately
  useEffect(() => {
    const initialBatch = Array.from({ length: Math.min(12, frameCount) }, (_, i) => i + 1)
    Promise.all(initialBatch.map(loadFrame)).then(() => {
      setIsInitialLoaded(true)
    })

    // Progressively load remaining frames in idle time
    const loadRemaining = () => {
      for (let i = 13; i <= frameCount; i++) {
        loadFrame(i)
      }
    }

    if ('requestIdleCallback' in window) {
      ;(window as any).requestIdleCallback(loadRemaining)
    } else {
      setTimeout(loadRemaining, 500)
    }
  }, [frameCount, loadFrame])

  // Memory Safety: Manage sliding window around current frame
  const setFrameWithMemoryManagement = useCallback((targetIndex: number) => {
    const clamped = Math.max(1, Math.min(frameCount, targetIndex))
    setCurrentFrame(clamped)

    // Ensure nearby frames in window are loaded
    const start = Math.max(1, clamped - Math.floor(windowSize / 2))
    const end = Math.min(frameCount, clamped + Math.floor(windowSize / 2))
    for (let i = start; i <= end; i++) {
      if (!imageCacheRef.current.has(i) && !loadingQueueRef.current.has(i)) {
        loadFrame(i)
      }
    }

    // Prune frames outside sliding window if cache exceeds 48 frames
    if (imageCacheRef.current.size > 48) {
      for (const [key] of imageCacheRef.current.entries()) {
        if (key < start - 6 || key > end + 6) {
          imageCacheRef.current.delete(key)
        }
      }
    }
  }, [frameCount, windowSize, loadFrame])

  const getCurrentImage = useCallback((): HTMLImageElement | null => {
    return imageCacheRef.current.get(currentFrame) || null
  }, [currentFrame])

  return {
    currentFrame,
    setFrame: setFrameWithMemoryManagement,
    getCurrentImage,
    isInitialLoaded
  }
}
