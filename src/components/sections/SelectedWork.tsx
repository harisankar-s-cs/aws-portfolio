// src/components/sections/SelectedWork.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { projects, Project } from '../../content/projects'
import { Hairline } from '../common/Hairline'

export function SelectedWork() {
  const navigate = useNavigate()

  const handleProjectClick = (slug: string) => {
    navigate(`/work/${slug}`)
  }

  return (
    <section id="work" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 hairline-b pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-amber-lamp">
            // SELECTED WORK
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-bone tracking-tight font-normal mt-2">
            Research & Systems.
          </h2>
        </div>
        <p className="font-mono text-xs text-muted max-w-xs sm:text-right">
          Vision Transformers, medical image enhancement, and geospatial change detection.
        </p>
      </div>

      {/* Large Editorial Project Rows */}
      <div className="divide-y divide-hairline">
        {projects.map((project: Project) => (
          <div
            key={project.slug}
            onClick={() => handleProjectClick(project.slug)}
            className="group py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline cursor-pointer transition-all duration-500 ease-cinema-out hover:px-4 hover:bg-[#12100E]"
            data-cursor="VIEW"
          >
            {/* Number + Category (3 cols) */}
            <div className="md:col-span-3 space-y-1">
              <span className="font-mono text-xs text-amber-lamp font-bold tracking-wider">
                {project.number}
              </span>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {project.category}
              </p>
            </div>

            {/* Title & Organization (6 cols) */}
            <div className="md:col-span-6 space-y-2">
              <h3 className="font-display text-2xl sm:text-4xl text-bone group-hover:text-amber-lamp transition-colors duration-300 font-normal">
                {project.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-muted">
                {project.role} • {project.organization}
              </p>
            </div>

            {/* Metric & Arrow (3 cols) */}
            <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-6 text-right">
              {project.metrics[0] && (
                <div className="font-mono text-right">
                  <div className="text-sm sm:text-base font-bold text-bone font-mono">
                    {project.metrics[0].value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted">
                    {project.metrics[0].label}
                  </div>
                </div>
              )}
              <span className="font-mono text-lg text-muted group-hover:text-amber-lamp group-hover:translate-x-2 transition-all duration-300">
                →
              </span>
            </div>
          </div>
        ))}
      </div>

      <Hairline />

    </section>
  )
}
