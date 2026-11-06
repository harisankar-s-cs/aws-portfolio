// src/components/common/DialogueToast.tsx
import React from 'react'

interface DialogueToastProps {
  message: string
  visible: boolean
}

export function DialogueToast({ message, visible }: DialogueToastProps) {
  if (!visible || !message) return null

  return (
    <div className="fixed bottom-8 left-8 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairlineLight bg-[#141210]/95 shadow-2xl backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp" />
        <span className="font-mono text-xs text-bone tracking-wide">
          "{message}"
        </span>
      </div>
    </div>
  )
}
