// src/components/intro/LampIntro.tsx
import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { AmberPreloader } from './AmberPreloader'
import { PullCordSwitch } from './PullCordSwitch'
import { usePreloadAssets } from '../../hooks/usePreloadAssets'
import { getLenis } from '../../hooks/useLenis'

interface LampIntroProps {
  onComplete: () => void
}

export function LampIntro({ onComplete }: LampIntroProps) {
  const { progress, isLoaded } = usePreloadAssets()
  const [phase, setPhase] = useState<'loading' | 'ready' | 'igniting' | 'spreading' | 'complete'>('loading')
  const [lampIntensity, setLampIntensity] = useState(0) // 0 to 1
  const [lightFrontY, setLightFrontY] = useState(0) // 0 to 100%
  const [showSkip, setShowSkip] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // When assets are preloaded, transition from 'loading' to 'ready'
  useEffect(() => {
    if (isLoaded && phase === 'loading') {
      // Hold 300ms so user sees 100% calibration
      const timer = setTimeout(() => {
        setPhase('ready')
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, phase])

  // Handle Switch-On Trigger (pulled cord or auto-timer)
  const handleSwitchOn = (pulledByHand: boolean) => {
    if (phase !== 'ready') return
    setPhase('igniting')

    // Stop Lenis while light front travels
    try {
      getLenis()?.stop()
    } catch (e) {}

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setLampIntensity(1)
      setLightFrontY(100)
      setTimeout(() => {
        handleFinish()
      }, 600)
      return
    }

    // Step 1: Filament Ignition with ONE brief flicker (two quick dips, noise-like)
    // Timeline: 0ms: start -> 250ms: dip 1 -> 450ms: surge -> 650ms: dip 2 -> 900ms: warm steady rise
    const tl = gsap.timeline({
      onComplete: () => {
        // Step 2: Light front sweeps down over 2.5s (expo.out)
        setPhase('spreading')
        gsap.to(
          { y: 0 },
          {
            y: 100,
            duration: 2.5,
            ease: 'expo.out',
            onUpdate: function () {
              setLightFrontY(this.targets()[0].y)
            },
            onComplete: () => {
              handleFinish()
            },
          }
        )
      },
    })

    tl.to({}, { duration: 0.1, onStart: () => setLampIntensity(0.4) })
      .to({}, { duration: 0.15, onStart: () => setLampIntensity(0.08) }) // Dip 1
      .to({}, { duration: 0.2, onStart: () => setLampIntensity(0.85) })  // Surge
      .to({}, { duration: 0.15, onStart: () => setLampIntensity(0.25) }) // Dip 2
      .to({}, { duration: 0.7, onStart: () => setLampIntensity(1.0) })   // Steady warm glow
  }

  const handleFinish = () => {
    try {
      sessionStorage.setItem('lamp_intro_completed', 'true')
      getLenis()?.start()
    } catch (e) {}
    setPhase('complete')
    onComplete()
  }

  // Keyboard shortcut: Escape skips intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (phase === 'complete') return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#0B0A09] select-none overflow-hidden transition-opacity duration-700"
      style={{
        opacity: phase === 'spreading' && lightFrontY > 90 ? (100 - lightFrontY) / 10 : 1,
        pointerEvents: phase === 'spreading' && lightFrontY > 80 ? 'none' : 'auto',
      }}
    >
      {/* Top Controls: Status & Always-Visible Skip Button */}
      <div className="absolute top-6 left-6 right-6 sm:top-10 sm:left-12 sm:right-12 z-50 flex items-center justify-between font-mono text-[11px] tracking-widest uppercase text-muted">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full transition-colors duration-500 ${
              phase === 'igniting' || phase === 'spreading'
                ? 'bg-amber-lamp animate-pulse'
                : 'bg-muted/40'
            }`}
          />
          <span className="text-bone/80">
            {phase === 'loading'
              ? 'CALIBRATING ASSETS'
              : phase === 'ready'
              ? 'THE LAMP // STANDBY'
              : 'IGNITION IN PROGRESS'}
          </span>
        </div>

        {showSkip && (
          <button
            onClick={handleFinish}
            className="border border-hairlineLight px-3 py-1 rounded text-bone hover:border-amber-lamp hover:text-amber-lamp transition-colors cursor-pointer"
          >
            Skip [ESC]
          </button>
        )}
      </div>

      {/* Real Preload Progress Hairline */}
      {phase === 'loading' && <AmberPreloader progress={progress} />}

      {/* Tactile Hanging Pull-Cord Switch */}
      {phase === 'ready' && (
        <PullCordSwitch onSwitchOn={handleSwitchOn} disabled={phase !== 'ready'} />
      )}

      {/* Volumetric Lamp Light Cone & Filament Bloom */}
      {(phase === 'igniting' || phase === 'spreading') && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: lampIntensity }}
        >
          {/* Central Volumetric Light Cone projecting downwards */}
          <div
            className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[90vh] bg-gradient-to-b from-amber-lamp/35 via-amber-lamp/10 to-transparent blur-3xl origin-top"
            style={{
              clipPath: `polygon(45% 0%, 55% 0%, ${50 + lightFrontY * 0.45}% 100%, ${50 - lightFrontY * 0.45}% 100%)`,
            }}
          />

          {/* Core Lamp Bulb Flare */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-amber-lamp blur-xl shadow-[0_0_60px_#F2A73B]" />

          {/* Traveling Light Front Indicator Line */}
          <div
            className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-lamp to-transparent shadow-[0_0_15px_#F2A73B] transition-all"
            style={{ top: `${lightFrontY}%` }}
          />

          {/* Subtle Ambient Film Grain */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#0B0A09_90%)]" />
        </div>
      )}
    </div>
  )
}
