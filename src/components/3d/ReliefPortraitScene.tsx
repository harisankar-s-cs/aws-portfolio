// src/components/3d/ReliefPortraitScene.tsx
import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import * as THREE from 'three'

interface ReliefPortraitMeshProps {
  onFaceHover?: () => void
}

function ReliefPortraitMesh({ onFaceHover }: ReliefPortraitMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const spotLightRef = useRef<THREE.SpotLight>(null)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [hovered, setHovered] = useState(false)

  // Load color map and 2.5D depth displacement map
  const [colorMap, depthMap] = useTexture([
    '/assets/portrait.webp',
    '/assets/portrait-depth.webp',
  ])

  // Optimize texture wrapping and filtering
  useEffect(() => {
    colorMap.wrapS = THREE.ClampToEdgeWrapping
    colorMap.wrapT = THREE.ClampToEdgeWrapping
    depthMap.wrapS = THREE.ClampToEdgeWrapping
    depthMap.wrapT = THREE.ClampToEdgeWrapping
  }, [colorMap, depthMap])

  // Real-time lighting sway & camera parallax responding to mouse coordinates
  useFrame((state, delta) => {
    const { pointer, camera } = state

    // Damped sway of the hanging overhead lamp light
    if (spotLightRef.current) {
      const targetX = pointer.x * 0.75
      const targetZ = 1.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08
      spotLightRef.current.position.x = THREE.MathUtils.damp(
        spotLightRef.current.position.x,
        targetX,
        2.5,
        delta
      )
      spotLightRef.current.position.z = THREE.MathUtils.damp(
        spotLightRef.current.position.z,
        targetZ,
        2.0,
        delta
      )
    }

    // Subtle camera parallax
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.12, 3.0, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.12, 3.0, delta)
    camera.lookAt(0, 0, 0)
  })

  // Raycast hover tracking for face interaction caption (after 600ms)
  const handlePointerOver = () => {
    setHovered(true)
    hoverTimerRef.current = setTimeout(() => {
      onFaceHover?.()
    }, 600)
  }

  const handlePointerOut = () => {
    setHovered(false)
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
    }
  }

  return (
    <group>
      {/* Solitary Overhead Lamp SpotLight */}
      <spotLight
        ref={spotLightRef}
        position={[0, 2.4, 1.4]}
        target={meshRef.current || undefined}
        color="#F2A73B"
        intensity={3.8}
        distance={6.0}
        angle={0.72}
        penumbra={0.85}
        decay={2}
      />

      {/* Subtle Warm Fill Light */}
      <ambientLight color="#1A1510" intensity={0.2} />

      {/* 256x256 High-Segment Plane with Depth Displacement */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={[1.75, 1.8, 256, 256]} />
        <meshStandardMaterial
          map={colorMap}
          displacementMap={depthMap}
          displacementScale={0.08} // Low scale ~0.08 to avoid uncanny distortion
          roughness={0.65}
          metalness={0.08}
        />
      </mesh>
    </group>
  )
}

interface ReliefPortraitSceneProps {
  onFaceHover?: () => void
  className?: string
}

export function ReliefPortraitScene({ onFaceHover, className = '' }: ReliefPortraitSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  // Pause rendering when scrolled out of view or tab hidden
  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting && !document.hidden)
    }, { threshold: 0.1 })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <Canvas
        frameloop={isVisible ? 'always' : 'never'}
        dpr={[1, 1.75]} // DPR clamp [1, 1.75]
        camera={{ position: [0, 0, 2.4], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ReliefPortraitMesh onFaceHover={onFaceHover} />
          
          {/* Postprocessing: Bloom, Filmic Vignette, 35mm Grain */}
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.35}
              luminanceThreshold={0.5}
              luminanceSmoothing={0.7}
            />
            <Vignette
              offset={0.25}
              darkness={0.6}
            />
            <Noise opacity={0.035} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
