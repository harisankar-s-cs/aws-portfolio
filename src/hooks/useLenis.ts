// src/hooks/useLenis.ts
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let globalLenisInstance: Lenis | null = null

export function getLenis(): Lenis | null {
  return globalLenisInstance
}

export function useLenis(enabled: boolean = true) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    globalLenisInstance = lenis
    lenisRef.current = lenis

    if (!enabled) {
      lenis.stop()
    }

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      globalLenisInstance = null
    }
  }, [])

  useEffect(() => {
    if (!lenisRef.current) return
    if (enabled) {
      lenisRef.current.start()
    } else {
      lenisRef.current.stop()
    }
  }, [enabled])

  return lenisRef
}
