// src/components/intro/PullCordSwitch.tsx
import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { playSwitchClick } from '../../utils/sound'

gsap.registerPlugin(Draggable)

interface PullCordSwitchProps {
  onSwitchOn: (pulledByHand: boolean) => void
  disabled?: boolean
}

export function PullCordSwitch({ onSwitchOn, disabled }: PullCordSwitchProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lampFixtureRef = useRef<HTMLDivElement>(null)
  const cordRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLButtonElement>(null)
  const [hintVisible, setHintVisible] = useState(true)
  const [pulledDistance, setPulledDistance] = useState(0)
  const triggeredRef = useRef(false)

  // 6-second auto-switch timer if idle
  useEffect(() => {
    if (disabled) return

    const idleTimer = setTimeout(() => {
      if (!triggeredRef.current) {
        triggeredRef.current = true
        onSwitchOn(false) // Silent automatic switch
      }
    }, 6000)

    return () => clearTimeout(idleTimer)
  }, [disabled, onSwitchOn])

  // Gentle ambient pendulum idle sway on the lamp fixture and cord
  useEffect(() => {
    if (disabled) return
    const cord = cordRef.current
    if (!cord) return

    const swayAnim = gsap.to(cord, {
      rotation: 2.5,
      transformOrigin: 'top center',
      duration: 2.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => {
      swayAnim.kill()
    }
  }, [disabled])

  // GSAP Draggable setup on the handle
  useEffect(() => {
    if (disabled) return
    const handle = handleRef.current
    const cord = cordRef.current
    if (!handle || !cord) return

    const triggerPull = () => {
      if (triggeredRef.current) return
      triggeredRef.current = true

      // Play punchy mechanical switch click that persists across unmount
      playSwitchClick()

      // Tactile snap animation
      gsap.to(handle, {
        y: 0,
        duration: 0.45,
        ease: 'elastic.out(1.2, 0.4)',
      })

      onSwitchOn(true)
    }

    const [draggable] = Draggable.create(handle, {
      type: 'y',
      bounds: { minY: 0, maxY: 120 },
      edgeResistance: 0.65,
      onDrag: function () {
        setPulledDistance(this.y)
        if (this.y >= 60) {
          this.endDrag()
          triggerPull()
        }
      },
      onRelease: function () {
        if (!triggeredRef.current) {
          gsap.to(handle, {
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)',
            onUpdate: () => setPulledDistance(gsap.getProperty(handle, 'y') as number),
            onComplete: () => setPulledDistance(0),
          })
        }
      },
    })

    return () => {
      draggable?.kill()
    }
  }, [disabled, onSwitchOn])

  // Click / Keyboard accessibility handler
  const handleDirectActivation = () => {
    if (triggeredRef.current) return
    triggeredRef.current = true

    // Play switch click
    playSwitchClick()

    // Visual pull bounce
    gsap.to(handleRef.current, {
      y: 45,
      duration: 0.12,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        onSwitchOn(true)
      },
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleDirectActivation()
    }
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-start pointer-events-auto select-none"
    >
      {/* Top Ceiling Lamp Fixture Silhouette */}
      <div
        ref={lampFixtureRef}
        className="relative z-30 flex flex-col items-center pt-0 transition-transform duration-500"
      >
        {/* Metal Ceiling Mount Plate */}
        <div className="w-16 h-2 rounded-b-md bg-[#221F1B] border-b border-[#3A352F] shadow-md" />

        {/* Vintage Hanging Rod */}
        <div className="w-[3px] h-20 bg-gradient-to-b from-[#221F1B] via-[#2F2A24] to-[#1C1814]" />

        {/* Brass Lamp Bell Dome Hood */}
        <div className="relative -mt-1 flex flex-col items-center">
          <div className="w-8 h-4 rounded-t-lg bg-[#3D352B] border-t border-[#6B5D4D]" />
          <div className="w-44 h-18 rounded-b-full bg-[#181512] border border-[#2F2922] shadow-[0_10px_35px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute inset-x-4 top-1 h-[1px] bg-amber-lamp/20" />
            <div className="absolute inset-x-8 bottom-2 h-[2px] bg-gradient-to-r from-transparent via-amber-lamp/30 to-transparent" />
          </div>

          {/* Bare Edison Bulb Filament Silhouette */}
          <div className="w-9 h-12 -mt-2 rounded-b-full border border-amber-lamp/25 bg-[#0C0B0A] relative flex items-center justify-center shadow-[0_0_15px_rgba(242,167,59,0.1)]">
            <div className="w-1.5 h-6 rounded-full border border-amber-lamp/35 opacity-40 animate-pulse" />
          </div>
        </div>

        {/* Hanging Switch Pull-Cord */}
        <div ref={cordRef} className="relative flex flex-col items-center -mt-1 origin-top">
          {/* Beaded Golden Chain */}
          <div
            className="w-[2px] bg-gradient-to-b from-amber-lamp/60 via-amber-lamp/40 to-amber-lamp/80 transition-all shadow-[0_0_8px_rgba(242,167,59,0.2)]"
            style={{ height: `${90 + pulledDistance}px` }}
          />

          {/* Weighted Brass Bell Bead Handle */}
          <button
            ref={handleRef}
            onClick={handleDirectActivation}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="Pull to switch on lamp"
            className="group relative -mt-0.5 focus:outline-none focus:ring-2 focus:ring-amber-lamp/80 rounded-full cursor-grab active:cursor-grabbing p-1"
          >
            <div className="w-4 h-7 rounded-full bg-gradient-to-b from-[#8C6D3B] via-[#E5B560] to-[#594420] shadow-[0_4px_12px_rgba(0,0,0,0.9)] border border-amber-lamp/40 group-hover:brightness-125 transition-all flex flex-col items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 mb-1" />
              <div className="w-2 h-[1px] bg-black/40" />
            </div>

            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-amber-lamp/60 animate-ping opacity-75 pointer-events-none" />
          </button>
        </div>
      </div>

      {/* Tactile Monospace Instruction Hint */}
      {hintVisible && (
        <div className="absolute top-[44vh] left-1/2 -translate-x-1/2 text-center space-y-2 pointer-events-none animate-in fade-in duration-1000">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-bone/90 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp animate-pulse" />
            <span>PULL TO SWITCH ON</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp animate-pulse" />
          </div>
          <p className="font-mono text-[11px] text-muted tracking-wider">
            [ Drag cord ↓ or press Enter / Space ]
          </p>
        </div>
      )}
    </div>
  )
}
