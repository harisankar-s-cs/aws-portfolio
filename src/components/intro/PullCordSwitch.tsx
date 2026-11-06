// src/components/intro/PullCordSwitch.tsx
import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { Howl } from 'howler'

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
  const soundRef = useRef<Howl | null>(null)
  const triggeredRef = useRef(false)

  // Initialize Howler sound
  useEffect(() => {
    soundRef.current = new Howl({
      src: ['/assets/switch-click.wav'],
      volume: 0.7,
      preload: true,
    })
    return () => {
      soundRef.current?.unload()
    }
  }, [])

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

      try {
        soundRef.current?.play()
      } catch (e) {}

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

    try {
      soundRef.current?.play()
    } catch (e) {}

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
      className="fixed inset-0 z-40 flex flex-col items-center justify-start pointer-events-none select-none overflow-hidden"
    >
      {/* Hanging Lamp Silhouette */}
      <div
        ref={lampFixtureRef}
        className="relative flex flex-col items-center pt-0 transition-opacity duration-1000"
      >
        {/* Top Ceiling Cord */}
        <div className="w-[1.5px] h-20 sm:h-28 bg-gradient-to-b from-[#1C1A17] via-[#2A2722] to-[#3A352F]" />

        {/* Vintage Hanging Lamp Shade Silhouette */}
        <div className="relative flex flex-col items-center">
          {/* Top Socket Fitting */}
          <div className="w-4 h-3 bg-[#24211C] rounded-t-sm border-t border-hairlineLight" />
          
          {/* Flared Conical Shade */}
          <div className="w-24 sm:w-32 h-10 sm:h-12 bg-gradient-to-b from-[#1E1B17] to-[#12100E] rounded-b-xl border border-hairlineLight shadow-2xl relative flex items-center justify-center">
            {/* Soft inner filament silhouette hint */}
            <div className="w-2 h-2 rounded-full bg-amber-lamp/20 blur-[1px] absolute -bottom-1" />
          </div>
        </div>

        {/* Hanging Cord & Bead for Switching */}
        <div
          ref={cordRef}
          className="relative flex flex-col items-center origin-top pointer-events-auto"
        >
          {/* Vertical Cord Line (extends dynamically when pulled) */}
          <div
            className="w-[1.5px] bg-[#3E3831] transition-all"
            style={{ height: `${70 + pulledDistance}px` }}
          />

          {/* Draggable & Accessible Bead / Handle Button */}
          <button
            ref={handleRef}
            onClick={handleDirectActivation}
            onKeyDown={handleKeyDown}
            aria-label="Pull cord to switch on the lamp"
            tabIndex={0}
            className="group relative flex items-center justify-center w-8 h-10 -mt-1 cursor-grab active:cursor-grabbing focus:outline-none focus:ring-1 focus:ring-amber-lamp/60 rounded-full"
            data-cursor="PULL"
          >
            {/* Antique Brass Bead */}
            <div className="w-3.5 h-5 rounded-full bg-gradient-to-b from-[#5C4D35] via-[#7A6746] to-[#423724] border border-[#8C7650]/40 shadow-lg group-hover:border-amber-lamp transition-colors" />

            {/* Micro pull ring at the bottom */}
            <div className="absolute -bottom-2 w-2.5 h-2.5 rounded-full border border-[#8C7650]/50" />
          </button>
        </div>

        {/* Pulsing Hint: "pull to switch on" */}
        {hintVisible && (
          <div className="mt-8 pointer-events-none text-center space-y-1 animate-pulse">
            <span className="font-mono text-xs sm:text-sm text-bone/80 tracking-widest uppercase">
              Pull to switch on
            </span>
            <p className="font-mono text-[10px] text-muted tracking-wider">
              [ Drag cord ↓ or press Enter / Space ]
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
