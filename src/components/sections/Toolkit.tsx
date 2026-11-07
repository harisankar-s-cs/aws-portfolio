// src/components/sections/Toolkit.tsx
import React, { useState } from 'react'
import { toolkit } from '../../content/toolkit'
import type { ToolGroup, ToolItem } from '../../content/toolkit'
import { dialogues } from '../../content/dialogues'

interface ToolkitProps {
  onTriggerDialogue: (key: string, quote: string) => void
}

export function Toolkit({ onTriggerDialogue }: ToolkitProps) {
  const [activeItem, setActiveItem] = useState<ToolItem | null>(toolkit[0]?.items[0] || null)

  const handleHeadingMouseEnter = () => {
    onTriggerDialogue('skillsHeading', dialogues.skillsHeading)
  }

  return (
    <section id="toolkit" className="py-20 sm:py-28 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div 
        onMouseEnter={handleHeadingMouseEnter}
        onClick={handleHeadingMouseEnter}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 hairline-b pb-6 cursor-default"
      >
        <div className="space-y-2.5">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-amber-lamp font-bold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-lamp" />
            <span>// TOOLKIT & INFRASTRUCTURE</span>
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-bone tracking-tight font-normal">
            Engineered Capabilities.
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-muted max-w-xs sm:text-right leading-relaxed">
          Grouped technical proficiencies. Hover any item to inspect practical implementation.
        </p>
      </div>

      {/* Grid: 3 Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {toolkit.map((group: ToolGroup, gIdx: number) => (
          <div 
            key={group.groupName} 
            className={`p-6 sm:p-7 rounded-xl border border-hairlineLight bg-[#0E0D0B] space-y-6 ${
              gIdx === 0 ? 'ring-1 ring-amber-lamp/40 bg-[#12100E]' : ''
            }`}
          >
            {/* Group Header */}
            <div className="space-y-2 hairline-b pb-4">
              {gIdx === 0 && (
                <span className="font-mono text-[11px] uppercase tracking-widest text-amber-lamp px-2.5 py-0.5 rounded bg-amber-lamp/15 border border-amber-lamp/30 font-bold inline-block">
                  Featured: AWS Cloud Core
                </span>
              )}
              <h3 className="font-display text-2xl text-bone font-normal">
                {group.groupName}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed">
                {group.groupDescription}
              </p>
            </div>

            {/* Interactive Items List */}
            <div className="space-y-3">
              {group.items.map((item: ToolItem) => (
                <div
                  key={item.name}
                  onMouseEnter={() => setActiveItem(item)}
                  className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                    activeItem?.name === item.name
                      ? 'bg-[#1C1814] border-amber-lamp/60 text-bone shadow-md'
                      : 'bg-transparent border-hairline text-muted hover:text-bone hover:border-hairlineLight'
                  }`}
                  data-cursor="EXP"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-medium">
                    <span>{item.name}</span>
                    <span className="text-[11px] text-amber-lamp opacity-70">↳</span>
                  </div>

                  {activeItem?.name === item.name && (
                    <p className="font-sans text-xs sm:text-sm text-bone/90 mt-2 leading-relaxed pt-2 border-t border-hairline animate-in fade-in duration-200">
                      {item.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
