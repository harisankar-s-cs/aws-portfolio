// src/App.tsx
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLenis } from './hooks/useLenis'
import { useDialogue } from './hooks/useDialogue'
import { CustomCursor } from './components/common/CustomCursor'
import { DialogueToast } from './components/common/DialogueToast'
import { IntroGate } from './components/intro/IntroGate'
import { Home } from './components/routes/Home'
import { CaseStudy } from './components/routes/CaseStudy'

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(() => {
    try {
      return sessionStorage.getItem('cinematic_intro_completed') === 'true'
    } catch (err) {
      return false
    }
  })
  const [reducedEffects, setReducedEffects] = useState(false)
  const { toast, triggerDialogue } = useDialogue()

  // Initialize synchronized Lenis + GSAP ScrollTrigger
  useLenis()

  // Keyboard shortcut: Escape skips intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        try {
          sessionStorage.setItem('cinematic_intro_completed', 'true')
        } catch (err) {}
        setIntroCompleted(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleReplayIntro = () => {
    try {
      sessionStorage.removeItem('cinematic_intro_completed')
    } catch (err) {}
    setIntroCompleted(false)
    window.scrollTo(0, 0)
  }

  const handleToggleReducedEffects = () => {
    setReducedEffects((prev) => !prev)
  }

  return (
    <BrowserRouter>
      <div className={`min-h-screen bg-background text-bone font-sans antialiased selection:bg-amber-lamp selection:text-background ${
        reducedEffects ? 'reduce-motion' : ''
      }`}>
        
        {/* Custom GSAP Physics Cursor (auto-disabled on touch) */}
        {!reducedEffects && <CustomCursor />}

        {/* Cinematic Film-like Lamp Intro Sequence */}
        {!introCompleted && (
          <IntroGate onComplete={() => setIntroCompleted(true)} />
        )}

        {/* Global Dialogue Microcopy Toast */}
        <DialogueToast message={toast.message} visible={toast.visible} />

        {/* Application Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                reducedEffects={reducedEffects}
                onToggleReducedEffects={handleToggleReducedEffects}
                onReplayIntro={handleReplayIntro}
                onTriggerDialogue={triggerDialogue}
              />
            }
          />
          <Route path="/work/:slug" element={<CaseStudy onTriggerDialogue={triggerDialogue} />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h1 className="font-display text-4xl">404</h1>
                <p className="font-mono text-xs text-muted">Houston, we have a problem.</p>
                <a href="/" className="font-mono text-xs text-amber-lamp underline">
                  Return Home
                </a>
              </div>
            }
          />
        </Routes>

      </div>
    </BrowserRouter>
  )
}
