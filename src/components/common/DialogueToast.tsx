// src/components/common/DialogueToast.tsx
import React from 'react'

interface DialogueToastProps {
  message: string
  visible: boolean
}

export function DialogueToast({ message, visible }: DialogueToastProps) {
  if (!visible || !message) return null

  return (
    <aside 
      aria-label="Cinematic dialogue toast"
      className="fixed bottom-6 left-6 z-50 pointer-events-none transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-3"
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-amber-lamp/50 bg-[#141210]/95 text-bone shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_24px_rgba(242,167,59,0.18)] backdrop-blur-md">
        <span className="flex h-2.5 w-2.5 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-lamp opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-lamp" />
        </span>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] tracking-widest uppercase text-amber-lamp font-bold flex items-center gap-1.5">
            <span>// DIALOGUE TRANSMISSION</span>
          </span>
          <span className="font-mono text-xs sm:text-sm text-bone tracking-wide font-normal pt-0.5">
            "{message}"
          </span>
        </div>
      </div>
    </aside>
  )
}
