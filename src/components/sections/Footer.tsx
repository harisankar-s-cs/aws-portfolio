// src/components/sections/Footer.tsx
import React from 'react'
import { personal } from '../../content/personal'

interface FooterProps {
  reducedEffects: boolean
  onToggleReducedEffects: () => void
  onReplayIntro: () => void
}

export function Footer({
  reducedEffects,
  onToggleReducedEffects,
  onReplayIntro
}: FooterProps) {
  return (
    <footer className="hairline-t bg-[#0B0A09] py-12 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-muted">
      
      {/* Left: AWS Amplify Attribution */}
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-amber-lamp" />
        <span className="text-bone font-medium">Built on AWS Amplify Hosting</span>
        <span>— Global Edge Distribution</span>
      </div>

      {/* Center / Right: Accessibility & Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={onToggleReducedEffects}
          className="hover:text-bone transition-colors underline cursor-pointer"
        >
          {reducedEffects ? 'Restore Effects' : 'Reduce Effects'}
        </button>

        <button
          onClick={onReplayIntro}
          className="hover:text-bone transition-colors underline cursor-pointer"
        >
          Replay Cinematic Intro
        </button>

        <span className="text-muted/60">
          © {new Date().getFullYear()} {personal.name}
        </span>
      </div>

    </footer>
  )
}
