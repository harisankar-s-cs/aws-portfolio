// src/components/intro/IntroGate.tsx
import React, { useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'
import { LampShaderCanvas } from './LampShaderCanvas'
import { personal } from '../../content/personal'

interface IntroGateProps {
  onComplete: () => void
}

export function IntroGate({ onComplete }: IntroGateProps) {
  const [hasStarted, setHasStarted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [progress, setProgress] = useState(0) // 0 to 100
  const [intensity, setIntensity] = useState(0) // 0 to 1
  const [isTypingName, setIsTypingName] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const soundRef = useRef<Howl | null>(null)

  // Check sessionStorage and prefers-reduced-motion
  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem('cinematic_intro_completed')
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (hasSeen || prefersReduced) {
        onComplete()
      }
    } catch (e) {
      // sessionStorage blocked
    }
  }, [onComplete])

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.fade(soundRef.current.volume(), 0, 800)
        setTimeout(() => soundRef.current?.unload(), 900)
      }
    }
  }, [])

  const startSequence = (withSound: boolean) => {
    setSoundEnabled(withSound)
    setHasStarted(true)

    if (withSound) {
      try {
        // Optional soft ambient sound or synthesized flame crackle
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
        // Soft white noise filter for flame crackle
        const bufferSize = ctx.sampleRate * 2
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const output = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.05
        }
        const whiteNoise = ctx.createBufferSource()
        whiteNoise.buffer = buffer
        whiteNoise.loop = true
        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(450, ctx.currentTime)
        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0.04, ctx.currentTime)
        whiteNoise.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)
        whiteNoise.start()

        // Fade out after 4.5s
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5)
        setTimeout(() => {
          try { whiteNoise.stop() } catch (e) {}
        }, 4600)
      } catch (e) {}
    }

    // Sequence Timeline (Total ~4.2s)
    // 0s - 0.8s: pure black
    // 0.8s: weak flicker (intensity 0.25)
    // 1.1s: dies to 0
    // 1.5s: stronger flicker (intensity 0.6)
    // 1.9s: dips to 0.15
    // 2.3s - 3.8s: steady warm glow rises to 1.0
    // 3.0s: name types in
    // 4.2s: complete

    const timeline = [
      { t: 800, i: 0.25 },
      { t: 1100, i: 0.0 },
      { t: 1500, i: 0.6 },
      { t: 1900, i: 0.15 },
      { t: 2300, i: 0.75 },
      { t: 2800, i: 0.9 },
      { t: 3400, i: 1.0 }
    ]

    timeline.forEach((step) => {
      setTimeout(() => {
        setIntensity(step.i)
      }, step.t)
    })

    // Progress bar runner
    const startTime = Date.now()
    const duration = 4000
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const p = Math.min(100, Math.floor((elapsed / duration) * 100))
      setProgress(p)
      if (p >= 100) {
        clearInterval(progressInterval)
      }
    }, 40)

    // Name typing animation at 2.8s
    setTimeout(() => {
      setIsTypingName(true)
      const targetName = personal.name
      let charIdx = 0
      const typeInterval = setInterval(() => {
        charIdx++
        setDisplayName(targetName.slice(0, charIdx))
        if (charIdx >= targetName.length) {
          clearInterval(typeInterval)
        }
      }, 70)
    }, 2800)

    // Finish sequence at 4.4s
    setTimeout(() => {
      try {
        sessionStorage.setItem('cinematic_intro_completed', 'true')
      } catch (e) {}
      onComplete()
    }, 4400)
  }

  const handleSkip = () => {
    try {
      sessionStorage.setItem('cinematic_intro_completed', 'true')
    } catch (e) {}
    onComplete()
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-background p-6 sm:p-12 select-none">
      
      {/* Three.js Fragment Shader Canvas behind everything */}
      {hasStarted && (
        <LampShaderCanvas intensity={intensity} />
      )}

      {/* Top Bar: Minimal Status + Skip Button (ALWAYS visible & accessible) */}
      <div className="w-full flex items-center justify-between z-20 text-[11px] font-mono tracking-widest text-muted uppercase">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp animate-pulse" />
          <span>Cinematic Lab Sequence</span>
        </div>
        <button
          onClick={handleSkip}
          className="border border-hairlineLight px-3 py-1 rounded text-bone hover:border-amber-lamp transition-colors cursor-pointer"
          aria-label="Skip Intro"
        >
          Skip [ESC]
        </button>
      </div>

      {/* Center Content: Sound Gate Screen (Initial) OR Typing Sequence (Active) */}
      <div className="z-20 text-center space-y-6 max-w-lg">
        {!hasStarted ? (
          <div className="space-y-6 animate-in fade-in duration-700">
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted">
              AWS Student Build Challenge // 2026
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl text-bone italic font-normal tracking-tight">
              An Architectural Short Film.
            </h1>
            
            <p className="text-sm font-sans text-muted leading-relaxed">
              A dark, warm cinematic portfolio exploring Vision Transformers, medical research, and AWS global edge deployment.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => startSequence(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-lamp text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-lamp/20"
              >
                Enter with Sound
              </button>
              <button
                onClick={() => startSequence(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-hairlineLight text-bone font-mono text-xs font-medium uppercase tracking-wider hover:border-muted transition-all cursor-pointer"
              >
                Enter Silently
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {isTypingName && (
              <div className="font-display text-4xl sm:text-6xl text-bone tracking-wide animate-in fade-in duration-500">
                {displayName}
                <span className="inline-block w-1.5 h-8 ml-1 bg-amber-lamp animate-pulse align-middle" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Loading Progress Indicator */}
      <div className="w-full max-w-xs z-20 space-y-2 text-center">
        {hasStarted && (
          <>
            <div className="w-full h-[1px] bg-hairline overflow-hidden relative">
              <div
                className="h-full bg-amber-lamp transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-muted">
              <span>INITIALIZING SHADER</span>
              <span className="text-amber-lamp font-bold">{progress}%</span>
            </div>
          </>
        )}
      </div>

    </div>
  )
}
