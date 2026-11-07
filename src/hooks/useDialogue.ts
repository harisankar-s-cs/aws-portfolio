// src/hooks/useDialogue.ts
import { useState, useCallback, useRef } from 'react'

export interface DialogueToastState {
  message: string
  visible: boolean
  source?: string
}

export function useDialogue() {
  const [toast, setToast] = useState<DialogueToastState>({
    message: '',
    visible: false
  })

  // Timestamp tracking for cooldown per key (6 seconds cooldown instead of permanent session lockout)
  const lastTriggerRef = useRef<Map<string, number>>(new Map())
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null)

  const triggerDialogue = useCallback((key: string, quote: string) => {
    const now = Date.now()
    const lastTime = lastTriggerRef.current.get(key) || 0

    // Cooldown of 5.5 seconds per specific quote key to prevent jitter spam while staying repeatable
    if (now - lastTime < 5500) {
      return
    }
    lastTriggerRef.current.set(key, now)

    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current)
    }

    setToast({
      message: quote,
      visible: true,
      source: key
    })

    // Display for 3.5s so it's comfortably readable
    dismissTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 3500)
  }, [])

  return { toast, triggerDialogue }
}
