// src/components/common/Hairline.tsx
import React from 'react'

interface HairlineProps {
  className?: string
}

export function Hairline({ className = '' }: HairlineProps) {
  return <div className={`w-full h-[1px] bg-hairline ${className}`} />
}
