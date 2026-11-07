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
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/90 border-b border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 whitespace-nowrap group">
            <span className="font-mono text-sm sm:text-base font-bold text-amber-lamp">// HS</span>
            <span className="font-display text-lg sm:text-2xl text-bone tracking-tight group-hover:text-amber-lamp transition-colors">
              Harisankar S.
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 font-mono text-xs xl:text-sm text-muted shrink-0">
            <a href="#prologue" className="hover:text-bone transition-colors whitespace-nowrap">Prologue</a>
            <a href="#work" className="hover:text-bone transition-colors whitespace-nowrap">Selected Work</a>
            <a href="#toolkit" className="hover:text-bone transition-colors whitespace-nowrap">Toolkit</a>
            <a href="#journey" className="hover:text-bone transition-colors whitespace-nowrap">Journey</a>
            <a href="#under-the-hood" className="hover:text-bone transition-colors whitespace-nowrap flex items-center gap-2 text-bone font-medium">
              <span className="h-2 w-2 rounded-full bg-amber-lamp animate-pulse" />
              <span>Under the hood</span>
            </a>
            <a href="#contact" className="hover:text-bone transition-colors whitespace-nowrap">Contact</a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 font-mono">
            {/* Interactive CLI Terminal Pill Button */}
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#171513] border border-amber-lamp/60 text-xs sm:text-sm text-amber-lamp hover:bg-amber-lamp/15 transition-all cursor-pointer font-bold shadow-sm whitespace-nowrap"
              title="Open interactive AWS CLI Terminal (Hotkey: ~)"
              data-cursor="CLI"
            >
              <span className="h-2 w-2 rounded-full bg-amber-lamp animate-pulse" />
              <span>&gt;_ CLI</span>
            </button>

            {/* Built on AWS chip */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#171513] border border-hairlineLight text-xs text-muted font-medium whitespace-nowrap">
              <span className="text-[#FF9900] font-bold">AWS</span>
              <span>Amplify Gen 2</span>
            </div>

            <button
              onClick={onReplayIntro}
              className="hidden md:block px-3 py-1.5 rounded-lg border border-hairlineLight text-bone hover:border-amber-lamp hover:text-amber-lamp transition-all cursor-pointer text-xs whitespace-nowrap"
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
