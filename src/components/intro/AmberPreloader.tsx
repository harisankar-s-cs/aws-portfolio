// src/components/intro/AmberPreloader.tsx
import React from 'react'

interface AmberPreloaderProps {
  progress: number // 0 to 100
}

export function AmberPreloader({ progress }: AmberPreloaderProps) {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-6 select-none animate-in fade-in duration-500">
      <div className="space-y-2 text-center">
        {/* Thin Amber Hairline Progress Bar */}
        <div className="w-full h-[1px] bg-hairline overflow-hidden relative">
          <div
            className="h-full bg-amber-lamp transition-all duration-150 ease-out shadow-[0_0_8px_#F2A73B]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Technical Minimalist Label */}
        <div className="flex justify-between items-center text-[10px] font-mono text-muted tracking-widest uppercase">
          <span>FILAMENT CALIBRATION</span>
          <span className="text-amber-lamp font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
