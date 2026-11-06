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
      <Hero />
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
