// src/components/sections/Hero.tsx
import React, { useState, useRef } from 'react'
import { personal } from '../../content/personal'
import { dialogues } from '../../content/dialogues'

export function Hero() {
  const [faceCaption, setFaceCaption] = useState<string | null>(null)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastCaptionTimeRef = useRef<number>(0)
  const captionIndexRef = useRef<number>(0)

  // Face hover interaction: after 600ms hovering portrait, show mono caption (8s cooldown)
  const handleMouseEnterPortrait = () => {
    const now = Date.now()
    if (now - lastCaptionTimeRef.current < 8000) {
      return
    }

    hoverTimerRef.current = setTimeout(() => {
      const line = dialogues.portraitHoverLines[captionIndexRef.current % dialogues.portraitHoverLines.length]
      captionIndexRef.current++
      lastCaptionTimeRef.current = Date.now()
      setFaceCaption(line)

      setTimeout(() => {
        setFaceCaption(null)
      }, 3000)
    }, 600)
  }

  const handleMouseLeavePortrait = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
    }
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-16 pb-12 px-6 sm:px-12 max-w-7xl mx-auto">
      
      {/* Top Academic & Location Metadata (Clean, NO project scores) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-muted uppercase tracking-widest hairline-b pb-4">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp" />
          <span>{personal.institution}</span>
        </div>
        <div className="flex items-center gap-6">
          <span>B.Tech CSE • CGPA: {personal.cgpa}</span>
          <span>{personal.location}</span>
        </div>
      </div>

      {/* Main 12-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center my-auto py-12">
        
        {/* Left Column: Lit Portrait (5 cols) */}
        <div className="md:col-span-5 relative group">
          <div
            onMouseEnter={handleMouseEnterPortrait}
            onMouseLeave={handleMouseLeavePortrait}
            onTouchStart={handleMouseEnterPortrait}
            className="relative w-full max-w-md aspect-[4/5] rounded-lg overflow-hidden border border-hairlineLight bg-[#141210] shadow-2xl cursor-pointer"
            data-cursor="HARISANKAR"
          >
            <img
              src="/profile.png"
              alt="Harisankar S"
              className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 ease-cinema-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/profile.jpg'
              }}
            />
            {/* Subtle warm amber vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 font-mono text-[10px] text-amber-lamp uppercase tracking-wider bg-background/90 px-2.5 py-0.5 rounded border border-hairlineLight">
              Portrait // Harisankar S
            </div>
          </div>

          {/* Interactive Face Hover Caption Toast */}
          {faceCaption && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="px-3.5 py-1.5 rounded-full bg-[#1A1815] border border-amber-lamp/50 font-mono text-xs text-bone shadow-2xl">
                {faceCaption}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Large Editorial Typography & One-Line Role (7 cols) */}
        <div className="md:col-span-7 space-y-8">
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-amber-lamp flex items-center gap-2">
              <span>{personal.leadership}</span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-bone tracking-tight font-normal leading-[0.95]">
              Harisankar S.
            </h1>
          </div>

          {/* One-Line Role / Editorial Summary */}
          <p className="font-sans text-lg sm:text-xl text-muted max-w-xl font-normal leading-relaxed">
            {personal.shortBio}
          </p>

          {/* Focus Disciplines */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-muted">
            <div className="flex items-center gap-2">
              <span className="text-amber-lamp font-bold">// 01</span>
              <span>Vision Transformers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-lamp font-bold">// 02</span>
              <span>Medical Imaging Research</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-lamp font-bold">// 03</span>
              <span>AWS Cloud Deployment</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Cue */}
      <div className="flex items-center justify-between text-xs font-mono text-muted hairline-t pt-4">
        <span>Scroll down to enter the narrative</span>
        <span className="animate-bounce text-amber-lamp">↓</span>
      </div>

    </section>
  )
}
