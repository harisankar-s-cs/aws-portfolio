// src/components/sections/StoryScroller.tsx
import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useImageSequence } from '../../hooks/useImageSequence'
import { storyChapters } from '../../content/story'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 36
const getFramePath = (idx: number) => `/frames/story/f_${idx.toString().padStart(4, '0')}.webp`

export function StoryScroller() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)

  const { currentFrame, setFrame, getCurrentImage, isInitialLoaded } = useImageSequence({
    frameCount: FRAME_COUNT,
    framePath: getFramePath,
    windowSize: 24,
  })

  // GSAP ScrollTrigger pinning and scrubbing
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=300%', // Generous 300% viewport scroll distance for butter-smooth scrub
      pin: true,
      scrub: 0.8, // Inertia scrub
      onUpdate: (self) => {
        const frameIndex = Math.round(1 + self.progress * (FRAME_COUNT - 1))
        setFrame(frameIndex)

        // Chapter progression: 0..0.33 -> Ch 1, 0.33..0.66 -> Ch 2, 0.66..1.0 -> Ch 3
        const chapterIdx = Math.min(2, Math.floor(self.progress * 3))
        setActiveChapterIndex(chapterIdx)
      },
    })

    return () => {
      st.kill()
    }
  }, [setFrame])

  // Draw frame on canvas (draws immediately on initial load and whenever frame updates)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = getCurrentImage()
    if (!img) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Calculate Cover-fit
    const canvasRatio = rect.width / rect.height
    const imgRatio = img.width / img.height
    let drawWidth = rect.width
    let drawHeight = rect.height
    let offsetX = 0
    let offsetY = 0

    if (canvasRatio > imgRatio) {
      drawHeight = rect.width / imgRatio
      offsetY = (rect.height - drawHeight) / 2
    } else {
      drawWidth = rect.height * imgRatio
      offsetX = (rect.width - drawWidth) / 2
    }

    ctx.clearRect(0, 0, rect.width, rect.height)
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }, [currentFrame, getCurrentImage, isInitialLoaded])

  const chapter = storyChapters[activeChapterIndex]

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-background overflow-hidden select-none">
      
      {/* Full-bleed Canvas for Apple-Style Image Sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Subtle Dark Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/80 pointer-events-none" />

      {/* Chapter Text Overlay */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-between py-12 pointer-events-none">
        
        {/* Top Header */}
        <div className="flex items-center justify-between font-mono text-xs text-muted uppercase tracking-widest hairline-b pb-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-lamp font-bold">// VIDEO-IN-MOTION SCROLL</span>
            <span>CHAPTER {chapter.number} OF 03</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-bone">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp animate-pulse" />
            <span>FRAME {currentFrame.toString().padStart(2, '0')} / {FRAME_COUNT}</span>
          </div>
        </div>

        {/* Center / Lower Content Card */}
        <div className="max-w-xl space-y-4 my-auto bg-[#0E0D0B]/90 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-hairlineLight shadow-2xl transition-all duration-700 pointer-events-auto">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-lamp uppercase tracking-wider">
            <span>{chapter.subtitle}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl text-bone tracking-tight font-normal">
            {chapter.title}
          </h2>

          <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
            {chapter.body}
          </p>

          {chapter.metricValue && (
            <div className="pt-3 border-t border-hairline flex items-baseline gap-3">
              <span className="font-mono text-xl sm:text-2xl font-bold text-amber-lamp font-mono">
                {chapter.metricValue}
              </span>
              <span className="font-mono text-xs text-muted uppercase tracking-wider">
                {chapter.metricLabel}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Technical Notice */}
        <div className="flex items-center justify-between text-[11px] font-mono text-muted hairline-t pt-4">
          <span>* Scroll up and down to scrub the 36-frame cinematic camera sequence</span>
          <span className="text-amber-lamp animate-pulse">SCROLL TO ADVANCE SEQUENCE ↓</span>
        </div>

      </div>

    </section>
  )
}
