// src/hooks/useGpuTier.ts
import { useState, useEffect } from 'react'
import { getGPUTier } from 'detect-gpu'

export interface GpuTierResult {
  tier: number // 0, 1, 2, 3
  isMobile: boolean
  fps?: number
  gpu?: string
  isLowEnd: boolean
  loaded: boolean
}

export function useGpuTier(): GpuTierResult {
  const [result, setResult] = useState<GpuTierResult>({
    tier: 2,
    isMobile: false,
    isLowEnd: false,
    loaded: false,
  })

  useEffect(() => {
    let isMounted = true

    getGPUTier()
      .then((gpuTier) => {
        if (!isMounted) return
        const isLow = (gpuTier.tier ?? 2) < 2 || gpuTier.isMobile === true
        setResult({
          tier: gpuTier.tier ?? 2,
          isMobile: !!gpuTier.isMobile,
          fps: gpuTier.fps,
          gpu: gpuTier.gpu,
          isLowEnd: isLow,
          loaded: true,
        })
      })
      .catch(() => {
        if (!isMounted) return
        setResult((prev) => ({ ...prev, loaded: true }))
      })

    return () => {
      isMounted = false
    }
  }, [])

  return result
}
