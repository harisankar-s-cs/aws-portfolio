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
    <section id="journey" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 hairline-b pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-amber-lamp">
            // EXPERIENCE & MILESTONES
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-bone tracking-tight font-normal mt-2">
            The Trajectory.
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-amber-lamp text-background font-bold'
                : 'border border-hairlineLight text-muted hover:text-bone'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('experience')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              filter === 'experience'
                ? 'bg-amber-lamp text-background font-bold'
                : 'border border-hairlineLight text-muted hover:text-bone'
            }`}
          >
            Research
          </button>
          <button
            onClick={() => setFilter('leadership')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              filter === 'leadership'
                ? 'bg-amber-lamp text-background font-bold'
                : 'border border-hairlineLight text-muted hover:text-bone'
            }`}
          >
            Leadership
          </button>
          <button
            onClick={() => setFilter('education')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              filter === 'education'
                ? 'bg-amber-lamp text-background font-bold'
                : 'border border-hairlineLight text-muted hover:text-bone'
            }`}
          >
            Education
          </button>
        </div>
      </div>

      {/* Separated Grouped Timeline Sections */}
      <div className="space-y-16">
        {activeSections.map((sec, secIdx) => (
          <div key={sec.key} className="space-y-8">
            
            {/* Category Subsection Title */}
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-amber-lamp font-bold">// 0{secIdx + 1}</span>
                <h3 className="font-display text-2xl sm:text-3xl text-bone font-normal">
                  {sec.title}
                </h3>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted px-2.5 py-0.5 rounded border border-hairline bg-[#12100E]">
                {sec.badge}
              </span>
            </div>

            {/* Vertical Timeline within this distinct category */}
            <div className="relative border-l border-hairline ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
              {sec.items.map((item: JourneyItem, idx: number) => (
                <div key={idx} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-3 w-3 rounded-full border border-hairlineLight bg-background group-hover:bg-amber-lamp group-hover:border-amber-lamp transition-colors duration-300" />

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                      <span className="text-amber-lamp font-bold">{item.year}</span>
                      <span className="text-muted">•</span>
                      <span className="text-muted uppercase tracking-wider">{item.period}</span>
                      <span className="text-muted">•</span>
                      <span className="text-[10px] uppercase px-2 py-0.5 rounded border border-hairline text-muted">
                        {item.type}
                      </span>
                    </div>

                    <h4 className="font-display text-2xl sm:text-3xl text-bone font-normal">
                      {item.title}
                    </h4>

                    <div className="font-mono text-xs text-muted">
                      {item.organization} — {item.location}
                    </div>

                    <p className="font-sans text-sm text-muted/90 max-w-2xl leading-relaxed pt-1">
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
