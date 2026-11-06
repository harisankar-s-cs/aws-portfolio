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
  const lastCaptionTimeRef = useRef<number>(0)
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
        
        {/* Left Column: Lit 2.5D Relief Portrait (5 cols) */}
        <div className="md:col-span-5 relative group">
          <div
            onMouseEnter={handleMouseEnterPortrait}
            onMouseLeave={handleMouseLeavePortrait}
            onTouchStart={triggerFaceCaption}
            onClick={triggerFaceCaption}
            className="relative w-full max-w-md aspect-[4/5] rounded-lg overflow-hidden border border-hairlineLight bg-[#141210] shadow-2xl cursor-pointer"
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

            <div className="absolute top-4 left-4 font-mono text-[10px] text-amber-lamp uppercase tracking-wider bg-background/90 px-2.5 py-0.5 rounded border border-hairlineLight">
              Harisankar S.
            </div>
          </div>

          {/* Interactive Face Hover Caption Toast (Timely, High-legibility) */}
          {faceCaption && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 whitespace-nowrap animate-in fade-in zoom-in-95 duration-300 pointer-events-none">
              <div className="px-4 py-2 rounded-full bg-[#161412]/95 backdrop-blur-md border border-amber-lamp/70 font-mono text-xs text-bone shadow-[0_0_25px_rgba(242,167,59,0.35)] flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-lamp animate-pulse" />
                <span className="tracking-wide">{faceCaption}</span>
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

          {/* Quick Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
            <a
              href="#work"
              className="px-5 py-2.5 rounded-full bg-amber-lamp text-background font-bold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-lamp/20"
              data-cursor="VIEW"
            >
              Explore Work ↓
            </a>
            <a
              href="/resume"
              onMouseEnter={() => onTriggerDialogue?.('resumeDownload', dialogues.resumeDownload)}
              className="px-5 py-2.5 rounded-full border border-hairlineLight text-bone hover:border-amber-lamp hover:text-amber-lamp transition-all cursor-pointer"
              data-cursor="RESUME"
            >
              Curriculum Vitae / Resume ↗
            </a>
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
