// src/hooks/useDialogue.ts
import { useState, useCallback } from 'react'

export interface DialogueToastState {
  message: string
  visible: boolean
  x?: number
  y?: number
}

export function useDialogue() {
  const [toast, setToast] = useState<DialogueToastState>({
    message: '',
    visible: false
  })

  const triggerDialogue = useCallback((key: string, quote: string, clientX?: number, clientY?: number) => {
    try {
      const storageKey = `dialogue_seen_${key}`
      if (sessionStorage.getItem(storageKey)) {
        return // Trigger only once per element per session
      }
      sessionStorage.setItem(storageKey, 'true')

      setToast({
        message: quote,
        visible: true,
        x: clientX,
        y: clientY
      })

      // Auto dismiss after 2.2s as specified
      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }))
      }, 2200)
    } catch (e) {
      // In case sessionStorage is blocked in private browsing
    }
  }, [])

  return { toast, triggerDialogue }
}
