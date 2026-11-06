// src/components/sections/Prologue.tsx
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROLOGUE_TEXT = `I engineer deep learning systems where mathematical rigor meets high-throughput production. From designing 26M-parameter hybrid Restormers for medical ultrasound restoration at NIT Calicut to optimizing Siamese Swin Transformers for satellite vision at KSREC, I specialize in bridging research-grade neural architectures with resilient AWS cloud infrastructure.`

export function Prologue() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const paragraph = textRef.current
    if (!container || !paragraph) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Split into words
    const words = paragraph.querySelectorAll('.prologue-word')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          opacity: 0.14,
          color: '#8C8275',
        },
        {
          opacity: 1,
          color: '#EDE6DA',
          stagger: 0.05,
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.7,
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [])

  // Break text into span words for the light-catch scrub effect
  const wordSpans = PROLOGUE_TEXT.split(' ').map((word, i) => (
    <span key={i} className="prologue-word inline-block mr-[0.28em] transition-colors duration-200">
      {word}
    </span>
  ))

  return (
    <section
      ref={containerRef}
      id="prologue"
      className="relative py-28 sm:py-36 px-6 sm:px-12 max-w-5xl mx-auto select-none"
    >
      {/* Top subtle light pool hint */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-amber-lamp/30 to-transparent" />

      <div className="space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-lamp">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp" />
          <span>// PROLOGUE • THE INTENT</span>
        </div>

        <p
          ref={textRef}
          className="font-display text-3xl sm:text-5xl lg:text-6xl text-bone/90 leading-[1.2] tracking-tight font-normal"
        >
          {wordSpans}
        </p>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-muted hairline-t">
          <span>ACADEMIC FOUNDATION & CLOUD HORIZONS</span>
          <span className="text-amber-lamp font-mono">SCROLL TO EXPAND ↓</span>
        </div>
      </div>
    </section>
  )
}
