// src/components/routes/Home.tsx
import React, { useState, useEffect } from 'react'
import { Hero } from '../sections/Hero'
import { Prologue } from '../sections/Prologue'
import { SelectedWork } from '../sections/SelectedWork'
import { Toolkit } from '../sections/Toolkit'
import { Journey } from '../sections/Journey'
import { UnderTheHood } from '../sections/UnderTheHood'
import { Contact } from '../sections/Contact'
import { Footer } from '../sections/Footer'
import { LightPool } from '../common/LightPool'
import { CloudTerminalModal } from '../common/CloudTerminalModal'

interface HomeProps {
  reducedEffects: boolean
  onToggleReducedEffects: () => void
  onReplayIntro: () => void
  onTriggerDialogue: (key: string, quote: string) => void
}

export function Home({
  reducedEffects,
  onToggleReducedEffects,
  onReplayIntro,
  onTriggerDialogue
}: HomeProps) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  // Hotkey toggle: backtick (`) or tilde (~) opens Cloud Terminal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault()
        setIsTerminalOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="relative w-full">
      {/* Interactive AWS Cloud Terminal Drawer */}
      <CloudTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Editorial Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-hairline">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="font-mono text-xs font-bold text-amber-lamp">// HS</span>
            <span className="font-display text-lg text-bone tracking-tight group-hover:text-amber-lamp transition-colors">
              Harisankar S.
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 font-mono text-xs text-muted">
            <a href="#prologue" className="hover:text-bone transition-colors">Prologue</a>
            <a href="#work" className="hover:text-bone transition-colors">Selected Work</a>
            <a href="#toolkit" className="hover:text-bone transition-colors">Toolkit</a>
            <a href="#journey" className="hover:text-bone transition-colors">Journey</a>
            <a href="#under-the-hood" className="hover:text-bone transition-colors flex items-center gap-1.5 text-bone">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp" />
              <span>Under the hood</span>
            </a>
            <a href="#contact" className="hover:text-bone transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3 text-xs font-mono">
            {/* Interactive CLI Terminal Pill Button */}
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#171513] border border-amber-lamp/50 text-[11px] text-amber-lamp hover:bg-amber-lamp/15 transition-all cursor-pointer font-bold shadow-sm"
              title="Open interactive AWS CLI Terminal (Hotkey: ~)"
              data-cursor="CLI"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp animate-pulse" />
              <span>&gt;_ CLI</span>
            </button>

            {/* Built on AWS chip */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#171513] border border-hairlineLight text-[11px] text-muted">
              <span className="text-[#FF9900] font-bold">AWS</span>
              <span>Amplify Gen 2</span>
            </div>

            <button
              onClick={onReplayIntro}
              className="hidden sm:block px-3 py-1 rounded border border-hairlineLight text-bone hover:border-amber-lamp hover:text-amber-lamp transition-all cursor-pointer text-[11px]"
              title="Replay cinematic lamp sequence"
            >
              Replay Lamp
            </button>
          </div>
        </div>
      </header>

      {/* Main Narrative Flow */}
      <Hero onTriggerDialogue={onTriggerDialogue} />

      <LightPool id="prologue-pool">
        <Prologue />
      </LightPool>

      <LightPool id="work-pool">
        <SelectedWork />
      </LightPool>

      <LightPool id="toolkit-pool">
        <Toolkit onTriggerDialogue={onTriggerDialogue} />
      </LightPool>

      <LightPool id="journey-pool">
        <Journey />
      </LightPool>

      <LightPool id="hood-pool">
        <UnderTheHood />
      </LightPool>

      <LightPool id="contact-pool">
        <Contact onTriggerDialogue={onTriggerDialogue} />
      </LightPool>

      <Footer
        reducedEffects={reducedEffects}
        onToggleReducedEffects={onToggleReducedEffects}
        onReplayIntro={onReplayIntro}
      />
    </div>
  )
}
