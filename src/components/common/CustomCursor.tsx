// src/components/common/CustomCursor.tsx
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // GSAP quickTo for high-performance zero-lag cursor physics
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' })
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' })
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' })
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' })

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true)
      xToDot(e.clientX)
      yToDot(e.clientY)
      xToRing(e.clientX)
      yToRing(e.clientY)

      // Check if hovering over an element with data-cursor attribute
      const target = (e.target as HTMLElement)?.closest('[data-cursor]')
      if (target) {
        const text = target.getAttribute('data-cursor') || ''
        setCursorText(text)
        setIsHovered(true)
      } else {
        setCursorText('')
        setIsHovered(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (isTouch || !isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-amber-lamp transition-opacity duration-300"
        style={{ opacity: isHovered ? 0 : 1 }}
      />

      {/* Outer Ring / Label Bubble */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border border-amber-lamp/50 transition-all duration-300 ${
          isHovered
            ? '-ml-8 -mt-8 h-16 w-16 bg-amber-lamp/15 backdrop-blur-[2px]'
            : '-ml-4 -mt-4 h-8 w-8'
        }`}
      >
        {cursorText && (
          <span
            ref={labelRef}
            className="font-mono text-[9px] uppercase tracking-wider text-bone font-medium"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  )
}
