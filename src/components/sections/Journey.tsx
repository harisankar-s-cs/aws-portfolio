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
    <section id="journey" className="py-20 sm:py-28 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 hairline-b pb-6">
        <div className="space-y-2.5">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-amber-lamp font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-lamp" />
            <span>// EXPERIENCE & MILESTONES</span>
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-bone tracking-tight font-normal">
            The Trajectory.
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs sm:text-sm">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
              filter === 'all'
                ? 'bg-amber-lamp text-background font-bold shadow-md'
                : 'border border-hairlineLight text-muted hover:text-bone hover:border-amber-lamp'
            }`}
          >
            All Milestones
          </button>
          <button
            onClick={() => setFilter('experience')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
              filter === 'experience'
                ? 'bg-amber-lamp text-background font-bold shadow-md'
                : 'border border-hairlineLight text-muted hover:text-bone hover:border-amber-lamp'
            }`}
          >
            Research
          </button>
          <button
            onClick={() => setFilter('leadership')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
              filter === 'leadership'
                ? 'bg-amber-lamp text-background font-bold shadow-md'
                : 'border border-hairlineLight text-muted hover:text-bone hover:border-amber-lamp'
            }`}
          >
            Leadership
          </button>
          <button
            onClick={() => setFilter('education')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
              filter === 'education'
                ? 'bg-amber-lamp text-background font-bold shadow-md'
                : 'border border-hairlineLight text-muted hover:text-bone hover:border-amber-lamp'
            }`}
          >
            Education
          </button>
        </div>
      </div>

      {/* Separated Grouped Timeline Sections */}
      <div className="space-y-14">
        {activeSections.map((sec, secIdx) => (
          <div key={sec.key} className="space-y-8">
            
            {/* Category Subsection Title */}
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs sm:text-sm text-amber-lamp font-bold">// 0{secIdx + 1}</span>
                <h3 className="font-display text-2xl sm:text-3xl text-bone font-normal">
                  {sec.title}
                </h3>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted px-2.5 py-1 rounded-md border border-hairline bg-[#12100E] font-medium">
                {sec.badge}
              </span>
            </div>

            {/* Vertical Timeline */}
            <div className="relative border-l border-hairline ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
              {sec.items.map((item: JourneyItem, idx: number) => (
                <div key={idx} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-3 w-3 rounded-full border border-hairlineLight bg-background group-hover:bg-amber-lamp group-hover:border-amber-lamp transition-colors duration-300 shadow-md" />

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                      <span className="text-amber-lamp font-bold">{item.year}</span>
                      <span className="text-muted">•</span>
                      <span className="text-muted uppercase tracking-wider">{item.period}</span>
                      <span className="text-muted">•</span>
                      <span className="text-[10px] uppercase px-2 py-0.5 rounded border border-hairline text-muted font-medium bg-[#141210]">
                        {item.type}
                      </span>
                    </div>

                    <h4 className="font-display text-xl sm:text-2xl text-bone font-normal">
                      {item.title}
                    </h4>

                    <div className="font-mono text-xs text-amber-lamp/80 font-medium">
                      {item.organization} — {item.location}
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-bone/80 max-w-2xl leading-relaxed pt-1">
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
