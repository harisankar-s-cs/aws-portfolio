// src/components/sections/Journey.tsx
import React from 'react'
import { journey, JourneyItem } from '../../content/journey'

export function Journey() {
  return (
    <section id="journey" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 hairline-b pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-amber-lamp">
            // CHRONOLOGY
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-bone tracking-tight font-normal mt-2">
            The Trajectory.
          </h2>
        </div>
        <p className="font-mono text-xs text-muted max-w-xs sm:text-right">
          Milestones across research fellowships, engineering leadership, and foundational accolades.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-hairline ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12">
        {journey.map((item: JourneyItem, idx: number) => (
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

              <h3 className="font-display text-2xl sm:text-3xl text-bone font-normal">
                {item.title}
              </h3>

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

    </section>
  )
}
