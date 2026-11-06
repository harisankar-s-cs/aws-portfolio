// src/components/routes/Home.tsx
import React from 'react'
import { Hero } from '../sections/Hero'
import { StoryScroller } from '../sections/StoryScroller'
import { SelectedWork } from '../sections/SelectedWork'
import { Toolkit } from '../sections/Toolkit'
import { Journey } from '../sections/Journey'
import { Architecture } from '../sections/Architecture'
import { Contact } from '../sections/Contact'
import { Footer } from '../sections/Footer'

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
  return (
    <div className="relative w-full">
      {/* Editorial Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-hairline">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="font-mono text-xs font-bold text-amber-lamp">// HS</span>
            <span className="font-display text-lg text-bone tracking-tight group-hover:text-amber-lamp transition-colors">
              Harisankar S.
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-mono text-xs text-muted">
            <a href="#work" className="hover:text-bone transition-colors">Selected Work</a>
            <a href="#toolkit" className="hover:text-bone transition-colors">Toolkit</a>
            <a href="#journey" className="hover:text-bone transition-colors">Journey</a>
            <a href="#architecture" className="hover:text-bone transition-colors flex items-center gap-1.5 text-bone">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp" />
              <span>AWS Architecture</span>
            </a>
            <a href="#contact" className="hover:text-bone transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              onClick={onReplayIntro}
              className="px-3 py-1 rounded border border-hairlineLight text-bone hover:border-amber-lamp hover:text-amber-lamp transition-all cursor-pointer"
              title="Replay cinematic oil lamp ignition"
            >
              Replay Intro
            </button>
          </div>
        </div>
      </header>

      <Hero onTriggerDialogue={onTriggerDialogue} />
      <StoryScroller />
      <SelectedWork />
      <Toolkit onTriggerDialogue={onTriggerDialogue} />
      <Journey />
      <Architecture />
      <Contact onTriggerDialogue={onTriggerDialogue} />
      <Footer
        reducedEffects={reducedEffects}
        onToggleReducedEffects={onToggleReducedEffects}
        onReplayIntro={onReplayIntro}
      />
    </div>
  )
}
