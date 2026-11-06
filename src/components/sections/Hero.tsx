// src/components/sections/Hero.tsx
import React, { useState, useRef } from 'react'
import { personal } from '../../content/personal'
import { dialogues } from '../../content/dialogues'
import { ReliefPortraitScene } from '../3d/ReliefPortraitScene'
import { useGpuTier } from '../../hooks/useGpuTier'

interface HeroProps {
  onTriggerDialogue?: (key: string, quote: string) => void
}

export function Hero({ onTriggerDialogue }: HeroProps) {
  const [faceCaption, setFaceCaption] = useState<string | null>(null)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)
  const captionIndexRef = useRef<number>(0)
  const gpuTier = useGpuTier()

  // Face hover interaction: prompt reveal on hover (200ms) with clean dismiss
  const triggerFaceCaption = () => {
    const line = dialogues.portraitHoverLines[captionIndexRef.current % dialogues.portraitHoverLines.length]
    captionIndexRef.current++
    setFaceCaption(line)
  }

  const handleMouseEnterPortrait = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = setTimeout(() => {
      triggerFaceCaption()
    }, 200)
  }

  const handleMouseLeavePortrait = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    setTimeout(() => {
      setFaceCaption(null)
    }, 1400)
  }

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between pt-24 pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
      
      {/* Top Academic & Location Metadata (Clean, Bold & Spacious) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs sm:text-sm md:text-base font-mono text-muted uppercase tracking-widest hairline-b pb-6 sm:pb-8">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-lamp shrink-0" />
          <span className="text-bone font-medium">{personal.institution}</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          <span>B.Tech CSE • CGPA: <strong className="text-bone font-bold">{personal.cgpa}</strong></span>
          <span>{personal.location}</span>
        </div>
      </div>

      {/* Main 12-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center my-auto py-16">
        
        {/* Left Column: Lit 2.5D Relief Portrait (Large & Monumental) */}
        <div className="md:col-span-5 relative group">
          <div
            onMouseEnter={handleMouseEnterPortrait}
            onMouseLeave={handleMouseLeavePortrait}
            onTouchStart={triggerFaceCaption}
            onClick={triggerFaceCaption}
            className="relative w-full max-w-xl aspect-[4/5] rounded-3xl overflow-hidden border border-hairlineLight bg-[#141210] shadow-2xl cursor-pointer"
            data-cursor="HARISANKAR"
          >
            {/* R3F WebGL 2.5D Relief Plane with Volumetric Spotlight */}
            {gpuTier.loaded && !gpuTier.isLowEnd ? (
              <ReliefPortraitScene onFaceHover={triggerFaceCaption} />
            ) : (
              <img
                src="/assets/portrait.webp"
                alt="Harisankar S"
                className="w-full h-full object-cover transition-all duration-500 ease-cinema-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/profile.png'
                }}
              />
            )}

            <div className="absolute top-5 left-5 font-mono text-xs sm:text-sm text-amber-lamp uppercase tracking-wider bg-background/90 px-3.5 py-1.5 rounded-lg border border-hairlineLight font-bold">
              Harisankar S.
            </div>
          </div>

          {/* Interactive Face Hover Caption Toast (Timely, High-legibility) */}
          {faceCaption && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 whitespace-nowrap animate-in fade-in zoom-in-95 duration-300 pointer-events-none">
              <div className="px-6 py-3 rounded-full bg-[#161412]/95 backdrop-blur-md border border-amber-lamp/80 font-mono text-sm sm:text-base text-bone shadow-[0_0_30px_rgba(242,167,59,0.4)] flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-lamp animate-pulse" />
                <span className="tracking-wide font-medium">{faceCaption}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Large Editorial Typography & One-Line Role (7 cols) */}
        <div className="md:col-span-7 space-y-10">
          <div className="space-y-4">
            <div className="font-mono text-sm sm:text-base uppercase tracking-widest text-amber-lamp font-bold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-lamp" />
              <span>{personal.leadership}</span>
            </div>
            
            <h1 className="font-display text-7xl sm:text-8xl lg:text-[10rem] text-bone tracking-tight font-normal leading-[0.90]">
              Harisankar S.
            </h1>
          </div>

          {/* Editorial Summary */}
          <p className="font-sans text-2xl sm:text-3xl text-bone/85 max-w-2xl font-normal leading-relaxed">
            {personal.shortBio}
          </p>

          {/* Quick Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-base font-mono">
            <a
              href="#work"
              className="px-9 py-4.5 rounded-full bg-amber-lamp text-background font-bold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer shadow-xl shadow-amber-lamp/25 text-base"
              data-cursor="VIEW"
            >
              Explore Work ↓
            </a>
            <a
              href="/resume"
              onMouseEnter={() => onTriggerDialogue?.('resumeDownload', dialogues.resumeDownload)}
              className="px-9 py-4.5 rounded-full border border-hairlineLight text-bone hover:border-amber-lamp hover:text-amber-lamp transition-all cursor-pointer font-medium text-base"
              data-cursor="RESUME"
            >
              Curriculum Vitae / Resume ↗
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Cue */}
      <div className="flex items-center justify-between text-base font-mono text-muted hairline-t pt-8">
        <span>Scroll down to enter the narrative</span>
        <span className="animate-bounce text-amber-lamp font-bold text-lg">↓</span>
      </div>

    </section>
  )
}
