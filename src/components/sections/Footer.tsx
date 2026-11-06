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
      
      {/* Left: AWS Amplify Attribution & Visitor Counter */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-amber-lamp" />
        <span className="text-bone font-medium">Built on AWS Amplify Gen 2</span>
        <span>— Global Edge Distribution</span>
        <span className="text-muted/40">•</span>
        <span className="px-2 py-0.5 rounded bg-[#141210] border border-hairlineLight text-[11px] text-amber-lamp">
          DynamoDB Counter: #1,420
        </span>
      </div>

      {/* Center / Right: Accessibility & Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={onReplayIntro}
          className="hover:text-amber-lamp text-muted transition-colors underline cursor-pointer"
        >
          Replay Lamp Intro
        </button>

        <span className="text-muted/60">
          © {new Date().getFullYear()} {personal.name}
        </span>
      </div>

    </footer>
  )
}
