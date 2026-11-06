// src/components/sections/SelectedWork.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../../content/projects'
import type { Project } from '../../content/projects'
import { Hairline } from '../common/Hairline'

export function SelectedWork() {
  const navigate = useNavigate()
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  const handleProjectClick = (slug: string) => {
    navigate(`/work/${slug}`)
  }

  return (
    <section id="work" className="py-32 sm:py-44 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 hairline-b pb-8">
        <div className="space-y-4">
          <span className="font-mono text-base uppercase tracking-widest text-amber-lamp font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-lamp" />
            <span>// SELECTED WORK</span>
          </span>
          <h2 className="font-display text-6xl sm:text-8xl text-bone tracking-tight font-normal">
            Research & Systems.
          </h2>
        </div>
        <p className="font-mono text-sm sm:text-base text-muted max-w-sm sm:text-right leading-relaxed">
          Vision Transformers, medical image enhancement, and geospatial change detection.
        </p>
      </div>

      {/* Large Editorial Project Rows with Neighbor Shifting & Liquid Hover Previews */}
      <div className="divide-y divide-hairline">
        {projects.map((project: Project) => {
          const isHovered = hoveredSlug === project.slug

          return (
            <div
              key={project.slug}
              onClick={() => handleProjectClick(project.slug)}
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className="group relative py-16 sm:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline cursor-pointer transition-all duration-500 ease-cinema-out hover:px-8 hover:bg-[#141210] hover:-translate-y-1 hover:border-l-4 hover:border-amber-lamp"
              data-cursor="VIEW"
            >
              {/* Number + Category (3 cols) */}
              <div className="md:col-span-3 space-y-2">
                <span className="font-mono text-base sm:text-lg text-amber-lamp font-bold tracking-wider">
                  {project.number}
                </span>
                <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-muted font-medium">
                  {project.category}
                </p>
              </div>

              {/* Title & Organization (6 cols) */}
              <div className="md:col-span-6 space-y-3">
                <h3 className="font-display text-4xl sm:text-6xl text-bone group-hover:text-amber-lamp transition-colors duration-300 font-normal">
                  {project.title}
                </h3>
                <p className="font-sans text-base sm:text-lg text-muted font-medium">
                  {project.role} • {project.organization}
                </p>

                {/* Hover Reveal Cloud Architecture Note */}
                <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 overflow-hidden pt-2">
                  <p className="font-mono text-xs sm:text-sm text-amber-lamp/90 leading-relaxed bg-[#191612] p-3 rounded-lg border border-amber-lamp/30">
                    Target AWS Architecture: {project.awsArchitectureNote?.slice(0, 130)}...
                  </p>
                </div>
              </div>

              {/* Metric & Arrow (3 cols) */}
              <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-6 text-right">
                {project.metrics[0] && (
                  <div className="font-mono text-right">
                    <div className="text-xl sm:text-2xl font-bold text-bone font-mono">
                      {project.metrics[0].value}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-muted font-medium">
                      {project.metrics[0].label}
                    </div>
                  </div>
                )}
                <span className="font-mono text-3xl text-muted group-hover:text-amber-lamp group-hover:translate-x-4 transition-all duration-300">
                  →
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <Hairline />

    </section>
  )
}
