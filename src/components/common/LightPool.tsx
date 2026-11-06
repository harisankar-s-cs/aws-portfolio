// src/components/common/LightPool.tsx
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface LightPoolProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export function LightPool({ children, id, className = '' }: LightPoolProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const poolRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const pool = poolRef.current
    if (!container || !pool) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      pool.style.opacity = '0.35'
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pool,
        {
          opacity: 0.05,
          scaleY: 0.7,
        },
        {
          opacity: 0.45,
          scaleY: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.8,
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} id={id} className={`relative ${className}`}>
      {/* Soft descending amber light pool descending from top edge */}
      <div
        ref={poolRef}
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-lamp/15 via-amber-lamp/5 to-transparent blur-2xl origin-top"
      />
      {children}
    </div>
  )
}
