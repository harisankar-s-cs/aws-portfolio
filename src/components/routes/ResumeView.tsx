// src/components/routes/ResumeView.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { personal } from '../../content/personal'
import { journey } from '../../content/journey'
import { projects } from '../../content/projects'
import { toolkit } from '../../content/toolkit'

export function ResumeView() {
  const handlePrint = () => {
    window.print()
  }

  const experiences = journey.filter((j) => j.type === 'experience')
  const educations = journey.filter((j) => j.type === 'education')
  const leaderships = journey.filter((j) => j.type === 'leadership')
  const accolades = journey.filter((j) => j.type === 'accolade')

  return (
    <div className="min-h-screen bg-[#0B0A09] text-[#EDE6DA] font-sans antialiased py-10 px-4 sm:px-8 selection:bg-amber-lamp selection:text-background">
      
      {/* Top Action Bar (Hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs print:hidden hairline-b pb-4">
        <Link
          to="/"
          className="text-muted hover:text-amber-lamp flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span>← Return to Cinematic Portfolio</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-full bg-amber-lamp text-background font-bold uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-lamp/20"
          >
            Print / Save as PDF 📄
          </button>
          <a
            href="/resume.pdf"
            download="Harisankar_S_Resume.pdf"
            className="px-4 py-2 rounded-full border border-hairlineLight text-bone hover:border-amber-lamp hover:text-amber-lamp transition-all cursor-pointer"
          >
            Direct PDF Download ↗
          </a>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <div className="max-w-4xl mx-auto bg-[#110F0D] border border-hairlineLight rounded-xl p-8 sm:p-14 space-y-10 shadow-2xl print:border-none print:shadow-none print:bg-white print:text-black print:p-0">
        
        {/* Header */}
        <div className="space-y-3 hairline-b pb-8 print:border-b-2 print:border-black">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="font-display text-4xl sm:text-5xl text-bone font-normal print:text-black">
              {personal.name}
            </h1>
            <span className="font-mono text-xs text-amber-lamp uppercase tracking-wider font-bold print:text-gray-700">
              Deep Learning Researcher • Vision Systems
            </span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted print:text-gray-700">
            <span>📍 {personal.location}</span>
            <span>✉️ {personal.email}</span>
            <span>📞 {personal.phone}</span>
            <a href={personal.github} target="_blank" rel="noreferrer" className="hover:text-amber-lamp print:text-black">
              github.com/harisankar-s-cs
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber-lamp print:text-black">
              linkedin.com/in/harisankar-s
            </a>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-amber-lamp font-bold print:text-black border-b border-hairline pb-2">
            // EDUCATION
          </h2>

          <div className="space-y-4">
            {educations.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-mono text-xs text-muted print:text-gray-600">
                  <span className="text-bone font-bold print:text-black">{edu.organization}</span>
                  <span>{edu.period}</span>
                </div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-amber-lamp print:text-gray-800">{edu.title}</span>
                  <span className="text-muted print:text-gray-600">{edu.location}</span>
                </div>
                <p className="font-sans text-xs text-muted print:text-gray-700 pt-1">
                  {edu.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Research & Experience */}
        <div className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-amber-lamp font-bold print:text-black border-b border-hairline pb-2">
            // RESEARCH & INTERNSHIP EXPERIENCE
          </h2>

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between font-mono text-xs text-muted print:text-gray-600">
                  <span className="text-bone font-bold text-sm print:text-black">{exp.title}</span>
                  <span>{exp.period}</span>
                </div>
                <div className="font-mono text-xs text-amber-lamp print:text-gray-800">
                  {exp.organization} — {exp.location}
                </div>
                <p className="font-sans text-xs text-muted print:text-gray-700 leading-relaxed pt-1">
                  {exp.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Executive Experience */}
        <div className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-amber-lamp font-bold print:text-black border-b border-hairline pb-2">
            // LEADERSHIP & STUDENT COMMUNITY
          </h2>

          <div className="space-y-4">
            {leaderships.map((ldr, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-mono text-xs text-muted print:text-gray-600">
                  <span className="text-bone font-bold print:text-black">{ldr.title}</span>
                  <span>{ldr.period}</span>
                </div>
                <div className="font-mono text-xs text-amber-lamp print:text-gray-800">
                  {ldr.organization} — {ldr.location}
                </div>
                <p className="font-sans text-xs text-muted print:text-gray-700 pt-1">
                  {ldr.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Technical Projects */}
        <div className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-amber-lamp font-bold print:text-black border-b border-hairline pb-2">
            // SELECTED PROJECTS & CLOUD ARCHITECTURE
          </h2>

          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.slug} className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-bone font-bold print:text-black">{proj.title}</span>
                  <span className="text-muted print:text-gray-600">{proj.timeline}</span>
                </div>
                <div className="font-mono text-xs text-amber-lamp print:text-gray-800">
                  {proj.category} • Tech: {proj.technologies.join(', ')}
                </div>
                <p className="font-sans text-xs text-muted print:text-gray-700 leading-relaxed pt-1">
                  {proj.summary}
                </p>
                {proj.metrics[0] && (
                  <div className="font-mono text-[11px] text-bone/80 print:text-black">
                    Result: <strong className="text-amber-lamp print:text-black">{proj.metrics[0].value}</strong> ({proj.metrics[0].label})
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills & Tooling */}
        <div className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-amber-lamp font-bold print:text-black border-b border-hairline pb-2">
            // TECHNICAL TOOLKIT
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            {toolkit.map((group) => (
              <div key={group.groupName} className="space-y-1.5">
                <span className="text-bone font-bold uppercase print:text-black">{group.groupName}:</span>
                <p className="font-sans text-xs text-muted print:text-gray-700">
                  {group.items.map((i) => i.name).join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Foundations & Accolades */}
        {accolades.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-amber-lamp font-bold print:text-black border-b border-hairline pb-2">
              // FOUNDATIONAL HONORS
            </h2>
            {accolades.map((acc, idx) => (
              <div key={idx} className="font-mono text-xs text-muted print:text-gray-700">
                <strong className="text-bone print:text-black">{acc.title}</strong> — {acc.organization} ({acc.period})
                <p className="font-sans text-xs text-muted/80 print:text-gray-600 pt-0.5">{acc.summary}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
