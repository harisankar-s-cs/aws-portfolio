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
    <section id="toolkit" className="py-32 sm:py-44 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      
      {/* Section Header */}
      <div 
        onMouseEnter={handleHeadingMouseEnter}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 hairline-b pb-8 cursor-default"
      >
        <div className="space-y-4">
          <span className="font-mono text-base uppercase tracking-widest text-amber-lamp font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-lamp" />
            <span>// TOOLKIT & INFRASTRUCTURE</span>
          </span>
          <h2 className="font-display text-6xl sm:text-8xl text-bone tracking-tight font-normal">
            Engineered Capabilities.
          </h2>
        </div>
        <p className="font-mono text-sm sm:text-base text-muted max-w-sm sm:text-right leading-relaxed">
          Grouped technical proficiencies. Hover any item to inspect practical implementation.
        </p>
      </div>

      {/* Grid: 3 Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {toolkit.map((group: ToolGroup, gIdx: number) => (
          <div 
            key={group.groupName} 
            className={`p-8 sm:p-10 rounded-2xl border border-hairlineLight bg-[#0E0D0B] space-y-8 ${
              gIdx === 0 ? 'ring-2 ring-amber-lamp/40 bg-[#12100E]' : ''
            }`}
          >
            {/* Group Header */}
            <div className="space-y-3 hairline-b pb-6">
              {gIdx === 0 && (
                <span className="font-mono text-xs uppercase tracking-widest text-amber-lamp px-3 py-1 rounded-md bg-amber-lamp/15 border border-amber-lamp/40 font-bold inline-block">
                  Featured: AWS Cloud Core
                </span>
              )}
              <h3 className="font-display text-3xl sm:text-4xl text-bone font-normal">
                {group.groupName}
              </h3>
              <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
                {group.groupDescription}
              </p>
            </div>

            {/* Interactive Items List */}
            <div className="space-y-4">
              {group.items.map((item: ToolItem) => (
                <div
                  key={item.name}
                  onMouseEnter={() => setActiveItem(item)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    activeItem?.name === item.name
                      ? 'bg-[#1C1814] border-amber-lamp/70 text-bone shadow-lg'
                      : 'bg-transparent border-hairline text-muted hover:text-bone hover:border-hairlineLight'
                  }`}
                  data-cursor="EXP"
                >
                  <div className="flex items-center justify-between text-sm sm:text-base font-mono font-medium">
                    <span>{item.name}</span>
                    <span className="text-xs text-amber-lamp opacity-70">↳</span>
                  </div>

                  {activeItem?.name === item.name && (
                    <p className="font-sans text-sm sm:text-base text-bone/90 mt-3 leading-relaxed pt-3 border-t border-hairline animate-in fade-in duration-200">
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
