// src/components/intro/LampShaderCanvas.tsx
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

interface LampShaderMeshProps {
  intensity: number // 0 to 1 driving the illumination progress
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform float uIntensity;
uniform sampler2D uTexture;
varying vec2 vUv;

// 2D Simplex Noise for smooth, non-jittery organic flame flicker
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;

  // Lamp flicker derived from simplex noise + occasional dips
  float noise = snoise(vec2(uTime * 4.2, 0.0));
  float dips = smoothstep(0.7, 0.9, snoise(vec2(uTime * 1.5, 5.0))) * -0.25;
  float flameMod = 1.0 + (noise * 0.12) + dips;

  float currentIntensity = clamp(uIntensity * flameMod, 0.0, 1.2);

  // Radial light mask expanding outward
  vec2 lightCenter = vec2(0.5, 0.52);
  float dist = length(uv - lightCenter);
  float radialMask = smoothstep(0.75 * currentIntensity, 0.05, dist);

  // Texture sampling with soft falloff
  vec4 tex = texture2D(uTexture, uv);
  
  // Lamp Amber Color: #F2A73B = vec3(0.949, 0.655, 0.231)
  vec3 amberTint = vec3(0.949, 0.655, 0.231);
  vec3 warmLitTex = mix(tex.rgb * 0.2, tex.rgb * 1.1 + amberTint * 0.15, radialMask);

  // Background warm near-black: #0B0A09 = vec3(0.043, 0.039, 0.035)
  vec3 bgNearBlack = vec3(0.043, 0.039, 0.035);
  vec3 finalColor = mix(bgNearBlack, warmLitTex, radialMask * smoothstep(0.0, 0.15, currentIntensity));

  // Subtle 35mm analogue film grain
  float grain = (fract(sin(dot(uv + uTime * 0.005, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.035;
  finalColor += grain * radialMask;

  gl_FragColor = vec4(finalColor, 1.0);
}
`

function LampShaderMesh({ intensity }: LampShaderMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, '/profile.png')

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uTexture: { value: texture },
    }),
    [texture]
  )

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial
      mat.uniforms.uTime.value = state.clock.getElapsedTime()
      mat.uniforms.uIntensity.value = intensity
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

interface LampShaderCanvasProps {
  intensity: number
  onLoaded?: () => void
}

export function LampShaderCanvas({ intensity }: LampShaderCanvasProps) {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <React.Suspense fallback={null}>
          <LampShaderMesh intensity={intensity} />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
