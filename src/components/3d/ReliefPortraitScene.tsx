// src/components/3d/ReliefPortraitScene.tsx
import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface ReliefPortraitMeshProps {
  onFaceHover?: () => void
}

function ReliefPortraitMesh({ onFaceHover }: ReliefPortraitMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const spotLightRef = useRef<THREE.SpotLight>(null)

  // Load color map and subtle depth displacement map
  const [colorMap, depthMap] = useTexture([
    '/assets/portrait.webp',
    '/assets/portrait-depth.webp',
  ])

  useEffect(() => {
    colorMap.wrapS = THREE.ClampToEdgeWrapping
    colorMap.wrapT = THREE.ClampToEdgeWrapping
    colorMap.generateMipmaps = true
    colorMap.minFilter = THREE.LinearMipmapLinearFilter
  }, [colorMap])

  // Gentle, soft lighting sway responding to mouse coordinates without harsh shadows
  useFrame((state, delta) => {
    const { pointer, camera } = state

    if (spotLightRef.current) {
      const targetX = pointer.x * 0.45
      const targetY = 1.6 + pointer.y * 0.2
      spotLightRef.current.position.x = THREE.MathUtils.damp(
        spotLightRef.current.position.x,
        targetX,
        2.5,
        delta
      )
      spotLightRef.current.position.y = THREE.MathUtils.damp(
        spotLightRef.current.position.y,
        targetY,
        2.5,
        delta
      )
    }

    // Gentle camera parallax
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.08, 2.5, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.08, 2.5, delta)
    camera.lookAt(0, 0, 0)
  })

  return (
    <group>
      {/* Front-Facing Soft Key Light (Bright & Clear Face Illumination) */}
      <spotLight
        ref={spotLightRef}
        position={[0, 1.8, 2.2]}
        target={meshRef.current || undefined}
        color="#FFF6E8"
        intensity={2.2}
        distance={8.0}
        angle={0.9}
        penumbra={1.0}
        decay={1.2}
      />

      {/* Warm Ambient Fill to Eliminate Dark/Shady Crevasses */}
      <ambientLight color="#EDE6DA" intensity={0.95} />

      {/* Subtle Warm Amber Accent Light */}
      <pointLight position={[1.2, 1.0, 1.0]} color="#F2A73B" intensity={0.6} />

      {/* Crisp, Natural Relief Mesh */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[1.75, 1.8, 128, 128]} />
        <meshStandardMaterial
          map={colorMap}
          displacementMap={depthMap}
          displacementScale={0.025}
          roughness={0.4}
          metalness={0.02}
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
    <div ref={containerRef} className={`relative w-full h-full pointer-events-none ${className}`}>
      <Canvas
        frameloop={isVisible ? 'always' : 'never'}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 2.3], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ReliefPortraitMesh onFaceHover={onFaceHover} />
        </Suspense>
      </Canvas>
    </div>
  )
}
