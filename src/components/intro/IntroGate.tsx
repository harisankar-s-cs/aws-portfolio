// src/components/intro/IntroGate.tsx
import React, { useState, useEffect, useRef } from 'react'
import { LampShaderCanvas } from './LampShaderCanvas'
import { personal } from '../../content/personal'

interface IntroGateProps {
  onComplete: () => void
}

export function IntroGate({ onComplete }: IntroGateProps) {
  const [intensity, setIntensity] = useState(0) // 0 to 1
  const [progress, setProgress] = useState(0)
  const [displayName, setDisplayName] = useState('')
  const [soundActive, setSoundActive] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Start the cinematic sequence automatically on mount
  useEffect(() => {
    // Timeline steps:
    // 0.0s - 0.6s: pitch black
    // 0.6s: weak flicker
    // 0.9s: dies
    // 1.3s: stronger flicker
    // 1.7s: dips
    // 2.1s - 3.6s: warm steady glow rises
    // 2.8s: name types in
    // 4.3s: complete

    const steps = [
      { t: 600, i: 0.35 },
      { t: 950, i: 0.05 },
      { t: 1300, i: 0.75 },
      { t: 1700, i: 0.2 },
      { t: 2100, i: 0.8 },
      { t: 2600, i: 0.95 },
      { t: 3200, i: 1.0 },
    ]

    const timeouts = steps.map((s) =>
      setTimeout(() => {
        setIntensity(s.i)
      }, s.t)
    )

    // Progress percentage counter
    const startTime = Date.now()
    const totalDuration = 4200
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const p = Math.min(100, Math.floor((elapsed / totalDuration) * 100))
      setProgress(p)
      if (p >= 100) clearInterval(progressTimer)
    }, 40)

    // Name typing effect at 2.6s
    const nameTimer = setTimeout(() => {
      const fullName = personal.name
      let idx = 0
      const typeInterval = setInterval(() => {
        idx++
        setDisplayName(fullName.slice(0, idx))
        if (idx >= fullName.length) {
          clearInterval(typeInterval)
        }
      }, 75)
    }, 2600)

    // Finish sequence at 4.5s
    const finishTimer = setTimeout(() => {
      onComplete()
    }, 4500)

    return () => {
      timeouts.forEach(clearTimeout)
      clearInterval(progressTimer)
      clearTimeout(nameTimer)
      clearTimeout(finishTimer)
    }
  }, [onComplete])

  // Optional Flame Sound synthesis
  const toggleSound = () => {
    if (!soundActive) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
        audioContextRef.current = ctx
        const bufferSize = ctx.sampleRate * 2
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const output = buffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.04
        }
        const whiteNoise = ctx.createBufferSource()
        whiteNoise.buffer = buffer
        whiteNoise.loop = true
        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(400, ctx.currentTime)
        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0.05, ctx.currentTime)
        whiteNoise.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)
        whiteNoise.start()
        setSoundActive(true)
      } catch (e) {}
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      setSoundActive(false)
    }
  }

  const handleSkip = () => {
    if (audioContextRef.current) {
      try { audioContextRef.current.close() } catch (e) {}
    }
    onComplete()
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-background p-6 sm:p-12 select-none overflow-hidden">
      
      {/* WebGL Simplex-Noise Lamp Shader Canvas */}
      <LampShaderCanvas intensity={intensity} />

      {/* Top Controls: Status, Audio Toggle, Skip Button */}
      <div className="w-full flex items-center justify-between z-20 text-[11px] font-mono tracking-widest text-muted uppercase">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-lamp animate-ping" />
          <span className="text-bone">Cinematic Lamp Ignition</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleSound}
            className="hover:text-amber-lamp transition-colors cursor-pointer"
          >
            {soundActive ? 'Sound: [ON]' : 'Sound: [OFF]'}
          </button>
          
          <button
            onClick={handleSkip}
            className="border border-hairlineLight px-3 py-1 rounded text-bone hover:border-amber-lamp transition-colors cursor-pointer"
          >
            Skip [ESC]
          </button>
        </div>
      </div>

      {/* Center: Typed Name emerging from the lit portrait */}
      <div className="z-20 text-center space-y-3 pointer-events-none">
        {displayName && (
          <div className="space-y-2 animate-in fade-in duration-500">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-bone tracking-tight font-normal">
              {displayName}
              <span className="inline-block w-1.5 h-8 ml-1 bg-amber-lamp animate-pulse align-middle" />
            </h1>
            <p className="font-mono text-xs sm:text-sm text-amber-lamp tracking-widest uppercase">
              Deep Learning Researcher • Vision Systems
            </p>
          </div>
        )}
      </div>

      {/* Bottom Timeline Progress Bar */}
      <div className="w-full max-w-xs z-20 space-y-2 text-center pointer-events-none">
        <div className="w-full h-[1px] bg-hairline overflow-hidden relative">
          <div
            className="h-full bg-amber-lamp transition-all duration-75 shadow-lg shadow-amber-lamp/50"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-muted">
          <span>FILAMENT IGNITION</span>
          <span className="text-amber-lamp font-bold">{progress}%</span>
        </div>
      </div>

    </div>
  )
}
