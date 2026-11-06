// src/components/sections/Toolkit.tsx
import React, { useState } from 'react'
import { toolkit, ToolGroup, ToolItem } from '../../content/toolkit'
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
    <section id="toolkit" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div 
        onMouseEnter={handleHeadingMouseEnter}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 hairline-b pb-6 cursor-default"
      >
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-amber-lamp">
            // TOOLKIT & INFRASTRUCTURE
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-bone tracking-tight font-normal mt-2">
            Engineered Capabilities.
          </h2>
        </div>
        <p className="font-mono text-xs text-muted max-w-xs sm:text-right">
          Grouped technical proficiencies. Hover any item to inspect practical implementation.
        </p>
      </div>

      {/* Grid: 3 Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {toolkit.map((group: ToolGroup, gIdx: number) => (
          <div 
            key={group.groupName} 
            className={`p-6 sm:p-8 rounded-xl border border-hairlineLight bg-[#0E0D0B] space-y-6 ${
              gIdx === 0 ? 'ring-1 ring-amber-lamp/30' : ''
            }`}
          >
            {/* Group Header */}
            <div className="space-y-1.5 hairline-b pb-4">
              {gIdx === 0 && (
                <span className="font-mono text-[9px] uppercase tracking-widest text-amber-lamp px-2 py-0.5 rounded bg-amber-lamp/10 border border-amber-lamp/30">
                  Featured: AWS Cloud
                </span>
              )}
              <h3 className="font-display text-2xl text-bone font-normal mt-1">
                {group.groupName}
              </h3>
              <p className="font-sans text-xs text-muted leading-relaxed">
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
                      ? 'bg-[#191714] border-amber-lamp/60 text-bone shadow-md'
                      : 'bg-transparent border-hairline text-muted hover:text-bone hover:border-hairlineLight'
                  }`}
                  data-cursor="EXP"
                >
                  <div className="flex items-center justify-between text-xs font-mono font-medium">
                    <span>{item.name}</span>
                    <span className="text-[10px] text-amber-lamp opacity-60">↳</span>
                  </div>

                  {activeItem?.name === item.name && (
                    <p className="font-sans text-xs text-bone/90 mt-2 leading-relaxed pt-2 border-t border-hairline animate-in fade-in duration-200">
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
