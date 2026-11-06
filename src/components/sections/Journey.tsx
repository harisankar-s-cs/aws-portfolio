// src/components/sections/Journey.tsx
import React, { useState } from 'react'
import { journey } from '../../content/journey'
import type { JourneyItem } from '../../content/journey'

type CategoryFilter = 'all' | 'experience' | 'leadership' | 'education'

export function Journey() {
  const [filter, setFilter] = useState<CategoryFilter>('all')

  const sections = [
    {
      key: 'experience',
      title: 'Research & Internships',
      badge: 'Deep Learning & Vision',
      items: journey.filter((i) => i.type === 'experience'),
    },
    {
      key: 'leadership',
      title: 'Leadership & Student Community',
      badge: 'Executive & Mentorship',
      items: journey.filter((i) => i.type === 'leadership'),
    },
    {
      key: 'education',
      title: 'Academic Education & Foundations',
      badge: 'Formal Studies & Accolades',
      items: journey.filter((i) => i.type === 'education' || i.type === 'accolade'),
    },
  ]

  const activeSections = filter === 'all' 
    ? sections 
    : sections.filter((s) => s.key === filter)

  return (
    <section id="journey" className="py-32 sm:py-44 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 hairline-b pb-8">
        <div className="space-y-4">
          <span className="font-mono text-base uppercase tracking-widest text-amber-lamp font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-lamp" />
            <span>// EXPERIENCE & MILESTONES</span>
          </span>
          <h2 className="font-display text-6xl sm:text-8xl text-bone tracking-tight font-normal">
            The Trajectory.
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-base">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full transition-all cursor-pointer font-medium ${
              filter === 'all'
                ? 'bg-amber-lamp text-background font-bold shadow-lg shadow-amber-lamp/20 scale-105'
                : 'border border-hairlineLight text-muted hover:text-bone hover:border-amber-lamp'
            }`}
          >
            All Milestones
          </button>
          <button
            onClick={() => setFilter('experience')}
            className={`px-5 py-2.5 rounded-full transition-all cursor-pointer font-medium ${
              filter === 'experience'
                ? 'bg-amber-lamp text-background font-bold shadow-lg shadow-amber-lamp/20 scale-105'
                : 'border border-hairlineLight text-muted hover:text-bone hover:border-amber-lamp'
            }`}
          >
            Research
          </button>
          <button
            onClick={() => setFilter('leadership')}
            className={`px-5 py-2.5 rounded-full transition-all cursor-pointer font-medium ${
              filter === 'leadership'
                ? 'bg-amber-lamp text-background font-bold shadow-lg shadow-amber-lamp/20 scale-105'
                : 'border border-hairlineLight text-muted hover:text-bone hover:border-amber-lamp'
            }`}
          >
            Leadership
          </button>
          <button
            onClick={() => setFilter('education')}
            className={`px-5 py-2.5 rounded-full transition-all cursor-pointer font-medium ${
              filter === 'education'
                ? 'bg-amber-lamp text-background font-bold shadow-lg shadow-amber-lamp/20 scale-105'
                : 'border border-hairlineLight text-muted hover:text-bone hover:border-amber-lamp'
            }`}
          >
            Education
          </button>
        </div>
      </div>

      {/* Separated Grouped Timeline Sections */}
      <div className="space-y-20">
        {activeSections.map((sec, secIdx) => (
          <div key={sec.key} className="space-y-12">
            
            {/* Category Subsection Title */}
            <div className="flex items-center justify-between pb-6 border-b border-hairline">
              <div className="flex items-center gap-4">
                <span className="font-mono text-base text-amber-lamp font-bold">// 0{secIdx + 1}</span>
                <h3 className="font-display text-3xl sm:text-5xl text-bone font-normal">
                  {sec.title}
                </h3>
              </div>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-muted px-3.5 py-1.5 rounded-lg border border-hairline bg-[#12100E] font-medium">
                {sec.badge}
              </span>
            </div>

            {/* Vertical Timeline within this distinct category */}
            <div className="relative border-l-2 border-hairline ml-4 sm:ml-8 pl-8 sm:pl-14 space-y-14">
              {sec.items.map((item: JourneyItem, idx: number) => (
                <div key={idx} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[38px] sm:-left-[62px] top-2.5 h-4 w-4 rounded-full border-2 border-hairlineLight bg-background group-hover:bg-amber-lamp group-hover:border-amber-lamp transition-colors duration-300 shadow-md" />

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-sm sm:text-base">
                      <span className="text-amber-lamp font-bold">{item.year}</span>
                      <span className="text-muted">•</span>
                      <span className="text-muted uppercase tracking-wider">{item.period}</span>
                      <span className="text-muted">•</span>
                      <span className="text-xs uppercase px-3 py-1 rounded border border-hairline text-muted font-medium bg-[#141210]">
                        {item.type}
                      </span>
                    </div>

                    <h4 className="font-display text-2xl sm:text-4xl text-bone font-normal">
                      {item.title}
                    </h4>

                    <div className="font-mono text-sm sm:text-base text-amber-lamp/80 font-medium">
                      {item.organization} — {item.location}
                    </div>

                    <p className="font-sans text-base sm:text-lg text-bone/85 max-w-3xl leading-relaxed pt-2">
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}
