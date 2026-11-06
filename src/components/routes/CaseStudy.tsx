// src/components/routes/CaseStudy.tsx
import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { projects, Project } from '../../content/projects'
import { Hairline } from '../common/Hairline'

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-bone flex flex-col items-center justify-center p-6 space-y-4">
        <h1 className="font-display text-4xl">Project Not Found</h1>
        <p className="font-mono text-xs text-muted">Houston, we have a problem.</p>
        <Link to="/" className="font-mono text-xs text-amber-lamp underline">
          Return to Selected Work
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-bone font-sans antialiased selection:bg-amber-lamp selection:text-background py-16 px-6 sm:px-12 max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500">
      
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between font-mono text-xs text-muted hairline-b pb-6">
        <button
          onClick={() => navigate('/')}
          className="hover:text-amber-lamp flex items-center gap-2 cursor-pointer transition-colors"
        >
          <span>← Back to Portfolio</span>
        </button>
        <span className="uppercase text-amber-lamp">CASE STUDY // {project.number}</span>
      </div>

      {/* Case Study Hero */}
      <div className="space-y-6">
        <div className="font-mono text-xs text-amber-lamp uppercase tracking-wider">
          {project.category} • {project.timeline}
        </div>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-bone tracking-tight font-normal leading-[1.05]">
          {project.title}
        </h1>

        <div className="font-mono text-xs text-muted flex flex-wrap gap-4 pt-2">
          <span>Role: <strong className="text-bone">{project.role}</strong></span>
          <span>•</span>
          <span>Org: <strong className="text-bone">{project.organization}</strong></span>
        </div>
      </div>

      {/* Key Metric Highlights Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-xl border border-hairlineLight bg-[#0E0D0B]">
        {project.metrics.map((m, idx) => (
          <div key={idx} className="space-y-1">
            <div className="font-mono text-xl sm:text-2xl font-bold text-amber-lamp font-mono">
              {m.value}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          // EXECUTIVE SUMMARY
        </h2>
        <p className="font-sans text-base sm:text-lg text-bone/90 leading-relaxed max-w-3xl">
          {project.summary}
        </p>
      </div>

      {/* Technical Deliverables */}
      <div className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          // KEY TECHNICAL DELIVERABLES
        </h2>
        <ul className="space-y-3 font-sans text-sm sm:text-base text-muted list-disc list-inside leading-relaxed">
          {project.deliverables.map((d, i) => (
            <li key={i} className="text-bone/80">
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* Target Cloud Architecture Specification */}
      {project.awsArchitectureNote && (
        <div className="p-6 rounded-xl border border-amber-lamp/30 bg-[#14120E] space-y-3">
          <div className="font-mono text-xs font-bold text-amber-lamp uppercase tracking-wider">
            Target AWS Cloud Pipeline
          </div>
          <p className="font-mono text-xs text-bone/80 leading-relaxed">
            {project.awsArchitectureNote}
          </p>
        </div>
      )}

      {/* Technology Stack Tags */}
      <div className="space-y-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          // STACK & TOOLING
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-3 py-1 rounded bg-[#171513] border border-hairlineLight text-bone"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-12 hairline-t flex justify-between items-center font-mono text-xs">
        <button
          onClick={() => navigate('/')}
          className="text-amber-lamp hover:underline cursor-pointer"
        >
          ← Return to All Projects
        </button>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-bone hover:text-amber-lamp transition-colors"
          >
            Inspect GitHub Code ↗
          </a>
        )}
      </div>

    </div>
  )
}
