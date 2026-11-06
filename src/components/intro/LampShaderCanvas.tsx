// src/components/intro/LampShaderCanvas.tsx
import React, { useEffect, useRef } from 'react'

interface LampShaderCanvasProps {
  intensity: number // 0.0 to 1.0 driving the illumination progress
}

export function LampShaderCanvas({ intensity }: LampShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)
  const intensityRef = useRef(intensity)
  const imageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    intensityRef.current = intensity
  }, [intensity])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    // Preload portrait image
    const img = new Image()
    img.src = '/profile.png'
    img.onload = () => {
      imageRef.current = img
    }

    const vsSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = (aPosition + 1.0) * 0.5;
        // Flip Y for texture coordinates
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `

    // Simplex 2D noise + radial lamp mask fragment shader
    const fsSource = `
      precision mediump float;
      uniform float uTime;
      uniform float uIntensity;
      uniform sampler2D uTexture;
      uniform int uHasTexture;
      varying vec2 vUv;

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

        // Organic candle / oil lamp flicker
        float noise = snoise(vec2(uTime * 3.8, 0.0));
        float dips = smoothstep(0.65, 0.9, snoise(vec2(uTime * 1.8, 3.0))) * -0.3;
        float flameFlicker = 1.0 + (noise * 0.15) + dips;

        float effIntensity = clamp(uIntensity * flameFlicker, 0.0, 1.25);

        // Radial light mask expanding from upper center
        vec2 lampCenter = vec2(0.5, 0.48);
        float dist = length(uv - lampCenter);
        float radialLight = smoothstep(0.85 * effIntensity, 0.02, dist);

        // Core flame halo
        float flameCore = smoothstep(0.18 * effIntensity, 0.0, dist);

        // Sample portrait
        vec3 texColor = vec3(0.08, 0.07, 0.06);
        if (uHasTexture == 1) {
          texColor = texture2D(uTexture, uv).rgb;
        }

        // Palette colors
        vec3 amberColor = vec3(0.949, 0.655, 0.231); // #F2A73B
        vec3 bgNearBlack = vec3(0.043, 0.039, 0.035); // #0B0A09

        // Lit portrait blending
        vec3 litPortrait = mix(texColor * 0.1, texColor * 1.15 + amberColor * 0.2, radialLight);
        vec3 finalColor = mix(bgNearBlack, litPortrait, radialLight * smoothstep(0.0, 0.12, effIntensity));

        // Add warm golden flame core glow
        finalColor += amberColor * flameCore * 0.35 * effIntensity;

        // Subtle 35mm analogue grain
        float grain = (fract(sin(dot(uv + uTime * 0.01, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.03;
        finalColor += grain * radialLight;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    // Compile helper
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()!
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource))
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource))
    gl.linkProgram(program)
    gl.useProgram(program)

    // Fullscreen Quad Buffer
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const aPosition = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    // Uniform locations
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uIntensity = gl.getUniformLocation(program, 'uIntensity')
    const uHasTexture = gl.getUniformLocation(program, 'uHasTexture')

    // WebGL Texture
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    // 1x1 black fallback pixel
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]))

    let textureLoaded = false
    const updateTextureIfReady = () => {
      if (imageRef.current && !textureLoaded) {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageRef.current)
        textureLoaded = true
      }
    }

    const handleResize = () => {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    const startTime = performance.now()
    const renderLoop = (now: number) => {
      updateTextureIfReady()
      const elapsed = (now - startTime) * 0.001
      gl.uniform1f(uTime, elapsed)
      gl.uniform1f(uIntensity, intensityRef.current)
      gl.uniform1i(uHasTexture, textureLoaded ? 1 : 0)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animRef.current = requestAnimationFrame(renderLoop)
    }

    animRef.current = requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none z-10"
    />
  )
}
